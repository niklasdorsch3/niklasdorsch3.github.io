# Niklas Dorsch - Artist Portfolio

A professional portfolio website for contemporary artist Niklas Dorsch, showcasing abstract landscapes inspired by mythical narratives.

## 🎨 About the Artist

Niklas Dorsch began painting in 2019 after moving to New York, where classes at the New York Studio School deepened his commitment to art. His work focuses on abstract landscapes inspired by mythical narratives—especially German fairytales—where organic forms flow, clash, and shape space in unexpected ways.

## 🌐 Live Website

Visit the portfolio at: [https://niklasdorsch3.github.io](https://niklasdorsch3.github.io)

## 📁 Project Structure

```
niklasdorsch3.github.io/
├── index.html          # Homepage
├── portfolio.html      # Artwork gallery
├── about.html         # Artist statement & biography
├── contact.html       # Contact information
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── script.js      # JavaScript functionality
├── images/
│   ├── artworks/      # Portfolio artwork images
│   └── profile/       # Artist profile photo
└── README.md          # This file
```

## ✨ Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Image Gallery**: Interactive lightbox with keyboard navigation
- **SEO Optimized**: Meta tags and semantic HTML for search engines
- **Accessibility**: Alt tags, proper heading structure, and keyboard navigation
- **Contact Form**: Integrated with Formspree for form submissions
- **Clean Design**: Minimal aesthetic that showcases artwork effectively

## 🛠️ Setup Instructions

### 1. Repository Setup
1. Create a new public repository named `niklasdorsch3.github.io`
2. Clone or download this code to the repository
3. Enable GitHub Pages in repository settings
4. Set source to main branch

### 2. Add Artwork Images
Replace the placeholder images in `/images/artworks/` with actual artwork:

**Required artwork files:**
- `placeholder-1.jpg` → Still life 1
- `placeholder-2.jpg` → The Foot  
- `placeholder-3.jpg` → Nude Woman (Oil on Gesso board 12 x 12)
- `placeholder-4.jpg` → Figure 1 (Beserker)
- `placeholder-5.jpg` → Falling Scene
- `placeholder-6.jpg` → Bethesda Fountain
- `placeholder-7.jpg` → Bar Scene
- `placeholder-8.jpg` → Wedding flower

**Image specifications:**
- Format: JPG, PNG, or WebP
- Recommended size: 1200x1200px for square format
- File size: Optimize for web (under 500KB each)

### 3. Add Profile Photo
Add artist profile photo to `/images/profile/artist-photo.jpg`

### 4. Setup Contact Form
1. Sign up for a free [Formspree](https://formspree.io) account
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in `contact.html` with your actual Formspree form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
   ```

### 5. Customize Content (Optional)
- Update artist statement in `about.html`
- Modify contact information in `contact.html`
- Add artwork details (dimensions, years) in `portfolio.html`

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

## 📱 Mobile Optimization

The website is fully responsive with:
- Hamburger navigation menu
- Touch-friendly gallery
- Optimized typography scaling
- Mobile-first design approach

## 🎯 SEO Features

- Meta descriptions and keywords
- Open Graph tags for social sharing
- Semantic HTML structure
- Alt tags for all images
- Proper heading hierarchy

## 📞 Support

For technical issues or customization help:
1. Check GitHub Issues for common problems
2. Review the code documentation
3. Contact for professional web development services

## 📄 License

© 2024 Niklas Dorsch. All rights reserved.

Website code is provided for personal portfolio use.