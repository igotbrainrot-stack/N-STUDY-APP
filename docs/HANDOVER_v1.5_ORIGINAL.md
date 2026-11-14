# NSW Nursing Study Lab — AI developer handover

**Handover prepared:** 31 October 2026 (Australia/Sydney)  
**Recovered baseline:** Offline edition **v1.5.0**, previously published 26 October 2026  
**Intended user:** A practising NSW nurse studying independently, not seeking grades or official training accreditation  
**Status:** Working, self-contained offline application recovered from the saved v1.5 release. Clinical content is an **AI-authored educational draft**, not independently clinically certified.

## 1. NEXT AI: READ THIS FIRST

You are continuing **an existing application**. **Do not rebuild from scratch** or start a fresh framework migration unless you have demonstrated a need. Preserve the clean, uncluttered learning interface, existing questions and reading sections, local-first offline operation, and immediate answer explanations. The user wants deeper material for experienced nurses: advanced patient presentations, contextual decision-making, competing differentials, observation interpretation, pharmacology/pathophysiology reading, simulated handovers and educational timelines. Prioritise **depth, clinical accuracy and good interaction** over inflated question counts.

**Start from:** `app/Nursing_Study_Lab.html` and the matching editable extracted sources under `developer/src/`. The original release ZIP is retained in `original_release/` for provenance.

### What the recovered archive includes—and does not

- **Includes:** complete runnable offline HTML (which embeds UI, styles, question data, readings and learning activities), Windows launcher, original README, faithful editable source split, deterministic build tool, tests and historical audits.
- **Does not include:** the original hosting Git history, provider-specific site deployment configuration, unpublished branches, or credentials. The editable split is **generated from the release HTML**, not claimed to be the original repository layout.
- **Last recorded private website:** `https://nsw-nursing-study-lab-20261026.jauntymite65.chatgpt.site`. A previous deployment tool reported success on 26 October 2026, but availability and byte-for-byte equivalence to this offline package have **not been reverified** in this handover session.
- **Historical deployed version commit** reported in the prior development conversation: `0f8a139fd1b9c8ebf69f560d79e649a743e7b3ae`. Treat this as provenance for checking against a hosting repo when access is available, not proof that the code here is a Git working tree.

## 2. Run, edit, rebuild

**Windows learner:** extract this handover archive; open `app/START_HERE.bat`, or double-click `app/Nursing_Study_Lab.html`.

**Other desktop platforms:** open `app/Nursing_Study_Lab.html` in a browser. The application is client-side, requires no Python or server to study, and makes external requests only if the learner opens a source link. State is saved in browser local storage (browser/file-origin behaviour may vary).

**Developer workflow:**

```bash
# From the top-level handover folder
python developer/build.py
node tests/validate_content.js
python tests/validate_package.py
```

Edit `developer/src/*.js` or `developer/index.template.html` rather than modifying only the generated HTML, because rebuilding overwrites `app/Nursing_Study_Lab.html`. Scripts are injected in numeric order, then controller runs last. The exact source/module mapping is in `developer/SOURCE_MANIFEST.md`.

**Deployment:** Do not assume a ZIP edit changes the private website. Reconcile the original hosting repository and deployment workflow before publishing; credentials are not included. Maintain a standalone offline export after every change.

## 3. Functional inventory, based on actual v1.5 data

| Component | Existing content / implementation |
|---|---|
| Question bank | **100 questions** in **12 modules**: 73 single-choice, 12 multiple-select, 10 short response, 4 numerical calculations and 1 ordering exercise |
| Topic readings | **12 guides** with **47 sections** in `window.STUDY_READINGS` |
| Guided clinical cases | **2 cases**, 3 decision stages each, under `window.STUDY_CASES` |
| Learning studio | **Evidence Relay** (clues and ISBAR), **Trend Detective** (observation timepoints), local **spaced revision** system |
| Advanced reasoning rounds | **3 cases**, each 3 numerical observation timepoints, 4 activity stages (interpretation, differential consideration, prioritisation, written ISBAR), and 4 additional reading sections per case |
| References | `window.STUDY_BANK.sources` with **48 reference IDs** in the offline v1.5 package; source links need per-claim/current-status checks |
| User experience | No grades, optional bookmarks/progress, review missed questions, mixed revision, search, source links, and immediate rationales |

The three v1.5 rounds are: `sepsis-trajectory` (worsening possible infection / NSW adult deterioration), `opioid-sedation` (postoperative sedation and respiratory concerns), and `delirium-pattern` (acute fluctuating cognition, competing causes). Cases use synthetic patients.

### Application code map

| Source file | Purpose / global exposed |
|---|---|
| `developer/src/00_content_bank.js` | Original `window.STUDY_BANK`: source registry and foundational content |
| `developer/src/01_reading_guides.js` | Original `window.STUDY_READINGS` |
| `developer/src/02_advanced_expansion.js` | Advanced modules, additional guides and provenance fields |
| `developer/src/03_guided_cases.js` | `window.STUDY_CASES` |
| `developer/src/04_learning_studio_data.js` | `window.STUDY_STUDIO_DATA` and revision data |
| `developer/src/05_learning_studio_engine.js` | Studio renderer and `window.STUDY_SPACING` |
| `developer/src/06_clinical_rounds_data.js` | `window.STUDY_ROUNDS` |
| `developer/src/07_clinical_rounds_engine.js` | `window.ROUND_LEARNING`, round renderer |
| `developer/src/08_application_controller.js` | UI state, local persistence, question flow, search, selection and navigation |
| `developer/src/styles.css` | UI layout and responsive styling |
| `developer/index.template.html` | Structural HTML with source placeholders |

Do not reorder the scripts without verifying initialization dependencies. Maintain stable question IDs so saved progress and bookmarks remain compatible.

## 4. Clinical audit status and known issues

The attached v1.4 clinical audit (in `docs/`) contains **F-01 through F-15** and proposed patches. The v1.4 audit recorded **1 high, 7 moderate, 4 low and 3 unverified** findings. It was an AI-assisted review, not clinician sign-off, and specifically said that **77 of the 100 questions had not received claim-by-claim external validation** at the time. **Do not repeat those numbers as a completed audit of v1.5.** They are historical issues to reconcile against current code and guidance.

**Observed in the recovered v1.5 file:** the Trend Detective debrief now explicitly recognises RR 30/min as a Red Zone trigger on the **unaltered standard NSW adult observation chart**, and calls for local CERS Rapid Response. The v1.5 advanced sepsis round makes the same point. **This is a code-text check, not an independent contemporary guideline sign-off.** Keep distinctions for speciality charts, authorised altered calling criteria, treatment-limitation plans and local CERS.

**Still requires targeted review (do not assume fixed):**

1. Evidence Relay's clue importance classifications versus the ISBAR model (`F-02`).
2. Yellow Zone assessment / nurse-in-charge discussion / Clinical Review distinctions and patient-family concerns (`F-03`, `F-05`).
3. NSW Open Disclosure directive details and timing (`F-04`).
4. Exact-order medicine workflow permitting reasonable concurrent safety actions (`F-06`).
5. Spaced revision scheduling of ungraded written reflections (`F-07`).
6. Repetitive anticoagulant and lactate questions, AED source attribution, weak foundation distractors (`F-08` through `F-11`).
7. Metadata that overstates verification via blanket source-check dates (`F-12`).
8. NSW medicines-law / medicines-handling policy status (`F-13`). As of this handover date (31 October 2026), an important NSW legislation transition is **scheduled for 5 November 2026**; recheck then. Do not assume a policy is withdrawn or current without live checking.
9. Direct NMBA links, detailed scope nuances and facility-specific policies / protected sources (`F-14`, `F-15`).
10. **New in v1.5:** every stage, distractor, escalation threshold, opioid-sedation explanation, differentials and linked reading in the three new rounds requires its own claim-to-source review. v1.4 audits predate these rounds.

For official current sources, start with the [NSW Health PDS](https://www1.health.nsw.gov.au/pds/), [CEC](https://cec.health.nsw.gov.au/), [ACI](https://aci.health.nsw.gov.au/), [ACSQHC](https://www.safetyandquality.gov.au/), [NMBA](https://www.nursingmidwiferyboard.gov.au/) and [ANZCOR](https://www.anzcor.org/). Check exact source versions and LHD applicability, and distinguish statewide requirements from local procedures.

**Scope:** Personal learning, not a clinical treatment algorithm. User has explicitly said they will double-check facts. Preserve the serious, factual educational approach without turning the app into a high-stakes grading or patient-care tool.

## 5. Recommended next development sequence

**Phase 0 — prevent regressions and settle safety gaps:** Run tests, open app in a real browser, trace current v1.5 against historical F-01–F-15 and verify linked primary sources. Fix objective UI contradictions and misleading reference-status labels first. Track every factual correction with a specific source, date, changed content IDs and local-scope qualifiers.

**Phase 1 — deepen existing activities:** Add branching reassessment after an initial decision, hypothesis updates as information arrives, and a clear summary of how each observation changes concern. Avoid mechanical “one only correct diagnosis” scoring. Make the ISBAR exercise highlight missing urgent facts and uncertainties, not merely keywords. Improve the three v1.5 rounds before creating many additional shallow cases.

**Phase 2 — new modules to high quality:** Priority candidates include cardiovascular/ECG interpretation, respiratory/ABG reasoning, renal/electrolyte trends and complex medication reconciliation. Each should bundle (a) reading on pathophysiology and medicines, (b) realistic patient context, (c) observation/investigation interpretation, (d) non-MCQ reasoning, (e) debrief and evidence trail. Use original diagrams or properly licensed illustrations where justified. Confirm details with NSW/Australian current sources.

**Phase 3 — learning tooling:** Build optional reflective notes and a case/revision history export. Consider a fictional multi-patient shift with evolving priorities only after existing scenario QA. Keep the interface sparse: advanced tools under one clear entry point, not numerous always-visible panels.

### Acceptance criteria for any new clinical case

- Synthetic patient details and care setting; timecourse, comorbidity, medication history/allergies and key observations where relevant.
- Differentiate immediate assessment, escalation, nurse-authorised action, prescribed treatment and reassessment.
- Multiple defensible explanations noted when information is incomplete; avoid out-of-scope definitive diagnosis.
- Explain why both supported and unsupported actions matter; distinguish certainty and alternatives.
- Each high-risk claim supported by a **specific, reviewed** NSW/Australian source and a dated source-status log.
- Consistent local vs statewide wording and adult vs special-population charts.
- Tests cover option-to-rationale mapping, calculations/units, ordering logic, links, case transitions and offline functionality.
- No unreviewed clinical edits passed off as NSW Health endorsement or accredited teaching.

## 6. How to transfer into another AI's workspace

1. Upload `NSW_Nursing_Study_Lab_v1.5_AI_Handover.zip` to the next AI (or supply the extracted folder).
2. Tell it to read `HANDOVER.md`, `developer/SOURCE_MANIFEST.md`, `docs/NSW_NURSING_CLINICAL_AUDIT_v1.4.md` and `docs/REVIEW_QUEUE.md` **before editing**.
3. Have it run the two validation commands and manually open `app/Nursing_Study_Lab.html`. Do not infer browser QA from static tests.
4. Require incremental edits to `developer/src`, `python developer/build.py`, test runs and a new versioned offline ZIP. Keep this v1.5 package unchanged as a recoverable baseline.
5. If updating the private website, separately verify access, source revision and deployment; this handover supplies no deployment credentials.

## 7. Copy/paste prompt for the next AI

> Continue development of **NSW Nursing Study Lab v1.5** using the supplied handover archive. Read `HANDOVER.md`, actual source files, build instructions and clinical audit. **Do not rebuild or migrate frameworks.** Preserve the self-contained offline release, the clean interface, 100 existing questions and all working activities. First run the included tests and inspect the rendered app. Reconcile the v1.4 audit findings against the v1.5 code instead of assuming they were fixed; verify any clinical change against current NSW Health/CEC/ACI/ACSQHC/NMBA guidance, recording source links and access dates. Then implement substantial, genuinely challenging clinical reasoning improvements with case progression, competing differential considerations, observation timelines, pathophysiology/pharmacology readings and self-reviewed ISBAR. Add clear tests and produce an updated offline ZIP and an updated handover. This is for independent study, not formal grading or clinical decision support.

---
**Provenance statement:** This document is grounded in the recovered saved v1.5 offline ZIP, its inline code, the v1.4 audit files saved in the user's Library, and the preceding project conversation. No private hosting repository was fetched during this handover; do not assume this is an original Git checkout or that historical audit findings have been clinically revalidated.
