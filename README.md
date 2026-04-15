# Someet Sahoo — Portfolio

Built with React + Vite using the **Lexis Antique** design system (Organic Brutalism).

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel (Recommended — 1 command)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from the portfolio directory)
vercel

# Follow prompts — framework is auto-detected as Vite
# Your live URL will be printed at the end
```

Or just drag-and-drop the folder to [vercel.com/new](https://vercel.com/new) after connecting GitHub.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo

2. Install the gh-pages helper:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. Add `base` in `vite.config.js` (replace `your-repo-name`):
```js
base: '/your-repo-name/'
```

5. Run:
```bash
npm run deploy
```

Your site will be live at `https://yourusername.github.io/your-repo-name/`

## Structure

```
src/
  App.jsx     — All components (Hero, Nav, Experience, Projects, Skills, Footer)
  index.css   — Lexis Antique design tokens + global styles
  main.jsx    — React entry point
```

## Design Tokens (index.css)

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | #D28D77 (clay) | same |
| `--secondary` | #3D4A3E (forest) | same |
| `--surface` | #F2F0E9 | #1A1F1B |
| Display font | Newsreader (serif) | same |
| Body font | Manrope (sans) | same |
