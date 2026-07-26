import fs from 'node:fs';
import path from 'node:path';

const src = 'C:\\Users\\Dahon\\.gemini\\antigravity-ide\\brain\\daa2549b-a085-40b1-bc45-59859f9dc310\\media__1785044314334.jpg';
const dest = 'c:\\SysProjects\\portfolio\\src\\assets\\rod-allen-avatar.jpg';

fs.copyFileSync(src, dest);
console.log('Successfully copied avatar image to', dest);
