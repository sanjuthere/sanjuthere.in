# Sanjuthere | Engineering Excellence in Container Fabrication

## Overview
Professional website for Sanjeev There's container fabrication and engineering business.

## Features
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Dynamic Portfolio Slideshow**: Auto-rotating images with manual controls
- **Rotating Quotes**: Inspirational engineering quotes with fade transitions
- **Contact Form**: Integrated with Formspree for easy message handling
- **Security Features**: Right-click protection and keyboard shortcut disabling
- **Modern UI**: Steel-blue gradient design with smooth animations

## File Structure
```
/website
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles and responsive design
├── js/
│   └── script.js      # JavaScript functionality
├── images/
│   └── images.json    # Dynamic image list
└── README.md          # This file
```

## Setup for GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload all files** maintaining the folder structure
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select branch (usually `main`) and root folder
   - Save and wait for deployment

## Customization

### Adding Your Own Images
1. Upload images to the `images/` folder
2. Update `images/images.json` with your image paths:
   ```json
   {
     "images": [
       "images/your-image-1.jpg",
       "images/your-image-2.jpg"
     ]
   }
   ```

### Updating Contact Form
- The form is connected to: `https://formspree.io/f/maylwjrb`
- To change, update the `action` attribute in the `<form>` tag in `index.html`

### Modifying Colors
- Primary gradient: `#1e3c72` → `#2a5298` → `#3d6bb3`
- Edit colors in `css/style.css` under CSS variables or gradient definitions

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance
- Images optimized at 1200px width
- Smooth CSS transitions
- Fast loading times
- SEO-friendly structure

## Security
- Right-click disabled
- Keyboard shortcuts (F12, Ctrl+S, Ctrl+U, etc.) disabled
- Console protection message
- Image watermark overlay

## License
Copyright © 2025 Sanjeev There. All rights reserved.

---

**Built with HTML5, CSS3, and Vanilla JavaScript**

For support or questions, please use the contact form on the website.