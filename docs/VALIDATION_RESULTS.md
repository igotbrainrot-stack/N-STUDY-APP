# Package validation — 31 October 2026

Tests performed in this handover session (local file analysis; **not** a clinical review):

- ✅ Original v1.5 ZIP opened and passed ZIP CRC integrity (`testzip() == None`).
- ✅ Offline source extracted into `app/`.
- ✅ Lossless CSS/JS extraction and deterministic rebuild; generated HTML is byte-identical to the original recovered HTML.
- ✅ Content/integrity checks: 12 modules, 100 unique question IDs, 73 single + 12 multi + 10 short + 4 arithmetic + 1 ordering, 12 reading guides with 47 sections, two original cases, three reasoning rounds with 12 stages, 12 round reading sections, and 256 configured source-ID usages resolved against 48 source objects.
- ✅ Trend Detective v1.5 source text explicitly contains Red Zone and Rapid Response debrief language.
- ✅ All 48 configured source objects have HTTPS URL strings (**not** confirmation that the links are currently live or support each claim).
- ✅ Windows batch launcher, standalone HTML and README are present.

Original HTML SHA-256: `befe246532c9e8f2bd22b4b294714d2de9da7c39f6e1bb1073b2aada2e2ea26d`

**Not performed:** actual browser interaction/screenshot testing in this handover; Windows batch launcher smoke test on Windows; source-by-source current NSW policy verification; independent clinician review; comparison against the deployed private hosting Git repository. The next AI should do these as appropriate before republishing.
