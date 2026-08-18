Add-Type -AssemblyName System.Drawing

$folder = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\project-previews"
$files = Get-ChildItem -Path $folder -Filter "*.png"

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq 'JPEG' }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]80)

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name) ($([math]::Round($file.Length / 1MB, 2)) MB)"
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    
    $targetWidth = [math]::Min($img.Width, 1100)
    $targetHeight = [int]($img.Height * ($targetWidth / $img.Width))

    $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
    
    $g.Dispose()
    $img.Dispose()

    $outPath = [System.IO.Path]::ChangeExtension($file.FullName, ".jpg")
    $bmp.Save($outPath, $jpegCodec, $encoderParams)
    $bmp.Dispose()

    $newFile = Get-Item $outPath
    Write-Host "Created: $($newFile.Name) ($([math]::Round($newFile.Length / 1KB, 1)) KB)"
}

$encoderParams.Dispose()
Write-Host "All done!"
