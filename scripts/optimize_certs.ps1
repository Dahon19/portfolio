Add-Type -AssemblyName System.Drawing

$dir = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\certificate-previews"
$files = Get-ChildItem -Path $dir -Include *.jpg, *.png, *.jpeg -Recurse

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq 'JPEG' }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]85)

foreach ($f in $files) {
    if ($f.Length -gt 1000000) { # Only recompress large files (>1MB)
        Write-Output ("Optimizing " + $f.Name + " (" + [math]::Round($f.Length / 1MB, 2) + " MB)")
        $tmp = $f.FullName + ".tmp.jpg"
        $img = [System.Drawing.Image]::FromFile($f.FullName)
        
        $targetWidth = [math]::Min($img.Width, 1920)
        $targetHeight = [int]($img.Height * ($targetWidth / $img.Width))
        
        $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
        
        $g.Dispose()
        $img.Dispose()
        
        $bmp.Save($tmp, $jpegCodec, $encoderParams)
        $bmp.Dispose()
        
        Remove-Item $f.FullName -Force
        Rename-Item $tmp $f.Name
        $newFile = Get-Item (Join-Path $dir $f.Name)
        Write-Output ("Done: " + $newFile.Name + " is now " + [math]::Round($newFile.Length / 1KB, 2) + " KB")
    }
}

$encoderParams.Dispose()
Write-Output "All certificates optimized!"
