# N STUDY APP — NSW Nursing Study Lab

**Latest recoverable build:** v1.7.0, with six colourful illustrated case scenes integrated **14 November 2026**.

An **offline-first, self-paced NSW nursing study app** for practising nurses. This is an independent personal revision project, **not** official NSW Health training, a competency assessment, or a clinical decision-support tool. All clinical material requires confirmation against the applicable current NSW Health policy and local workplace pathway; open clinical audit findings remain.

## Run it (no installation)

1. Open [`app/Nursing_Study_Lab.html`](app/Nursing_Study_Lab.html) in a current desktop browser. The single file includes the question bank, learning activities, styles and six illustrated scenes and works without a server.
2. On Windows, download the repository or release ZIP, extract all files, and double-click [`app/START_HERE.bat`](app/START_HERE.bat). Keep it next to the HTML file.
3. Saved personal progress is browser/device-local. Do not enter patient-identifiable details.

## What's included

| Area | Current content |
|---|---|
| Core study | 100 original questions in 12 modules, with answer explanations and sources |
| Reading | 12 foundational topic guides with 47 sections |
| Guided learning | Two three-stage progressive cases |
| Learning Studio | Evidence Relay (ISBAR), Trend Detective, and local revision scheduling |
| Advanced clinical reasoning | Six complex cases / 27 interactive stages, including three branching reassessments and six written handovers |
| Specialties | Clinical deterioration/sepsis, opioid sedation, hypoactive delirium, ACS, respiratory failure/ABG and AKI/potassium trends |
| Artwork | Six colourful 2.5D illustrated **fictional** bedside scenes included inside offline HTML; SVG backups and Runway provenance references retained |

**The artwork is not clinical evidence.** Use the written clinical facts, verified charts and relevant official guidance—not images—to reason about the cases.

## Develop and test

Requires Python 3 and Node.js; no frontend dependencies or build server.

```sh
python developer/build.py
node tests/validate_content.js
node tests/validate_round_interactions.js
python tests/validate_package.py
# Optional: Python Playwright + installed Chromium
python tests/browser_smoke.py
```

The builder combines `developer/index.template.html`, `developer/src/*.js`, `developer/src/styles.css`, and `assets/illustrations/*.webp` into the offline HTML. **Do not edit only the built HTML**: changes will be overwritten at the next rebuild. See [`HANDOVER.md`](HANDOVER.md) for the exact script order, clinical audit queue and next development tasks.

## Project documentation

- [`HANDOVER.md`](HANDOVER.md): technical continuation handover and legacy deployment notes.
- [`docs/REVIEW_QUEUE_v1.7.md`](docs/REVIEW_QUEUE_v1.7.md): outstanding clinical review and validation work.
- [`docs/SOURCE_REVIEW_v1.7.md`](docs/SOURCE_REVIEW_v1.7.md): earlier source-check record (not a current policy certificate).
- [`docs/NSW_NURSING_CLINICAL_AUDIT_v1.4.md`](docs/NSW_NURSING_CLINICAL_AUDIT_v1.4.md): audit of older content; not automatically resolved by this art integration.
- [`assets/illustrations/README.md`](assets/illustrations/README.md): artwork scope/limitations.
- [`assets/RUNWAY_ARTWORK.md`](assets/RUNWAY_ARTWORK.md): original Runway task provenance, if later needed.

The original private study website is a **different deployment target**. Changes committed here do **not** automatically update that site. No GitHub Actions workflow is added to avoid accidental CI/storage cost.
