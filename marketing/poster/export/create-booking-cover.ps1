$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot '1921.jpg'
$output = Join-Path $PSScriptRoot 'booking-artist-cover.jpg'
$fullScreenJpeg = Join-Path $PSScriptRoot 'booking-artist-cover-fullscreen.jpg'
$fullScreenWebp = Join-Path $PSScriptRoot 'booking-artist-cover-fullscreen.webp'

ffmpeg -y -i $source -vf "crop=409:501:455:178,delogo=x=1:y=1:w=31:h=27:show=0,scale=818:1002:flags=lanczos" -frames:v 1 -update 1 -q:v 2 $output

if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg failed with exit code $LASTEXITCODE"
}

$fullScreenFilter = 'crop=409:501:455:178,delogo=x=1:y=1:w=31:h=27:show=0,hqdn3d=1.2:1.2:4:4,scale=2160:2646:flags=lanczos,unsharp=5:5:0.35:3:3:0.0'

ffmpeg -y -i $source -vf $fullScreenFilter -frames:v 1 -update 1 -q:v 1 $fullScreenJpeg

if ($LASTEXITCODE -ne 0) {
    throw "JPEG upscale failed with exit code $LASTEXITCODE"
}

ffmpeg -y -i $source -vf $fullScreenFilter -frames:v 1 -update 1 -c:v libwebp -quality 92 -compression_level 6 $fullScreenWebp

if ($LASTEXITCODE -ne 0) {
    throw "WebP upscale failed with exit code $LASTEXITCODE"
}
