# IT Portfolio — JEROME MINA

A static IT portfolio website built with HTML, CSS, and vanilla JavaScript. Designed for GitHub Pages.

## Files

- `index.html` — page structure and content
- `style.css` — layout, theme, and responsive styles
- `script.js` — mobile navigation, copyright year, and image fallbacks
- `resume.pdf` — add this file in the same folder as `index.html` (View Resume / Download Resume)
- `JEROME MINA CV.pdf` — add this file for the Resume navigation item
- `images/projects/network.png`
- `images/projects/endpoint.png`
- `images/projects/identity.png`

## Preview locally

From this folder:

```bash
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

If Python is not installed:

```bash
npx --yes serve .
```

## Publish on GitHub Pages

1. Push these files to the default branch of [https://github.com/pseudo-labs-00](https://github.com/pseudo-labs-00) (or a dedicated repository such as `it-portfolio`).
2. Open **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**, choose the default branch and `/ (root)`, then save.
4. The site will be available at a URL such as `https://pseudo-labs-00.github.io/` or `https://pseudo-labs-00.github.io/it-portfolio/`.

Relative paths are used so CSS, JavaScript, resume files, and project images resolve correctly from the same folder as `index.html`.
