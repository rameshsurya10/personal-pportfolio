#!/bin/bash
# Image Optimization Script for Portfolio
# Run this after installing required tools:
# sudo apt install webp imagemagick

# Create optimized directory
mkdir -p image/optimized

echo "=== Portfolio Image Optimization Script ==="
echo ""

# Check if tools are installed
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    sudo apt install -y webp
fi

if ! command -v convert &> /dev/null; then
    echo "Installing imagemagick..."
    sudo apt install -y imagemagick
fi

echo ""
echo "Converting images to WebP format..."
echo ""

# Convert main profile image (2.1MB -> ~150KB target)
if [ -f "image/Pic.png" ]; then
    echo "Optimizing Pic.png (2.1MB -> target ~150KB)..."
    # First resize to reasonable dimensions, then convert
    convert image/Pic.png -resize 800x800\> -quality 85 image/optimized/Pic.webp
    cwebp -q 80 image/Pic.png -o image/optimized/Pic-high.webp 2>/dev/null
    echo "Created: image/optimized/Pic.webp"
fi

# Convert background images
if [ -f "image/bg-2.png" ]; then
    echo "Optimizing bg-2.png (797KB)..."
    cwebp -q 75 image/bg-2.png -o image/optimized/bg-2.webp 2>/dev/null
    echo "Created: image/optimized/bg-2.webp"
fi

if [ -f "image/loading.png" ]; then
    echo "Optimizing loading.png (263KB)..."
    cwebp -q 80 image/loading.png -o image/optimized/loading.webp 2>/dev/null
    echo "Created: image/optimized/loading.webp"
fi

# Convert carousel JPGs to WebP
for img in image/img-*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        echo "Optimizing $img..."
        cwebp -q 75 "$img" -o "image/optimized/${filename}.webp" 2>/dev/null
    fi
done

# Convert project images
for img in image/project/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        echo "Optimizing $img..."
        cwebp -q 75 "$img" -o "image/project/${filename}.webp" 2>/dev/null
    fi
done

echo ""
echo "=== Optimization Complete ==="
echo ""
echo "File size comparison:"
echo "-------------------"
ls -lh image/Pic.png image/optimized/Pic.webp 2>/dev/null
ls -lh image/bg-2.png image/optimized/bg-2.webp 2>/dev/null
echo ""
echo "Next steps:"
echo "1. Review optimized images in image/optimized/"
echo "2. Update HTML to use .webp versions with <picture> fallback"
echo "3. Consider using a CDN like Cloudinary for automatic optimization"
