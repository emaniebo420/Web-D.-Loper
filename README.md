# Web D. Loper

React + Vite + Tailwind CSS. Clean single-page portfolio, all content
driven from `src/data.jsx` so you can update projects/skills without touching
component code.

## Project structure

```
portfolio-project/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx          entry point
    ├── App.jsx           page layout, assembles all sections
    ├── data.jsx           ← EDIT THIS to update your content
    ├── index.css
    └── components/
        ├── Nav.jsx
        ├── Hero.jsx
        ├── SectionTitle.jsx
        ├── Work.jsx
        ├── Skills.jsx
        ├── SecurityTrack.jsx
        └── Contact.jsx
```

## 1. Run it locally

You need Node.js installed (18+). Check with:

```bash
node -v
```

If you don't have it, install from nodejs.org, or use nvm.

Then, inside the project folder:

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Edits to any file
hot-reload instantly.

## 2. Edit your content

Open `src/data.jsx`. Everything on the page — your bio, project list, skills,
cert track, contact links — lives in that one file. You will not need to
touch any component file unless you want to change layout or add a new
section.

To change colors, edit `tailwind.config.js` under `theme.extend.colors`.

## 3. Put it on GitHub

```bash
cd portfolio-project
git init
git add .
git commit -m "Initial portfolio"
```

Create a new empty repo on github.com (no README/gitignore — you already
have files), then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## 4. Deploy on Vercel

1. Go to vercel.com and sign in with GitHub.
2. Click "Add New" → "Project".
3. Import the repo you just pushed.
4. Vercel auto-detects Vite — leave the build settings as-is
   (Build Command: `npm run build`, Output Directory: `dist`).
5. Click Deploy.

You'll get a live URL like `your-repo-name.vercel.app` in about a minute.
Every future `git push` to `main` auto-redeploys.

## 5. Custom domain (optional)

In the Vercel project → Settings → Domains, add your domain and follow the
DNS instructions it gives you (usually one CNAME or A record at your
registrar). If you don't have a domain yet, the free `.vercel.app` one works
fine to share right away.

## Notes

- Project statuses (`live` / `dev`) and links are all in the `projects` array
  in `data.jsx`.
