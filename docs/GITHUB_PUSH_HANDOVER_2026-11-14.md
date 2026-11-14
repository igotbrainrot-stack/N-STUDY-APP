# GitHub transfer handover — 14 November 2026

## Target

GitHub repository: `igotbrainrot-stack/N-STUDY-APP` (the user-specified **N STUDY APP**). This repository was empty before the first import. It is a public repository; review files for secrets and real patient information before every push.

## What the import contains

The latest locally recovered v1.7 Nursing Study Lab source archive from 13 November 2026, including its portable HTML, Python builder, exact JS/CSS source, automated tests, reference material, previous clinical audits and evidence-review queue. On 14 November 2026, six newer colour/cartoon bedside illustrations were added under `assets/illustrations/` and are now embedded in the offline HTML by the existing builder. These were generated for this project; they do not depict real patients or clinical measurements.

No previous Git history exists in this GitHub repository to preserve, and this import does not include the original private site's Git history. No credentials, local browser progress, real patient data, signed Runway URLs or private deployment settings are included.

## Start/edit

Run `python developer/build.py` from the repository root, then structural and browser tests shown in `README.md`. Open `app/Nursing_Study_Lab.html` directly, or on Windows double-click `app/START_HERE.bat`. Do not change the original 100 question IDs or force a new storage schema without migration tests.

## Artwork

`assets/illustrations/*.webp` are compressed 1439x810 copies embedded offline. `assets/fallback/*.svg` are backup diagrams. `assets/art_manifest.json` and `assets/RUNWAY_ARTWORK.md` retain separate Runway task IDs for the original more realistic scenes; the illustrated WEBP assets here are a **different** newer, cartoony visual style. Do not claim they are Runway outputs. The build prefers assets/illustrations, then optionally assets/runway (if manually supplied), then SVG. The UI labels all embedded artwork generically.

## Clinical/editorial caveats

The 100 questions and advanced cases have passed structural/software checks, **not independent item-by-item professional clinical verification**. Earlier clinical audit findings are preserved in `docs`; check applicability of statewide versus local CERS pathways, population-specific charts, medication scope, and up-to-date NSW directives. Fictional case illustrations must not be taken as an instruction to administer a treatment.

## Website publication

The old ChatGPT-hosted private study website is distinct from GitHub. The repository push is a source backup, **not a site deployment**. No new public website is intended. A future agent should obtain the proper private-site publishing connection, compare deployed and local builds, and verify correct access control before changing it.
