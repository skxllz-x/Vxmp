# Vxmp Website

A modern, single-page website with a logo/crest, interactive buttons, and music player control.

## Features

✨ **One-Page Website** - Clean, modern design
🎵 **Music Player** - Play/pause button with icon in the top right
🔗 **Interactive Buttons** - Discord and Roblox buttons with custom links
🎨 **Custom Background** - Set your own background image
📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Quick Setup

### 1. Add Your Files

Upload these files to your repository root:
- `logo.png` - Your logo/crest image
- `background.jpg` - Your background image
- `music.mp3` - Your background music

### 2. Edit script.js

Update the CONFIG section with your links:

```javascript
const CONFIG = {
    discordLink: 'YOUR_DISCORD_INVITE_LINK',
    robloxLink: 'YOUR_ROBLOX_GAME_LINK',
    logoImage: 'logo.png',
    backgroundImage: 'background.jpg',
    musicFile: 'music.mp3'
};
```

### 3. Deploy on GitHub Pages

1. Go to Settings → Pages
2. Select `main` branch
3. Your site will be at: `https://yourusername.github.io/Vxmp/`

## How to Get Your Links

**Discord Server Invite:**
1. Right-click your Discord server
2. Select "Invite People"
3. Copy the invite link

**Roblox Game Link:**
1. Go to your Roblox game page
2. Copy the URL from the browser

## File Structure

```
Vxmp/
├── index.html           # Main HTML ✅
├── style.css            # Styling ✅
├── script.js            # Functionality ✅
├── logo.png             # Your logo (ADD)
├── background.jpg       # Your background (ADD)
├── music.mp3            # Your music (ADD)
└── README.md            # This file ✅
```

## Website Features

### Music Button (Top Right)
- Click to play/pause music
- Shows play icon when paused
- Shows pause icon when playing

### Action Buttons (Center)
- **Join Discord** - Blue button with Discord icon
- **Play Game** - Red button with Roblox icon
- Both buttons side-by-side
- Click to open your custom links

### Logo/Crest (Center)
- Centered on the page
- Has a floating animation
- Customizable image

## Customization

### Change Button Text

Edit `index.html`:
```html
<span>Your New Text</span>
```

### Change Button Colors

Edit `style.css`:
```css
.discord-btn {
    background: linear-gradient(135deg, #YourColor1 0%, #YourColor2 100%);
}
```

### Add More Buttons

Copy a button in `index.html` and add to `.buttons-section`:
```html
<a href="YOUR_LINK" class="action-btn your-btn" target="_blank">
    <i class="fas fa-icon-name"></i>
    <span>Button Text</span>
</a>
```

Then add CSS in `style.css`:
```css
.your-btn {
    background: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);
    border: 2px solid #COLOR1;
}
```

## Supported Formats

**Audio:** MP3, WAV, OGG, M4A
**Images:** PNG, JPG, WebP

## Troubleshooting

**Images not showing?**
- Check filenames are exact (case-sensitive)
- Verify files are in root directory
- Check paths in script.js

**Music not playing?**
- Use supported audio format (MP3 recommended)
- Check browser console (F12 → Console)
- Some browsers need user interaction first

**Buttons not working?**
- Verify links in script.js have `https://`
- Check Discord invite link is complete
- Test Roblox link in browser first

**Icons not showing?**
- Icons load from Font Awesome CDN
- Check internet connection
- Try refreshing the page

## Resources

- [Font Awesome Icons](https://fontawesome.com) - Icon library
- [GitHub Pages](https://pages.github.com) - Hosting docs
- [MDN Web Docs](https://developer.mozilla.org) - Web reference

## Quick Checklist

- [ ] Add `logo.png`
- [ ] Add `background.jpg`
- [ ] Add `music.mp3`
- [ ] Edit Discord link in `script.js`
- [ ] Edit Roblox link in `script.js`
- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Visit your live site!

---

**Made with ❤️ for your website**