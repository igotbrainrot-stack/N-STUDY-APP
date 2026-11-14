# NSW Nursing Study Lab v1.4 — Complete item-location and reference inventory

**26 October 2026 · Read-only audit.** Generated from the actual runtime-loaded bank (`questions.js`, `readings.js`, `expansion.js`, `cases.js`, `studio-data.js`). See companion `NSW_NURSING_CLINICAL_AUDIT_v1.4.md` for judgments, limitations and corrections.

**Status definitions:** `TARGETED` = core claim/answer compared against a relevant primary reference during this AI review, but **not independently clinician-validated**. `PENDING` = complete text/answer/distractors reviewed in the source-code inspection; direct claim-by-claim evidence check still pending. All 100 questions await human review. Finding IDs indicate specific documented concerns. Zero finding IDs do not imply that an answer is certified correct.

## Every question, keyed answer, reference and reading target

Keys are **zero-based indexes** as stored in JavaScript (`0` = first option). Multi-select uses comma-separated indexes; `model` denotes human self-check, `order` a proposed sequence. No questions were edited.

| Question ID | Format | Declared key/answer | Cited source IDs | Reading section | Primary-source check | Findings |
|---|---|---|---|---:|---|---|
| `det-01` | single | 1 | charts, cers | 0 | TARGETED | — |
| `det-02` | single | 2 | concerns, btf | 0 | TARGETED | F-05 |
| `det-03` | single | 0 | sepsis | 0 | TARGETED | — |
| `det-04` | single | 1 | sepsis | 0 | TARGETED | — |
| `det-05` | single | 1 | charts, cers | 0 | TARGETED | — |
| `det-06` | single | 2 | concerns | 0 | TARGETED | F-05 |
| `ipc-01` | single | 1 | moments, hands | 0 | PENDING | — |
| `ipc-02` | single | 2 | moments | 0 | PENDING | — |
| `ipc-03` | single | 2 | hands, gloves | 0 | PENDING | — |
| `ipc-04` | single | 1 | hands | 0 | PENDING | — |
| `ipc-05` | single | 1 | precautions | 0 | PENDING | — |
| `ipc-06` | single | 1 | precautions | 0 | PENDING | — |
| `med-01` | single | 1 | medication | 0 | PENDING | — |
| `med-02` | single | 1 | chartsMed | 0 | PENDING | — |
| `med-03` | single | 0 | medication, chartsMed | 0 | PENDING | — |
| `med-04` | single | 1 | medication | 0 | PENDING | — |
| `med-05` | single | 0 | chartsMed | 0 | PENDING | — |
| `med-06` | single | 1 | medication | 0 | PENDING | — |
| `com-01` | single | 1 | isbar | 0 | PENDING | — |
| `com-02` | single | 1 | handover, communication | 0 | PENDING | — |
| `com-03` | single | 1 | communication | 0 | PENDING | — |
| `com-04` | single | 2 | isbar | 0 | PENDING | — |
| `com-05` | single | 1 | communication | 0 | PENDING | — |
| `com-06` | single | 2 | isbar | 0 | PENDING | — |
| `del-01` | single | 1 | delirium | 0 | PENDING | — |
| `del-02` | single | 0 | delirium | 0 | PENDING | — |
| `del-03` | single | 1 | delirium | 0 | PENDING | — |
| `del-04` | single | 1 | delirium | 0 | PENDING | — |
| `del-05` | single | 1 | delirium | 0 | PENDING | — |
| `del-06` | single | 1 | delirium | 0 | PENDING | — |
| `fall-01` | single | 1 | comprehensive | 0 | PENDING | — |
| `fall-02` | single | 0 | cecCare | 0 | PENDING | — |
| `fall-03` | single | 1 | rounding | 0 | PENDING | — |
| `fall-04` | single | 1 | nutrition | 0 | PENDING | — |
| `fall-05` | single | 0 | comprehensive | 0 | PENDING | — |
| `fall-06` | single | 1 | cecCare | 0 | PENDING | — |
| `res-01` | single | 0 | anzcor8, anzcor7, cers | 0 | TARGETED | — |
| `res-02` | single | 1 | resusGlossary | 0 | TARGETED | F-10 |
| `res-03` | single | 1 | resuscitation | 0 | PENDING | — |
| `res-04` | single | 1 | resuscitation, resusFaq | 0 | PENDING | — |
| `res-05` | single | 1 | anzcor3 | 0 | TARGETED | — |
| `res-06` | single | 1 | anzcor, resuscitation | 0 | PENDING | — |
| `pro-01` | single | 1 | scope, rn, en | 0 | TARGETED | — |
| `pro-02` | single | 0 | cpd | 0 | PENDING | — |
| `pro-03` | single | 2 | cpd | 0 | TARGETED | — |
| `pro-04` | single | 1 | cpd | 0 | TARGETED | — |
| `pro-05` | single | 1 | cpd | 0 | PENDING | — |
| `pro-06` | single | 1 | scope, rn, en | 0 | PENDING | — |
| `adv-sep-01` | single | 1 | sepsisAdult, sepsisStd, charts | 0 | TARGETED | — |
| `adv-sep-02` | multi | 0,1,2 | sepsisAdult | 0 | TARGETED | — |
| `adv-sep-03` | short | model | sepsisAdult, cers | 0 | TARGETED | — |
| `adv-sep-04` | single | 1 | lactate, sepsisStd | 0 | PENDING | F-09 |
| `adv-sep-05` | multi | 0,1,2 | sepsisStd | 0 | PENDING | — |
| `adv-sep-06` | short | model | isbar, communication, sepsisStd | 0 | PENDING | — |
| `adv-sep-07` | single | 1 | concerns, btf | 0 | PENDING | — |
| `adv-sep-08` | single | 1 | sepsisStd, cers | 0 | PENDING | — |
| `adv-sep-09` | single | 0 | adultChart, cers | 4 | TARGETED | — |
| `adv-sep-10` | multi | 0,1,2 | btf, concerns, sepsisAdult | 0 | PENDING | — |
| `adv-sep-11` | single | 1 | isbar, communication, cers | 2 | PENDING | — |
| `adv-sep-12` | single | 1 | lactate, sepsisStd | 1 | PENDING | F-09 |
| `adv-sep-13` | short | model | btf, concerns, adultChart | 0 | PENDING | — |
| `adv-sep-14` | multi | 0,1,2 | isbar, communication, cers | 2 | PENDING | — |
| `adv-sep-15` | single | 1 | sepsis, sepsisAdult | 5 | TARGETED | — |
| `adv-sep-16` | single | 0 | sepsisAdult | 5 | TARGETED | — |
| `adv-sep-17` | multi | 0,1,2 | adultChart, cers | 4 | TARGETED | — |
| `adv-sep-18` | single | 1 | adultChart, btf | 4 | PENDING | — |
| `adv-med-01` | multi | 0,1,2 | highrisk, medStandard | 0 | TARGETED | — |
| `adv-med-02` | single | 1 | medication, highrisk | 0 | PENDING | F-08 |
| `adv-med-03` | short | model | medDirective, chartsMed, medStandard | 0 | PENDING | — |
| `adv-med-04` | single | 1 | highrisk, medStandard | 0 | PENDING | — |
| `adv-med-05` | multi | 0,1,2 | medStandard, highrisk | 0 | PENDING | — |
| `adv-med-06` | short | model | medication, chartsMed, communication | 0 | PENDING | — |
| `adv-med-07` | single | 1 | chartsMed, medStandard | 0 | PENDING | — |
| `adv-med-08` | single | 1 | highrisk, medStandard | 0 | PENDING | — |
| `adv-med-09` | single | 1 | highrisk, medDirective, medStandard | 1 | PENDING | F-08 |
| `adv-med-10` | multi | 0,1,2 | highrisk, medStandard, medDirective | 0 | PENDING | — |
| `adv-med-11` | calc | 1.5 | medDirective, medStandard | 4 | PENDING | — |
| `adv-med-12` | calc | 40 | medDirective, medStandard | 4 | PENDING | — |
| `adv-med-13` | calc | 750 | medDirective, medStandard | 4 | PENDING | — |
| `adv-med-14` | calc | 350 | comprehensive, medStandard | 4 | PENDING | — |
| `adv-med-15` | order | order | medDirective, medStandard | 1 | PENDING | F-06 |
| `adv-med-16` | single | 1 | medDirective, chartsMed | 2 | PENDING | — |
| `adv-med-17` | short | model | medStandard, medDirective, highrisk | 3 | PENDING | — |
| `adv-med-18` | single | 1 | medLaw, medTransition, medDirective | 5 | TARGETED | — |
| `adv-del-01` | single | 0 | delirium | 0 | PENDING | — |
| `adv-del-02` | multi | 0,1,2 | delirium | 0 | PENDING | — |
| `adv-del-03` | short | model | delirium, communication | 0 | PENDING | — |
| `adv-del-04` | single | 1 | comprehensive, delirium, cecCare | 0 | PENDING | — |
| `adv-del-05` | multi | 0,1,2 | psychotropic, delirium | 0 | PENDING | — |
| `adv-del-06` | short | model | delirium | 0 | PENDING | — |
| `adv-del-07` | single | 1 | cecCare, comprehensive | 0 | PENDING | — |
| `adv-del-08` | single | 1 | nutrition, comprehensive, delirium | 0 | PENDING | — |
| `adv-com-01` | single | 1 | communication, isbar | 0 | PENDING | — |
| `adv-com-02` | multi | 0,1,2 | communication, handover | 0 | PENDING | — |
| `adv-com-03` | short | model | disclosurePolicy, disclosure | 0 | TARGETED | F-04 |
| `adv-com-04` | single | 1 | consent | 0 | PENDING | — |
| `adv-com-05` | single | 1 | concerns, cers | 0 | PENDING | F-05 |
| `adv-com-06` | multi | 0,1,2 | disclosurePolicy, disclosure | 0 | TARGETED | F-04 |
| `adv-com-07` | short | model | isbar, communication, chartsMed | 0 | PENDING | — |
| `adv-com-08` | single | 1 | disclosurePolicy | 0 | PENDING | — |

## Reading-guide inventory

Each guide's full lead, all section bodies, reflection prompt and source array were inspected. Section IDs in this table are zero-based as displayed in related-reading jumps. Formal item-by-item source validation remains pending.

| Guide ID | Section IDs and exact section headings |
|---|---|
| `deterioration` (3 sections) | `0` Read the trajectory · `1` Respond to triggers · `2` Think sepsis early |
| `infection` (3 sections) | `0` The 5 Moments · `1` Build from standard precautions · `2` See the entire workflow |
| `medicines` (4 sections) | `0` Reconcile at transitions · `1` Make allergies useful · `2` High-risk does not mean never use · `3` NSW handling directives and the November 2026 change |
| `communication` (3 sections) | `0` Structure the information · `1` Close the loop · `2` Partner with the patient |
| `delirium` (3 sections) | `0` Know the baseline · `1` Prevent and support · `2` Protect continuity |
| `falls` (3 sections) | `0` Look beyond a risk score · `1` Avoid creating another problem · `2` Include devices and nutrition |
| `resuscitation` (4 sections) | `0` Recognise and activate · `1` Know your role · `2` Learn from the system · `3` Two distinct emergency responses |
| `professional` (3 sections) | `0` Scope is contextual · `1` Reason, document, improve · `2` Use this as self-directed learning |
| `deep-sepsis` (6 sections) | `0` Start with a dynamic clinical picture · `1` Interpret lactate carefully · `2` Communicate uncertainty without delay · `3` Follow through · `4` Recognise threats before a diagnosis is confirmed · `5` Choose the right population and pathway |
| `deep-medication` (6 sections) | `0` High-risk classes and systems · `1` Reconciliation is investigation · `2` Handle incomplete allergy information · `3` Ask what happens after the dose · `4` Use dimensional analysis for the arithmetic · `5` Check the transition in NSW medicines law |
| `deep-delirium` (4 sections) | `0` A change may be subtle · `1` Use multicomponent prevention · `2` Balance harms · `3` Review psychotropics carefully |
| `deep-communication` (5 sections) | `0` Give the receiving clinician a usable plan · `1` Consent is a process · `2` After an incident · `3` Treat concerns as actionable data · `4` Apology and the NSW open disclosure framework |

## Case decisions and new studio components

| ID | Clinical unit inspected | Count/format |
|---|---|---|
| `deterioration-case` | Adult deterioration scenario, context, available transition variants, three preferred actions, all nine option-specific feedback items, three rationales and debrief | 3 stages × 3 choices = 9 choices |
| `medication-case` | Order-allergy reconciliation scenario, transition variants, three preferred actions, all nine option-specific feedback items, three rationales and debrief | 3 stages × 3 choices = 9 choices |
| `adult-ward-trend` | Four fictional timepoints (RR 18, 21, 25, 30; pulse 86, 97, 111, 124), three candidate interpretations, choice-specific feedback and debrief | 1 clinical studio activity |
| `evidence-relay` | All six clues, two `priority=false` flags, five ISBAR model fields, three debrief points and six clue explanations | 1 clinical studio activity |
| `revision planner` | 1/3/7/21-day intervals; per-question scheduling semantics and local progress integration | 1 non-clinical learning feature |

## Source register as actually linked

Direct web retrieval was attempted for all 45 source IDs. `TOOL ERROR` denotes inability to retrieve directly with the research tool, **not proof the website is broken**; those NMBA pages were independently located in official search results. Some source IDs alias the same URL. Source availability does not establish that it supports every attached statement.

| Source ID | Actual URL in application | Direct retrieval |
|---|---|---|
| `btf` | https://cec.health.nsw.gov.au/safety-essentials/deterioration | Opened 26 Oct 2026 |
| `charts` | https://cec.health.nsw.gov.au/safety-essentials/deterioration/observation-charts | Opened 26 Oct 2026 |
| `sepsis` | https://cec.health.nsw.gov.au/safety-essentials/deterioration/sepsis | Opened 26 Oct 2026 |
| `concerns` | https://cec.health.nsw.gov.au/safety-essentials/deterioration/worried-they-are-getting-worse | Opened 26 Oct 2026 |
| `cers` | https://cec.health.nsw.gov.au/safety-essentials/deterioration/emergency-response-system | Opened 26 Oct 2026 |
| `hands` | https://www.safetyandquality.gov.au/clinical-topics/infection-prevention-and-control/national-hand-hygiene-initiative | Opened 26 Oct 2026 |
| `moments` | https://www.safetyandquality.gov.au/resources/5-moments-hand-hygiene-poster | Opened 26 Oct 2026 |
| `precautions` | https://www.safetyandquality.gov.au/clinical-topics/infection-prevention-and-control/standard-and-transmission-based-precautions | Opened 26 Oct 2026 |
| `gloves` | https://www.safetyandquality.gov.au/resources/sustainable-glove-use-healthcare-workers-fact-sheet | Opened 26 Oct 2026 |
| `medication` | https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/medication-safety-standard | Opened 26 Oct 2026 |
| `chartsMed` | https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/medication-charts | Opened 26 Oct 2026 |
| `qum` | https://www.safetyandquality.gov.au/elearning/qum-learning | Opened 26 Oct 2026 |
| `handover` | https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/communicating-safety-standard | Opened 26 Oct 2026 |
| `communication` | https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/communicating-safety-standard/further-information | Opened 26 Oct 2026 |
| `isbar` | https://www.safetyandquality.gov.au/resources/isbar-promptcard-template | Opened 26 Oct 2026 |
| `identity` | https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/communicating-safety-standard | Opened 26 Oct 2026 |
| `delirium` | https://www.safetyandquality.gov.au/clinical-care-standards/delirium | Opened 26 Oct 2026 |
| `comprehensive` | https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/comprehensive-care-standard | Opened 26 Oct 2026 |
| `cecCare` | https://cec.health.nsw.gov.au/safety-essentials/comprehensive-care/resources | Opened 26 Oct 2026 |
| `rounding` | https://cec.health.nsw.gov.au/improving-practice-and-culture/for-teams/intentional-rounding | Opened 26 Oct 2026 |
| `nutrition` | https://cec.health.nsw.gov.au/safety-essentials/comprehensive-care/domains/nutrition-and-hydration | Opened 26 Oct 2026 |
| `anzcor` | https://www.anzcor.org/home/basic-life-support/guideline-8-cardiopulmonary-resuscitation-cpr | Opened 26 Oct 2026 |
| `resuscitation` | https://www.resus.org.au/training-and-education/standards-for-resuscitation-clinical-practice-and-education | Opened 26 Oct 2026 |
| `resusFaq` | https://www.resus.org.au/training-and-education/faq | Opened 26 Oct 2026 |
| `resusGlossary` | https://www.resus.org.au/assets/Documents/glossary-june-2022.pdf | Opened 26 Oct 2026 |
| `rn` | https://www.nursingmidwiferyboard.gov.au/Codes-Guidelines-Statements/Professional-standards/registered-nurse-standards-for-practice | TOOL ERROR; official search result located |
| `en` | https://www.nursingmidwiferyboard.gov.au/Codes-Guidelines-Statements/Professional-standards/enrolled-nurse-standards-for-practice | TOOL ERROR; official search result located |
| `scope` | https://www.nursingmidwiferyboard.gov.au/Codes-Guidelines-Statements/FAQ/Fact-sheet-scope-of-practice-and-capabilities-of-nurses | TOOL ERROR; official search result located |
| `cpd` | https://www.nursingmidwiferyboard.gov.au/Registration-Standards/Understanding-CPD-for-nurses-and-midwives | TOOL ERROR; official search result located |
| `sepsisStd` | https://www.safetyandquality.gov.au/clinical-care-standards/sepsis | Opened 26 Oct 2026 |
| `sepsisAdult` | https://www.cec.health.nsw.gov.au/__data/assets/pdf_file/0005/291803/Adult-Sepsis-Pathway.PDF | Opened 26 Oct 2026 |
| `lactate` | https://cec.health.nsw.gov.au/safety-essentials/deterioration/education/lactate-information | Opened 26 Oct 2026 |
| `highrisk` | https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems | Opened 26 Oct 2026 |
| `medStandard` | https://www.safetyandquality.gov.au/national-standards/nsqhs-standards/medication-safety-standard | Opened 26 Oct 2026 |
| `psychotropic` | https://www.safetyandquality.gov.au/clinical-care-standards/psychotropic-medicines-cognitive-disability-or-impairment | Opened 26 Oct 2026 |
| `disclosure` | https://cec.health.nsw.gov.au/incident-management/open-disclosure | Opened 26 Oct 2026 |
| `consent` | https://www.safetyandquality.gov.au/clinical-topics/informed-consent | Opened 26 Oct 2026 |
| `adultChart` | https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF | Opened 26 Oct 2026 |
| `medDirective` | https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2022_032.pdf | Opened 26 Oct 2026 |
| `medLaw` | https://www.health.nsw.gov.au/pharmaceutical/Pages/mptg-legislation-update.aspx | Opened 26 Oct 2026 |
| `medTransition` | https://www.health.nsw.gov.au/pharmaceutical/Pages/changes-for-healthcare-settings.aspx | Opened 26 Oct 2026 |
| `disclosurePolicy` | https://www1.health.nsw.gov.au/pds/ActivePDSDocuments/PD2023_034.pdf | Opened 26 Oct 2026 |
| `anzcor3` | https://www.anzcor.org/home/basic-life-support/guideline-3-recognition-and-first-aid-management-of-the-unconscious-person | Opened 26 Oct 2026 |
| `anzcor7` | https://www.anzcor.org/home/basic-life-support/guideline-7-automated-external-defibrillation-in-basic-life-support | Opened 26 Oct 2026 |
| `anzcor8` | https://www.anzcor.org/home/basic-life-support/guideline-8-cardiopulmonary-resuscitation-cpr | Opened 26 Oct 2026 |

## Limits

- All accessible content objects were inspected for structure, key and semantics; only the items marked `TARGETED` received specific external primary-source comparison during this pass. No primary-source line-by-line substantiation is implied for `PENDING` rows.
- The owner has not provided any LHD/facility CERS document, medicine handling authorisations, local nursing scope policies or access to paid Australian Medicines Handbook/Therapeutic Guidelines resources.
- New external site policies, real-world practice and the clinical interpretation of scenarios require independent qualified review. The requested audit did **not** change the application.
