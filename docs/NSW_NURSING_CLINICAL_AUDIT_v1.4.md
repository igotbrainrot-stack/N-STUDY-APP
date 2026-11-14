# NSW Nursing Study Lab v1.4 — Read-only clinical safety and educational quality audit

**Date:** 26 October 2026 (Australia/Sydney)  
**Audited code:** existing published v1.4 source, commit `5217ab8`  
**Method:** simulated senior NSW registered nurse educator and Australian general-practice reviewer perspectives, software inspection and targeted primary-source research. **This is not a review performed by registered clinicians.**  
**App modification:** **NONE**. All replacements below are proposed, not deployed.  
**Companion inventory:** `NSW_NURSING_ITEM_INVENTORY_v1.4.md` lists every item ID, keyed answer, source references, reading-section headings, scenarios and reference IDs.

## A. Executive clinical safety summary

**Classification: REQUIRES SUBSTANTIAL CORRECTION.** The existing app has useful, generally cautious learning material, including repeated emphasis on local procedures and professional boundaries. Nevertheless, at least one high-severity escalation-teaching issue and several policy/context mismatches were identified. It cannot currently be endorsed for unsupervised high-stakes clinical instruction or formal staff training. This is a *risk-based AI audit classification*, not a finding that every educational question is wrong.

### Complete accessible content inventory and actual inspection

| Content unit | Available | Text/key/logic inspected in source | Item-specific external evidence status |
|---|---:|---:|---|
| Questions, keyed responses, distractors, explanation, takeaway | **100** | **100** | 23 targeted official-reference comparisons; remaining 77 **PENDING** claim-by-claim verification |
| Topic reading guides | **12** containing **47 sections** | **12 / 47** | Targeted high-risk sections checked; other claims remain source-verification work |
| Progressive simulations | **2 cases, 6 decision stages, 18 options** | **All** | Adult deterioration and medicines claims compared at topic level, not clinician-approved |
| Evidence Relay (6 clues; exemplar ISBAR) | **1 clinical activity** | **All** | CEC adult chart/CERS, patient concern and ACSQHC handover sources compared |
| Trend Detective (4 points; 3 interpretations) | **1 clinical activity** | **All** | Current adult chart compared; **HIGH finding** |
| Revision plan | **1 scheduling feature** | **All** | Learning-system integrity checked; not a clinical standard |
| Source references | **45 IDs / 42 distinct URLs** | **45 reference objects; all 45 direct retrievals attempted** | 41 URLs opened through research tool, 4 NMBA direct requests gave tool errors; official NMBA indexed results were available |

**What “inspected” means:** Each accessible source-data item was read for clinical plausibility, scope, consistency, keys and explanation. This is **not** a claim that 100 answer/explanation pairs were exhaustively validated against individual paragraphs of official source documents. For 77 question IDs, the source-to-claim check remains pending and should be marked `UNVERIFIED — REQUIRES CLINICAL REVIEW` if a verification status is exposed. The 23 targeted checks were conducted by an AI and also await independent clinical sign-off. The companion inventory records precisely which IDs received targeted checks.

### Finding count (issues, not number of affected items)

| Classification | Count | Identifiers |
|---|---:|---|
| **CRITICAL** | **0 identified** | —; *absence of a finding does not prove absence of risk* |
| **HIGH** | **1** | F-01 |
| **MODERATE** | **7** | F-02–F-07, F-12 |
| **LOW** | **4** | F-08–F-11 |
| **UNVERIFIED / external confirmation required** | **3 distinct issues** | F-13–F-15; plus the 77 pending item-by-item external checks |

**Sources of uncertainty:** Local Health District CERS protocols, alterations to calling criteria, medicines governance documents, scope/competence authorisations, some NMBA direct web retrievals, and paid Australian clinical reference content were unavailable. No subscription reference access is claimed. No patient-level or hospital-specific records were reviewed.

## B. Detailed clinical and integrity finding register

### F-01 — HIGH: Red Zone teaching is obscured by a generic escalation prompt

- **Location:** `dist/studio-data.js` → `STUDY_STUDIO_DATA.trend`, especially the 12:00 point and `choices[0]`/`debrief`; presented by `dist/studio.js` Trend Detective.
- **Original:** The fictional adult ward timeline reaches respiratory rate **30 breaths/min** and pulse **124 beats/min** at 12:00. The preferred response describes assessment and “appropriate escalation now”; the debrief explicitly avoids labelling Yellow/Red Zones.
- **Problem:** With the standard NSW adult observation chart and no authorised altered calling criteria specified, the 30/min respiratory-rate observation corresponds to a Red Zone threshold, requiring **Rapid Response via local CERS**. Leaving this as generic “appropriate escalation” at the exact teachable point risks equating a Red Zone call with routine assessment or optional review. The chart itself requires the Red Zone action and care/reassessment. A learner could overlook a mandatory trigger.
- **Evidence:** [Current NSW CEC standard adult general observation chart (PDF)](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF), Red Zone Response section; [CEC chart landing page](https://cec.health.nsw.gov.au/safety-essentials/deterioration/observation-charts). For cross-check of numeric chart zoning, [South Eastern Sydney LHD Between the Flags medical orientation](https://www.seslhd.health.nsw.gov.au/sites/default/files/POWMedEd/Registrar%20Orientation%20BTF%20Aug%202023_Claire%20Ward%20.pdf) lists adult RR ≥30/min as a Red Zone trigger; **the latest chart and applicable local CERS are authoritative**, not the older orientation deck.
- **Risk:** Under-escalation of an acutely deteriorating adult; incorrect generalisation that trend recognition alone satisfies an objective Red Zone response.
- **Ready-to-implement correction:** Add the scenario constraint “Use the standard NSW adult general observation chart; no authorised alterations to calling criteria are documented.” The preferred answer should say: **“Recognise the Red Zone respiratory-rate trigger, activate the local Rapid Response immediately, assess and give appropriate care while help arrives, repeat observations, document and communicate the changes.”** Feedback should explain why this is a Rapid Response rather than a routine clinical review. Provide an explicit reminder that other charts, valid alterations, end-of-life plans and local protocols change applicability; never build a generic automated alarm from these educational points.
- **Verification:** **Direct official chart cross-check; high-confidence finding**, final local-clinical validation still needed.

### F-02 — MODERATE: Evidence Relay teaches inconsistent “priority” labelling

- **Location:** `dist/studio-data.js` → `detective.clues`, `medicines` and `results`; `detective.model.B`/`.R`; `dist/studio.js` → `notFlagged` feedback.
- **Original:** Medication reconciliation and pending investigation results are marked `priority:false`, yet the example handover includes “Transfer medication history is incomplete” and follow-up of “pending investigations”. The review message only prompts about missing `priority:true` items.
- **Problem:** The UI implicitly rewards omitting items that its own model recognises as relevant. Incomplete medicines information and ownership of pending tests may be essential to safe continuity, even if not the *first sentence* of an urgent call.
- **Evidence:** [ACSQHC Communicating for Safety Standard](https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/communicating-safety-standard); [ACSQHC ISBAR prompt card](https://www.safetyandquality.gov.au/resources/isbar-promptcard-template); [Medication Safety Standard](https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/medication-safety-standard).
- **Risk:** Learners may infer that unresolved medication lists/results should not be mentioned or handed over.
- **Correction:** Replace binary `priority` with two labels: **“time-critical facts for the first escalation”** versus **“outstanding safety information requiring a named owner.”** Include both categories in the self-review; prompt missing medicines and investigation ownership even when the urgent call foregrounds deterioration.
- **Verification:** **Partially verified**, with clinical importance depending on the specific investigation/medicine and context.

### F-03 — MODERATE: Yellow Zone workflow is underspecified

- **Location:** `dist/expansion.js` → `readings['deep-sepsis'].sections[4]`.
- **Original:** “Yellow Zone triggers require the specified local clinical review process.”
- **Problem:** The adult chart requires initiating appropriate care, repeating/increasing observations and **promptly consulting the nurse in charge to decide whether a Clinical Review or other CERS call should be made**. It does not always mandate the same Clinical Review call for every isolated Yellow Zone finding. The phrasing hides the assessment/consultation decision and risks both overgeneralisation and under-response for significant concern.
- **Evidence:** [CEC adult chart](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF), Yellow Zone Response.
- **Risk:** Inaccurate teaching of who decides, what must occur, and the relationship between routine Yellow Zone triggers and urgent clinical concern.
- **Correction:** “For a Yellow Zone observation/additional criterion, initiate appropriate care, repeat and increase observations as indicated, promptly consult the nurse in charge and follow the chart/local CERS decision about Clinical Review or higher escalation. Escalate sooner if concerned. Red Zone and serious concern require Rapid Response under the applicable chart/local protocol.”
- **Verification:** **Direct chart cross-check**.

### F-04 — MODERATE: Mandatory open-disclosure timing softened

- **Location:** `dist/expansion.js` patched `adv-com-03` model and `adv-com-06` explanation; `readings['deep-communication'].sections[4]`.
- **Original phrases:** “normally within 24 hours” and “generally expected within 24 hours”.
- **Problem:** NSW Health **PD2023_034 Open Disclosure** states clinician disclosure **must occur within 24 hours of incident identification** where open disclosure is required; formal open disclosure may follow according to harm classification and local governance. A permissive adverb may understate a mandatory policy direction. Separately, not every near miss requires disclosure; near-miss disclosure is discretionary under this policy. Role ownership of clinician vs formal disclosure must remain clear.
- **Evidence:** [NSW Health PD2023_034 (October 2023), sections 3.1 and 3.6.2](https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2023_034.pdf); [CEC open disclosure](https://cec.health.nsw.gov.au/incident-management/open-disclosure).
- **Risk:** Teaching an optional timeframe where a NSW policy states a minimum requirement; potential delay and confusion of roles.
- **Correction:** Replace with: “**For a patient safety incident requiring open disclosure, the responsible treating clinician/team must undertake clinician disclosure as soon as possible and within 24 hours of identification, including an apology and known facts.** Coordinate with the appropriate clinical lead and local policy. Open disclosure is required where the patient has been harmed; near-miss disclosure is discretionary under PD2023_034. Formal open disclosure is coordinated separately when indicated.” Do not imply an EN or RN independently directs the formal organisational process.
- **Verification:** **Direct PD2023_034 review**.

### F-05 — MODERATE: Patient/carer-concern escalation is left too generic

- **Location:** `det-02`, `det-06`, `adv-com-05`, foundational `deterioration` reading, `deep-communication` reading section 3.
- **Original pattern:** “Take the concern seriously, assess and escalate as indicated by local process”; “patient/carer concern” is described as an important signal.
- **Problem:** Accurate in principle, but the CEC's adult implementation is more actionable: a patient/carer **“Yes”** to the specific getting-worse question is a **Yellow Zone trigger** requiring documentation and response. **Serious concern** by patient/family/staff is an **additional Red Zone trigger** and warrants Rapid Response under local CERS. These distinctions are missing from several prominent teaching items.
- **Evidence:** [CEC guidance for clinicians caring for adults](https://cec.health.nsw.gov.au/safety-essentials/deterioration/worried-they-are-getting-worse/adults) and [standard adult chart](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF).
- **Risk:** A learner knows concern “matters” but not how to document and escalate it within the safety net.
- **Correction to `det-02`:** Specify that the family member answers “Yes” to “Are you worried she is getting worse?” and supply a new preferred option: “Document the Yes, undertake an appropriate A–G assessment, consult the nurse in charge promptly regarding local CERS, communicate the plan and re-escalate for ongoing/serious concern; **serious concern warrants Rapid Response**.” Include a distractor distinguishing generic documentation from the mandatory response. Keep population-specific qualifications.
- **Verification:** **Direct adult CEC implementation review**.

### F-06 — MODERATE: An ordered medicine workflow can mark reasonable variations as wrong

- **Location:** `adv-med-15` and `dist/app.js` `renderChoices`/`markExplored` `order` branch.
- **Original:** Four canonical sequential tasks start “Find and compare the current authorised order ...”, then identify allergy/risk, seek clarification, document plan.
- **Problem:** In a real safety-critical discrepancy, **pausing the potentially unsafe administration and addressing immediate risk** may be the first action and urgent escalation can happen concurrently with record review. The scenario says it is not emergency first aid and the rationale mentions parallel urgent actions, but the UI still requires one rigid sequence to be “correct”. It also lacks an explicit safety pause in the displayed steps.
- **Evidence:** [NSW Medication Handling PD2022_032 PDF](https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2022_032.pdf), subject to policy currency recheck; [ACSQHC Medication Safety Standard](https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/medication-safety-standard).
- **Risk:** Overlearning a linear sequence as a substitute for simultaneous patient-safety and authorisation decisions.
- **Correction:** Amend vignette: “Administration has already been paused and any urgent risk addressed. Practise only the *subsequent documentation/reconciliation workflow*.” Or switch to free-text prioritisation with a defensible set of processes, not exact permutation grading. Add a debrief explaining concurrency and local emergency response.
- **Verification:** **Partially verified**, educational framing judgment requiring pharmacist/RN educator validation.

### F-07 — MODERATE: Revision planner claims objective-only scheduling, but schedules written reflection

- **Location:** `dist/app.js` `renderAnswerPanel`, `markExplored`; `dist/studio.js` `STUDY_SPACING.next` and `planContent`.
- **Original:** A revision button is shown for **every** question after feedback, including `type:'short'` free-text. The planner says “finish any objective practice question”; its algorithm receives `correct=null` for short answers and retains the same interval stage, yet increments attempt count and assigns a later due date.
- **Problem:** A free-text self-reviewed response enters an objective schedule which cannot progress based on assessed recall. This is an integrity/educational feedback mismatch; users may misinterpret the planner as measuring proficiency.
- **Risk:** Misleading claims about memory scheduling and learner progress. **Not a clinical grading error**, because the app correctly avoids scoring free text.
- **Correction:** Hide “Add to revision plan” for short answers or create a visibly separate ungraded reflection-reminder system. Unit test that no `correct=null` submission advances a graded interval or falsely increments “successful recall”.
- **Verification:** **Reproduced by deterministic code-path analysis**; no application changes applied.

### F-08 — LOW: Near-duplicate anticoagulant transition questions

- **Location:** `adv-med-02` and `adv-med-09`.
- **Problem:** Essentially the same anticoagulant omission at ward transfer, same correct action and rationale. Useful reinforcement if deliberate, but no new difficulty or learning objective is provided.
- **Correction:** Retain one; revise the second to explore a clearly different uncertainty (e.g. intentional discontinuation vs verified omission), with an expert-reviewed scenario and sources. Do not delete silently.
- **Verification:** **Direct content comparison**.

### F-09 — LOW: Similar lactate questions add little incremental depth

- **Location:** `adv-sep-04`, `adv-sep-12`.
- **Problem:** Both ask whether elevated lactate alone confirms sepsis and explain that it cannot. Correct general principle but limited advancement.
- **Correction:** Keep one accessible foundation concept; make the other a nuanced, source-verified comparison of trend, alternative causes, organ dysfunction and escalation without inventing diagnostic thresholds.
- **Verification:** **Direct content comparison**; the principle is consistent with CEC's [lactate information](https://cec.health.nsw.gov.au/safety-essentials/deterioration/education/lactate-information).

### F-10 — LOW: AED explanation cites an older glossary rather than current clinical guidance

- **Location:** `res-02` source ID `resusGlossary` (June 2022 PDF).
- **Problem:** The glossary does contain an AED description, but the more specific, current [ANZCOR Guideline 7](https://www.anzcor.org/home/basic-life-support/guideline-7-automated-external-defibrillation-in-basic-life-support) is already registered as `anzcor7` and is a stronger source. Old PDF metadata also shows a working-draft title string, although its content is available; this is a provenance-quality concern, **not proof the source is invalid**.
- **Correction:** Replace `sources:['resusGlossary']` with `sources:['anzcor7']` and reconfirm the answer explanation against current BLS/AED guidance.
- **Verification:** **Both sources opened**.

### F-11 — LOW: Many early MCQ distractors are too implausible for practising nurses

- **Location:** Foundation questions across `deterioration`, `infection`, `medicines`, `communication`, `delirium`, `falls`, `resuscitation` and `professional` modules (48 items).
- **Examples:** `det-05` offers “Repeat observations next week”; `ipc-03` suggests the same gloves across patients; `pro-05` suggests copying another person's CPD record.
- **Problem:** Correct answers are often obvious through unsafe absurd alternatives. This is **an educational-design weakness, not an assertion that the correct answer is wrong**.
- **Correction:** Preserve foundational accessibility, but introduce progressively realistic distractors and nuanced explanations of why seemingly reasonable options are incomplete. Clinician-review all replacement distractors so ambiguity is not introduced.
- **Verification:** **All 48 foundation questions inspected**.

### F-12 — MODERATE: Blanket “source checked” dates overstate item-level provenance

- **Location:** `dist/expansion.js` module iteration assigning `sourceCheckedOn:'2026-10-26'`, then `dist/app.js` feedback note `Source checked` inherited by original questions.
- **Problem:** A uniformly applied date gives the impression that every claim, distractor and rationale was individually checked on that date. It primarily records the previous AI curation pass; it is **not** a per-item evidence matrix or clinician approval.
- **Risk:** False confidence when using the content for staff education.
- **Correction:** Separate **`linkCheckedOn`**, **`claimEvidenceReviewedOn`**, **`clinicalReviewer`**, **`sourceVersion`** and **`approvalStatus`**. Until claim-level evidence exists, display “Official resources linked; question-level verification pending” on affected items. Do not replace the existing date with a fictitious signed-off date.
- **Verification:** **Direct code/data inspection**.

### F-13 — UNVERIFIED: Exact current/superseding NSW medicines directive status

- **Location:** `med-xx`, `adv-med-03`, `adv-med-09`–`18`, medication guide and source register; `medDirective` links PD2022_032.
- **Finding:** The PDF was retrievable from the NSW active-documents path, and the NSW Health official legislation update confirms the **5 November 2026** commencement of the new Act/Regulation. However the dynamic PDS document-detail page could not be used to authoritatively determine whether a **successor Medication Handling directive** has already been issued or precisely when PD2022_032 will be superseded. Search snippets conflict with the accessible PDF, so **no obsolete/current determination is asserted beyond the direct evidence**.
- **Required:** Check the live [Policy Distribution System](https://www1.health.nsw.gov.au/pds/) and applicable organisational directives on/after the transition; record exact replacement, issue date and sections before distributing updated medicine content. Sources: [NSW legislation update](https://www.health.nsw.gov.au/pharmaceutical/Pages/mptg-legislation-update.aspx), [NSW overview](https://www.health.nsw.gov.au/pharmaceutical/Pages/medicines-poisons-laws-overview.aspx).

### F-14 — UNVERIFIED: NMBA direct-page retrieval and detailed regulatory exceptions

- **Location:** `rn`, `en`, `scope`, `cpd` source IDs; questions `pro-01`–`06` and professional guide.
- **Finding:** The research tool returned internal errors when opening the four exact configured URLs. Official NMBA search results confirm the broad 20-hour CPD/5-year record-retention facts and scope/EN supervision context, but the direct in-app links and all registration/endorsement exceptions need manual rechecking in a real browser. **This is not evidence that NMBA pages are broken**.
- **Required:** Manual verify official NMBA direct links, current professional standards, EN/NP nuances and exact endorsement CPD requirements; update local scope authorisations only from the employer.

### F-15 — UNVERIFIED: Facility-specific practice and paid medication knowledge sources are out of scope

- **Location:** All instances of “local CERS”, “local medication policy”, “within role”, “refer to the appropriate pathway”.
- **Finding:** No specific Local Health District, department, local escalation number, signed altered criteria, scope/credential records, medication formulary or paid Medicines Handbook/Therapeutic Guidelines material was provided. The app often appropriately defers to these, but the implied “correct action” is conditional on them.
- **Required:** Clinical governance owner must establish the intended nurse group, clinical setting, approved pathways and authorised scope. Qualified pharmacists/medical specialists should review high-risk drug-specific additions. Never fill missing local data from general intuition.

## C. Ready-to-implement correction pack

The quoted replacement text below is an editorial proposal. Before merging it, perform a nurse-educator review against the actual population/chart/local protocol. Preserve original item IDs where possible to keep learners' saved history.

### C1. `adult-ward-trend` (F-01)

**Replacement scenario addition:** “This is a fictional general adult ward using the NSW Standard Adult General Observation Chart. Assume there are no documented authorised alterations to calling criteria and no applicable end-of-life plan altering the response.”

**Replacement preferred answer:** “At 12:00, recognise the Red Zone respiratory-rate trigger and activate the local Rapid Response. Start an appropriate systematic assessment and supportive care within scope while help is arranged, repeat observations, document and communicate the trend and carer concern.”

**Replacement feedback:** “This scenario includes a Red Zone trigger on the specified adult chart. A Rapid Response through the local CERS is required—not simply a routine review. Other charts, valid altered criteria and patient-specific plans must be checked in real care.”

**Replacement debrief:** “Look at the trajectory, not just a single number. At 12:00, the standard adult chart's Red Zone response governs when the scenario's stated assumptions apply. The clinical cause remains uncertain; continue assessment, Rapid Response, reassessment and communication. This is not an automated live-patient alarm.”

**Source:** [NSW CEC adult chart PDF](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF).

### C2. Evidence Relay ISBAR flag classification (F-02)

**Replacement clue semantics:**

- `observations`, `cognition`, `family`, `response`: *urgent first-call information*.
- `medicines`, `results`: *outstanding information requiring explicit ownership and follow-up*.

**Replacement debrief addition:** “A safe handover must not lose medicines discrepancies or pending results merely because they are not the lead reason for urgent escalation. Name the person/team responsible for each outstanding action and when it must be revisited.”

**Source:** [ACSQHC Communicating for Safety](https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/communicating-safety-standard).

### C3. `deep-sepsis` reading section 4 (F-03)

**Replacement paragraph:** “The Yellow Zone response requires immediate appropriate care, repeat/increased observations and prompt nurse-in-charge consultation to determine whether a Clinical Review or other CERS call should be made. Assess the trend, number of triggers, documented altered criteria and staff/patient/family concern. The Red Zone response requires Rapid Response per local CERS. Serious concern alone can be an additional Red Zone criterion. Continue reassessment and documentation, and do not generalise adult thresholds to maternity, paediatric or specialist charts.”

**Source:** [CEC adult chart PDF](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF).

### C4. `adv-com-03`, `adv-com-06`, communication reading section 4 (F-04)

**Replacement shared wording:** “NSW Health PD2023_034 requires clinician disclosure for incidents requiring disclosure as soon as possible and within 24 hours of incident identification. The responsible treating clinician/team acknowledges the incident, explains facts known at that time and apologises, then coordinates continuing care and any indicated formal open disclosure. When a patient is harmed, open disclosure must occur; near-miss disclosure is discretionary according to the directive. Nurses communicate truthfully and escalate to the responsible senior clinician/organisational process within their role.”

**Source:** [PD2023_034, especially sections 3.1 and 3.6.2](https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2023_034.pdf).

### C5. `det-02` and family-concern teaching (F-05)

**Proposed revised stem:** “In a NSW adult ward, a patient's daughter answers **Yes** to ‘Are you worried they are getting worse?’ The other observations are not yet in a coloured zone. What is the correct response within the standard chart and local CERS?”

**Proposed options:**

1. Record the concern only at the next handover because no numeric chart zone has been triggered.
2. Treat the Yes as a Yellow Zone criterion: listen, document, assess appropriately, promptly consult the nurse in charge and determine local CERS escalation; any serious concern requires Rapid Response.
3. Call a Rapid Response solely because *any* family question, regardless of actual deterioration concern, was asked.
4. Wait until another observation is abnormal before responding.

**Answer:** Option 2 (index 1). **Rationale:** The specific Yes answer is not a neutral note. It activates the additional Yellow Zone response; serious clinical concern is a Red Zone criterion. Use local CERS and document the response and plan. **Source:** [CEC adult implementation](https://cec.health.nsw.gov.au/safety-essentials/deterioration/worried-they-are-getting-worse/adults). The final MCQ should be edited for concision and clinician-tested for option ambiguity.

### C6. `adv-med-15` (F-06)

**Preferred minimum change to stem:** “A potential medication discrepancy has been found. **Administration has already been paused, the patient assessed for immediate harm and the appropriate authorised clinician alerted.** In this non-emergency exercise, arrange the remaining record-checking, reconciliation and documentation tasks into a useful workflow.”

**Rationale addition:** “This proposed sequence is for the information-management phase only. Patient-safety action, urgent assessment and escalation are not deferred until every document has been checked.”

### C7. Revision plan (F-07)

**Design correction:** Show the due-date control only for `single`, `multi`, `calc`, or a future explicitly validated objective task. Written `short` answers may receive an **ungraded reflection reminder**, but must not share the objectively advanced retrieval stage. A test should assert that `short` submissions never display graded-style progression.

### C8. Replacement for near-duplicate `adv-med-09` (F-08)

**Current item:** An anticoagulant appears on the previous chart but not at transfer; clarify the discrepancy. That duplicates `adv-med-02`.

**Proposed different scenario:** “During transfer, an anticoagulant is present on an old chart, and a handover note says it was deliberately ceased because of a new clinical concern. The current order list is different, but the documentation is incomplete. You are the receiving nurse.”

**Proposed stem:** “What should you establish before treating the difference as a verified change in therapy?”

**Options:**

1. Reinstate the old anticoagulant because it was previously charted.
2. Confirm the current authorised decision and its rationale with the responsible prescriber/pharmacist, reconcile the record and communicate the current monitoring/follow-up plan.
3. Remove the medicine from every record without documenting the reason.
4. Assume any handover note is sufficient to authorise administration or cessation without checking the current order and context.

**Proposed answer:** Option 2 (index 1). **Explanation:** A documented change may be intentional, but the receiving team must establish the reliable current authorised plan and avoid silently continuing or restarting high-risk therapy. **Sources:** [ACSQHC Medication Safety Standard](https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/medication-safety-standard), [NSW medication handling PDF (subject to PDS status)](https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2022_032.pdf). A pharmacist/NSW RN educator must validate scenario realism and its final key before use.

### C9. Replacement for repetitive `adv-sep-12` (F-09)

**Current item:** A mildly raised lactate is not proof of sepsis, nearly repeating `adv-sep-04`.

**Proposed scenario:** “An adult with possible infection develops newly increased work of breathing and confusion. A single lactate result is not elevated. A colleague suggests that further clinical review can wait because of that result.”

**Proposed stem:** “Which response best integrates the laboratory result with the patient’s clinical state?”

**Options:**

1. Normal lactate conclusively excludes sepsis and significant deterioration.
2. New cognitive/respiratory change still requires assessment and relevant CERS/sepsis escalation; lactate is only one contextual finding.
3. Treat a single lactate result as an independently definitive diagnosis.
4. Discontinue all observations because laboratory testing has been completed.

**Proposed answer:** Option 2 (index 1). **Explanation:** Laboratory findings do not replace direct assessment, trend recognition or applicable escalation pathways. A single lactate result cannot be used alone to confirm or rule out sepsis. **Sources:** [CEC lactate information](https://cec.health.nsw.gov.au/safety-essentials/deterioration/education/lactate-information), [CEC sepsis pathways](https://cec.health.nsw.gov.au/safety-essentials/deterioration/sepsis). Clinician review required before replacing the question.

### C10. `res-02` AED reference (F-10)

**Keep the core answer:** “Analyse heart rhythm and provide prompts for possible defibrillation.” **Use `anzcor7` as the preferred source.** Improved explanation: “An AED assesses the cardiac rhythm and gives device prompts about whether a shock is advised; follow current resuscitation training and the AED's instructions. AED availability does not remove the need for appropriate BLS measures.”

### C11. Foundation distractors (F-11)

Do **not** replace 48 easy questions with unreviewed traps in one bulk rewrite. Start with `det-05` as a separate **explicit Red Zone** example (document the chart and no altered criteria), and contrast: (A) mandatory Rapid Response, (B) Yellow Zone nurse-in-charge consultation alone, (C) checking another reading before deciding without activating the response, (D) routine handover. Verify that only A is defensible for the stated case. For other modules, add contextual, plausible competing decisions with rationales that explain *why a seemingly helpful step is insufficient*. Require a qualified educator to review the revised keys and distractors.

### C12. Source/provenance metadata (F-12)

Suggested future fields per content ID: `primarySourceId`, `sourceVersionOrIssueDate`, `supportingSection`, `linkCheckedOn`, `claimEvidenceReviewedOn`, `reviewerNameAndRole`, `clinicalApprovalStatus`, `nextReviewOn`, `population`, `setting`, `localPolicyDependency`. Initially keep `claimEvidenceReviewedOn` and `reviewerNameAndRole` **unset** unless an actual content-by-content review occurred. Do not treat the generated `sourceCheckedOn` date as clinician sign-off.

## D. Contradiction and internal consistency register

| Conflict | Locations | Resolution |
|---|---|---|
| Clinical trend has a potentially mandatory adult chart Red Zone response vs feedback deliberately refusing chart zoning | `studio-data.js` trend vs CEC adult chart / `adv-sep-09` Red Zone teaching | F-01 correction: chart-specific Rapid Response in the explicitly standard-adult vignette |
| Marking meds/pending tests not priority vs exemplar ISBAR includes them | `studio-data.js` six clues vs ISBAR model and `studio.js` “not flagged” list | F-02 two-tier urgency vs follow-up labels |
| Yellow Zone “clinical review process” could read as automatic Clinical Review vs official consultation/decision | `deep-sepsis` section 4 vs standard adult chart | F-03 exact 3-part Yellow Zone response |
| “Generally/ normally within 24 hours” vs “must within 24 hours” | `adv-com-03`, `adv-com-06`, `deep-communication` section 4 vs PD2023_034 | F-04 mandatory wording with proper conditional scope |
| Generic patient/carer concern advice vs official trigger-specific documentation and responses | `det-02`, `det-06`, `adv-com-05`, topic guides vs CEC “Worried?” adult implementation | F-05 specify Yes = Yellow and serious concern = Red |
| “Objective practice question” planner copy vs scheduling written reflections with no objective correctness | `studio.js` planner copy vs `app.js` schedule button and `correct=null` | F-07 restrict or separate ungraded scheduling |

**No verified contradiction** was identified between the numerical calculation answers and their arithmetic; see technical section. Other apparently repeated concepts are duplicates, not contradictory medical advice.

## E. Software and content-integrity checks

| Check | Result | Interpretation |
|---|---|---|
| 100 unique question IDs / valid keyed indexes | **PASS** | 73 one-choice, 12 select-all, 10 short reflection, 4 calculation, 1 ordering |
| Every question/reading/case/studio source ID resolves to the runtime source dictionary | **PASS** | Does **not** prove webpage supports every claim |
| Each `readingSection` index points to an existing section | **PASS** | Source-code integrity checked for all 100 |
| Four independent arithmetic assertions | **PASS** | 30/(80/4)=1.5 mL; 240/6=40 mL/h; 0.75×1000=750 mg; (1100+450)−(900+300)=+350 mL |
| Exactly one `preferred` response per guided case stage and in trend choices | **PASS** | Narrative suitability still needs clinician review |
| Correct-response storage and mixed-mode keys | **PASS** in inspected code | No formal property-based fuzz or cross-browser test |
| HTML encoding of learner text before insertion into page | **Present** | `esc` used for written text, scenario data and source labels; not a penetration-test certification |
| Offline bundle includes all bank/studio code, no script tags referencing external assets | **PASS** | Official reference clicks still need internet |
| Revision planner admits ungraded written questions | **F-07** | Inconsistent scheduling semantics |
| Staged case consequence simulation | **LIMITED** | Three-stage feedback variations, not an independent physiologic simulation; labels should not suggest predictive outcomes |
| Link direct-retrieval check | **41 opened, 4 tool errors** | Errors for NMBA not a confirmed dead link; PDS dynamic details remained hard to establish |

### Suggested regression tests before any clinical-content release

1. `trend` standard-adult, no altered criteria, RR30 → displayed Red Zone/Rapid Response educational feedback.
2. `Yellow` criterion → consult nurse in charge, observations, documented A–G assessment/CERS, not automatic ordinary call; serious concern → Rapid Response.
3. Every open-disclosure timing phrase must align to policy-mandated **within 24 hours** for applicable incidents.
4. No `short` objective revision schedule or competence-like progression; correct/incorrect/blank behavior tests for each answer type.
5. All six Evidence Relay clues are either urgent or assigned explicit safety follow-up, not silently excluded by priority scoring.
6. Every reference ID has reachable URL and per-claim support assertion; content index remains valid after any reading reordering.
7. High-risk medicine questions must show authorisation/contraindication/monitoring checks, and numerical questions must be independently recalculated with dimensional units.
8. Tests for alternative clinically defensible orderings of `adv-med-15`, or remove automatic strict-order labelling for that item.
9. Run browser/keyboard/screen reader and extracted Windows-offline smoke checks after changes, preserving the original local storage key.

## F. Missing clinical depth, prioritised

| Priority | Gap | Why it matters / evidence gate |
|---|---|---|
| **Essential safety** | Explicit Yellow/Red + additional criteria, escalation response times, local CERS ownership, altered criteria and population-specific chart selection | Existing clinical cases risk under-specification; require current chart and local nurse educator sign-off |
| **Essential safety** | Allergy/adverse reaction distinction, medicine authorisation, reconciliation at handover, high-risk monitoring, new November 2026 medicines-law implementation | Requires qualified medication nurse/pharmacist review, PDS verification and local policy |
| **Essential safety** | RN vs EN supervision/delegation, competency limits, clinical documentation, privacy and consent | Needs NMBA standards and employer-specific scope |
| **High educational value** | Cardiovascular assessment, ECG basics, acute respiratory physiology, ABG interpretation and oxygen therapy | Avoid teaching universal ranges/actions without population and device context; validate with current NSW/ANZCOR/ACSQHC material |
| **High educational value** | Diabetes emergencies, fluid/electrolyte issues, acute kidney injury, anticoagulation and bleeding | Medicine-specific algorithms need pharmacist/medical review before assessment items |
| **High educational value** | Stroke recognition, subtle delirium, frailty, skin breakdown, sepsis in non-adult populations | Needs relevant specialty NSW pathways and formal population labels |
| **Developmental** | Richer nursing prioritisation and concurrent task handling, better distractors, uncertainty mapping, non-MCQ teach-back | Require explicit feedback on reasonable alternatives, not a single false “perfect” sequence |

**Reading depth:** Most foundation guides contain only three short sections and no explicit learning-objective array. Even advanced guides are typically four to six compact paragraphs, insufficient for a practising nurse seeking substantive pathophysiology, relevant investigations and exceptions. Expand deliberately by clinical domain, not by word count; attach source/version and reviewer to each new section. Preserve the simple foundation pathway as a starting point.

## G. Reference verification results (26 October 2026)

All **45** configured IDs are listed in the companion inventory with their exact URLs. The 45 references contain **42** distinct URLs due to aliases (`medication`/`medStandard`, `handover`/`identity`, `anzcor`/`anzcor8`). Direct retrieval **succeeded on 41 IDs**; **4 NMBA direct requests failed in the research tool**, but official NMBA search results supported broad CPD/scope facts. This does not constitute a complete broken-link or per-claim-citation audit.

| Official reference | What was directly supported | Version/status caveat |
|---|---|---|
| [CEC Standard Adult General Observation Chart](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF) | Yellow Zone nurse-in-charge consultation, Red Zone Rapid Response, additional concern and consciousness criteria | Chart document itself retrieved; check exact population, amendments and local CERS before live use |
| [CEC adult “Worried they are getting worse?”](https://cec.health.nsw.gov.au/safety-essentials/deterioration/worried-they-are-getting-worse/adults) | Specific “Yes” Yellow Zone and serious concern Rapid Response guidance | Adult implementation; do not universalise across patient groups |
| [CEC Adult Sepsis Pathway](https://cec.health.nsw.gov.au/__data/assets/pdf_file/0005/291803/Adult-Sepsis-Pathway.PDF) | Applicable from age 16; maternal exception up to six weeks postpartum; immunocompromise and local febrile-neutropenia caveat | Recheck local pathway version at use |
| [ACSQHC Sepsis Clinical Care Standard](https://www.safetyandquality.gov.au/clinical-care-standards/sepsis) | Assessment, multidisciplinary management and monitoring principles | Does not validate a patient-specific diagnosis or invented dosage |
| [ACSQHC High risk medicines and systems](https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems) | APINCHS groups used in `adv-med-01` | Locally used high-risk lists and safeguards vary |
| [NSW Health medication-handling PDF PD2022_032](https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2022_032.pdf) | Historic/current-at-review medicines handling policy text retrieved | Exact PDS current/supersession status **unverified**; legal transition 5 Nov 2026 |
| [NSW Health medicines legislation update](https://www.health.nsw.gov.au/pharmaceutical/Pages/mptg-legislation-update.aspx) | Act 2022/Regulation 2026 scheduled to commence **5 November 2026** | Transition imminent; policy recheck required before further release |
| [NSW Health Open Disclosure PD2023_034](https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2023_034.pdf) | Must-disclose if patient harmed; near-miss discretionary; clinician disclosure within 24h; formal process where required | Issued October 2023; verify future amendments in PDS |
| [ACSQHC Communicating for Safety](https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/communicating-safety-standard) and [ISBAR card](https://www.safetyandquality.gov.au/resources/isbar-promptcard-template) | Information transfer, accountability, communication structure | Not a template that determines local urgent call criteria |
| [ANZCOR Guideline 3](https://www.anzcor.org/home/basic-life-support/guideline-3-recognition-and-first-aid-management-of-the-unconscious-person), [Guideline 7](https://www.anzcor.org/home/basic-life-support/guideline-7-automated-external-defibrillation-in-basic-life-support), [Guideline 8](https://www.anzcor.org/home/basic-life-support/guideline-8-cardiopulmonary-resuscitation-cpr) | Unconscious person with normal breathing; AED; CPR if unresponsive and not breathing normally | Educational app cannot replace resuscitation practical training |
| [NMBA CPD requirements](https://www.nursingmidwiferyboard.gov.au/Registration-Standards/Understanding-CPD-for-nurses-and-midwives) and [scope factsheet](https://www.nursingmidwiferyboard.gov.au/Codes-Guidelines-Statements/FAQ/Fact-sheet-scope-of-practice-and-capabilities-of-nurses) | 20h CPD usual RN/EN and five-year record retention supported by official search; scope varies with role and authorisation | Exact configured NMBA URL direct retrieval failed, manual verification pending |

**Do not describe policy PDFs, broad standards or a working hyperlink as proof that every attached answer is correct.** Each significant clinical assertion should eventually be linked to an exact version, section and review date.

## H. Second independent challenge of findings

This is a deliberate *second AI reasoning pass*, not an additional human reviewer.

**Senior NSW nurse educator lens:** The greatest safety concern is not whether the Trend Detective identifies deterioration—its preferred option does—but whether a nurse rehearsing chart recognition learns the mandatory response for an adult Red Zone at the demonstrated value. The current chart supports F-01, so the finding remains **HIGH**. For patient/carer concern, the first-pass generic wording is broadly true but omits specific Yellow/Red operational steps; F-05 remains **MODERATE**. For Evidence Relay, it would be too strong to assert that both pending investigations and an incomplete medicine list belong in the first second of every urgent call; the contradiction is about **handover follow-up ownership**, so F-02 remains **MODERATE**, not HIGH.

**Australian GP medical lens:** Lactate elevation does not itself confirm septic shock, and low/no fever does not safely dismiss infection in an immunocompromised, deteriorating person. The existing sepsis reasoning was not contradicted by the accessible CEC sources. The fictional adult trend nevertheless contains a potential objective Red Zone and must distinguish emergency escalation from diagnosis; F-01 remains. The medicines calculation results are arithmetically sound but cannot be treated as clinically authorised doses. The review found **no supported basis** to rewrite medicine prescriptions or prescribe a treatment algorithm from the case data.

**Rechallenge of policy finding:** The PD2023_034 source uses mandatory “within 24 hours” language, so replacing “generally” is justified. It also defines discretionary near-miss disclosure; the correction must preserve that exception, and it must not imply the bedside RN/EN independently owns formal disclosure. F-04 remains **MODERATE**.

**Risk of false certainty:** A clean structural test suite cannot rule out clinical misinformation. No claim of full clinical verification should follow from this audit, and no finding severity is downgraded merely because the app is labelled educational.

## I. Prioritised correction and governance plan

1. **Before any further educational release:** resolve **F-01**, validate corrected scenario and trend-zone interpretation with a practising NSW senior nurse educator, and add a regression test against the specified adult chart assumptions.
2. **Same safety pass:** resolve **F-03/F-05** for Yellow/Red and carer-concern workflow, **F-04** for mandatory disclosure phrasing, and **F-02** for evidence/follow-up handover. Review updated wording with authorised organisational staff.
3. **Clinical source validation:** resolve **F-13–F-15**: PDS transition and successor directives, exact NMBA source/role/scope, facility-specific CERS and medication governance. Use pharmacist and medical specialty reviewers as appropriate.
4. **Software educational integrity:** resolve **F-06/F-07/F-12**, add specific test coverage and make item-level provenance accurate. Preserve stable question IDs and migrate progress safely.
5. **Longer-term quality:** reduce near-duplicates and unrealistic distractors (F-08–F-11), expand deeper reading modules with source-linked physiology/context, undertake accessibility/offline Windows QA and repeat a **complete claim-by-claim review for all 100 questions and 47 reading sections**.
6. **Sign-off workflow:** store named reviewer, qualifications, local scope/setting, official source title/version/date/section, findings and correction diffs, second reviewer challenge, approval and next review due date. Require organisational governance authorisation before describing the app as suitable for staff training or accredited CPD.

### Explicit conclusion

**REQUIRES SUBSTANTIAL CORRECTION.** One evidenced high-severity clinical escalation-teaching finding remains in the currently published v1.4 experience. Seven moderate and four low issues, three defined external-verification gaps, 77 question-level primary-source comparisons and many guide claims remain unresolved. **This audit is complete as an accessible-source *inventory and initial systematic risk screen*, not complete as a fully evidenced independent clinical sign-off.** No source code, hosted application or downloadable build was changed during this audit.
