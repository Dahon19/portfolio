import fs from 'node:fs';

function getJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 2; // Skip SOI (0xFFD8)
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    offset += 2;
    if (marker >= 0xFFC0 && marker <= 0xFFC3) { // SOF0, SOF1, SOF2, SOF3
      offset += 3; // Skip length and precision
      const height = buffer.readUInt16BE(offset);
      const width = buffer.readUInt16BE(offset + 2);
      return { width, height, aspectRatio: width / height };
    } else {
      const length = buffer.readUInt16BE(offset);
      offset += length;
    }
  }
  return null;
}

console.log('Real photo:', getJpegDimensions('src/assets/rod-allen-profile-web.jpg'));
console.log('Avatar photo:', getJpegDimensions('src/assets/rod-allen-avatar.jpg'));
