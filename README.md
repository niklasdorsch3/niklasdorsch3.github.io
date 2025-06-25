# Niklas Dorsch - Artist Portfolio

A minimal portfolio website for contemporary artist Niklas Dorsch, featuring a clean single-page design with organized collections of abstract landscapes inspired by mythical narratives.

## 🎨 About the Artist

Niklas Dorsch began painting in 2019 after moving to New York, where classes at the New York Studio School deepened his commitment to art. His work focuses on abstract landscapes inspired by mythical narratives—especially German fairytales—where organic forms flow, clash, and shape space in unexpected ways.

## 🌐 Live Website

Visit the portfolio at: [https://niklasdorsch3.github.io](https://niklasdorsch3.github.io)

## 📁 Project Structure

```
niklasdorsch3.github.io/
├── index.html              # Single-page homepage
├── abstracts.html          # Abstract Landscapes collection
├── figures.html            # Figures & Forms collection  
├── studies.html            # Studies collection
├── components/             # Reusable HTML components
│   ├── head.html          #   Meta tags and fonts
│   ├── header.html        #   Navigation
│   ├── footer.html        #   Footer
│   └── lightbox.html      #   Gallery lightbox
├── data/
│   └── artworks.json      # Artwork and collection data
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── components.js      # Component loader and gallery system
├── images/
│   ├── artworks/          # Portfolio artwork images
│   └── profile/           # Artist profile photo
├── HOW-TO-ADD-ARTWORK.md  # Tutorial for adding new pieces
└── README.md              # This file
```

## ✨ Features

- **Component-Based Architecture**: Zero code repetition with shared HTML components
- **Data-Driven Artwork Management**: Add artwork via JSON without touching HTML
- **Single-Page Design**: All content organized on one scrollable homepage  
- **Collections Structure**: Three curated collections (Abstract Landscapes, Figures & Forms, Studies)
- **Minimal Typography**: Clean, elegant fonts with optimal readability
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Gallery**: Lightbox with keyboard navigation on collection pages
- **SEO Optimized**: Meta tags and semantic HTML for search engines
- **Easy Maintenance**: Update navigation/footer once, changes everywhere

## 🛠️ Setup Instructions

### 1. Repository Setup
1. Create a new public repository named `niklasdorsch3.github.io`
2. Clone or download this code to the repository
3. Enable GitHub Pages in repository settings
4. Set source to main branch

### 2. Add Artwork Images
Replace the placeholder images in `/images/artworks/` with actual artwork files.

### 3. Update Artwork Data
Edit `/data/artworks.json` to match your actual artworks:
- Update artwork titles, media, dimensions, and years
- Organize pieces into collections as desired
- See `HOW-TO-ADD-ARTWORK.md` for detailed instructions

### 4. Add Profile Photo
Add artist profile photo to `/images/profile/artist-photo.jpg`

### 5. Customize Content (Optional)
- Update artist statement in `index.html` (About section)  
- Modify contact information in `index.html` (Contact section)
- Adjust collection descriptions in `data/artworks.json`

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, custom properties
- **JavaScript**: ES6+, intersection observer
- **Google Fonts**: Inter font family

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Features
- Lazy loading images
- Optimized CSS and JavaScript
- Minimal dependencies
- Fast loading times

## 🎨 Design Philosophy

The website follows a minimal, gallery-inspired aesthetic:
- **Single-page layout** keeps focus on the artwork
- **Collections structure** organizes work thematically
- **Minimal typography** with clean, readable fonts
- **Generous whitespace** lets artwork breathe
- **Subtle interactions** enhance user experience without distraction

## 📱 Mobile Optimization

Fully responsive design features:
- Hamburger navigation menu for mobile
- Touch-friendly gallery interactions
- Optimized typography scaling across devices
- Single-column layout on mobile for better readability
- Fast loading with optimized images

## 🎯 SEO Features

- Meta descriptions and keywords for each page
- Open Graph tags for social media sharing
- Semantic HTML5 structure
- Alt tags for all images
- Proper heading hierarchy
- Clean URLs and navigation structure

## 📞 Support

For technical issues or customization help:
1. Check GitHub Issues for common problems
2. Review the code documentation
3. Contact for professional web development services

## 📄 License

© 2024 Niklas Dorsch. All rights reserved.

Website code is provided for personal portfolio use.