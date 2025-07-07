#!/bin/bash

# Thumbnail Generation Script for Niklas Dorsch Portfolio
# Generates optimized thumbnails for web display while preserving originals

set -e  # Exit on any error

# Configuration
ARTWORK_DIR="images/artworks"
ORIGINALS_DIR="$ARTWORK_DIR/originals"
MEDIUM_DIR="$ARTWORK_DIR/medium"
SMALL_DIR="$ARTWORK_DIR/small"

# Thumbnail sizes
SMALL_SIZE="300x300"
MEDIUM_SIZE="800x800"

# JPEG quality (0-100, higher = better quality but larger files)
JPEG_QUALITY=85

echo "🎨 Niklas Dorsch Portfolio - Thumbnail Generator"
echo "=================================================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed."
    echo "Please install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Linux: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p "$ORIGINALS_DIR" "$MEDIUM_DIR" "$SMALL_DIR"

# Count original images
original_count=$(find "$ARTWORK_DIR" -maxdepth 1 -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
if [ "$original_count" -eq 0 ]; then
    echo "❌ No images found in $ARTWORK_DIR/"
    echo "Please ensure artwork images are in the images/artworks/ directory"
    exit 1
fi

echo "📸 Found $original_count image(s) to process"

# Process each image
processed=0
for img in "$ARTWORK_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    # Skip if file doesn't exist (handles case when no files match pattern)
    [ -f "$img" ] || continue
    
    # Skip if already in subdirectory
    if [[ "$img" == *"/originals/"* ]] || [[ "$img" == *"/medium/"* ]] || [[ "$img" == *"/small/"* ]]; then
        continue
    fi
    
    filename=$(basename "$img")
    name_without_ext="${filename%.*}"
    
    echo "🔄 Processing: $filename"
    
    # Move original to originals directory
    if [ ! -f "$ORIGINALS_DIR/$filename" ]; then
        mv "$img" "$ORIGINALS_DIR/"
        echo "   ✓ Moved original to originals/"
    fi
    
    # Generate medium thumbnail (for homepage collections)
    medium_output="$MEDIUM_DIR/${name_without_ext}.jpg"
    if [ ! -f "$medium_output" ]; then
        convert "$ORIGINALS_DIR/$filename" \
            -resize "${MEDIUM_SIZE}^" \
            -gravity center \
            -extent "$MEDIUM_SIZE" \
            -quality "$JPEG_QUALITY" \
            -strip \
            "$medium_output"
        
        medium_size=$(du -h "$medium_output" | cut -f1)
        echo "   ✓ Generated medium thumbnail ($medium_size)"
    else
        echo "   ⚠️  Medium thumbnail already exists, skipping"
    fi
    
    # Generate small thumbnail (for gallery grids)
    small_output="$SMALL_DIR/${name_without_ext}.jpg"
    if [ ! -f "$small_output" ]; then
        convert "$ORIGINALS_DIR/$filename" \
            -resize "${SMALL_SIZE}^" \
            -gravity center \
            -extent "$SMALL_SIZE" \
            -quality "$JPEG_QUALITY" \
            -strip \
            "$small_output"
        
        small_size=$(du -h "$small_output" | cut -f1)
        echo "   ✓ Generated small thumbnail ($small_size)"
    else
        echo "   ⚠️  Small thumbnail already exists, skipping"
    fi
    
    ((processed++))
done

echo ""
echo "✅ Thumbnail generation complete!"
echo "📊 Summary:"
echo "   • Processed: $processed image(s)"
echo "   • Originals: $ORIGINALS_DIR/ (4-12MB each)"
echo "   • Medium: $MEDIUM_DIR/ (~100-200KB each)"
echo "   • Small: $SMALL_DIR/ (~20-50KB each)"
echo ""
echo "🚀 Next steps:"
echo "   1. Update your JavaScript to use the new thumbnail directories"
echo "   2. Test the website performance improvements"
echo "   3. For new artwork, just add images to $ARTWORK_DIR/ and run this script again"
echo ""
echo "💡 Tip: You can run this script anytime to process new artwork images!"