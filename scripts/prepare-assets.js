import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Create public/assets directory if it doesn't exist
const publicAssetsDir = path.join(rootDir, 'public', 'assets');
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Copy assets from src/assets to public/assets
const srcAssetsDir = path.join(rootDir, 'src', 'assets');
if (fs.existsSync(srcAssetsDir)) {
  fs.readdirSync(srcAssetsDir).forEach(file => {
    fs.copyFileSync(
      path.join(srcAssetsDir, file),
      path.join(publicAssetsDir, file)
    );
  });
}

console.log('Assets prepared successfully!');