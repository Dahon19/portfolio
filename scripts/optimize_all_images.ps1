Add-Type -AssemblyName System.Drawing

function Optimize-ImageFile {
    param(
        [string]$filePath,
        [int]$maxWidth = 1200,
        [int]$quality = 82
    )
    if (-not (Test-Path $filePath)) { return }
    
    $file = Get-Item $filePath
    $origSize = $file.Length
    $ext = $file.Extension.ToLower()

    try {
        $img = [System.Drawing.Image]::FromFile($filePath)
        
        $targetWidth = [math]::Min($img.Width, $maxWidth)
        $targetHeight = [int]($img.Height * ($targetWidth / $img.Width))

        $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
        
        $g.Dispose()
        $img.Dispose()

        $tmp = $filePath + ".opt.tmp"
        
        if ($ext -eq ".png") {
            # For PNG, if file is huge, convert/save cleanly
            $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
        } else {
            $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq 'JPEG' }
            $encoder = [System.Drawing.Imaging.Encoder]::Quality
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$quality)
            $bmp.Save($tmp, $jpegCodec, $encoderParams)
            $encoderParams.Dispose()
        }
        
        $bmp.Dispose()

        $newSize = (Get-Item $tmp).Length
        if ($newSize -lt $origSize) {
            Remove-Item $filePath -Force
            Rename-Item $tmp (Split-Path $filePath -Leaf)
            Write-Output ("Optimized: " + (Split-Path $filePath -Leaf) + " from " + [math]::Round($origSize / 1KB, 1) + " KB -> " + [math]::Round($newSize / 1KB, 1) + " KB")
        } else {
            Remove-Item $tmp -Force
            Write-Output ("Kept original: " + (Split-Path $filePath -Leaf))
        }
    } catch {
        Write-Warning ("Failed to optimize: " + $filePath + " - " + $_.Exception.Message)
    }
}

Write-Output "Optimizing avatar images..."
Optimize-ImageFile "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\rod-allen-avatar.jpg" 600 85
Optimize-ImageFile "c:\Users\Dahon\Documents\Projects\portfolio\public\rod-allen-avatar.jpg" 600 85

Write-Output "Optimizing project preview images..."
$projectImages = Get-ChildItem "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\project-previews" -Include *.png, *.jpg, *.jpeg -Recurse
foreach ($p in $projectImages) {
    Optimize-ImageFile $p.FullName 1200 80
}

Write-Output "Image optimization complete!"
