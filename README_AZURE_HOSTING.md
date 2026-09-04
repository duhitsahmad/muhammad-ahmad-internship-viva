# Muhammad Ahmad – Portfolio-Themed Internship Viva Presentation

This is a professional web-based 3D animated internship viva presentation designed to match the cyber/data/AI visual style of the portfolio at `mahmadcs.me`.

## Files
- `index.html` — presentation slides
- `styles.css` — responsive 3D portfolio-matched theme
- `app.js` — slide navigation, fullscreen, touch controls, 3D tilt and animated starfield
- `assets/` — images, signing-off video, logos and downloadable PPT
- `staticwebapp.config.json` — Azure Static Web Apps routing and MIME config
- `web.config` — Azure App Service/IIS fallback

## Controls
- Arrow keys / Page Up / Page Down / Space — navigate
- Swipe left/right on mobile — navigate
- Full Screen button or `F` — fullscreen
- Download PPT button — downloads the included PowerPoint version

## Azure Update
Replace the files in your GitHub repository with this folder's contents, then run:

```powershell
git add .
git commit -m "Update internship presentation with portfolio theme"
git push
```

Azure Static Web Apps will redeploy automatically from GitHub Actions.


Update included: borderless slide stage, theme switcher (Cyber/Ocean/Bright/Sunset), floating code/webpage background elements, and responsive first-slide sizing. Press `T` to cycle themes.
