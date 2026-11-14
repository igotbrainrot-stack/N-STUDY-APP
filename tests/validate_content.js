/** Static/content-level tests for recovered offline v1.5. Node.js built-ins only.
 * NOT a rendered browser test or clinical validation. Run after developer/build.py.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const sourceDir=path.join(root,'developer','src');
const files=[
'00_content_bank.js','01_reading_guides.js','02_advanced_expansion.js',
'03_guided_cases.js','04_learning_studio_data.js','05_learning_studio_engine.js',
'06_clinical_rounds_data.js','07_clinical_rounds_engine.js','09_specialty_expansion.js','10_branching_reassessments.js'];
const w={};const ctx=vm.createContext({window:w,console,Date,Set,Math});
for(const file of files)vm.runInContext(fs.readFileSync(path.join(sourceDir,file),'utf8'),ctx,{filename:file});
const bank=w.STUDY_BANK;
const modules=bank.modules;
const questions=modules.flatMap(m=>m.questions);
const readings=w.STUDY_READINGS;
const cases=w.STUDY_CASES;
const rounds=w.STUDY_ROUNDS.scenarios;
const sources=new Set(Object.keys(bank.sources));
const idSet=new Set();
let verifiedRefs=0;
function requireSources(ids,context){
 assert(Array.isArray(ids)&&ids.length>0,`${context} has no source references`);
 for(const id of ids){assert(sources.has(id),`${context} unknown source ${id}`);verifiedRefs++}
}
assert.equal(bank.version,'1.7.0');
assert.equal(modules.length,12);
assert.equal(questions.length,100);
assert.equal(Object.keys(readings).length,12);
assert.equal(cases.length,2);
assert.equal(rounds.length,6);
assert.equal(rounds.reduce((n,c)=>n+c.stages.length,0),27);
assert.equal(rounds.reduce((n,c)=>n+c.reading.sections.length,0),24);
const typeCounts={};
for(const q of questions){
 assert(typeof q.id==='string'&&q.id, 'question missing ID');
 assert(!idSet.has(q.id),`duplicate ID ${q.id}`);idSet.add(q.id);
 assert(typeof q.stem==='string'&&q.stem,`${q.id}: missing stem`);
 assert(typeof q.explanation==='string'&&q.explanation,`${q.id}: missing explanation`);
 requireSources(q.sources,q.id);
 const type=q.type||'single';typeCounts[type]=(typeCounts[type]||0)+1;
 if(type==='single'){
  assert(Array.isArray(q.choices)&&q.choices.length>=2,`${q.id}: choices`);
  assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.choices.length,`${q.id}: invalid answer key`);
 } else if(type==='multi'){
  assert(Array.isArray(q.choices)&&q.choices.length>=2,`${q.id}: choices`);
  assert(Array.isArray(q.correct)&&q.correct.length>0,`${q.id}: missing multi keys`);
  for(const a of q.correct)assert(Number.isInteger(a)&&a>=0&&a<q.choices.length,`${q.id}: invalid multi key`);
 } else if(type==='calc'){
  assert(Number.isFinite(q.expected)&&Number.isFinite(q.tolerance),`${q.id}: invalid math values`);
  assert(q.unit&&q.steps?.length>0,`${q.id}: missing math explanation`);
 } else if(type==='short'){
  assert(typeof q.modelAnswer==='string'&&q.modelAnswer,`${q.id}: missing model response`);
 } else if(type==='order'){
  assert(Array.isArray(q.steps)&&q.steps.length>=2,`${q.id}: ordering steps`);
 }else assert.fail(`${q.id} unknown type ${type}`);
}
assert.deepEqual(typeCounts,{single:73,multi:12,short:10,calc:4,order:1});
let sections=0;
for(const [id,guide] of Object.entries(readings)){
 assert(guide.sections?.length>0,`${id}: missing reading`);
 sections+=guide.sections.length;
 requireSources(guide.sources,`reading ${id}`);
}
assert.equal(sections,47);
for(const c of cases){
 assert(c.stages.length===3,`${c.id}: expected 3 stages`);
 requireSources(c.sources,`guided case ${c.id}`);
}
for(const c of rounds){
 assert(c.timepoints.length===3,`${c.id}: expected 3 timepoints`);
 assert(c.stages.length===(c.stages.some(s=>s.kind==='branch')?5:4),`${c.id}: incorrect stage count`);
 assert(c.reading.sections.length===4,`${c.id}: expected four reading sections`);
 assert(c.stages.some(x=>x.kind==='handover'),`${c.id}: handover missing`);
 requireSources(c.sources,`round ${c.id}`);
}
for(const [name,s] of Object.entries(bank.sources)){
 assert(/^https:\/\//.test(s.url),`source ${name} missing https link`);
}
const newRounds=rounds.filter(c=>c.stages.some(s=>s.kind==='branch'));
assert.equal(newRounds.length,3)
assert.equal(rounds.filter(c=>c.imageKey).length,6,'All six reasoning rounds must have offline art');
assert.equal(newRounds.map(c=>c.id).join(','),'acs-uncertainty,hypercapnic-fatigue,aki-potassium');
for (const r of newRounds){
 assert(r.trends.length>0,`${r.id}: investigation trends missing`);
 for(const trend of r.trends){
  assert(trend.values.length===r.timepoints.length,`${r.id}: trend/observations do not align`);
  assert(trend.values.every(v=>v===null||Number.isFinite(v)),`${r.id}: non-numeric plot value`);
 }
 for(const s of r.stages){
  if(s.kind==='single'||s.kind==='multi'){
   assert(Array.isArray(s.correct)&&s.correct.length>0,`${r.id}: missing keys`);
   assert(s.options?.length>=3,`${r.id}: insufficient choices`);
   for(const k of s.correct)assert(k>=0&&k<s.options.length,`${r.id}: invalid option index`);
   assert(s.options.every(o=>o.text&&o.why),`${r.id}: rationale missing`);
  }
 }
}

// Regression tests for specific v1.4 audit findings corrected/reconciled in v1.7.
const questionById=Object.fromEntries(questions.map(q=>[q.id,q]));
assert(questionById['det-02'].stem.includes('Yes') && questionById['det-02'].explanation.includes('Yellow Zone'),'F-05: patient/family Yes concern trigger omitted');
assert(questionById['adv-com-05'].explanation.includes('Rapid Response'),'F-05: serious concern Rapid Response omitted');
assert(questionById['adv-com-03'].modelAnswer.includes('within 24 hours'),'F-04: open-disclosure mandatory timing omitted');
assert(!questionById['adv-com-06'].explanation.includes('generally expected'),'F-04: softened policy wording still present');
assert(questionById['adv-med-15'].scenario.includes('Administration has already been paused'),'F-06: medication safety pause missing');
assert(readings['deep-sepsis'].sections.some(z=>z.body.includes('prompt consultation with the nurse in charge')),'F-03: adult Yellow Zone workflow missing');
assert(w.STUDY_STUDIO_DATA.detective.clues.filter(z=>z.priority).length===6,'F-02: pending medicines/investigations must be included in self-review');
assert(fs.readFileSync(path.join(sourceDir,'08_application_controller.js'),'utf8').includes("const revisionControl=type==='short'?'':"),'F-07: written reflections must not use objective review scheduling');
assert(w.STUDY_STUDIO_DATA.trend.debrief.includes('Red Zone'),'Trend Detective missing explicit Red Zone debrief');
assert(w.STUDY_STUDIO_DATA.trend.debrief.includes('Rapid Response'),'Trend Detective missing explicit Rapid Response debrief');
const html=fs.readFileSync(path.join(root,'app','Nursing_Study_Lab.html'),'utf8');
assert(html.includes('window.STUDY_ROUNDS')&&html.includes('window.STUDY_BANK')&&html.includes('window.STUDY_ART'), 'built HTML missing clinical data');
console.log('PASS: 12 modules; 100 questions:',JSON.stringify(typeCounts));
console.log('PASS: 12 reading guides, 47 sections; 2 guided cases; 6 rounds/27 stages; source refs checked:',verifiedRefs);
console.log('NOTE: structural/data tests only. Clinical evidence and browser UX testing still required.');
