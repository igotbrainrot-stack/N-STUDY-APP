#!/usr/bin/env python3
"""Regenerate ../app/Nursing_Study_Lab.html from exact extracted sources.
Usage: python developer/build.py
Uses only the Python standard library. Does NOT deploy the private site.
"""
from pathlib import Path
import base64
import json
ROOT=Path(__file__).resolve().parent.parent
DEV=ROOT/'developer'
SRC=DEV/'src'
parts=[
'00_content_bank.js','01_reading_guides.js','02_advanced_expansion.js',
'03_guided_cases.js','04_learning_studio_data.js','05_learning_studio_engine.js',
'06_clinical_rounds_data.js','07_clinical_rounds_engine.js','09_specialty_expansion.js','10_branching_reassessments.js',
'08_application_controller.js',
]
text=(DEV/'index.template.html').read_text(encoding='utf-8')
assert text.count('@@CSS@@')==1
text=text.replace('@@CSS@@',(SRC/'styles.css').read_text(encoding='utf-8'))
asset_data={}
manifest=json.loads((ROOT/'assets'/'art_manifest.json').read_text(encoding='utf-8'))
for key in ('acs','resp','renal','sepsis','opioid','delirium'):
    entry=manifest[key]
    fallback=(ROOT/'assets'/'fallback'/f'{key}.svg')
    if not fallback.exists(): raise FileNotFoundError(fallback)
    remote=entry.get('url')
    local_file=next((path for path in [ROOT/'assets'/'illustrations'/f'{key}.webp',ROOT/'assets'/'illustrations'/f'{key}.png',ROOT/'assets'/'runway'/f'{key}.webp',ROOT/'assets'/'runway'/f'{key}.png'] if path.exists()),None)
    if local_file is not None:
        mime='image/png' if local_file.suffix=='.png' else 'image/webp'
        offline='data:'+mime+';base64,'+base64.b64encode(local_file.read_bytes()).decode('ascii')
    else:
        offline='data:image/svg+xml;base64,'+base64.b64encode(fallback.read_bytes()).decode('ascii')
    asset_data[key]={'offline':offline,'hasLocalRunway':local_file is not None,'hasLocalArt':local_file is not None,'taskId':entry.get('taskId')}
text=text.replace('@@ART_DATA@@','window.STUDY_ART='+json.dumps(asset_data,separators=(',',':'))+';')
for i,filename in enumerate(parts):
    key=f'@@JS_{i}@@'
    assert text.count(key)==1, key
    text=text.replace(key,(SRC/filename).read_text(encoding='utf-8'))
out=ROOT/'app'/'Nursing_Study_Lab.html'
out.write_text(text,encoding='utf-8')
print('Built:',out,'bytes:',out.stat().st_size)
