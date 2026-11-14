#!/usr/bin/env python3
"""Offline artifact checks (not a clinical or GUI test). Python standard library only."""
from pathlib import Path
from zipfile import ZipFile
from hashlib import sha256
import re, subprocess, sys
root=Path(__file__).resolve().parent.parent
app=root/'app'
html=app/'Nursing_Study_Lab.html'
assert html.exists() and html.stat().st_size>100_000
assert (app/'START_HERE.bat').exists()
assert (app/'README_FIRST.txt').exists()
assert html.read_text(encoding='utf8').lower().startswith('<!doctype html>')
assert len(re.findall(r'<script>',html.read_text(encoding='utf8')))==12
assert b'@@JS_' not in html.read_bytes() and b'@@CSS@@' not in html.read_bytes() and b'@@ART_DATA@@' not in html.read_bytes()
# Compare with archive originally supplied by the user, not just any newly built ZIP.
original=root/'original_release'/'NSW_Nursing_Study_Lab_Offline_v1.5_Windows_ORIGINAL.zip'
with ZipFile(original) as z:
 assert z.testzip() is None
 assert {'Nursing_Study_Lab.html','START_HERE.bat','README_FIRST.txt'} <= set(z.namelist())
 original_html=z.read('Nursing_Study_Lab.html')
print('Current generated HTML SHA-256:',sha256(html.read_bytes()).hexdigest())
print('Original recovered HTML SHA-256:',sha256(original_html).hexdigest())
if html.read_bytes()!=original_html: print('NOTE: HTML differs from recovered v1.5 original (expected after developer changes).')
else: print('PASS: current HTML is byte-identical to archived v1.5 original.')
print('PASS: core files, twelve scripts and original ZIP integrity validated.')
print('NOTE: browser rendering and official clinical source currency not tested.')
