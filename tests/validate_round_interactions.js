/** DOM-independent smoke test for clinical round state transitions; not a visual-browser test. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const rootDir=path.resolve(__dirname,'..');
const w={STUDY_ART:{acs:{online:'https://example.test/a',offline:'data:image/svg+xml;base64,AA'},resp:{online:'https://example.test/b',offline:'data:image/svg+xml;base64,BB'},renal:{online:'https://example.test/c',offline:'data:image/svg+xml;base64,CC'}}};
const context=vm.createContext({window:w,console,Math,Set,Date});
for(const file of ['00_content_bank.js','01_reading_guides.js','02_advanced_expansion.js','03_guided_cases.js','04_learning_studio_data.js','05_learning_studio_engine.js','06_clinical_rounds_data.js','07_clinical_rounds_engine.js','09_specialty_expansion.js','10_branching_reassessments.js']){
 vm.runInContext(fs.readFileSync(path.join(rootDir,'developer/src',file),'utf8'),context,{filename:file});
}
function fakeRoot(){
 let html='',elements={};
 const build=(selector)=>{
  if(elements[selector]) return elements[selector];
  const matches=(selector.startsWith('[data-round-')||selector.startsWith('[data-branch-'))? [...html.matchAll(new RegExp(selector.slice(1,-1).replace(']','')+'="([^"]+)"','g'))]:[];
  const nodes=matches.map(m=>({dataset:Object.fromEntries([[selector.slice(1,-1).replace(/^data-(?:round|branch)-/,m=>m.slice(5)).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),m[1]]]),handlers:{},addEventListener(name,fn){this.handlers[name]=fn;},click(){assert(this.handlers.click,'click missing');this.handlers.click();},focus(){},scrollIntoView(){}}));
  elements[selector]=nodes;
  return nodes;
 };
 return {
  get innerHTML(){return html;},set innerHTML(s){html=s;elements={};},
  querySelectorAll(sel){return build(sel);},
  querySelector(sel){
   if(sel.startsWith('[data-round-')||sel.startsWith('[data-branch-'))return this.querySelectorAll(sel)[0]??null;
   if(!html.includes('id="'+sel.slice(1)+'"')&&sel.startsWith('#')&&sel!=='#round-reading'&&sel!=='#round-feedback')return null;
   if(!elements[sel]) elements[sel]=[{open:false,handlers:{},addEventListener(name,fn){this.handlers[name]=fn;},click(){assert(this.handlers.click,'button callback missing: '+sel);this.handlers.click();},focus(){},scrollIntoView(){}}];
   return elements[sel][0];
  }
 };
}
const game=w.createClinicalRounds({esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),sourceLinks:ids=>ids.map(s=>`<a>${s}</a>`).join('')});
const root=fakeRoot();
game.render(root);
assert(root.innerHTML.includes('6 EXTENDED CASES'));
for(const id of ['acs-uncertainty','hypercapnic-fatigue','aki-potassium']){
 const option=root.querySelectorAll('[data-round-case]').find(el=>el.dataset.roundCase===id);assert(option,'case option missing '+id);option.click();
 assert(root.innerHTML.includes('class="round-scene"'),id+' artwork missing');
 assert(root.innerHTML.includes('class="lab-trend"'),id+' numerical trend plot missing');
 assert(root.innerHTML.includes('DECISION 1 OF 5'),id+' stage 1 missing');
 assert((root.innerHTML.match(/class="reading-part"/g)||[]).length===4,id+' reading sections');
 root.querySelectorAll('[data-round-option]')[0].click();
 assert(root.innerHTML.includes('id="round-feedback"'),id+' immediate rationale missing');
 root.querySelector('#round-next').click();
 for(const i of [0,1,2])root.querySelectorAll('[data-round-option]')[i].click();
 root.querySelector('#round-compare').click();
 assert(root.innerHTML.includes('Your selection matches'),id+' multi review');
 root.querySelector('#round-next').click();
 for(const i of [0,1,2])root.querySelectorAll('[data-round-option]')[i].click();
 root.querySelector('#round-compare').click();
 assert(root.innerHTML.includes('id="round-feedback"'));
 root.querySelector('#round-next').click();
 assert(root.innerHTML.includes('BRANCHING REASSESSMENT'));
 const pathButtons=root.querySelectorAll('[data-branch-path]');assert.equal(pathButtons.length,3);
 pathButtons[1].click();assert(root.innerHTML.includes('ONE PLAUSIBLE NEXT FINDING'));
 const followups=root.querySelectorAll('[data-branch-reply]');assert.equal(followups.length,3);
 followups[2].click();assert(root.innerHTML.includes('id="round-feedback"'));
 assert(root.innerHTML.includes('Supported alternative'));
 pathButtons.length=0; // Reacquire controls after re-render
 root.querySelectorAll('[data-branch-path]')[0].click();
 root.querySelectorAll('[data-branch-reply]')[0].click();
 assert(root.innerHTML.includes('Reasoning aligned'));
 root.querySelector('#round-next').click();
 assert(root.innerHTML.includes('COMMUNICATION PRACTICE'));
 root.querySelector('#round-compare').click();
 assert(root.innerHTML.includes('One defensible handover'));
 root.querySelector('#round-next').click();
 assert(root.innerHTML.includes('CASE COMPLETE'));
 // restart before next case
 root.querySelector('#round-restart').click();
 console.log('PASS: interactive 5-stage reasoning + feedback + case reset:',id);
}
console.log('PASS: six-case UI state logic exercised with fake DOM; no visual/browser claim.');
