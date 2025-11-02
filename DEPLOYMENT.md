# Deployment Guide for Sanjuthere Website

## Quick Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface (Easiest)

1. **Create a new repository** on GitHub
   - Go to https://github.com/new
   - Name it something like `sanjuthere-website` or `container-fabrication`
   - Make it Public (required for free GitHub Pages)
   - Don't initialize with README

2. **Upload files**
   - Click "uploading an existing file"
   - Drag and drop all files from the `/website` folder:
     - `index.html`
     - `css/` folder (with style.css)
     - `js/` folder (with script.js)
     - `images/` folder (with images.json)
     - `README.md`
   - Commit changes

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section in the left sidebar
   - Under "Source", select `main` branch and `/ (root)` folder
   - Click Save
   - Your site will be live at: `https://yourusername.github.io/repository-name/`

### Option 2: Using Git Command Line

```bash
# Initialize git in the website folder
cd /app/website
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Sanjuthere container fabrication website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings as described above
```

## Alternative Deployment Options

### Netlify (Recommended for ease of use)

1. Go to https://www.netlify.com/
2. Drag and drop the `/website` folder into Netlify
3. Your site is live instantly with a free subdomain
4. Optional: Add custom domain

### Vercel

1. Go to https://vercel.com/
2. Import the project
3. Deploy with one click

### Traditional Web Hosting

1. Upload all files via FTP to your web hosting
2. Ensure the folder structure is maintained:
   - `index.html` in root
   - `css/`, `js/`, `images/` folders as subdirectories

## Post-Deployment Checklist

✅ **Test all sections**:
- Hero section loads correctly
- Services cards display properly
- Portfolio slideshow works (both auto and manual navigation)
- Quotes rotate every 4 seconds
- Contact form submits to Formspree
- Mobile responsiveness works

✅ **Verify contact form**:
- Submit a test message
- Check Formspree dashboard for submissions

✅ **Replace placeholder images** (when ready):
1. Upload your actual container/fabrication images to `images/` folder
2. Update `images/images.json` with new image paths:
   ```json
   {
     "images": [
       "images/your-photo-1.jpg",
       "images/your-photo-2.jpg",
       "images/your-photo-3.jpg"
     ]
   }
   ```

✅ **SEO Optimization** (optional):
- Add favicon.ico file
- Customize meta description in index.html
- Submit sitemap to Google Search Console

## Custom Domain Setup (Optional)

If you want to use `sanjuthere.in`:

### For GitHub Pages:
1. Add a `CNAME` file to root with content: `sanjuthere.in`
2. In your domain registrar (GoDaddy, Namecheap, etc.):
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Add CNAME record: `www` → `yourusername.github.io`
3. In GitHub Pages settings, add custom domain: `sanjuthere.in`

### For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provided

## Troubleshooting

**Issue**: Images not loading
- **Solution**: Check that `images.json` paths are correct and images exist

**Issue**: Contact form not working
- **Solution**: Verify Formspree endpoint is correct: `https://formspree.io/f/maylwjrb`

**Issue**: CSS/JS not loading
- **Solution**: Check that file paths are relative and folder structure is maintained

**Issue**: Mobile menu not working
- **Solution**: Ensure `script.js` is loaded correctly

## Performance Tips

1. **Optimize images**: Keep images under 500KB each for faster loading
2. **Use WebP format**: Convert images to WebP for better compression
3. **Enable caching**: Use CDN or hosting with good caching policies
4. **Minify files**: Consider minifying CSS and JS for production

## Support

For issues with:
- **GitHub Pages**: https://docs.github.com/en/pages
- **Formspree**: https://help.formspree.io/
- **Domain setup**: Contact your domain registrar support

---

**Your website is production-ready and can be deployed immediately!**
