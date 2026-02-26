# Mother's Day Gift Finder

A static, deployable gift finder that matches gifts to preferences and shows optional add-on ideas. Includes a simple paywall pattern that stores the unlock state in `localStorage`.

## Run locally

Open `index.html` from a static server (recommended) or use any simple HTTP server. Static hosting is required for module-safe behavior and future expansion.

## Deploy (fast options)

1. Netlify
- Drag and drop the folder or connect the repo.
- Set the publish directory to the project root.

2. Vercel
- Import the repo and deploy as a static site.

3. GitHub Pages
- Push to GitHub and enable Pages for the root or `/docs` folder.

## Customization

- Update gift inventory in `assets/app.js`.
- Adjust styles in `assets/styles.css`.
- Swap copy in `index.html`.

## Notes

The paywall is a static demo pattern only. It does not process real payments.
