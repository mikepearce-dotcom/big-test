# CRO Specialist Consultancy Website

Multi-page, conversion-focused front-end for a senior independent CRO consultant.

## Pages

- `index.html` — homepage
- `audit.html` — £1,300 CRO audit offer page
- `ongoing.html` — ongoing CRO / optimisation support
- `case-studies.html` — proof structure and outcomes layout
- `about.html` — credibility and positioning page
- `contact.html` — enquiry form and next-step routes

## Tech

- Semantic HTML
- Shared CSS (`styles.css`)
- Shared JS (`script.js`) for reusable header/footer, active nav, and reveal motion
- Contact form enhancement that composes a pre-filled email via `mailto:` for static hosting compatibility

## Run locally

Open any page directly in a browser, or serve with:

```bash
npm install
npm start
```

The start script runs a Node static server (`serve`) and uses `PORT` when provided (for hosts like Railway).

## Resolving merge conflicts against `main`

If your PR says it cannot be merged, your branch is behind `main` and needs to be rebased (or merged) and conflicts resolved.

Typical flow:

```bash
git fetch origin
git checkout work
git rebase origin/main
# resolve conflicts in files, then:
git add <resolved-files>
git rebase --continue
# repeat until rebase completes
git push --force-with-lease
```

If you prefer merge commits instead of rebase:

```bash
git fetch origin
git checkout work
git merge origin/main
# resolve conflicts
git add <resolved-files>
git commit
git push
```

### PR #2 quick commands (this repository)

If your PR is `#2` and the head branch is `codex/create-hello-world-web-page-and-push-to-git-rxtnpk`, use:

```bash
git fetch origin
git checkout codex/create-hello-world-web-page-and-push-to-git-rxtnpk
git merge origin/main
# resolve files, then:
git add <resolved-files>
git commit -m "Resolve merge conflicts with main for PR #2"
git push origin codex/create-hello-world-web-page-and-push-to-git-rxtnpk
```
