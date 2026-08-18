Add-Type -AssemblyName System.Drawing

$dir = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\project-previews"
$files = Get-ChildItem $dir -Include *.png, *.jpg, *.jpeg

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq 'JPEG' }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]85)

foreach ($f in $files) {
    if ($f.Extension.ToLower() -eq ".png" -and $f.Name -ne "bacmatic-output.svg") {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
        $outJpg = Join-Path $dir ($baseName + ".jpg")
        
        Write-Output ("Converting " + $f.Name + " (" + [math]::Round($f.Length / 1MB, 2) + " MB) -> " + ($baseName + ".jpg"))
        $img = [System.Drawing.Image]::FromFile($f.FullName)
        
        $targetWidth = [math]::Min($img.Width, 1280)
        $targetHeight = [int]($img.Height * ($targetWidth / $img.Width))

        $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.Clear([System.Drawing.Color]::White)
        $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
        
        $g.Dispose()
        $img.Dispose()

        $bmp.Save($outJpg, $jpegCodec, $encoderParams)
        $bmp.Dispose()

        $newF = Get-Item $outJpg
        Write-Output ("Saved: " + $newF.Name + " (" + [math]::Round($newF.Length / 1KB, 1) + " KB)")
    }
}

$encoderParams.Dispose()
Write-Output "Conversion done!"
