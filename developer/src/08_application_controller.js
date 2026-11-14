
(function () {
  'use strict';
  const bank = window.STUDY_BANK;
  const readings = window.STUDY_READINGS;
  const cases = window.STUDY_CASES;
  if (!bank?.modules || !readings || !cases || !window.STUDY_STUDIO_DATA || !window.createNursingStudio || !window.STUDY_SPACING || !window.STUDY_ROUNDS || !window.createClinicalRounds) throw new Error('Study bank or learning activities not loaded.');

  const STORAGE_KEY = 'nsw-nursing-study-lab-v1'; // Preserve existing progress across upgrades.
  const allQuestions = bank.modules.flatMap(module => module.questions);
  const knownIds = new Set(allQuestions.map(q => q.id));
  const total = allQuestions.length;
  const el = id => document.getElementById(id);
  const topicIcons = {deterioration:'♡',infection:'✳',medicines:'✚',communication:'☰',delirium:'◎',falls:'◇',resuscitation:'↯',professional:'▤','deep-sepsis':'◎','deep-medication':'✚','deep-delirium':'◇','deep-communication':'☰'};
  const specialModes = ['saved','review','mixed','cases','studio','rounds'];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function readStored() {
    const initial = {mode:bank.modules[0].id,index:0,view:'questions',seen:[],saved:[],incorrect:[],mixedIds:[],readingsVisited:[],caseCompleted:[],revision:{}};
    try {
      const item = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        mode: specialModes.includes(item.mode) || bank.modules.some(m => m.id === item.mode) ? item.mode : initial.mode,
        index: Number.isInteger(item.index) ? item.index : 0,
        view: item.view === 'reading' ? 'reading' : 'questions',
        seen: Array.isArray(item.seen) ? item.seen.filter(id => knownIds.has(id)) : [],
        saved: Array.isArray(item.saved) ? item.saved.filter(id => knownIds.has(id)) : [],
        incorrect: Array.isArray(item.incorrect) ? item.incorrect.filter(id => knownIds.has(id)) : [],
        mixedIds: Array.isArray(item.mixedIds) ? item.mixedIds.filter(id => knownIds.has(id)) : [],
        readingsVisited: Array.isArray(item.readingsVisited) ? item.readingsVisited.filter(id=>Boolean(readings[id])) : [],
        caseCompleted: Array.isArray(item.caseCompleted) ? item.caseCompleted.filter(id=>cases.some(c=>c.id===id)) : [],
        revision: Object.fromEntries(Object.entries(item.revision && typeof item.revision==='object' && !Array.isArray(item.revision) ? item.revision : {}).filter(([id,value])=>knownIds.has(id)&&(allQuestions.find(q=>q.id===id)?.type||'single')!=='short'&&value&&Number.isFinite(value.dueAt)&&Number.isInteger(value.step)&&value.step>=0&&value.step<=3))
      };
    } catch (_) { return initial; }
  }

  let state = readStored();
  if (specialModes.includes(state.mode)) state.view = 'questions';
  let revealed = false;
  let singleChoice = null;
  let multiChoices = new Set();
  let writtenDraft = '';
  let calcDraft = '';
  let orderDraft = [];
  let activeCase = cases[0].id;
  let caseStep = 0;
  let caseSelected = -1;
  let lastCasePreferred = true;
  let pendingResolvedId = null;
  let searchTerm = '';
  const persist = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {} };
  const getModule = id => bank.modules.find(m => m.id === id);
  const questionsForMode = () => state.mode === 'saved' ? allQuestions.filter(q => state.saved.includes(q.id)) : state.mode === 'review' ? allQuestions.filter(q => state.incorrect.includes(q.id)) : state.mode === 'mixed' ? state.mixedIds.map(id=>allQuestions.find(q=>q.id===id)).filter(Boolean) : (getModule(state.mode)?.questions || []);
  const current = () => questionsForMode()[Math.max(0,Math.min(state.index,questionsForMode().length-1))];
  const questionType = q => q.type || 'single';
  const sourceLinks = ids => ids.map(id => {
    const source = bank.sources[id];
    return source ? `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ↗</a>` : '';
  }).join('');
  const studio = window.createNursingStudio({bank,sourceLinks,esc,getState:()=>state,persist,openQuestion:id=>{
    const q=allQuestions.find(item=>item.id===id);
    const mod=bank.modules.find(m=>m.questions.includes(q));
    if(!mod) return;
    state.mode=mod.id;state.index=mod.questions.indexOf(q);state.view='questions';
    clearAnswer();persist();render();el('quiz-root').scrollIntoView({behavior:'smooth',block:'nearest'});
  }});
  const rounds=window.createClinicalRounds({sourceLinks,esc});

  function clearAnswer() {
    if (pendingResolvedId) state.incorrect = state.incorrect.filter(id=>id!==pendingResolvedId);
    revealed = false;
    singleChoice = null;
    multiChoices = new Set();
    writtenDraft = '';
    calcDraft = '';
    orderDraft = [];
    pendingResolvedId = null;
  }

  function goToMode(mode) {
    state.mode = mode;
    if (specialModes.includes(mode)) state.view = 'questions';
    const questions = questionsForMode();
    const unseenIndex = questions.findIndex(q => !state.seen.includes(q.id));
    state.index = unseenIndex < 0 ? 0 : unseenIndex;
    clearAnswer();
    persist();
    render();
    if (window.innerWidth < 680) el('quiz-root').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function goToRounds() {
    state.mode='rounds';state.view='questions';
    clearAnswer();rounds.open();persist();render();
    if (window.innerWidth < 680) el('quiz-root').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function goToMixed() {
    const pool = [...bank.modules];
    const selected = [];
    while (selected.length < Math.min(10,total) && pool.length) {
      for (const mod of [...pool]) {
        const opts = mod.questions.filter(q=>!selected.includes(q.id));
        if (opts.length) selected.push(opts[Math.floor(Math.random()*opts.length)].id);
        else pool.splice(pool.indexOf(mod),1);
        if (selected.length === 10) break;
      }
    }
    state.mixedIds = selected;
    goToMode('mixed');
  }

  function goToCases() {
    state.mode = 'cases'; state.view = 'questions';
    caseStep = 0; caseSelected = -1;
    persist(); render();
  }

  function goToStudio() {
    state.mode='studio';state.view='questions';
    clearAnswer();studio.open();persist();render();
    if(window.innerWidth<680) el('quiz-root').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function setView(view) {
    if (specialModes.includes(state.mode) && view === 'reading') return;
    state.view = view;
    clearAnswer();
    persist();
    render();
  }

  function renderNav() {
    const navGroup = (group, label) => {
      const items = bank.modules.filter(m => (m.level === 'advanced') === group);
      return `<div class="nav-group-heading">${label}</div>` + items.map(m => {
        const done = m.questions.filter(q => state.seen.includes(q.id)).length;
        return `<button type="button" class="module-link ${state.mode === m.id ? 'active' : ''}" data-module="${esc(m.id)}" aria-current="${state.mode === m.id ? 'page' : 'false'}"><span class="module-symbol" aria-hidden="true">${topicIcons[m.id]||'•'}</span><span><span class="label-strong">${esc(m.name)}</span><span class="label-sub">${esc(m.short)}</span></span><span class="module-number">${done}/${m.questions.length}</span></button>`;
      }).join('');
    };
    el('module-nav').innerHTML = navGroup(false,'FOUNDATIONS') + navGroup(true,'CLINICAL CASES');
    el('module-nav').querySelectorAll('[data-module]').forEach(button => button.addEventListener('click',()=>goToMode(button.dataset.module)));
    el('saved-button').classList.toggle('active',state.mode === 'saved');
    el('review-button').classList.toggle('active',state.mode === 'review');
    el('cases-button').classList.toggle('active',state.mode === 'cases');
    el('rounds-button').classList.toggle('active',state.mode === 'rounds');
    el('mix-button').classList.toggle('active',state.mode === 'mixed');
    el('studio-button').classList.toggle('active',state.mode === 'studio');
  }

  function renderProgress() {
    el('sidebar-progress-numbers').textContent = `${state.seen.length} / ${total}`;
    el('sidebar-progress-fill').style.width = `${Math.round(100 * state.seen.length / total)}%`;
    el('saved-count').textContent = state.saved.length;
    el('missed-count').textContent = state.incorrect.length;
    const due=studio.dueCount();
    el('studio-due').textContent=due?`· ${due} due`:'';
  }

  function renderHeading() {
    const m = getModule(state.mode);
    const questions = questionsForMode();
    const titles = {saved:'Saved questions',review:'Review your missed answers',mixed:'Ten-question mixed revision',cases:'Guided clinical cases',studio:'Learning studio',rounds:'Clinical reasoning rounds'};
    const summaries = {saved:'A personal reading list of questions you bookmarked.',review:'Revisit previously missed selections. Answer correctly to remove them from the review list.',mixed:'A fresh mix across topics, without grades or time limits.',cases:'Work through progressive scenarios, see the consequences of each choice and read the rationale.',studio:'Investigate evidence, interpret a clinical trend, and build a thoughtful revision habit.',rounds:'Six extended fictional cases: serial observations, differential reasoning, clinical reassessment branches in the new specialty cases, written handover and deeper reading.'};
    el('section-title').textContent = m ? m.name : titles[state.mode] || 'Study';
    el('section-count').textContent = m ? `${questions.length} QUESTIONS` : state.mode==='cases' ? `${cases.length} CASES` : state.mode==='studio' ? '3 EXPERIENCES' : state.mode==='rounds' ? `${window.STUDY_ROUNDS.scenarios.length} DEEP CASES` : `${questions.length} ITEMS`;
    el('module-summary').textContent = m ? m.summary : summaries[state.mode] || '';
    const hasReading = Boolean(m && readings[m.id]);
    el('study-tabs').hidden = !hasReading;
    el('view-questions').classList.toggle('active', state.view === 'questions');
    el('view-reading').classList.toggle('active', state.view === 'reading');
    el('view-questions').setAttribute('aria-pressed',String(state.view === 'questions'));
    el('view-reading').setAttribute('aria-pressed',String(state.view === 'reading'));
  }

  function renderReading() {
    const m = getModule(state.mode);
    const r = readings[m.id];
    if (!state.readingsVisited.includes(m.id)) {state.readingsVisited.push(m.id);persist();}
    el('quiz-root').innerHTML = `<article class="reading-card">
      <div class="reading-top"><span class="question-numeral">TOPIC READING</span><span class="reading-time">Study notes • Official references</span></div>
      <div class="reading-body"><h3>${esc(m.name)}</h3><p class="reading-lead">${esc(r.lead)}</p>
      ${r.objectives ? `<div class="objective-card"><strong>Learning objectives</strong><ul>${r.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul></div>`:''}
      ${r.sections.map((s,i)=>`<section class="reading-part" id="reading-section-${i}"><h4>${esc(s.heading)}</h4><p>${esc(s.body)}</p></section>`).join('')}
      <div class="reading-reflect"><span>PAUSE & THINK</span><p>${esc(r.reflection)}</p></div>
      <div class="source-caption">PRIMARY GUIDANCE — READ THE FULL SOURCES</div><div class="source-list">${sourceLinks(r.sources)}</div>
      <div class="evidence-note">Source register assembled: ${esc(r.sourceRegisterUpdatedOn||'26 October 2026')} (not a claim-by-claim verification date). Clinical content awaits independent qualified review.</div>
      </div><div class="question-footer"><p>These notes are a learning overview, not local clinical instructions.</p><button id="start-practice" class="action-button" type="button">Practice this topic <span>→</span></button></div></article>`;
    el('start-practice').addEventListener('click',()=>setView('questions'));
  }

  function markExplored(q) {
    revealed = true;
    if (!state.seen.includes(q.id)) state.seen.push(q.id);
    const type = questionType(q);
    const correct = type === 'single' ? singleChoice === q.answer :
      type === 'multi' ? multiChoices.size === q.correct.length && q.correct.every(i => multiChoices.has(i)) :
      type === 'calc' ? calcDraft.trim() !== '' && Number.isFinite(Number(calcDraft)) && Math.abs(Number(calcDraft)-q.expected) <= (q.tolerance ?? 0.000001) :
      type === 'order' ? q.steps.every((_,i)=>orderDraft[i]===i) : null;
    if (correct === false && !state.incorrect.includes(q.id)) state.incorrect.push(q.id);
    if (correct === true) {
      if (state.mode === 'review') pendingResolvedId=q.id;
      else state.incorrect = state.incorrect.filter(id=>id!==q.id);
    }
    if (state.revision[q.id] && correct !== null) state.revision[q.id]=window.STUDY_SPACING.next(state.revision[q.id],correct,Date.now());
    persist();
    render();
    el('answer-panel')?.focus({preventScroll:true});
  }

  function renderAnswerPanel(q) {
    if (!revealed) return '';
    const type = questionType(q);
    const singleCorrect = type === 'single' && singleChoice === q.answer;
    const multiCorrect = type === 'multi' && multiChoices.size === q.correct.length && q.correct.every(i=>multiChoices.has(i));
    const calcCorrect = type === 'calc' && calcDraft.trim() !== '' && Number.isFinite(Number(calcDraft)) && Math.abs(Number(calcDraft)-q.expected) <= (q.tolerance??0.000001);
    const orderCorrect = type === 'order' && q.steps.every((_,i)=>orderDraft[i]===i);
    const correct = singleCorrect || multiCorrect || calcCorrect || orderCorrect;
    const heading = type === 'short' ? 'Compare your clinical reasoning' : correct ? 'That’s a supported answer.' : 'Let’s unpack that together.';
    const written = type === 'short' ? `<div class="comparison"><div class="comparison-label">YOUR THOUGHTS</div><p>${esc(writtenDraft.trim() || 'No written notes entered — use the model discussion to think it through.')}</p><div class="comparison-label">MODEL DISCUSSION</div><p>${esc(q.modelAnswer)}</p><div class="comparison-label">CONSIDER WHETHER YOU INCLUDED</div><ul>${q.keyPoints.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></div>` : '';
    const numeric = type==='calc' ? `<div class="comparison"><div class="comparison-label">WORKED ANSWER</div><strong>${esc(q.expected)} ${esc(q.unit)}</strong><ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>` : '';
    const sequence = type==='order' ? `<div class="comparison"><div class="comparison-label">SUGGESTED WORKFLOW</div><ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>` : '';
    const scheduled=state.revision[q.id];
    const revisionControl=type==='short'?'':`<button type="button" class="reading-jump" id="schedule-question">${scheduled?'Remove from revision plan':'Add to revision plan ↺'}</button>${scheduled?`<span class="scheduled-note">Suggested next review: ${esc(new Date(scheduled.dueAt).toLocaleDateString('en-AU'))}</span>`:''}`;
    const originModule = bank.modules.find(m=>m.questions.some(item=>item.id===q.id));
    return `<div class="answer-panel ${type !== 'short' && !correct ? 'wrong' : ''}" id="answer-panel" tabindex="-1"><div class="answer-content">
      <div class="answer-heading"><span class="answer-dot" aria-hidden="true">${correct?'✓':'↗'}</span>${heading}</div>
      ${written}${numeric}${sequence}<p>${esc(q.explanation)}</p><p class="takeaway"><b>Remember:</b> ${esc(q.takeaway)}</p>
      <div class="source-caption">CHECK THE ORIGINAL GUIDANCE</div><div class="source-list">${sourceLinks(q.sources)}</div>
      <div class="evidence-note">Source checked: ${esc(q.verifiedOn||originModule.sourceCheckedOn)} · Clinician validation pending · Population: ${esc(q.population||originModule.population)}</div>
      <div class="answer-tools"><button type="button" class="reading-jump" id="related-reading">Open related reading ↗</button>${revisionControl}</div>
      </div></div>`;
  }

  function renderChoices(q) {
    const type = questionType(q);
    if (type === 'short') {
      return `<div class="writing-box"><label for="written-answer">Your thinking (private to this page)</label><textarea id="written-answer" rows="6" placeholder="What would you assess, prioritise, communicate and document?" ${revealed?'disabled':''}>${esc(writtenDraft)}</textarea><p class="field-hint">Not graded or uploaded. Your draft is not saved when you leave the question.</p>${revealed?'':'<button class="reveal-button" id="reveal-answer" type="button">Reveal model discussion</button>'}</div>`;
    }
    if (type === 'calc') return `<div class="writing-box"><label for="calc-answer">Your numerical answer (${esc(q.unit)})</label><input id="calc-answer" class="number-answer" type="number" step="any" inputmode="decimal" value="${esc(calcDraft)}" ${revealed?'disabled':''} /><p class="field-hint">Hypothetical calculation only. Do not use for real prescribing or administration.</p>${revealed?'':'<button class="reveal-button" id="reveal-answer" type="button">Check calculation & working</button>'}</div>`;
    if (type === 'order') return `<div class="writing-box"><p class="field-hint">Select steps in your proposed order. You can undo your last selection.</p><div class="order-options">${q.steps.map((s,i)=>`<button class="choice ${orderDraft.includes(i)?'selected':''}" type="button" data-order="${i}" ${revealed||orderDraft.includes(i)?'disabled':''}><span class="letter">${orderDraft.includes(i)?orderDraft.indexOf(i)+1:'+'}</span>${esc(s)}</button>`).join('')}</div><div class="order-tools"><button id="undo-order" type="button" ${revealed||!orderDraft.length?'disabled':''}>Undo last</button>${revealed?'':'<button class="reveal-button" id="reveal-answer" type="button">Compare workflow</button>'}</div></div>`;
    const choices = q.choices.map((choice,i)=>{
      const picked = type === 'single' ? singleChoice === i : multiChoices.has(i);
      const correct = type === 'single' ? q.answer === i : q.correct.includes(i);
      const classes = ['choice',revealed && correct?'correct':'',picked?'selected':'',revealed && !picked && !correct?'dimmed':''].filter(Boolean).join(' ');
      const mark = revealed && correct ? '<span class="mark" aria-label="Supported answer">✓</span>' : '';
      return `<button type="button" class="${classes}" data-answer="${i}" ${revealed?'disabled':''} aria-pressed="${picked}" aria-label="Option ${i+1}: ${esc(choice)}"><span class="letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${esc(choice)}</span>${mark}</button>`;
    }).join('');
    return `${type==='multi'?'<p class="multi-hint">Select every option you believe is supported, then compare your selections.</p>':''}<div class="choice-list" role="group" aria-label="${type==='multi'?'Select one or more answers':'Choose one answer'}">${choices}</div>${type==='multi'&&!revealed?'<button class="reveal-button" id="reveal-answer" type="button">Compare selections</button>':''}`;
  }

  function renderQuestion() {
    const questions = questionsForMode();
    if (!questions.length) {
      const reviewing = state.mode === 'review';
      el('quiz-root').innerHTML = `<div class="empty-card"><div class="empty-star" aria-hidden="true">${reviewing?'✓':'☆'}</div><h3>${reviewing?'No missed answers in your review list.':'Nothing saved just yet.'}</h3><p>${reviewing?'Choose a topic or try a mixed revision session. New missed selections will appear here.':'Tap “Save for later” on a question you would like to revisit.'}</p><button type="button" class="action-button" id="empty-start">Explore a topic <span>→</span></button></div>`;
      el('empty-start').addEventListener('click',()=>goToMode(bank.modules[0].id));
      return;
    }
    const q = current();
    state.index = questions.indexOf(q);
    const type = questionType(q);
    const bookmarked = state.saved.includes(q.id);
    const last = state.index === questions.length-1;
    const afterLast = Boolean(getModule(state.mode)) && bank.modules.findIndex(mod=>mod.id===state.mode) < bank.modules.length-1;
    const nextLabel = last ? (afterLast?'Explore next module':state.mode==='review'?'Update review list':state.mode==='saved'?'Review saved again':state.mode==='mixed'?'Review this mix again':'Review this module again') : 'Next question';
    const typeLabel = type === 'short' ? 'WRITTEN REFLECTION' : type === 'multi' ? 'SELECT ALL THAT APPLY' : type === 'calc' ? 'WORKED CALCULATION' : type === 'order' ? 'ORDER THE WORKFLOW' : q.scenario ? 'CLINICAL CASE' : '';
    const prompt = type==='short'?'Write your reasoning, then self-check.':type==='multi'?'Choose any number of options before comparing.':type==='calc'?'Calculate using the stated hypothetical values.':type==='order'?'Select every step in order.':'Choose what you think is right.';
    el('quiz-root').innerHTML = `<article class="question-card">
      <div class="question-top"><span class="question-numeral">QUESTION ${String(state.index+1).padStart(2,'0')} <span style="color:#A3B9B0">/ ${String(questions.length).padStart(2,'0')}</span></span><button class="bookmark-button ${bookmarked?'is-saved':''}" type="button" id="bookmark" aria-pressed="${bookmarked}"><span class="star" aria-hidden="true">${bookmarked?'★':'☆'}</span>${bookmarked?'Saved for later':'Save for later'}</button></div>
      <div class="question-progress"><div style="width:${100*(state.index+1)/questions.length}%"></div></div>
      <div class="question-body">${typeLabel?`<div class="type-label">${typeLabel}</div>`:''}${q.scenario?`<div class="case-vignette"><span>CLINICAL SCENARIO</span><p>${esc(q.scenario)}</p></div>`:''}<h3>${esc(q.stem)}</h3>${renderChoices(q)}${renderAnswerPanel(q)}</div>
      <div class="question-footer"><p>${revealed?'Explanation explored.':prompt}</p><button class="action-button" type="button" id="next-question" ${revealed?'':'disabled'}>${nextLabel} <span>→</span></button></div>
      </article>`;
    el('bookmark').addEventListener('click',()=>toggleBookmark(q.id));
    if (!revealed && (type==='single'||type==='multi')) el('quiz-root').querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click',()=>chooseAnswer(Number(button.dataset.answer))));
    if (!revealed && type === 'short') el('written-answer').addEventListener('input',e=>{writtenDraft=e.target.value;});
    if (!revealed && type === 'calc') el('calc-answer').addEventListener('input',e=>{calcDraft=e.target.value;});
    if (!revealed && type === 'order') {
      el('quiz-root').querySelectorAll('[data-order]').forEach(b=>b.addEventListener('click',()=>{orderDraft.push(Number(b.dataset.order));renderQuestion();}));
      el('undo-order').addEventListener('click',()=>{orderDraft.pop();renderQuestion();});
    }
    if (!revealed && type !== 'single') {
      const compare = el('reveal-answer');
      if (type === 'multi') compare.disabled = multiChoices.size === 0;
      if (type === 'order') compare.disabled = orderDraft.length !== q.steps.length;
      compare.addEventListener('click',()=>markExplored(q));
    }
    if (revealed) el('related-reading').addEventListener('click',()=>goToReadingForQuestion(q));
    if (revealed && type!=='short') el('schedule-question').addEventListener('click',()=>{
      if(state.revision[q.id]) delete state.revision[q.id];
      else state.revision[q.id]=window.STUDY_SPACING.begin(Date.now());
      persist();render();el('answer-panel')?.focus({preventScroll:true});
    });
    el('next-question').addEventListener('click',nextQuestion);
  }

  function goToReadingForQuestion(q) {
    const parent = bank.modules.find(mod=>mod.questions.some(item=>item.id===q.id));
    if (!parent || !readings[parent.id]) return;
    state.mode = parent.id;
    state.view = 'reading';
    clearAnswer(); persist(); render();
    const target = el('reading-section-'+(q.readingSection??0));
    target?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderCases() {
    const c = cases.find(item=>item.id===activeCase) || cases[0];
    const stage = c.stages[caseStep];
    const complete = caseStep >= c.stages.length;
    const header = `<div class="case-switch" role="group" aria-label="Choose case">${cases.map(item=>`<button type="button" class="case-switch-button ${item.id===c.id?'active':''}" data-case="${esc(item.id)}">${esc(item.topic)} ${state.caseCompleted.includes(item.id)?'✓':''}</button>`).join('')}</div>`;
    const content = complete ? `<div class="case-training"><div class="question-numeral">CASE DEBRIEF</div><h3>${esc(c.title)}</h3><p>You've explored the three decisions. Compare your reasoning with the key teaching points.</p><ul>${c.debrief.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><div class="source-caption">ORIGINAL GUIDANCE</div><div class="source-list">${sourceLinks(c.sources)}</div><div class="evidence-note">Sources checked ${esc(c.sourceCheckedOn)} · Independent clinician review pending</div><button id="restart-case" class="action-button" type="button">Study this case again ↺</button></div>` : `<div class="case-training"><div class="question-numeral">${esc(stage.heading)} · ${esc(c.subtitle)}</div><h3>${esc(c.title)}</h3><div class="case-vignette"><span>BACKGROUND</span><p>${esc(c.context)}</p></div>${stage.variantByPrevious ? `<p class="case-transition">${esc(stage.variantByPrevious[lastCasePreferred?'preferred':'other'])}</p>`:''}<div class="case-snapshot">${esc(stage.snapshot)}</div><h4>${esc(stage.prompt)}</h4><div class="choice-list">${stage.options.map((option,i)=>`<button type="button" data-case-option="${i}" class="choice ${caseSelected===i?'selected':''}" ${caseSelected>=0?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(option.text)}</span></button>`).join('')}</div>${caseSelected>=0?`<div class="answer-panel ${stage.options[caseSelected].preferred?'':'wrong'}"><div class="answer-content"><div class="answer-heading">${stage.options[caseSelected].preferred?'Supported response':'Consider the safety implications'}</div><p>${esc(stage.options[caseSelected].feedback)}</p><p>${esc(stage.rationale)}</p><div class="source-list">${sourceLinks(c.sources)}</div></div></div><div class="case-actions"><button class="action-button" type="button" id="next-case-step">${caseStep===c.stages.length-1?'Read case debrief':'Continue case'} →</button></div>`:''}</div>`;
    el('quiz-root').innerHTML=`${header}<article class="question-card">${content}</article><div class="evidence-note">Training scenario, not a clinical pathway. Incorrect decisions trigger corrective feedback; no actual treatment is simulated.</div>`;
    el('quiz-root').querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>{activeCase=b.dataset.case;caseStep=0;caseSelected=-1;renderCases();}));
    if (complete) el('restart-case').addEventListener('click',()=>{caseStep=0;caseSelected=-1;renderCases();});
    else {
      if (caseSelected === -1) el('quiz-root').querySelectorAll('[data-case-option]').forEach(b=>b.addEventListener('click',()=>{caseSelected=Number(b.dataset.caseOption);renderCases();}));
      else el('next-case-step').addEventListener('click',()=>{
        lastCasePreferred=stage.options[caseSelected].preferred;
        caseStep++; caseSelected=-1;
        if (caseStep===c.stages.length && !state.caseCompleted.includes(c.id)){state.caseCompleted.push(c.id);persist();}
        renderCases();
      });
    }
  }

  function renderSearchResults() {
    const area = el('search-results');
    const term = searchTerm.trim().toLocaleLowerCase('en-AU');
    if (term.length<2){area.hidden=true;area.innerHTML='';return;}
    const matched = allQuestions.filter(q=>(q.stem+' '+(q.scenario||'')+' '+q.explanation+' '+(bank.modules.find(m=>m.questions.includes(q))?.name||'')).toLocaleLowerCase('en-AU').includes(term)).slice(0,8);
    area.hidden=false;
    area.innerHTML=matched.length?`<div class="search-count">${matched.length} result${matched.length===1?'':'s'} shown (maximum 8)</div>${matched.map(q=>`<button type="button" class="search-result" data-result="${esc(q.id)}"><strong>${esc(q.stem.slice(0,92))}${q.stem.length>92?'…':''}</strong><span>${esc(bank.modules.find(m=>m.questions.includes(q)).name)}</span></button>`).join('')}`:`<p>No matching questions. Try a broader keyword.</p>`;
    area.querySelectorAll('[data-result]').forEach(b=>b.addEventListener('click',()=>{
      const q=allQuestions.find(item=>item.id===b.dataset.result);
      const mod=bank.modules.find(m=>m.questions.includes(q));
      state.mode=mod.id;state.index=mod.questions.indexOf(q);state.view='questions';
      clearAnswer();searchTerm='';el('study-search').value='';renderSearchResults();persist();render();
      el('quiz-root').scrollIntoView({behavior:'smooth',block:'nearest'});
    }));
  }

  function render() {
    renderNav();
    renderProgress();
    renderHeading();
    if (state.mode === 'cases') renderCases();
    else if (state.mode === 'studio') studio.render(el('quiz-root'));
    else if (state.mode === 'rounds') rounds.render(el('quiz-root'));
    else if (state.view === 'reading' && getModule(state.mode)) renderReading();
    else renderQuestion();
  }

  function chooseAnswer(choice) {
    const q = current();
    if (!q || state.view !== 'questions' || revealed || questionType(q)==='short' || choice < 0 || choice >= q.choices.length) return;
    if (questionType(q)==='multi') {
      if (multiChoices.has(choice)) multiChoices.delete(choice); else multiChoices.add(choice);
      renderQuestion();
    } else {
      singleChoice = choice;
      markExplored(q);
    }
  }

  function toggleBookmark(id) {
    if (state.saved.includes(id)) state.saved=state.saved.filter(x=>x!==id);
    else state.saved.push(id);
    persist();
    if (state.mode === 'saved') {
      const length=questionsForMode().length;
      state.index=Math.min(state.index,Math.max(0,length-1));
      clearAnswer();
    }
    render();
  }

  function nextQuestion() {
    if (!revealed) return;
    if (pendingResolvedId) {
      state.incorrect=state.incorrect.filter(id=>id!==pendingResolvedId);
      pendingResolvedId=null;
      if (state.mode==='review') {
        state.index=Math.min(state.index,Math.max(0,questionsForMode().length-1));
        clearAnswer();persist();render();return;
      }
    }
    const list=questionsForMode();
    if (state.index < list.length - 1) state.index++;
    else if (getModule(state.mode)) {
      const idx=bank.modules.findIndex(m=>m.id===state.mode);
      if (idx < bank.modules.length-1) {state.mode=bank.modules[idx+1].id;state.index=0;}
      else state.index=0;
    } else state.index=0;
    clearAnswer();
    persist();
    render();
    el('quiz-root').scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function showSources() {
    const sources=Object.values(bank.sources);
    const distinct=sources.filter((s,i)=>sources.findIndex(x=>x.url===s.url)===i);
    el('modal-source-list').innerHTML=distinct.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`).join('');
    el('source-dialog').showModal();
  }

  function init() {
    render();
    el('view-questions').addEventListener('click',()=>setView('questions'));
    el('view-reading').addEventListener('click',()=>setView('reading'));
    el('saved-button').addEventListener('click',()=>goToMode('saved'));
    el('review-button').addEventListener('click',()=>goToMode('review'));
    el('cases-button').addEventListener('click',goToCases);
    el('rounds-button').addEventListener('click',goToRounds);
    el('mix-button').addEventListener('click',goToMixed);
    el('studio-button').addEventListener('click',goToStudio);
    el('study-search').addEventListener('input',e=>{searchTerm=e.target.value;renderSearchResults();});
    el('reset-button').addEventListener('click',()=>{
      if (!window.confirm('Clear question history, bookmarks, missed answers and your private revision plan in this browser?')) return;
      state={mode:bank.modules[0].id,index:0,view:'questions',seen:[],saved:[],incorrect:[],mixedIds:[],readingsVisited:[],caseCompleted:[],revision:{}};
      clearAnswer();persist();render();
    });
    el('reference-toggle').addEventListener('click',showSources);
    el('all-sources-button').addEventListener('click',showSources);
    el('close-dialog').addEventListener('click',()=>el('source-dialog').close());
    el('done-dialog').addEventListener('click',()=>el('source-dialog').close());
    el('source-dialog').addEventListener('click',e=>{if(e.target===el('source-dialog'))el('source-dialog').close();});
    document.addEventListener('keydown',e=>{
      if(el('source-dialog').open || state.view !== 'questions' || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||'')) return;
      if (/^[1-4]$/.test(e.key) && !revealed && current() && ['single','multi'].includes(questionType(current()))) {chooseAnswer(Number(e.key)-1);e.preventDefault();}
      else if (e.key==='Enter' && revealed && document.activeElement?.tagName!=='BUTTON') {nextQuestion();e.preventDefault();}
    });
  }

  init();
})();

