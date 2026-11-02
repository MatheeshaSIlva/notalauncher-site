# Not a Launcher — site

Static coming-soon page. No build step: `public/` is deployed as-is.

## Deploy
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
   Framework preset: **Other**. Output directory: **public**. Deploy.
3. Site is live at `<project>.vercel.app`. Add `notalauncher.app` under Settings → Domains when you own it.

## Edit
Everything is in `public/index.html`. One screen: the mark (it blinks), the headline decoding in, a phone frame on the dot field cycling through layouts, and a rotating build-log line. `site.js` holds the layout renderers (`home`, `paper`, `term`, `shade`, `drawer`, `recents`) and the `seq` array that decides the cycle.
