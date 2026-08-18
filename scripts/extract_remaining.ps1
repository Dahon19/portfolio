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

$remainingFiles = Get-ChildItem -Path $webinarsDir -Filter *.pdf

foreach ($file in $remainingFiles) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $cleanSlug = Sanitize-Name $baseName
    $targetPath = Join-Path $outDir ($cleanSlug + ".jpg")

    if (Test-Path $targetPath) { continue }

    Write-Output ("Extracting: " + $file.Name)
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Check for JPEG (FF D8 ... FF D9)
    $found = $false
    for ($i = 0; $i -lt ($bytes.Length - 10); $i++) {
        if ($bytes[$i] -eq 0xFF -and $bytes[$i+1] -eq 0xD8 -and $bytes[$i+2] -eq 0xFF) {
            for ($j = $bytes.Length - 2; $j -gt $i; $j--) {
                if ($bytes[$j] -eq 0xFF -and $bytes[$j+1] -eq 0xD9) {
                    try {
                        $len = $j + 2 - $i
                        $imgBytes = New-Object byte[] $len
                        [System.Array]::Copy($bytes, $i, $imgBytes, 0, $len)
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

                        $bmp.Save($targetPath, $jpegCodec, $encoderParams)
                        $bmp.Dispose()
                        Write-Output ("Successfully saved JPEG: " + $cleanSlug)
                        $found = $true
                        break
                    } catch {
                        # continue searching
                    }
                }
            }
            if ($found) { break }
        }
    }
}

Get-ChildItem -Path $outDir -Filter *.jpg | Select-Object Name, Length
