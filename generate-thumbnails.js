#!/usr/bin/env node

/**
 * Thumbnail Generation Script for Niklas Dorsch Portfolio
 * Generates optimized thumbnails for web display while preserving originals
 * 
 * Requirements: npm install sharp
 * Usage: node generate-thumbnails.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const ARTWORK_DIR = 'images/artworks';
const ORIGINALS_DIR = path.join(ARTWORK_DIR, 'originals');
const MEDIUM_DIR = path.join(ARTWORK_DIR, 'medium');

// Thumbnail sizes
const MEDIUM_SIZE = 800;

// JPEG quality (0-100)
const JPEG_QUALITY = 85;

console.log('🎨 Niklas Dorsch Portfolio - Thumbnail Generator');
console.log('==================================================');

// Check if Sharp is available
let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.log('❌ Error: Sharp is not installed.');
    console.log('Please install Sharp:');
    console.log('  npm install sharp');
    console.log('');
    console.log('Or run this script which will install it automatically:');
    console.log('  npm install sharp && node generate-thumbnails.js');
    
    // Try to install Sharp automatically
    try {
        console.log('🔄 Attempting to install Sharp automatically...');
        execSync('npm install sharp', { stdio: 'inherit' });
        console.log('✅ Sharp installed successfully!');
        sharp = require('sharp');
    } catch (installError) {
        console.log('❌ Failed to install Sharp automatically.');
        console.log('Please run: npm install sharp');
        process.exit(1);
    }
}

// Helper function to ensure directory exists
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Helper function to get file size in human readable format
function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + 'KB';
    return Math.round(bytes / (1024 * 1024)) + 'MB';
}

// Helper function to process image
async function processImage(inputPath, outputPath, size, description) {
    try {
        await sharp(inputPath)
            .resize(size, size, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({
                quality: JPEG_QUALITY,
                progressive: true
            })
            .toFile(outputPath);
        
        const fileSize = getFileSize(outputPath);
        console.log(`   ✓ Generated ${description} (${fileSize})`);
        return true;
    } catch (error) {
        console.log(`   ❌ Failed to generate ${description}: ${error.message}`);
        return false;
    }
}

async function main() {
    try {
        // Create directory structure
        console.log('📁 Creating directory structure...');
        ensureDir(ORIGINALS_DIR);
        ensureDir(MEDIUM_DIR);

        // Find all image files in artwork directory
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
        const files = fs.readdirSync(ARTWORK_DIR)
            .filter(file => {
                const ext = path.extname(file);
                return imageExtensions.includes(ext);
            })
            .filter(file => {
                // Skip files already in subdirectories
                const fullPath = path.join(ARTWORK_DIR, file);
                return fs.statSync(fullPath).isFile();
            });

        if (files.length === 0) {
            console.log('❌ No images found in images/artworks/');
            console.log('Please ensure artwork images are in the images/artworks/ directory');
            process.exit(1);
        }

        console.log(`📸 Found ${files.length} image(s) to process`);

        let processed = 0;
        let skipped = 0;

        // Process each image
        for (const filename of files) {
            const originalPath = path.join(ARTWORK_DIR, filename);
            const nameWithoutExt = path.parse(filename).name;
            const originalDestPath = path.join(ORIGINALS_DIR, filename);
            const mediumPath = path.join(MEDIUM_DIR, `${nameWithoutExt}.jpg`);

            console.log(`🔄 Processing: ${filename}`);

            // Move original to originals directory
            if (!fs.existsSync(originalDestPath)) {
                fs.renameSync(originalPath, originalDestPath);
                console.log('   ✓ Moved original to originals/');
            }

            // Generate medium thumbnail
            if (!fs.existsSync(mediumPath)) {
                await processImage(originalDestPath, mediumPath, MEDIUM_SIZE, 'medium thumbnail');
            } else {
                console.log('   ⚠️  Medium thumbnail already exists, skipping');
            }

            processed++;
        }

        console.log('');
        console.log('✅ Thumbnail generation complete!');
        console.log('📊 Summary:');
        console.log(`   • Processed: ${processed} image(s)`);
        console.log(`   • Originals: ${ORIGINALS_DIR}/ (4-12MB each)`);
        console.log(`   • Medium: ${MEDIUM_DIR}/ (~100-200KB each)`);
        console.log('');
        console.log('🚀 Next steps:');
        console.log('   1. Test the website performance improvements');
        console.log(`   2. For new artwork, just add images to ${ARTWORK_DIR}/ and run this script again`);
        console.log('');
        console.log('💡 Tip: You can run this script anytime to process new artwork images!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();