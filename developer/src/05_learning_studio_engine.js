
/* Independent learning studio, kept separate from the question-bank controller.
   No external services, patient records, AI diagnosis, or hidden scoring. */
(function () {
  'use strict';
  const DAY = 86400000;
  const intervals = [1,3,7,21];
  window.STUDY_SPACING = {
    intervals,
    begin(now) { return {step:0,dueAt:now+DAY,lastReviewed:now,attempts:0}; },
    next(previous,correct,now) {
      const oldStep=Number.isInteger(previous.step)?Math.max(0,Math.min(3,previous.step)):0;
      const step=correct===true?Math.min(3,oldStep+1):correct===false?0:oldStep;
      return {step,dueAt:now+intervals[step]*DAY,lastReviewed:now,attempts:(previous.attempts||0)+1};
    }
  };

  window.createNursingStudio = function ({bank,sourceLinks,esc,getState,persist,openQuestion}) {
    const data=window.STUDY_STUDIO_DATA;
    let tab='detective';
    let selectedTime=3;
    let trendSelection=-1;
    let discovered=new Set();
    let highlighted=new Set();
    let phase='investigate';
    let draft={I:'',S:'',B:'',A:'',R:''};
    let revealDraft=false;
    const today = at => new Date(at).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'});
    const lookup = id => bank.modules.flatMap(m=>m.questions).find(q=>q.id===id);

    function topicBar() {
      const choices=[['detective','Evidence Relay'],['trends','Trend Detective'],['revisit','Revision plan']];
      return `<div class="studio-tabs" role="group" aria-label="Choose learning studio experience">${choices.map(([id,name])=>`<button type="button" data-studio-tab="${id}" class="studio-tab ${tab===id?'active':''}" aria-pressed="${tab===id}">${name}</button>`).join('')}</div>`;
    }
    function evidenceContent() {
      const d=data.detective;
      const cards=d.clues.map(clue=>{
        const opened=discovered.has(clue.id);
        const picked=highlighted.has(clue.id);
        return `<div class="evidence-card"><button type="button" data-uncover="${esc(clue.id)}" class="evidence-reveal" aria-expanded="${opened}"><span>${esc(clue.label)}</span><span aria-hidden="true">${opened?'−':'+'}</span></button>${opened?`<div class="evidence-detail"><span class="evidence-kind">${esc(clue.kind)}</span><p>${esc(clue.summary)}</p><button type="button" class="flag-button ${picked?'active':''}" data-highlight="${esc(clue.id)}" aria-pressed="${picked}">${picked?'✓ Included in handover':'Include in handover'}</button></div>`:''}</div>`;
      }).join('');
      return `<article class="studio-panel"><div class="type-label">CLINICAL REASONING · ORIGINAL EVIDENCE-TO-ACTION WORKSHOP</div><h3>${esc(d.title)}</h3><p class="studio-lead">${esc(d.subtitle)}</p><div class="case-vignette"><span>FICTIONAL PATIENT</span><p>${esc(d.scenario)}</p></div><div class="studio-section-title"><h4>1. Choose what to investigate</h4><span>${discovered.size}/${d.clues.length} reviewed</span></div><p class="studio-small">Open the evidence cards in any order. Decide what to communicate and what remains unknown. These are not tests of your ability to diagnose.</p><div class="evidence-grid">${cards}</div><div class="studio-actions"><p>Flag the facts you want to carry into your handover.</p><button type="button" class="action-button" id="compose-handover">Build an ISBAR →</button></div></article>`;
    }
    function handoverContent() {
      const d=data.detective;
      const flagged=d.clues.filter(c=>highlighted.has(c.id));
      const notFlagged=d.clues.filter(c=>c.priority&&!highlighted.has(c.id));
      const prompts={I:'Identify',S:'Situation',B:'Background',A:'Assessment',R:'Recommendation / request'};
      return `<article class="studio-panel"><div class="type-label">FROM EVIDENCE TO CLEAR COMMUNICATION</div><h3>Build the handover</h3><p class="studio-lead">Compose a short ISBAR. It is a private practice draft, not a patient record or automated assessment.</p><div class="case-vignette"><span>YOUR FLAGGED EVIDENCE</span><p>${flagged.length?flagged.map(c=>esc(c.label)).join(' · '):'No evidence flagged yet; revisit the cards if you need more information.'}</p></div><div class="handover-fields">${Object.entries(prompts).map(([letter,label])=>`<label class="handover-field"><span><b>${letter}</b> ${label}</span><textarea data-handover="${letter}" rows="2" placeholder="Your own words …">${esc(draft[letter])}</textarea></label>`).join('')}</div><div class="studio-actions"><button type="button" id="back-evidence" class="secondary-button">← Check evidence</button><button type="button" id="compare-handover" class="action-button">Compare with example</button></div>${revealDraft?`<div class="model-handover"><div class="type-label">GUIDED SELF-REVIEW · NOT AUTOMATICALLY GRADED</div><h4>One defensible example</h4>${Object.entries(d.model).map(([letter,value])=>`<p><strong>${letter}.</strong> ${esc(value)}</p>`).join('')}<h4>What to check in your own account</h4><ul>${d.debrief.map(point=>`<li>${esc(point)}</li>`).join('')}</ul>${notFlagged.length?`<p class="gentle-note">Relevant facts not flagged earlier: ${notFlagged.map(c=>esc(c.label)).join(', ')}. Consider whether they belong in this handover.</p>`:''}<div class="source-caption">GUIDANCE</div><div class="source-list">${sourceLinks(d.sources)}</div></div>`:''}<div class="evidence-note">Sources checked ${esc(data.sourceCheckedOn)}. Requires independent NSW clinical review. Do not enter identifiable real-patient details.</div></article>`;
    }
    const x = i => 66 + i*149;
    function path(series,min,max) {
      return series.map((v,i)=>`${x(i)},${149-(v-min)/(max-min)*90}`).join(' ');
    }
    function chart() {
      const points=data.trend.timepoints;
      const series=[{name:'Respiratory rate',unit:'breaths/min',key:'resp',min:15,max:33,color:'#407d70'},{name:'Pulse',unit:'beats/min',key:'pulse',min:75,max:130,color:'#ab8050'}];
      return series.map(s=>`<div class="trend-chart"><div class="chart-title"><strong>${esc(s.name)}</strong><span>${esc(s.unit)} · teaching values</span></div><svg viewBox="0 0 550 188" role="img" aria-label="${esc(s.name)} increases at the four labelled timepoints; a table follows"><line x1="50" y1="150" x2="520" y2="150" stroke="#aec9bc"/><line x1="50" y1="56" x2="520" y2="56" stroke="#e7eeea" stroke-dasharray="4,5"/><polyline points="${path(points.map(p=>p[s.key]),s.min,s.max)}" fill="none" stroke="${s.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${points.map((p,i)=>`<circle cx="${x(i)}" cy="${149-(p[s.key]-s.min)/(s.max-s.min)*90}" r="${i===selectedTime?7:4.5}" fill="${s.color}" stroke="#fff" stroke-width="2"/><text x="${x(i)}" y="176" text-anchor="middle" font-size="12" fill="#638378">${esc(p.time)}</text>`).join('')}<text x="10" y="60" font-size="11" fill="#81978e">${s.max}</text><text x="10" y="151" font-size="11" fill="#81978e">${s.min}</text></svg></div>`).join('');
    }
    function trendContent() {
      const t=data.trend;
      const point=t.timepoints[selectedTime];
      const selected=t.choices[trendSelection];
      return `<article class="studio-panel"><div class="type-label">PATTERN RECOGNITION · NO DIAGNOSTIC MODEL</div><h3>${esc(t.title)}</h3><p class="studio-lead">${esc(t.subtitle)}</p><p>${esc(t.scenario)}</p><div class="trend-grid">${chart()}</div><div class="studio-section-title"><h4>Inspect a timepoint</h4><span>Tap a time below</span></div><div class="time-selector" role="group" aria-label="Select timepoint">${t.timepoints.map((p,i)=>`<button type="button" data-timepoint="${i}" class="time-button ${selectedTime===i?'active':''}" aria-pressed="${selectedTime===i}">${esc(p.time)}<span>${p.resp} / ${p.pulse}</span></button>`).join('')}</div><div class="observation-note"><strong>${esc(point.time)}</strong> · ${esc(point.detail)}</div><details class="data-details"><summary>View all values in a table</summary><table><thead><tr><th>Time</th><th>Resp /min</th><th>Pulse /min</th></tr></thead><tbody>${t.timepoints.map(p=>`<tr><td>${esc(p.time)}</td><td>${p.resp}</td><td>${p.pulse}</td></tr>`).join('')}</tbody></table></details><h4>${esc(t.question)}</h4><div class="choice-list">${t.choices.map((opt,i)=>`<button type="button" class="choice ${trendSelection===i?'selected':''}" data-trend-choice="${i}" ${trendSelection<0?'':'disabled'}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(opt.text)}</span></button>`).join('')}</div>${selected?`<div class="answer-panel ${selected.preferred?'':'wrong'}"><div class="answer-content"><div class="answer-heading">${selected.preferred?'Supported reasoning':'Reconsider the interpretation'}</div><p>${esc(selected.feedback)}</p><p>${esc(t.debrief)}</p><div class="source-list">${sourceLinks(t.sources)}</div></div></div><button type="button" id="reset-trend" class="secondary-button">Try a different interpretation ↺</button>`:''}<div class="evidence-note">Sources checked ${esc(data.sourceCheckedOn)} · RR 30 is Red Zone on the unaltered standard adult chart; verify current patient-specific chart and local CERS · Clinical review pending.</div></article>`;
    }
    function planContent() {
      const plan=getState().revision || {};
      const entries=Object.entries(plan).map(([id,item])=>({q:lookup(id),item})).filter(({q,item})=>q&&Number.isFinite(item.dueAt)).sort((a,b)=>a.item.dueAt-b.item.dueAt);
      const now=Date.now();
      const due=entries.filter(({item})=>item.dueAt<=now).length;
      return `<article class="studio-panel"><div class="type-label">PRIVATE RETRIEVAL PRACTICE · NO COMPETENCY SCORE</div><h3>Your revision plan</h3><p class="studio-lead">When you finish any objective practice question, select “Add to revision plan”. Your next suggested intervals are 1, 3, 7 and 21 days. The schedule stays on this device.</p><div class="planner-summary"><div><strong>${entries.length}</strong><span>Concepts planned</span></div><div><strong>${due}</strong><span>Due to revisit</span></div></div>${entries.length?`<div class="planned-list">${entries.slice(0,30).map(({q,item})=>`<div class="planned-item"><div><span class="plan-date">${item.dueAt<=now?'Ready to revisit':`Suggested ${today(item.dueAt)}`}</span><p>${esc(q.stem)}</p></div><button type="button" data-practice-revision="${esc(q.id)}" class="secondary-button">Review →</button></div>`).join('')}</div>`:`<div class="planner-empty"><h4>Nothing scheduled yet</h4><p>Complete a practice question, explore the feedback and choose “Add to revision plan” to start. You can always return to it early.</p></div>`}<div class="reading-reflect"><span>HOW THE SCHEDULE WORKS</span><p>Correctly recalling a scheduled objective answer increases the interval. A missed response suggests an earlier revisit. Written reflections are never automatically graded. ${esc(data.spacing.note)}</p></div><div class="source-caption">LEARNING SCIENCE</div><div class="source-list"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11078833/" target="_blank" rel="noopener noreferrer">Review: spacing and retrieval in health professions education ↗</a></div></article>`;
    }

    function render(root) {
      const body=tab==='detective' ? (phase==='investigate'?evidenceContent():handoverContent()) : tab==='trends' ? trendContent() : planContent();
      root.innerHTML=`${topicBar()}${body}`;
      root.querySelectorAll('[data-studio-tab]').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.studioTab;render(root);}));
      if(tab==='detective') {
        root.querySelectorAll('[data-uncover]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.uncover;if(discovered.has(id))discovered.delete(id);else discovered.add(id);render(root);}));
        root.querySelectorAll('[data-highlight]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.highlight;if(highlighted.has(id))highlighted.delete(id);else highlighted.add(id);render(root);}));
        root.querySelector('#compose-handover')?.addEventListener('click',()=>{phase='handover';render(root);});
        root.querySelector('#back-evidence')?.addEventListener('click',()=>{phase='investigate';render(root);});
        root.querySelectorAll('[data-handover]').forEach(area=>area.addEventListener('input',e=>{draft[e.target.dataset.handover]=e.target.value;}));
        root.querySelector('#compare-handover')?.addEventListener('click',()=>{revealDraft=true;render(root);});
      } else if(tab==='trends') {
        root.querySelectorAll('[data-timepoint]').forEach(b=>b.addEventListener('click',()=>{selectedTime=Number(b.dataset.timepoint);render(root);}));
        root.querySelectorAll('[data-trend-choice]').forEach(b=>b.addEventListener('click',()=>{trendSelection=Number(b.dataset.trendChoice);render(root);}));
        root.querySelector('#reset-trend')?.addEventListener('click',()=>{trendSelection=-1;render(root);});
      } else {
        root.querySelectorAll('[data-practice-revision]').forEach(b=>b.addEventListener('click',()=>openQuestion(b.dataset.practiceRevision)));
      }
    }
    return {render,open(){tab='detective';},dueCount(){return Object.values(getState().revision||{}).filter(p=>Number.isFinite(p.dueAt)&&p.dueAt<=Date.now()).length;}};
  };
})();

