# NSW Nursing Study Lab — v1.7 release notes

**Date:** 13 November 2026  
**Audience:** private personal NSW nursing revision, not official training or point-of-care guidance.  
**Based on:** recovered and verified v1.5 offline application, incremental v1.6 specialty expansion.

## Implemented

- Retained all **100 existing question IDs**, 12 topic modules, 12 reading guides (47 sections), two guided cases and the three Learning Studio experiences.
- Preserved the original **six clinical reasoning rounds**, adding an interactive **two-decision branching reassessment** to each of the three newer ACS/COPD/AKI cases. Each route reveals a different plausible synthetic finding, followed by a learner decision and individual rationale. Every round retains its written ISBAR, source-linked reading and debrief. Total: **27 round stages**, including **3 branching stages, 9 alternative investigation routes, 27 route-dependent response choices**.
- Added 3 extra educational illustrations for the original three reasoning rounds; all **six rounds have local SVG artwork**, including newly generated scenes available in the user's Runway workspace. The six Runway-original raster files were **NOT transferred into this archive**; local images are distinctly labelled as conceptual fallback drawings.
- All six rounds retain browser-local import controls for an image downloaded from Runway; asset manifest and reproduction instructions are in `assets/RUNWAY_ARTWORK.md`.
- Corrected the outdated rounds heading from **3** to **6** extended cases.
- Applied narrowly scoped corrections based on previous v1.4 audit findings and rechecked official NSW sources:
  - F-03: Yellow Zone actions and nurse-in-charge consultation, with distinction from Red Zone.
  - F-04: Mandatory clinician-disclosure **within 24 hours** when open disclosure is required (PD2023_034); near-miss discretion and formal disclosure distinctions retained.
  - F-05: **Yes** patient/family concern as an adult Yellow Zone trigger; **serious** concern as Rapid Response trigger on the applicable standard adult chart.
  - F-06: medication ordering exercise explicitly assumes the safety pause, assessment and escalation have *already* occurred.
  - F-12: no longer calls a blanket guide date a claim-by-claim verification date.
  - Existing v1.5 F-01, F-02, F-07 corrections were preserved and regression-tested.
- Updated the medication reading's future-tense legislative wording to acknowledge commencement of the NSW Medicines, Poisons and Therapeutic Goods framework on **5 November 2026**; local directives still require independent current-status checks.

## Verification performed

1. `python developer/build.py`: complete offline HTML reconstructed with all six local images.
2. `node tests/validate_content.js`: 100 IDs/keys, 12 topic guides, 6 rounds, 27 stages, branch completeness, citations and audit regression assertions.
3. `node tests/validate_round_interactions.js`: fake-DOM exercise for stage transitions and alternative branch reasoning in new cases.
4. `python tests/validate_package.py`: HTML, all script injections, original ZIP and checksums.
5. `python tests/browser_smoke.py`: **real headless Chromium** render via `page.set_content`, desktop 1280×860 and mobile 390×844; all three 5-stage specialty cases completed, branched responses changed, model handovers displayed, images decoded, image-import-and-restore tested, older question navigation/guides/studio tested, and no runtime errors observed.
6. Human-read visual QA of screenshot in a mobile viewport, with no reported horizontal overflow. Browser smoke does **not** exercise the Windows `.bat` launcher or a deployed public URL; navigation to local files/HTTP was disallowed by this environment.

## Two external completion blockers

- **Runway original bytes:** connected Runway generated or confirmed all six scenes, but exposes signed previews rather than downloadable original file bytes to this restricted build environment. Actual Runway image binaries are not in this ZIP; the app therefore ships with complete embedded local vector drawings and an image-import feature. Embed the Runway originals only after obtaining the six image files, then rebuild.
- **Existing private website:** the Sites deployment connector used in October is not connected in this session, and the historical repository is not accessible via the available GitHub connector. This release is **offline/source only**. The previous live site has **not** been updated. Do not tell the user they are seeing v1.7 there.

Clinical source rechecks support selected updates, but **the 100-question bank has not received a complete item-by-item independent clinical audit**; original F-08 onward/clinical-review issues remain on the review queue.

## 14 November 2026 — GitHub cartoon-art update (no question-bank changes)

The original v1.7 code and 100-question bank remain preserved. Added six compressed, 2.5D cartoon-style fictional bedside illustrations in `assets/illustrations/*.webp`. The Python builder now embeds these images directly in the standalone HTML, so every reasoning case has a colourful illustration offline without manual Runway importing. Existing source manifest, SVG backups and original Runway task references remain available. Updated the illustration label to avoid misidentifying the newer cartoon images as Runway outputs.

All content-integrity and interactive regression tests pass. Actual Chromium browser smoke passes desktop and mobile for the three branched cases, artwork decoding/import/restore, original study modes and no JS page errors. This does not establish clinical correctness or test the Windows launcher itself. The previous ChatGPT-hosted private site is unaffected by the GitHub push.
