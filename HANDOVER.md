# Handover — NSW Nursing Study Lab v1.7

**Original v1.7 release:** 13 November 2026 · **GitHub artwork refresh:** 14 November 2026  
**Purpose:** private self-paced revision for an NSW practising nurse, not clinical decision support, NSW Health endorsement or formal competency assessment.

## Start here

1. Open `app/Nursing_Study_Lab.html` on any desktop browser. On Windows, extract the offline ZIP and double-click `START_HERE.bat`.
2. This is an **incremental extension** of the recovered v1.5/v1.6 project. **Do not rebuild from scratch or delete original question IDs.**
3. For editable source, use `developer/src/*.js`, `developer/src/styles.css`, `developer/index.template.html`, `assets` and `developer/build.py`.
4. Run these tests after changes (the browser test requires Python Playwright + Chromium):

```sh
python developer/build.py
node tests/validate_content.js
node tests/validate_round_interactions.js
python tests/validate_package.py
python tests/browser_smoke.py
```

## Current scope

- 100 original questions across 12 modules (73 single-answer, 12 multiple-answer, 10 written, 4 numerical calculations, 1 ordering exercise); 12 reading guides / 47 sections.
- Two previous three-stage guided cases; Evidence Relay, Trend Detective and device-local revision scheduling.
- Six extended Clinical Reasoning Rounds: three original 4-stage cases (possible infection/deterioration, postoperative opioid sedation, acute quiet delirium) and three specialist **5-stage cases** (possible ACS, hypercapnic respiratory fatigue, AKI + potassium rise), totaling **27 round stages** and **24 case reading sections**.
- New v1.7 **branching reassessment** in each specialist case: 3 routes, each exposes different synthetic findings followed by 3 nurse reasoning responses and detailed explanations. These are simulated possibilities, **not guaranteed outcomes or a medical diagnosis**. Self-reviewed and ungraded.
- Six embedded colourful **cartoon/2.5D case scenes** (one per round) added on 14 November 2026, suitable for offline study. The six separate photorealistic Runway scenes remain documented by task ID but are **not** included as source image binaries. The bundled cartoon images were generated separately and should not be mislabelled as Runway outputs.
- Source links in every round. All local progress/bookmarks and previous IDs retained.

## Important edit order

`developer/build.py` composes one portable HTML file from:

`00_content_bank.js` → `01_reading_guides.js` → `02_advanced_expansion.js` → `03_guided_cases.js` → `04_learning_studio_data.js` → `05_learning_studio_engine.js` → `06_clinical_rounds_data.js` → `07_clinical_rounds_engine.js` → `09_specialty_expansion.js` → `10_branching_reassessments.js` → `08_application_controller.js`.

The controller is last. Do not sort by filename without updating the template script order. The branch module modifies *only* the three recent specialty rounds and assigns artwork to the original three rounds; stable IDs and question data remain preserved.

`assets/art_manifest.json` maps six keys (`acs`, `resp`, `renal`, `sepsis`, `opioid`, `delirium`) to earlier Runway task and asset IDs. `assets/illustrations/*.webp` contains the **newer cartoon-style artwork**, now embedded by default. `assets/fallback/*.svg` are backup schematics. `developer/build.py` checks `assets/illustrations` first, then `assets/runway`, then SVG; illustrations are not diagnostic charts.

## Runway image completion instructions

1. The six newer cartoony illustrations are already in `assets/illustrations/`, embedded in the HTML, and versioned with the project. This Runway workflow is **optional** if replacing that artwork. In the user's Runway workspace, locate each task/asset listed in `assets/RUNWAY_ARTWORK.md` (13 November 2026).
2. Download each original scene to the user's computer from Runway. Inspect for medical plausibility, particularly electrode placement or ward equipment; these are illustrations, not evidence of physiology.
3. **Developer/shareable build:** to replace cartoon art with Runway originals, put one file per case in `assets/illustrations/<key>.webp` (or PNG) and run `python developer/build.py`. Files only added to `assets/runway/` do not override an existing illustration. Confirm the HTML includes the new image bytes and tests pass. Never embed expiring signed Runway preview URLs.
4. **Personal-browser route:** use “Import Runway artwork” on each case; the image is resized and stored on that device in browser storage when permitted. This does not make the file portable to another computer.

**Current limitation:** The six original Runway scenes have not been embedded. **However, six new, separate, cartoon-style artworks have been embedded** and are stored in `assets/illustrations`. Do not confuse these two sets.

## Clinical accuracy and outstanding issues

`docs/SOURCE_REVIEW_v1.7.md` details specific official-source comparisons. Earlier audit concerns F-03, F-04, F-05, F-06 and F-12 received narrow corrections in this release. Prior F-01/F-02/F-07 code fixes preserved. `docs/REVIEW_QUEUE_v1.7.md` lists all unresolved items.

The NSW adult “worried they are getting worse” item now explicitly teaches Yes as a Yellow Zone trigger and serious concern as a Rapid Response criterion under local CERS. The open disclosure educational text now says clinician disclosure within 24 hours where required. New medicines legislation came into force 5 November 2026; current NSW medicine handling directives still need careful checking. Do not infer NHS/US or other adult-chart requirements across specialised populations. No new medication doses are taught.

**No claim of full item-by-item independent clinical validation** of 100 old questions or 27 round stages. The user intends to cross-check facts independently. No patient-identifiable records are included.

## Test evidence

- Source JS and bank integrity validated, including all 100 questions and 27 round stages.
- Fake-DOM test exercises the new branching flows in all three specialty cases.
- Headless Chromium `page.set_content()` browser smoke passed on **desktop 1280×860 and mobile 390×844**, completing all three complex rounds, alternative branches, ISBAR, image import/restore, older navigation/readings and Studio with no JS errors. Browser screenshots saved under `tests/screenshots/`.
- **Local file/http navigation was restricted by administrator policy**. The browser test renders source HTML inside `about:blank` instead; this does not test the `.bat` launcher or external website functionality.

## Publication state

This repository includes the latest recovered **v1.7 offline application with 14 November 2026 cartoon artwork refresh**. The existing private website at `https://nsw-nursing-study-lab-20261026.jauntymite65.chatgpt.site` was not updated: there is **no connected Sites publishing capability** in the current session. Do not replace a private site with an unintended public one or claim that v1.7 has been deployed. Restore correct permissions/tooling before publishing and verify access policy.

## Next agent priorities

1. Review the six cartoon illustrations for artistic and clinical plausibility; only replace them with Runway originals if preferred. If replacing, use `assets/illustrations/` and rebuild.
2. Obtain the original private-site deployment capability and publish/test if appropriate.
3. Finish item-by-item clinical evidence verification and reconcile remaining audit queue, not just test answer-key structure.
4. Continue deep specialty development with medically-reviewed ECG/ABG training, nuanced multiple-patient shift prioritisation and pathophysiology. Avoid raw AI artwork as a substitute for verified ECGs or treatment charts.
