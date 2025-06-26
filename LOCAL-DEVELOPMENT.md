# Local Development Guide

When working on your portfolio locally, you might encounter CORS errors because browsers block `fetch()` requests to local files. Here are solutions:

## Option 1: Use the Local Server (Recommended) 

Run the included Python server:

```bash
python3 serve-locally.py
```

This will:
- Start a local server at `http://localhost:8000`
- Automatically open your browser
- Enable all components and JSON data to load properly
- Show your portfolio exactly as it appears on GitHub Pages

## Option 2: Fallback System

The website now includes fallback data that activates automatically when CORS errors occur. You'll see warnings in the console, but the site will still work with:

- Embedded component HTML
- Hardcoded artwork data matching your JSON file
- All functionality preserved

## Option 3: Alternative Servers

If you have other tools installed:

### Node.js (if installed)
```bash
npx serve .
```

### PHP (if installed)
```bash
php -S localhost:8000
```

### VS Code Live Server Extension
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Testing Your Changes

1. Make changes to your files
2. Refresh the browser to see updates
3. Check browser console for any errors
4. Test on mobile using browser dev tools

## Adding New Artwork Locally

1. Add image to `/images/artworks/`
2. Update `/data/artworks.json` 
3. Refresh browser - changes appear immediately!

The component system makes local development much easier than traditional websites.