# Clinical case illustrations

Six self-contained, colourful 2.5D/cartoon-style illustrations created for the user's personal NSW Nursing Study Lab on 13–14 November 2026.

| Key | Subject |
|---|---|
| `acs` | Adult with chest discomfort being assessed |
| `resp` | Older person with worsening breathlessness |
| `renal` | Fluid balance and suspected kidney injury |
| `sepsis` | Patient deterioration and assessment escalation |
| `opioid` | Postoperative sedation and respiratory assessment |
| `delirium` | Older person with new confusion and family concerns |

Images show **fictional patients** and are **illustrative, not clinical evidence**. No numbers, ECGs, treatment decisions, or medical measurements should be inferred from them.

The WEBP copies are resized and compressed for bundling into the offline HTML. The originally generated PNG images are not stored in this Git repository; this keeps the project smaller and easier to maintain.

The source build prioritises these files (`assets/illustrations/<key>.webp`), then optional local `assets/runway` originals, then offline SVG fallback. To use a different image, replace the illustration file and run `python developer/build.py`.
