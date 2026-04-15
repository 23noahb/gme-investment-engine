# GME Investment Decision Engine - GitHub Pages

This is the main website that users will visit.

## Deployment Instructions

### Step 1: Upload to GitHub
1. Create a new GitHub repository (public)
2. Upload these 3 files:
   - `index.html`
   - `app.js`
   - `kitty-original.png`

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in the left sidebar
3. Under "Source", select "main" branch and "/ (root)" folder
4. Click Save
5. Wait 2-3 minutes
6. Your site will be live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

### Step 3: Update API URL
After deploying the Vercel API (see separate package):

1. Open `app.js`
2. Find this line (around line 230):
   ```javascript
   const response = await fetch('https://YOUR-PROJECT-NAME.vercel.app/api/prices');
   ```
3. Replace `YOUR-PROJECT-NAME` with your actual Vercel project name
4. Commit the change to GitHub

### Testing
Visit your GitHub Pages URL and verify:
- ✅ Site loads
- ✅ Light/dark mode toggle works (draggable)
- ✅ Price inputs work
- ✅ Calculations update
- ✅ Countdown clocks tick
- ✅ Easter egg works (7 clicks anywhere)
- ✅ Live prices update when you click "Refresh Prices"

## Files Included
- `index.html` - Main page with all HTML/CSS
- `app.js` - All JavaScript logic
- `kitty-original.png` - Easter egg image
- `README.md` - This file

## Features
- Live GME/GME+/Option price fetching (via Vercel API)
- Manual price input override
- Best Value calculator (Roaring Kitty methodology)
- Sell vs Exercise strategy toggle
- Risk profile selection
- Countdown clocks (4/20, 6/9, Option expiration, Warrant expiration)
- Light/Dark mode (draggable toggle)
- Easter egg: Click anywhere 7 times fast

## Support
If prices aren't updating:
1. Check that you updated the Vercel API URL in `app.js`
2. Check browser console for errors (F12 → Console tab)
3. Verify Vercel API is deployed and working
4. Try manually entering prices via the input fields
