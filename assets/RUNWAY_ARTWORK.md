# Runway artworks — v1.6

Three detailed fictional hospital scene illustrations were generated in the user's Runway workspace on **13 November 2026**. These are **illustrative only**; clinical observations are supplied separately in the application. They are not medical photographs or diagnostic illustrations.

| Case | Runway task ID | Runway asset ID |
|---|---|---|
| Evolving chest discomfort (ACS reasoning) | `8e41f6d6-38bf-4da3-a457-9f028877bc20` | `fa12fa0d-ad6e-4aca-85b4-b867eee5f750` |
| COPD, fatigue and arterial blood gas | `29a8e518-4f34-4cdd-ade4-848c91d0224f` | `dfbf214c-b368-4a1b-862d-5e485f13d6fa` |
| AKI and potassium trend | `a2a065bc-2040-4799-ad3e-1e6fbccb8ed6` | `4b216948-29bf-472f-9ae1-a5e20f26b2d2` |

The three Runway files are available in the connected Runway workspace by the task IDs above. The connector provided **temporary signed preview links**, but this environment could not retrieve original image bytes into the filesystem. As their links expire, those links are intentionally **not embedded in the released app or shared source files**.

To integrate the actual Runway illustration durably: download each finished image from Runway, open **Clinical reasoning rounds** in the app, select its case, and use **Import Runway artwork**. The application compresses the selected image locally and saves it in that browser's local storage; it never uploads the image. For a shareable source rebuild instead place the downloaded files as `assets/runway/acs.webp`, `assets/runway/resp.webp`, or `assets/runway/renal.webp` (PNG also supported) and run `python developer/build.py`. The original Runway art then becomes embedded inside the standalone HTML export.

Until an image is imported, each case displays the included authored SVG schematic instead. These are clearly identified as local fallback diagrams rather than Runway outputs. All three cases remain fully usable offline.

Do not infer clinical measurements or test results from generated artwork; the case data are the sources of those values. No real patient images were used.


## Added in v1.7 — older three rounds now illustrated too

| Previously unillustrated round | Key | Task ID |
|---|---|---|
| When the numbers change (suspected infection/deterioration) | `sepsis` | `bbfc9fab-6e52-447e-9890-d594cb055991` |
| The quiet deterioration (postoperative sedation) | `opioid` | `16230bc5-e5d3-48db-9d3e-89ee23837382` |
| “She has gone quiet” (hypoactive delirium) | `delirium` | `28c59c69-d07b-4146-9fb0-14cbf49c98ec` |

**Transfer constraint:** The Runway connection exposes image URLs but not permanent local asset bytes in this environment. The originals remain in Runway, not inside this ZIP. Each of the six rounds has a purpose-built offline vector illustration. To embed actual Runway originals for all learners, download one image for each key and put it in `assets/runway/<key>.webp` or `.png`, then run `python developer/build.py`. The local import control works per browser/device without downloading from the internet.
