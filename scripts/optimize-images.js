import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDirs = [
    path.join(__dirname, '../public/assets'),
    path.join(__dirname, '../public')
];

// Configuration
const QUALITY = 80;
const MAX_WIDTH_HERO = 1920;
const MAX_WIDTH_DEFAULT = 800;

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`Directory not found: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(directory, file);
            const filenameNoExt = path.parse(file).name;

            const outputPath = path.join(directory, `${filenameNoExt}.webp`);

            // Determine resize width
            let width = MAX_WIDTH_DEFAULT;
            if (filenameNoExt.toLowerCase().includes('hero') || filenameNoExt.toLowerCase().includes('banner')) {
                width = MAX_WIDTH_HERO;
            }

            try {
                const metadata = await sharp(inputPath).metadata();

                // Only resize if the image is larger than the target width
                const resizeOptions = (metadata.width && metadata.width > width) ? { width } : {};

                await sharp(inputPath)
                    .resize(resizeOptions)
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);

                const statsIn = fs.statSync(inputPath);
                const statsOut = fs.statSync(outputPath);

                console.log(`Optimized: ${file}`);
                console.log(`  Size: ${(statsIn.size / 1024).toFixed(2)}KB -> ${(statsOut.size / 1024).toFixed(2)}KB`);
                console.log(`  Saved: ${((statsIn.size - statsOut.size) / 1024).toFixed(2)}KB`);

            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }
    }
}

async function main() {
    console.log('Starting image optimization...');
    for (const dir of inputDirs) {
        await processDirectory(dir);
    }
    console.log('Image optimization complete.');
}

main();
