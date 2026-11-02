# Not a Launcher — site

Static coming-soon page. No build step: `public/` is deployed as-is.

## Deploy
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
   Framework preset: **Other**. Output directory: **public**. Deploy.
3. Site is live at `<project>.vercel.app`. Add `notalauncher.app` under Settings → Domains when you own it.

## Email signup
The form posts to Formspree. Create a free form at formspree.io, then replace
`YOUR_FORM_ID` in `public/index.html` with the id it gives you. Free tier: 50 submissions/month.
Alternatives that drop in the same way: Web3Forms, Basin, Netlify Forms (if hosted there).

## Edit
Everything is in `public/index.html`. Fonts are self-hosted in `public/fonts/` (IBM Plex Sans, JetBrains Mono — both OFL).
