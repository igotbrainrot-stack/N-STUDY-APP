# Clinical and technical review queue (31 October 2026)

This is a **handover queue**, not a completed clinical audit of v1.5. For original detailed evidence and editorial alternatives, read `NSW_NURSING_CLINICAL_AUDIT_v1.4.md`.

| ID(s) | Urgency | Historical issue | v1.5 disposition (from offline code / not external re-audit) | Next verification |
|---|---|---|---|---|
| F-01 | High originally | Red Zone RR 30/min in Trend Detective lacked specific Rapid Response message | **Wording updated in v1.5** to call Rapid Response; independent clinical check still pending | Cross-check latest applicable NSW adult chart and local CERS exception conditions |
| F-02 | Moderate | Evidence Relay clue priority vs model ISBAR mismatch | Not confirmed fixed | Compare selected clue labels and handover exemplar |
| F-03, F-05 | Moderate | Yellow Zone workflow, patient/family concern actions underspecified | Not confirmed fixed | Reconcile with CEC observation chart and response protocols |
| F-04 | Moderate | Open disclosure timing and formalisation | Not confirmed fixed | Check current NSW directive, scope and wording |
| F-06 | Moderate | Ordered medication-reconciliation workflow can penalise concurrent safety action | Not confirmed fixed | Separate immediate safety pause and reconciliation steps |
| F-07 | Moderate | Spaced revision for ungraded short answers misleading | Not confirmed fixed | Test objective vs reflection scheduling |
| F-08–F-11 | Low | Similar anticoagulation/lactate items; AED citation; easy distractors | Not confirmed fixed | Improve incrementally without changing valid educational content unnecessarily |
| F-12 | Moderate | Blanket source-checked date misrepresents question-specific external verification | Still requires provenance model | Add distinct link checked, claim checked, version, reviewer, status fields |
| F-13 | Unverified | NSW medicines legislation/medication directive supersession | **New transition scheduled for 5 Nov 2026; verify date and live PDS status** | Check NSW PDS and current legislation post-transition |
| F-14 | Unverified | NMBA direct link and regulatory exceptions | Not confirmed fixed | Verify direct NMBA links and scope nuances |
| F-15 | Unverified | LHD practice and paid references not supplied | Not locally verifiable | Explicit conditional wording, don't infer LHD rules |
| NEW v1.5 | Review | Three advanced rounds, 12 stages, 12 readings | **No independent claim-level audit in packaged evidence** | Case-by-case source mapping and clinical educator sign-off if ever used formally |

**General:** Do not claim clinical approval. The user's purpose is personal study, with independent cross-checking. The v1.4 audit record (1 high / 7 moderate / 4 low / 3 unverified) must not be misrepresented as a v1.5 audit.

## v1.6 continuation (13 November 2026)

- Added three specialty rounds in `developer/src/09_specialty_expansion.js`; the original 100 question IDs remain untouched. These new cases require independent clinical review if ever used formally.
- F-13 medicines legislation timing has been **updated** in the UI to show that the new Act and Regulation commenced on 5 November 2026; separate check of individual NSW medication directives and local policy is still necessary.
- Three new Runway outputs live in the user's Runway workspace; the offline release has a local-import UI and SVG placeholders. For a durable embedded Runway release, manually obtain the image bytes and rebuild.
- Real browser interaction testing was blocked by environment policy, although static tests and a simulated DOM interaction check passed.
