# N STUDY APP — v1.7 repository verification (14 November 2026)

## Verified release

- Repository: `igotbrainrot-stack/N-STUDY-APP` (public), default branch `main`.
- Release: **v1.7 illustrated offline NSW Nursing Study Lab**, with six embedded cartoon-style fictional clinical scenes.
- Source archive checked: `N_STUDY_APP_v1.7_Illustrated_Source_and_Handover.zip` (54 files).
- Learner archive checked: `N_STUDY_APP_v1.7_Illustrated_Offline_Windows.zip` (3 files).
- Imported source baseline: commit `8af98afd64e41778142cca50ff28f64a1ff3db84` dated 14 November 2026.
- **Every packaged source file matched the GitHub baseline by Git blob SHA-1.** No application source changes were necessary during this verification.
- The standalone HTML, Windows launcher and first-run instructions in the learner ZIP matched the corresponding files in the source archive byte-for-byte.

### Package checksums

| Item | SHA-256 |
|---|---|
| Offline HTML (`app/Nursing_Study_Lab.html`) | `d0fc2979de46d7280e46db2d52d83fb28d03391ac1cc71f5128b92e22db74fdc` |
| Source and handover ZIP | `eb142e21e09130443e9413fe28198adc2551bd5fc2d044f9f15e8e4b6cdac6de` |
| Offline Windows ZIP | `372b2da5a77f63912a14852adcbd41dbaf1c8b9b287c3dfc51a15be3312e0825` |

The ZIP files are available in the project file library; the repository contains their unpacked source files and runnable HTML, **not** duplicate ZIP archives.

## Verification commands run from a clean extracted source archive

```sh
python developer/build.py
node tests/validate_content.js
node tests/validate_round_interactions.js
python tests/validate_package.py
python tests/browser_smoke.py
```

**All passed.** The build reproduced the same HTML SHA-256 shown above.

- Content inventory: 12 modules; 100 questions (73 single, 12 multi, 10 short, 4 calculation, 1 ordering); 12 guides and 47 reading sections; 2 guided cases; 6 advanced rounds and 27 round stages. 268 source references checked structurally.
- JavaScript interaction tests: branching specialist case flow, feedback and resets exercised under a simulated DOM.
- Package test: expected files/scripts present and original archive integrity verified.
- Browser smoke: headless Chromium desktop and mobile layouts; specialty case stages, branch routes, written handovers, original learning navigation, artwork import/restore; no reported JavaScript runtime errors.

### Explicit limitations

1. Tests confirm software structure and sampled interactions, **not** clinical accuracy, current policy compliance, medication safety or health-service endorsement. The remaining item-by-item NSW evidence review is in `docs/REVIEW_QUEUE_v1.7.md`.
2. Browser smoke uses inline document rendering, not `file://` navigation, the Windows `.bat` launcher, or a deployed website.
3. The GitHub source archive does **not** deploy/update the previously private ChatGPT-hosted study website.
4. The six embedded illustrated scenes are locally bundled generated artwork, **not** original Runway image files and **not** diagnostic observations.
5. Do not add personal health records, identifiable patient data, tokens, browser storage, or expiring signed URLs to this public repository.

## Next developer

Start with `README.md`, `HANDOVER.md`, `developer/SOURCE_MANIFEST.md`, `docs/SOURCE_REVIEW_v1.7.md`, and `docs/REVIEW_QUEUE_v1.7.md`. Edit source under `developer/src/`; regenerate `app/Nursing_Study_Lab.html` with `python developer/build.py`; rerun all checks after changes. Keep current question IDs and local progress compatibility. Do not rebuild from scratch.
