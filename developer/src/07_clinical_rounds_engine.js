
/* Multi-stage, self-reviewed clinical reasoning rounds: intentionally no automated diagnosis. */
(function () {
  'use strict';
  window.ROUND_LEARNING = {
    compare(selected,correct) {
      const chosen=new Set(selected);
      const key=new Set(correct);
      return {supported:correct.filter(i=>chosen.has(i)),missed:correct.filter(i=>!chosen.has(i)),reconsider:[...chosen].filter(i=>!key.has(i)),aligned:chosen.size===key.size && [...chosen].every(i=>key.has(i))};
    }
  };

  window.createClinicalRounds = function ({sourceLinks,esc}) {
    const cases=window.STUDY_ROUNDS.scenarios;
    let active=cases[0].id;
    let stage=0;
    let timepoint=2;
    let selected=new Set();
    let compared=false;
    let draft={I:'',S:'',B:'',A:'',R:''};
    let readingOpen=false;
    let branchPath=null;
    let branchReply=null;
    const artSession={};
    const savedArt=key=>{
      if(artSession[key])return artSession[key];
      try{return typeof localStorage!=='undefined'?localStorage.getItem('nsl-case-art-'+key):null;}catch{return null;}
    };
    const letters={I:'Identify',S:'Situation',B:'Background',A:'Assessment',R:'Request / recommendation'};
    const findCase=()=>cases.find(c=>c.id===active)||cases[0];
    const clean=()=>{stage=0;timepoint=2;selected=new Set();compared=false;branchPath=null;branchReply=null;draft={I:'',S:'',B:'',A:'',R:''};readingOpen=false;};

    function choicesHTML(part) {
      const multi=part.kind==='multi';
      return `<p class="round-guidance">${multi?'Select all explanations you would retain, then compare. This is self-review, not a scored exam.':'Choose the strongest interpretation to reveal its explanation.'}</p>
        <div class="choice-list" role="group" aria-label="${multi?'Select possible answers':'Select one answer'}">${part.options.map((opt,i)=>`<button type="button" data-round-option="${i}" class="choice ${selected.has(i)?'selected':''} ${compared&&part.correct.includes(i)?'correct':''}" aria-pressed="${selected.has(i)}" ${compared?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(opt.text)}</span>${compared&&part.correct.includes(i)?'<span class="mark" aria-hidden="true">✓</span>':''}</button>`).join('')}</div>
        ${multi&&!compared?`<button type="button" id="round-compare" class="reveal-button" ${selected.size?'':'disabled'}>Compare my reasoning</button>`:''}`;
    }

    function choiceDebrief(part) {
      if(!compared) return '';
      const result=window.ROUND_LEARNING.compare(selected,part.correct);
      const intro=result.aligned?'Your selection matches this educational discussion.':'Compare the options and consider what you missed or over-weighted.';
      return `<div class="answer-panel ${result.aligned?'':'wrong'}" id="round-feedback" tabindex="-1"><div class="answer-content"><div class="answer-heading">${esc(intro)}</div><p>${esc(part.rationale)}</p><div class="round-option-reasons">${part.options.map((opt,i)=>`<div><b>${String.fromCharCode(65+i)} · ${part.correct.includes(i)?'Retain':'Do not rely on this'}</b><p>${esc(opt.why)}</p></div>`).join('')}</div><div class="source-caption">CHECK THE PRIMARY GUIDANCE</div><div class="source-list">${sourceLinks(findCase().sources)}</div></div></div>`;
    }

    function handoverHTML(part,round) {
      return `<p class="round-guidance">Write brief factual statements. This draft stays in this page’s memory until you change or restart the case. Do not enter actual patient information.</p><div class="handover-fields">${Object.entries(letters).map(([key,title])=>`<label class="handover-field"><span><b>${key}</b> ${title}</span><textarea rows="2" data-round-field="${key}" placeholder="Your ${esc(title.toLowerCase())} …" ${compared?'disabled':''}>${esc(draft[key])}</textarea></label>`).join('')}</div>${compared?`<div class="model-handover" id="round-feedback" tabindex="-1"><h4>One defensible handover</h4>${Object.entries(round.model).map(([key,value])=>`<p><strong>${key}.</strong> ${esc(value)}</p>`).join('')}<p class="gentle-note">Compare whether you included the change from baseline, the correct escalation status, confirmed information versus possibilities, and ownership of unresolved actions.</p><div class="source-list">${sourceLinks(round.sources)}</div></div>`:`<button class="reveal-button" id="round-compare" type="button">Compare with a model ISBAR</button>`}`;
    }

    function branchHTML(part,round) {
      const path=branchPath===null?null:part.paths[branchPath];
      const result=path && branchReply!==null?path.replies[branchReply]:null;
      return `<p class="round-guidance">${esc(part.introduction)}</p>
        <div class="branch-path-list" role="group" aria-label="Choose a route for reassessment">${part.paths.map((p,i)=>`<button type="button" class="branch-path ${branchPath===i?'selected':''}" data-branch-path="${i}" aria-pressed="${branchPath===i}"><span class="branch-index">ROUTE ${i+1}</span><strong>${esc(p.title)}</strong></button>`).join('')}</div>
        ${path?`<section class="branch-finding" id="branch-finding" tabindex="-1"><span class="type-label">ONE PLAUSIBLE NEXT FINDING · FICTIONAL</span><h5>What the reassessment reveals</h5><p>${esc(path.development)}</p><h5>How to interpret it</h5><p>${esc(path.interpretation)}</p></section><div class="branch-response"><h5>${esc(path.followup)}</h5><div class="choice-list" role="group" aria-label="Decide how to respond to this finding">${path.replies.map((reply,i)=>`<button type="button" data-branch-reply="${i}" class="choice ${branchReply===i?'selected':''} ${compared&&i===path.correct?'correct':''}" aria-pressed="${branchReply===i}" ${compared?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(reply.text)}</span></button>`).join('')}</div></div>`:''}
        ${result?`<section id="round-feedback" tabindex="-1" class="answer-panel ${branchReply===path.correct?'':'wrong'}"><div class="answer-content"><div class="answer-heading">${branchReply===path.correct?'Reasoning aligned with this example':'Review the stronger response'}</div><p>${esc(result.why)}</p>${branchReply===path.correct?'':`<p><strong>Supported alternative:</strong> ${esc(path.replies[path.correct].text)} — ${esc(path.replies[path.correct].why)}</p>`}<p>${esc(part.debrief)}</p><p class="gentle-note">You can choose another route above to compare possible findings. The simulated observation is not a predicted outcome or proof of a medical diagnosis.</p><div class="source-list">${sourceLinks(round.sources)}</div></div></section>`:''}`;
    }

    function artwork(round) {
      const item=round.imageKey&&window.STUDY_ART?.[round.imageKey];
      if(!item)return '';
      const imported=savedArt(round.imageKey);
      const src=imported||item.offline;
      const label=imported?'Imported illustration · stored on this device':(item.hasLocalArt||item.hasLocalRunway)?'Illustrated case scene · embedded':'Offline schematic illustration';
      return `<figure class="round-scene"><img src="${src}" alt="Fictional illustrated context for ${esc(round.title)}; not a diagnostic image" loading="lazy"><figcaption><strong>${esc(label)}</strong>Visual context only; use the written case data as the evidence. <div class="round-art-tools"><label for="round-art-file" class="round-art-import">Replace scene artwork</label><input type="file" id="round-art-file" accept="image/png,image/jpeg,image/webp" hidden>${imported?'<button class="round-art-remove" type="button" id="round-art-remove">Restore schematic</button>':''}<span id="round-art-status" aria-live="polite">Your image stays on this device.</span></div></figcaption></figure>`;
    }

    function investigations(round) {
      if (!round.trends?.length) return '';
      const chart=(metric)=>{
        const present=metric.values.map((v,i)=>({i,v})).filter(p=>Number.isFinite(p.v));
        const numeric=present.map(p=>p.v);
        const min=Math.min(...numeric),max=Math.max(...numeric);
        const span=Math.max(0.25,max-min),pad=span*.24;
        const y=v=>Number((72-(v-min+pad)/(span+2*pad)*52).toFixed(2));
        const x=i=>35+i*104;
        const points=present.map(p=>`${x(p.i)},${y(p.v)}`).join(' ');
        const labels=round.timepoints.map((p,i)=>`<text x="${x(i)}" y="99" text-anchor="middle" class="lab-axis">${esc(p.time)}</text>`).join('');
        const markers=present.map(p=>`<circle cx="${x(p.i)}" cy="${y(p.v)}" r="4" class="lab-dot"/><text x="${x(p.i)}" y="${y(p.v)-9}" text-anchor="middle" class="lab-value">${p.v}</text>`).join('');
        return `<div class="lab-trend"><div class="lab-title"><strong>${esc(metric.label)}</strong><small>${esc(metric.unit)}</small></div><svg viewBox="0 0 280 110" role="img" aria-label="${esc(metric.label)}: ${metric.values.map((v,i)=>v===null?'not sampled at '+round.timepoints[i].time:round.timepoints[i].time+' '+v).join('; ')}"><path d="M30 20H251 M30 76H251" stroke="#e4eee7" stroke-width="1"/><polyline points="${points}" fill="none" stroke="#2e846c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${markers}${labels}</svg></div>`;
      };
      return `<section class="round-investigations" aria-label="Recorded investigation trends"><div class="round-subheading"><h4>Investigation trend</h4><span>Illustrative values · same time axis as case</span></div><div class="lab-trends">${round.trends.map(chart).join('')}</div><p>Plots show only supplied fictional results; no clinical cut-offs or treatment instructions are inferred from the chart.</p></section>`;
    }

    function timeline(round) {
      const point=round.timepoints[timepoint];
      return `<section class="round-observations" aria-label="Fictional observation timeline"><div class="round-subheading"><h4>Observation timeline</h4><span>Tap a time to inspect the change</span></div><div class="round-times">${round.timepoints.map((p,i)=>`<button type="button" data-round-time="${i}" class="time-button ${timepoint===i?'active':''}" aria-pressed="${timepoint===i}"><strong>${esc(p.time)}</strong><span>RR ${esc(p.rr)} · HR ${esc(p.hr)}</span></button>`).join('')}</div><div class="round-facts"><div><span>Resp /min</span><strong>${point.rr}</strong></div><div><span>Heart /min</span><strong>${point.hr}</strong></div><div><span>SpO₂</span><strong>${esc(point.spo2)}</strong></div><div><span>BP mmHg</span><strong>${esc(point.bp)}</strong></div></div><p class="round-time-note"><b>${esc(point.mind)}.</b> ${esc(point.note)}</p><details class="data-details"><summary>View the complete numerical timeline</summary><div class="round-table-scroll"><table><thead><tr><th>Time</th><th>RR</th><th>HR</th><th>SpO₂</th><th>BP</th><th>Observation</th></tr></thead><tbody>${round.timepoints.map(p=>`<tr><td>${esc(p.time)}</td><td>${p.rr}</td><td>${p.hr}</td><td>${esc(p.spo2)}</td><td>${esc(p.bp)}</td><td>${esc(p.mind)}</td></tr>`).join('')}</tbody></table></div></details></section>`;
    }

    function reading(round) {
      return `<details id="round-reading" class="round-reading" ${readingOpen?'open':''}><summary><span>In-depth reading for this case</span><small>${round.reading.sections.length} sections · pathophysiology, medicines, clinical response</small></summary><div class="round-reading-body"><p class="reading-lead">${esc(round.reading.lead)}</p>${round.reading.sections.map((section,i)=>`<section class="reading-part"><div class="round-read-number">${String(i+1).padStart(2,'0')}</div><h4>${esc(section.heading)}</h4><p>${esc(section.body)}</p></section>`).join('')}<div class="reading-reflect"><span>REFLECT</span><p>${esc(round.reading.reflection)}</p></div><div class="source-caption">PRIMARY SOURCES</div><div class="source-list">${sourceLinks(round.sources)}</div></div></details>`;
    }

    function finished(round) {
      return `<article class="studio-panel round-stage"><span class="type-label">CASE COMPLETE · SELF-REVIEW</span><h3>What would you remember on the next shift?</h3><p>You worked through the evolving observations, a differential, parallel safety priorities and your own handover. No score is recorded.</p><ul class="round-takeaways">${round.debrief.map(point=>`<li>${esc(point)}</li>`).join('')}</ul><div class="source-caption">ORIGINAL GUIDANCE</div><div class="source-list">${sourceLinks(round.sources)}</div><button type="button" id="round-restart" class="action-button">Explore this case again ↺</button></article>`;
    }

    function render(root) {
      const round=findCase();
      const part=round.stages[stage];
      const progress=(Math.min(stage,round.stages.length)/round.stages.length)*100;
      const chooser=`<div class="round-chooser" role="group" aria-label="Choose a clinical reasoning case">${cases.map(item=>`<button type="button" data-round-case="${esc(item.id)}" class="round-pick ${item.id===active?'active':''}" aria-pressed="${item.id===active}"><span>${esc(item.tag)}</span><strong>${esc(item.title)}</strong><small>${esc(item.duration)}</small></button>`).join('')}</div>`;
      const main=part?`<article class="studio-panel round-stage"><div class="round-progress-label"><span>DECISION ${stage+1} OF ${round.stages.length}</span><span>${esc(part.heading)}</span></div><div class="round-progress"><div style="width:${progress}%"></div></div><h3>${esc(round.title)}</h3><p class="studio-lead">${esc(round.context)}</p>${artwork(round)}${timeline(round)}${investigations(round)}<div class="round-question"><div class="type-label">${part.kind==='handover'?'COMMUNICATION PRACTICE':part.kind==='branch'?'BRANCHING REASSESSMENT':part.kind==='multi'?'SELECT MULTIPLE · THINK IN PARALLEL':'CLINICAL INTERPRETATION'}</div><h4>${esc(part.prompt)}</h4>${part.kind==='handover'?handoverHTML(part,round):part.kind==='branch'?branchHTML(part,round):choicesHTML(part)}${part.kind==='handover'||part.kind==='branch'?'':choiceDebrief(part)}${compared?`<div class="case-actions"><button type="button" id="round-next" class="action-button">${stage===round.stages.length-1?'Read debrief':'Next decision'} →</button></div>`:''}</div></article>`:finished(round);
      root.innerHTML=`<div class="round-intro"><div><span class="type-label">CLINICAL REASONING LAB · ${cases.length} EXTENDED CASES</span><p>Follow a changing patient, weigh competing explanations, choose parallel priorities and practise an ISBAR. Read the linked clinical background at any point.</p></div><span class="round-safe-label">Fictional · Not graded</span></div>${chooser}${main}${reading(round)}<div class="evidence-note">Educational simulation only · ${round.imageKey?'New specialty references checked 13 November 2026; older content has earlier source dates':'Historical source review 26 October 2026'} · Independent clinical validation pending · Use your local CERS, chart, scope and current policies for real care.</div>`;
      // Optional self-contained local import of the Runway output; no server upload.
      const artInput=root.querySelector('#round-art-file');
      artInput?.addEventListener('change',event=>{
        const file=event.target.files?.[0];
        if(!file)return;
        const status=root.querySelector('#round-art-status');
        if(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>25_000_000){
          if(status)status.textContent='Choose a PNG, JPEG or WebP under 25 MB.';return;
        }
        if(typeof FileReader==='undefined'||typeof Image==='undefined'||typeof document==='undefined')return;
        const reader=new FileReader();
        reader.onerror=()=>{if(status)status.textContent='Could not read this image.';};
        reader.onload=()=>{
          const picture=new Image();
          picture.onerror=()=>{if(status)status.textContent='The selected image could not be opened.';};
          picture.onload=()=>{
            try{
              const ratio=Math.min(1,1600/picture.width,900/picture.height);
              const canvas=document.createElement('canvas');
              canvas.width=Math.max(1,Math.round(picture.width*ratio));
              canvas.height=Math.max(1,Math.round(picture.height*ratio));
              const ctx=canvas.getContext('2d');
              ctx.drawImage(picture,0,0,canvas.width,canvas.height);
              const result=canvas.toDataURL('image/webp',.76);
              artSession[round.imageKey]=result;
              try{localStorage.setItem('nsl-case-art-'+round.imageKey,result);}catch{/* memory-only fallback */}
              readingOpen=Boolean(root.querySelector('#round-reading')?.open);
              render(root);
            }catch{if(status)status.textContent='Image import failed; use another image.';}
          };
          picture.src=String(reader.result);
        };
        reader.readAsDataURL(file);
      });
      root.querySelector('#round-art-remove')?.addEventListener('click',()=>{
        delete artSession[round.imageKey];
        try{localStorage.removeItem('nsl-case-art-'+round.imageKey);}catch{}
        readingOpen=Boolean(root.querySelector('#round-reading')?.open);
        render(root);
      });
      root.querySelectorAll('[data-round-case]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.roundCase!==active){active=button.dataset.roundCase;clean();render(root);}}));
      root.querySelectorAll('[data-round-time]').forEach(button=>button.addEventListener('click',()=>{timepoint=Number(button.dataset.roundTime);readingOpen=Boolean(root.querySelector('#round-reading')?.open);render(root);}));
      root.querySelector('#round-reading')?.addEventListener('toggle',event=>{readingOpen=event.target.open;});
      if (part?.kind==='branch') {
        root.querySelectorAll('[data-branch-path]').forEach(button=>button.addEventListener('click',()=>{
          branchPath=Number(button.dataset.branchPath);
          branchReply=null;
          compared=false;
          readingOpen=Boolean(root.querySelector('#round-reading')?.open);
          render(root);
          root.querySelector('#branch-finding')?.focus({preventScroll:true});
        }));
        if (!compared && branchPath!==null) {
          root.querySelectorAll('[data-branch-reply]').forEach(button=>button.addEventListener('click',()=>{
            branchReply=Number(button.dataset.branchReply);
            compared=true;
            readingOpen=Boolean(root.querySelector('#round-reading')?.open);
            render(root);
            root.querySelector('#round-feedback')?.focus({preventScroll:true});
          }));
        }
      }
      if (part && !compared && part.kind!=='branch') {
        root.querySelectorAll('[data-round-option]').forEach(button=>button.addEventListener('click',()=>{
          const i=Number(button.dataset.roundOption);
          if(part.kind==='single'){selected=new Set([i]);compared=true;}
          else if(selected.has(i))selected.delete(i);else selected.add(i);
          readingOpen=Boolean(root.querySelector('#round-reading')?.open);
          render(root);
          if(compared)root.querySelector('#round-feedback')?.focus({preventScroll:true});
        }));
        root.querySelectorAll('[data-round-field]').forEach(area=>area.addEventListener('input',event=>{draft[event.target.dataset.roundField]=event.target.value;}));
        root.querySelector('#round-compare')?.addEventListener('click',()=>{compared=true;readingOpen=Boolean(root.querySelector('#round-reading')?.open);render(root);root.querySelector('#round-feedback')?.focus({preventScroll:true});});
      }
      root.querySelector('#round-next')?.addEventListener('click',()=>{stage++;selected=new Set();compared=false;branchPath=null;branchReply=null;readingOpen=Boolean(root.querySelector('#round-reading')?.open);render(root);root.querySelector('.round-stage')?.scrollIntoView({behavior:'smooth',block:'start'});});
      root.querySelector('#round-restart')?.addEventListener('click',()=>{clean();render(root);});
    }
    return {render,open(){/* Preserve current in-session case while switching study modes. */}};
  };
})();

