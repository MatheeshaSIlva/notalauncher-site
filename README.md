# Not a Launcher — site

Static coming-soon page. No build step: `public/` is deployed as-is.

## Deploy
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
   Framework preset: **Other**. Output directory: **public**. Deploy.
3. Site is live at `<project>.vercel.app`. Add `notalauncher.app` under Settings → Domains when you own it.

## Edit
Everything is in `public/index.html`. The mascot (Tess — the logo's four tiles with a face in the white one) is the script at the bottom: `TILES` places the tiles, `msgs` is the rotating status line, and blink/glance/hop timings are the first few lines of `frame()`. Fonts are self-hosted in `public/fonts/` (IBM Plex Sans, JetBrains Mono — both OFL).
