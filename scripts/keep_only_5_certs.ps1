$dir = "c:\Users\Dahon\Documents\Projects\portfolio\src\assets\certificate-previews"
$keep = @(
    "5g-and-ai-accelerates-edge-computing.png",
    "ai-x-design-creativity-speed-style.jpg",
    "hour-of-code-learn-ai-coding.jpg",
    "ai-applications-iot-impact.jpg",
    "ai-alam-proper-ai-tool-usage.jpg"
)

Get-ChildItem -Path $dir | ForEach-Object {
    if ($keep -notcontains $_.Name) {
        Remove-Item $_.FullName -Force
    }
}

Get-ChildItem -Path $dir | Select-Object Name, Length
