const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(process.cwd(), 'public', 'images');
const targetDir = path.join(process.cwd(), 'public', 'images', 'optimized');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Images to optimize
const images = [
  'my-notion-face-transparent.png',
  'my-notion-face-transparent (2).png',
  'my-notion-face-transparent (3).png'
];

// Size variations for responsive images
const sizes = [
  { width: 48, height: 48, suffix: 'sm' },   // 1x mobile
  { width: 96, height: 96, suffix: 'sm@2x' }, // 2x mobile
  { width: 64, height: 64, suffix: 'md' },   // 1x desktop
  { width: 128, height: 128, suffix: 'md@2x' } // 2x desktop
];

async function optimizeImage(filename) {
  const sourcePath = path.join(sourceDir, filename);
  const fileNameWithoutExt = path.parse(filename).name;
  const ext = path.parse(filename).ext;

  try {
    // Create all size variations
    for (const size of sizes) {
      const targetFileName = `${fileNameWithoutExt}-${size.suffix}${ext}`;
      const targetPath = path.join(targetDir, targetFileName);

      await sharp(sourcePath)
        .resize(size.width, size.height)
        .png({ quality: 90 })
        .toFile(targetPath);
      
      console.log(`Optimized ${targetFileName}`);
    }
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

// Process all images
Promise.all(images.map(optimizeImage))
  .then(() => console.log('All images optimized successfully'))
  .catch(error => console.error('Error during optimization:', error)); 