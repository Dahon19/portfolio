Add-Type -AssemblyName System.Drawing

$webinarsDir = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\certificate-previews\Webinars"
$outDir = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\certificate-previews"

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq 'JPEG' }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]88)

function Sanitize-Name($name) {
    $n = $name.ToLower()
    $chars = [char[]]$n
    $sb = New-Object System.Text.StringBuilder
    foreach ($c in $chars) {
        if ([char]::IsLetterOrDigit($c)) {
            [void]$sb.Append($c)
        } else {
            [void]$sb.Append('-')
        }
    }
    $res = $sb.ToString()
    while ($res.Contains('--')) {
        $res = $res.Replace('--', '-')
    }
    return $res.Trim('-')
}

function Extract-And-Save($file) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $cleanSlug = Sanitize-Name $baseName
    $ext = $file.Extension.ToLower()

    Write-Output ("Processing: " + $file.Name + " -> " + $cleanSlug)

    if ($ext -eq ".pdf") {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $startIndex = -1
        for ($i = 0; $i -lt ($bytes.Length - 1); $i++) {
            if ($bytes[$i] -eq 0xFF -and $bytes[$i+1] -eq 0xD8) {
                $startIndex = $i
                break
            }
        }
        if ($startIndex -ge 0) {
            $endIndex = -1
            for ($i = $bytes.Length - 2; $i -ge $startIndex; $i--) {
                if ($bytes[$i] -eq 0xFF -and $bytes[$i+1] -eq 0xD9) {
                    $endIndex = $i + 2
                    break
                }
            }
            if ($endIndex -gt $startIndex) {
                $imgBytes = $bytes[$startIndex..($endIndex-1)]
                $ms = New-Object System.IO.MemoryStream(,$imgBytes)
                $img = [System.Drawing.Image]::FromStream($ms)
                
                $targetWidth = [math]::Min($img.Width, 1920)
                $targetHeight = [int]($img.Height * ($targetWidth / $img.Width))
                $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
                $g = [System.Drawing.Graphics]::FromImage($bmp)
                $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
                
                $g.Dispose()
                $img.Dispose()
                $ms.Dispose()

                # Save as optimized web preview
                $targetPath = Join-Path $outDir ($cleanSlug + ".jpg")
                $bmp.Save($targetPath, $jpegCodec, $encoderParams)
                $bmp.Dispose()
                Write-Output ("Saved PDF Image: " + (Split-Path $targetPath -Leaf))
                return
            }
        }
        Write-Output ("Warning: No raw JPEG found in PDF " + $file.Name)
    } elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg" -or $ext -eq ".png") {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $targetWidth = [math]::Min($img.Width, 1920)
        $targetHeight = [int]($img.Height * ($targetWidth / $img.Width))
        $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
        
        $g.Dispose()
        $img.Dispose()

        $targetPath = Join-Path $outDir ($cleanSlug + ".jpg")
        $bmp.Save($targetPath, $jpegCodec, $encoderParams)
        $bmp.Dispose()
        Write-Output ("Saved Image: " + (Split-Path $targetPath -Leaf))
    }
}

$files = Get-ChildItem -Path $webinarsDir | Where-Object { $_.Name -ne "desktop.ini" }
foreach ($f in $files) {
    Extract-And-Save $f
}

Write-Output "Extraction complete!"
