# NSW Nursing Study Lab v1.6 — source map

The editable code is a continuation of a losslessly extracted version of the **recovered v1.5 offline HTML**. The hosting service's original Git repository was not recovered.

- Original recovered v1.5 HTML SHA-256: `befe246532c9e8f2bd22b4b294714d2de9da7c39f6e1bb1073b2aada2e2ea26d`.
- New output is v1.6; byte-identical comparison against v1.5 is no longer expected.
- `developer/build.py` merges the template and CSS, embeds local artwork data, then injects **10 source scripts** in an explicit sequence (the original eight data/engine files and controller plus the new specialty expansion; see build.py for exact order).
- `developer/src/09_specialty_expansion.js`: the three new cases, sourced review links, source-checked date and updated NSW medicines-law source title.
- `developer/src/07_clinical_rounds_engine.js`: observation trend SVG charts, artwork panel and browser-local image importer.
- `developer/src/styles.css`: artwork and chart styles.
- `developer/index.template.html`: UI and safety wording, additional inline artwork-data script.
- `assets/fallback/*.svg`: offline schematic art; **not** Runway-generated.
- `assets/runway/{acs,resp,renal}.{png,webp}` (optional): if supplied, builder embeds locally downloaded Runway originals inside HTML, enabling their offline use anywhere. Do not commit real patient images.
- `assets/art_manifest.json`: private Runway task/asset IDs, **not** expiring signed URLs.

Use `python developer/build.py` after edits. Never edit only the generated `app/Nursing_Study_Lab.html`, which is overwritten by the builder.


## v1.7 additions (13 November 2026)

`10_branching_reassessments.js` follows `09_specialty_expansion.js` and precedes `08_application_controller.js` at build time. Six art keys now map to locally embedded SVGs, optionally replaced by local Runway binaries. New files: `tests/browser_smoke.py`, `docs/RELEASE_NOTES_v1.7.md`, `docs/SOURCE_REVIEW_v1.7.md`, and `docs/REVIEW_QUEUE_v1.7.md`. Browser smoke uses inline HTML rendering due local navigation policy restrictions.
