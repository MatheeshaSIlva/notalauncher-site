# Not a Launcher — site

Static coming-soon page. No build step: `public/` is deployed as-is.

## Deploy
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
   Framework preset: **Other**. Output directory: **public**. Deploy.
3. Site is live at `<project>.vercel.app`. Add `notalauncher.app` under Settings → Domains when you own it.

## Edit
Everything is in `public/index.html`. The ASCII wave is ~30 lines of JS at the bottom; `W`/`H` set its size, `SH` the character ramp. Fonts are self-hosted in `public/fonts/` (IBM Plex Sans, JetBrains Mono — both OFL).
