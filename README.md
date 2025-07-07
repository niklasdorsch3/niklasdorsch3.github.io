# Niklas Dorsch - Artist Portfolio

A portfolio website showcasing paintings and artwork by contemporary artist Niklas Dorsch.

## 🎨 About the Artist

Niklas Dorsch is a contemporary painter based in New York. He began painting in 2019 and has developed his practice through studies at the New York Studio School. His work explores figure painting, landscapes, and still life, with a focus on capturing both observed reality and imaginative storytelling. Working primarily in oil paint, Niklas creates pieces that range from intimate figure studies to larger narrative compositions.

## 🌐 Live Website

Visit the portfolio at: [https://niklasdorsch3.github.io](https://niklasdorsch3.github.io)

## 📱 Features

- **Clean Gallery Design**: Easy-to-browse artwork collections
- **Mobile-Friendly**: Works well on phones, tablets, and computers
- **Organized Collections**: Artwork grouped by theme and subject matter
- **Interactive Gallery**: Click to view larger images
- **Fast Loading**: Optimized thumbnails for quick browsing, full-size images for detailed viewing

## 🔧 Making Updates

To add new artwork or update content:

1. **Add new artwork images** to the `/images/artworks/` folder
2. **Run the thumbnail generator**: `node generate-thumbnails.js`
3. **Update artwork information** in `/data/artworks.json` with titles, dimensions, and descriptions
4. **Modify artist statement** in `index.html` if needed

### Thumbnail Generation

The website uses an optimized thumbnail system for fast loading:
- **Medium thumbnails** (800x800px, ~100-200KB) for all gallery displays
- **Original images** (full-size) for lightbox viewing

Run `node generate-thumbnails.js` after adding new artwork to automatically generate optimized thumbnails.

For detailed instructions, see `HOW-TO-ADD-ARTWORK.md`

## 📞 Contact

For questions about the artwork or to inquire about purchasing pieces, please visit the contact section on the website.

## 📄 License

© 2024 Niklas Dorsch. All rights reserved.

Website code is provided for personal portfolio use.