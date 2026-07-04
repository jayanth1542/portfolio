# Portfolio — Jayanth Somala

A static portfolio site styled like a CI/CD pipeline: the top bar (SOURCE → BUILD → TEST → DEPLOY → LIVE)
lights up as you scroll, mapping each pipeline stage to a section of the page.

## Files

| File | What it's for | Do you need to edit it? |
|---|---|---|
| `skills.json` | Your skills list | **Yes — this is your main edit point** |
| `projects.json` | Your projects list | **Yes — edit as projects change** |
| `resume.pdf` | Your résumé file | **Yes — replace with your actual file** |
| `index.html` | Page structure | Rarely |
| `style.css` | Visual styling | Rarely |
| `script.js` | Loads the JSON files onto the page | Rarely |

## Adding or removing a skill

Open `skills.json`. Each skill looks like this:

```json
{ "name": "Terraform", "category": "DevOps", "tag": "devops:terraform" }
```

- `name` — shown on the card
- `category` — currently just for your own organization (not displayed separately yet)
- `tag` — the small label shown above the skill name, styled like a Docker image tag (e.g. `cloud:aws`)

To add one: copy an existing `{ ... }` block, edit it, add a comma after the previous entry.
To remove one: delete its `{ ... }` block (and any now-dangling comma).

## Adding or removing a project

Same idea in `projects.json`. `status` accepts `"LIVE"`, `"BUILDING"`, or `"ARCHIVED"` —
each renders with a different colored badge.

## Adding your résumé

Replace the placeholder `resume.pdf` in this folder with your actual résumé,
keeping the filename **exactly** `resume.pdf` (or update the `href` in `index.html`
under the "Download résumé" button if you rename it).

## Deploying to GitHub Pages (free)

1. Create a new GitHub repo, e.g. `portfolio`.
2. Push all files in this folder to the repo's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/jayanth1542/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
4. Your site goes live in a couple of minutes at:
   `https://jayanth1542.github.io/portfolio/`

## Editing content later without a local setup

You don't need to clone the repo to make small changes. On GitHub.com, open `skills.json`
or `projects.json`, click the pencil (edit) icon, make your change, and commit directly to
`main`. GitHub Pages redeploys automatically within a minute or two.

## Optional: wire this into your Jenkins pipeline

Since Jenkins is already running on your Ubuntu VM for the resume-site project, you could
add a stage that, on every push to `main`, force-pushes this repo's contents to a `gh-pages`
branch (or simply relies on GitHub Pages watching `main` directly, as set up above). This
gives you a second CI/CD case study to point to in interviews.
