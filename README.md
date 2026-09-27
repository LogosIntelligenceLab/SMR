# SMR

**SMR: Learning Streaming Motion Retargeting for Humanoids from Human Semantic**

This repository is prepared for the SMR open-source release. The project website is a static site in [`docs/`](docs/).

## Project page

The entry point is `docs/index.html`. To preview it locally from the repository root:

```bash
python -m http.server 8000 -d docs
```

Open `http://localhost:8000/`.

To publish with GitHub Pages, push this repository to GitHub and select **Settings → Pages → Deploy from a branch → main → /docs**. No build step is required. The site uses relative asset paths so it works at a project URL such as `https://<owner>.github.io/SMR/`.

The paper PDF and figure exports are snapshots in `docs/`; refresh them when the manuscript changes. Add arXiv, code, and model links only when their public URLs are available. The current demo section uses figures from the manuscript; review consent and rights before adding full teleoperation recordings.

## Attribution

The website layout and stylesheet are adapted from the [NavOL project page](https://logosroboticsgroup.github.io/NavOL/), which credits the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template). See [third-party notices](THIRD_PARTY_NOTICES.md).
