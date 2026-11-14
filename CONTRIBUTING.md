# Contributing safely

This codebase is a **private self-study tool for an NSW practising nurse**, published as source for technical continuation. It is **not** formally approved clinical teaching or point-of-care advice. Use *synthetic* patient cases only; never commit patient records.

## Edit and rebuild

1. Keep original question IDs and saved progress compatible.
2. Edit `developer/src/` and, for layout, `developer/index.template.html`.
3. Rebuild: `python developer/build.py`.
4. Validate: `node tests/validate_content.js`; `node tests/validate_round_interactions.js`; `python tests/validate_package.py`.
5. For UI QA, install Python Playwright and Chromium and run `python tests/browser_smoke.py` (or equivalent local file validation).
6. Confirm all six embedded scene illustrations render offline on desktop and mobile, and that the import/restore control still works.

## Clinical editorial process

For each claim or question change: record applicable NSW/Australian source, last verified date, patient population/setting, nursing-scope limitations, rationale for alternatives, and a review status. Verify policy currency before treating wording as authoritative. See `docs/REVIEW_QUEUE_v1.7.md` and `docs/SOURCE_REVIEW_v1.7.md`. A computer test cannot establish that clinical teaching is correct. Mark unresolved clinical claims for qualified human review.

Do not put credentials, real patient data, or private account exports into the repository. Prefer small compressed illustrations; illustration content must not be used to infer diagnosis, vital signs, ECG morphology or medication dose.
