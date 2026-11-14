# Release notes — NSW Nursing Study Lab v1.6

**Release candidate prepared:** 13 November 2026

### Content expansion
- Preserved all 100 existing questions (12 modules, 5 question formats), 12 topic readings (47 sections), both guided clinical cases and existing learning-studio tools.
- Expanded clinical reasoning rounds from 3 to 6, with 24 total stages and 24 in-round reading subsections.
- Added case: the inconclusive first ECG — ACS uncertainty, assessment timing, alternative causes, escalation, ISBAR.
- Added case: less fast, but more tired — COPD, evolving blood gas, respiratory acidosis, fatigue and oxygen/ventilation distinction.
- Added case: the disappearing urine — AKI and potassium/creatinine trends, medication ambiguity, urine output, cardiac risk, ISBAR.
- Added numerical trend visualisations for selected HR, pH, PaCO₂, potassium and creatinine measurements; each number comes directly from the case data.

### Illustration integration
- Generated 3 high-detail hospital scene illustrations in Runway in the user's private workspace.
- Integrated 3 authored offline schematic illustrations and clear labels that scenes are not diagnostic evidence.
- Added a local image-import workflow so a downloaded Runway image can be used in a case without a server or network transfer. Source builder can embed locally supplied Runway originals into the standalone HTML.
- Runway's original full-resolution PNG bytes are **not** included in this release because the connected Runway tool returned only expiring asset URLs and the container could not fetch them. See `assets/RUNWAY_ARTWORK.md` for task IDs and instructions.

### Verification
- `node tests/validate_content.js` — passed.
- `node tests/validate_round_interactions.js` — passed (fake DOM, no visual browser).
- `python tests/validate_package.py` — passed.
- `node --check` — passed for changed scripts.
- Checked legacy source IDs and prior 100 question keys unchanged; checked all new stage options and trend array lengths.
- Rendered offline SVGs to PNG for inspection; previews are not needed at runtime.
- Tried Chromium navigation via file URL and localhost HTTP; both were blocked by administrative browser policy, so **real browser QA remains undone**.

### Not included / not claimed
- No deployment to the previous private hosted website.
- No formal NSW Health approval or independent clinician sign-off.
- No comprehensive re-verification of the original 100 questions or all legacy audit findings.
