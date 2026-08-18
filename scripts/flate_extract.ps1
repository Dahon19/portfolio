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

function Decompress-Flate($bytes, $start, $len) {
    try {
        # PDF Flate streams have 2-byte zlib header (usually 0x78 0x9C or 0x78 0xDA)
        $ms = New-Object System.IO.MemoryStream($bytes, $start + 2, $len - 2)
        $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
        $out = New-Object System.IO.MemoryStream
        $ds.CopyTo($out)
        $ds.Dispose()
        $ms.Dispose()
        return $out.ToArray()
    } catch {
        return $null
    }
}

$files = Get-ChildItem -Path $webinarsDir -Filter *.pdf

foreach ($file in $files) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $cleanSlug = Sanitize-Name $baseName
    $targetPath = Join-Path $outDir ($cleanSlug + ".jpg")

    if (Test-Path $targetPath) { continue }

    Write-Output ("Flate Extracting: " + $file.Name)
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = [System.Text.Encoding]::ASCII.GetString($bytes)
    
    $streamIdx = 0
    while (($streamIdx = $content.IndexOf("stream", $streamIdx)) -ne -1) {
        # Find start of binary stream data (after CRLF or LF)
        $binaryStart = $streamIdx + 6
        while ($binaryStart -lt $bytes.Length -and ($bytes[$binaryStart] -eq 13 -or $bytes[$binaryStart] -eq 10)) {
            $binaryStart++
        }
        $endStreamIdx = $content.IndexOf("endstream", $binaryStart)
        if ($endStreamIdx -eq -1) { break }

        $len = $endStreamIdx - $binaryStart
        # Try decompressing
        $decompressed = Decompress-Flate $bytes $binaryStart $len
        if ($decompressed -and $decompressed.Length -gt 10000) {
            # Check if decompressed contains JPEG or image
            for ($k = 0; $k -lt ($decompressed.Length - 10); $k++) {
                if ($decompressed[$k] -eq 0xFF -and $decompressed[$k+1] -eq 0xD8) {
                    $imgBytes = $decompressed[$k..($decompressed.Length - 1)]
                    try {
                        $msImg = New-Object System.IO.MemoryStream(,$imgBytes)
                        $img = [System.Drawing.Image]::FromStream($msImg)
                        $bmp = New-Object System.Drawing.Bitmap($img)
                        $bmp.Save($targetPath, $jpegCodec, $encoderParams)
                        $bmp.Dispose()
                        $img.Dispose()
                        $msImg.Dispose()
                        Write-Output ("Saved JPEG via Flate: " + $cleanSlug)
                        break
                    } catch {}
                }
            }
            if (Test-Path $targetPath) { break }
        }

        $streamIdx = $endStreamIdx + 9
    }
}

Get-ChildItem -Path $outDir -Filter *.jpg | Select-Object Name, Length
