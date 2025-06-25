# How to Add New Artwork

Adding new artwork to your portfolio is simple! Just follow these 3 steps:

## Step 1: Add the Image File
1. Save your artwork image to `/images/artworks/`
2. Use a descriptive filename like `mountain-scene.jpg` or `portrait-study-2.jpg`
3. Recommended size: 1000x1250px (4:5 aspect ratio)
4. Keep file size under 500KB for fast loading

## Step 2: Add Artwork Data
1. Open `/data/artworks.json`
2. Add your artwork to the `"artworks"` section:

```json
"your-artwork-key": {
    "title": "Your Artwork Title",
    "medium": "Oil on Canvas",
    "year": "2024",
    "dimensions": "24 x 30", 
    "filename": "your-image.jpg",
    "description": "Optional description of the piece"
}
```

## Step 3: Add to Collection
1. In the same file, find the `"collections"` section
2. Add your artwork key to the appropriate collection's artworks array:

```json
"abstracts": {
    "title": "Abstract Landscapes",
    "description": "...",
    "artworks": ["existing-work", "your-artwork-key"]
}
```

## Example: Adding "Mountain Dreams"

### 1. Save image as: `/images/artworks/mountain-dreams.jpg`

### 2. Add to artworks.json:
```json
"mountain-dreams": {
    "title": "Mountain Dreams",
    "medium": "Oil on Canvas",
    "year": "2024",
    "dimensions": "36 x 24",
    "filename": "mountain-dreams.jpg",
    "description": "Inspired by childhood memories of alpine landscapes"
}
```

### 3. Add to collection:
```json
"abstracts": {
    "artworks": ["still-life-1", "falling-scene", "mountain-dreams"]
}
```

## Creating New Collections

To create a new collection:

1. Add it to the `"collections"` section:
```json
"new-collection": {
    "title": "New Collection Name",
    "description": "Description of this collection",
    "artworks": ["artwork-1", "artwork-2"]
}
```

2. Add the collection key to the homepage display:
```json
"homepage": {
    "collections": ["abstracts", "figures", "studies", "new-collection"]
}
```

3. Create a new HTML file: `new-collection.html` (copy from existing collection page)

That's it! Your new artwork will automatically appear on the website. No HTML editing required!