#!/usr/bin/env python3
"""Actual headless Chromium smoke test. Uses set_content because URL navigation may
be blocked in managed environments. Optional dependency: pip install playwright.
Do not mistake this for real Windows launcher testing or clinical validation.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent.parent
APP=ROOT/'app'/'Nursing_Study_Lab.html'
OUT=ROOT/'tests'/'screenshots'
OUT.mkdir(parents=True,exist_ok=True)
HTML=APP.read_text(encoding='utf-8')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for width,height,label in [(1280,860,'desktop'),(390,844,'mobile')]:
        page=browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce')
        page.set_default_timeout(5000)
        issues=[]
        page.on('pageerror',lambda err:issues.append(str(err)))
        page.set_content(HTML,wait_until='domcontentloaded')
        # Inline Chromium rendering stays in about:blank when local navigation is policy-blocked.
        # Disable animated scroll only in the smoke harness to speed repeat interactions.
        page.evaluate('Element.prototype.scrollIntoView = function(){}')
        assert page.locator('#module-nav .module-link').count()==12
        assert page.locator('#rounds-button').is_visible()
        page.locator('#rounds-button').click()
        assert page.locator('[data-round-case]').count()==6
        for case_id in ['acs-uncertainty','hypercapnic-fatigue','aki-potassium']:
            page.locator(f'[data-round-case="{case_id}"]').click()
            assert 'DECISION 1 OF 5' in page.locator('.round-progress-label').inner_text()
            assert page.locator('.round-scene img').count()==1
            assert page.locator('.round-scene img').evaluate('(el)=>el.complete && el.naturalWidth>0'),f'Art missing {case_id}'
            assert page.locator('.lab-trend').count()>=1
            # 1 single interpretation
            page.locator('[data-round-option="0"]').click()
            assert page.locator('#round-feedback').count()==1
            page.locator('#round-next').click()
            # 2 and 3 multi-reasoning
            for _ in range(2):
                for i in [0,1,2]:page.locator(f'[data-round-option="{i}"]').click()
                page.locator('#round-compare').click()
                assert page.locator('#round-feedback').count()==1
                page.locator('#round-next').click()
            # 4 branched fictional reassessment
            assert 'DECISION 4 OF 5' in page.locator('.round-progress-label').inner_text()
            assert page.locator('[data-branch-path]').count()==3
            page.locator('[data-branch-path="2"]').click()
            assert page.locator('#branch-finding').is_visible()
            assert page.locator('[data-branch-reply]').count()==3
            page.locator('[data-branch-reply="1"]').click()
            assert page.locator('#round-feedback').count()==1
            page.locator('[data-branch-path="0"]').click()
            assert page.locator('#round-feedback').count()==0
            page.locator('[data-branch-reply="0"]').click()
            assert 'Reasoning aligned' in page.locator('#round-feedback').inner_text()
            if case_id=='acs-uncertainty':
                page.screenshot(path=str(OUT/f'{label}_branch_acs.png'),full_page=False)
            page.locator('#round-next').click()
            # 5 written reflective ISBAR
            assert page.locator('[data-round-field="S"]').count()==1
            page.locator('[data-round-field="S"]').fill('Fictional situation: urgent change in observations and investigation findings.')
            page.locator('#round-compare').click()
            assert page.locator('.model-handover').count()==1
            page.locator('#round-next').click()
            assert page.locator('.round-takeaways').count()==1
            page.locator('#round-restart').click()
            assert 'DECISION 1 OF 5' in page.locator('.round-progress-label').inner_text()
            print('PASS',label,case_id,'5 stages + 3 branch routes + debrief')
        # Imported artwork is never sent to a server; exercise local FileReader/canvas path.
        page.locator('[data-round-case="acs-uncertainty"]').click()
        preview=ROOT/'assets'/'illustrations'/'acs.webp'
        page.locator('#round-art-file').set_input_files(str(preview))
        page.get_by_text('Imported illustration',exact=False).wait_for(state='visible',timeout=7000)
        page.locator('[data-round-case="hypercapnic-fatigue"]').click()
        page.locator('[data-round-case="acs-uncertainty"]').click()
        assert page.get_by_text('Imported illustration',exact=False).is_visible()
        page.locator('#round-art-remove').click()
        assert page.get_by_text('Illustrated case scene',exact=False).is_visible()
        print('PASS',label,'artwork import, in-session retention, restore embedded illustration')
        # Other original study modes still accessible.
        page.locator('#cases-button').click()
        assert page.locator('#quiz-root').inner_text().strip()
        page.locator('#studio-button').click()
        assert page.locator('#quiz-root').inner_text().strip()
        page.locator('#module-nav [data-module]').first.click()
        page.locator('#view-questions').click()
        assert page.locator('#quiz-root').inner_text().strip()
        page.locator('#view-reading').click()
        assert page.locator('#quiz-root').inner_text().strip()
        # Main page layout should fit screen; scrollable table/figures can scroll internally.
        overflow=page.evaluate('document.documentElement.scrollWidth > window.innerWidth + 3')
        if overflow:
            print('WARNING',label,'document horizontal overflow; review mobile layout')
        assert not issues, f'JavaScript page errors: {issues}'
        print('PASS',label,'original learning modes; 12 navigation modules; no JS runtime errors')
        page.close()
    browser.close()
print('Browser smoke completed (inline document rendering, not launcher or real website navigation).')
