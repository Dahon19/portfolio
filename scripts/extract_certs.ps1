$srcDir = "C:\Users\Dahon\.gemini\antigravity-ide\brain\61a89ae6-5fe0-431a-b6fc-1a283a3406e7\.user_uploaded"
$destDir = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\certificate-previews"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Copy direct image uploads
Copy-Item (Join-Path $srcDir "media_1787034500290.png") (Join-Path $destDir "5g-and-ai-accelerates-edge-computing.png") -Force
Copy-Item (Join-Path $srcDir "media_1787034502756.jpg") (Join-Path $destDir "ai-applications-iot-impact.jpg") -Force

function Extract-PdfJpegs($pdfPath, $outPath) {
    $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
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
            [System.IO.File]::WriteAllBytes($outPath, $imgBytes)
            Write-Output ("Extracted JPEG: " + (Split-Path $outPath -Leaf) + " (" + $imgBytes.Length + " bytes)")
            return $true
        }
    }
    Write-Output ("No JPEG in: " + (Split-Path $pdfPath -Leaf))
    return $false
}

Extract-PdfJpegs (Join-Path $srcDir "media_1787034500974.pdf") (Join-Path $destDir "ai-x-design-creativity-speed-style.jpg")
Extract-PdfJpegs (Join-Path $srcDir "media_1787034501094.pdf") (Join-Path $destDir "hour-of-code-learn-ai-coding.jpg")
Extract-PdfJpegs (Join-Path $srcDir "media_1787034506519.pdf") (Join-Path $destDir "ai-alam-proper-ai-tool-usage.jpg")
