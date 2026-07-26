import fs from 'node:fs';
import path from 'node:path';

const src = 'C:\\Users\\Dahon\\.gemini\\antigravity-ide\\brain\\daa2549b-a085-40b1-bc45-59859f9dc310\\media__1785045904261.jpg';
const destAssets = path.resolve(process.cwd(), 'src/assets/rod-allen-avatar.jpg');
const destPublic = path.resolve(process.cwd(), 'public/rod-allen-avatar.jpg');

fs.mkdirSync(path.dirname(destAssets), { recursive: true });
fs.mkdirSync(path.dirname(destPublic), { recursive: true });
fs.copyFileSync(src, destAssets);
fs.copyFileSync(src, destPublic);
console.log('Successfully copied new avatar image!');
