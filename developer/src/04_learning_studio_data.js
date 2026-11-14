
/* Source-checked fictional learning examples, not clinical decision support. */
window.STUDY_BANK.version = '1.5.0';
window.STUDY_STUDIO_DATA = {
  version:'1.5.0',sourceCheckedOn:'2026-10-26',clinicalReview:'awaiting-independent-clinician-review',
  trend: {
    id:'adult-ward-trend', title:'The pattern before the alarm',
    subtitle:'Four fictional timepoints on an adult ward; not a validated prediction tool.',
    scenario:'An adult inpatient receiving assessment for an acute illness has become increasingly breathless. Observations are fictional teaching data. A carer says the patient is behaving differently from usual.',
    timepoints:[
      {time:'09:00',resp:18,pulse:86,detail:'Alert, talking in full sentences; no new family concern recorded.'},
      {time:'10:00',resp:21,pulse:97,detail:'Increasing breathlessness on activity; the change from baseline warrants attention.'},
      {time:'11:00',resp:25,pulse:111,detail:'More work of breathing. A family member reports an unusual change in behaviour.'},
      {time:'12:00',resp:30,pulse:124,detail:'Increasing respiratory effort and new inattention. On the unaltered NSW standard adult general observation chart, RR 30/min is a Red Zone trigger: call a Rapid Response via local CERS.'}
    ],
    question:'Which interpretation best accounts for the trajectory?',
    choices:[
      {text:'The rising observations, new inattention and RR 30/min warrant immediate Rapid Response under the unaltered adult chart and local CERS.',preferred:true,feedback:'Supported. RR 30/min is Red Zone on the standard adult general chart. Call a Rapid Response, continue appropriate clinical care and reassessment, and convey the family concern.'},
      {text:'An observation should matter only after blood pressure falls.',preferred:false,feedback:'Not supported. Other signs of deterioration and patient/carer concerns can require earlier review.'},
      {text:'This graph is sufficient to diagnose the cause of the deterioration.',preferred:false,feedback:'Not supported. A trend is a safety signal, not a diagnosis; further assessment and appropriate clinical review are required.'}
    ],
    debrief:'The RR of 30/min is a Red Zone observation on the unaltered NSW standard adult chart: call a local CERS Rapid Response while initiating appropriate clinical care and repeated assessment. Earlier Yellow Zone or other concern prompts assessment, further observation and nurse-in-charge consultation under the applicable chart. Communicate the family concern and a reasoned differential without claiming a diagnosis. In real care always verify the patient-specific chart, any authorised alterations and local CERS.',
    sources:['adultChart','charts','cers','concerns']
  },
  detective: {
    id:'evidence-relay',title:'Evidence Relay: from fragments to handover',
    subtitle:'Investigate facts, flag what is uncertain, then build your own ISBAR.',
    scenario:'Fictional adult ward admission: a 72-year-old person with an acute respiratory illness has become more breathless over the shift. The patient’s daughter says the patient is not as alert as usual. Some history is incomplete.',
    clues:[
      {id:'observations',label:'Observation record',summary:'Respiratory rate 18 → 25 breaths/min and pulse 88 → 112 beats/min over three hours. No medical diagnosis is established by these figures.',kind:'Observed measurements',priority:true,why:'The trend is relevant to immediate assessment and local escalation; match values to the current chart.'},
      {id:'cognition',label:'Baseline and current cognition',summary:'The daughter describes a normally alert person. At assessment the patient is newly inattentive and struggling to follow a question.',kind:'Observed change plus collateral history',priority:true,why:'An acute change in attention and mental state is clinically important and must be reported rather than dismissed.'},
      {id:'medicines',label:'Medication record',summary:'The transfer medication record is incomplete and needs formal reconciliation. No single medicine has been verified as the cause of the change.',kind:'Unresolved safety information',priority:true,why:'Include this unresolved issue in handover with clear ownership for reconciliation; it is not evidence that medication caused the deterioration.'},
      {id:'family',label:'Carer concern',summary:'The daughter says: “This is not how they usually behave.” The concern has not yet been documented in the handover.',kind:'Reported concern',priority:true,why:'NSW recognises patient and carer concern as a potential signal of deterioration, including before a chart alarm.'},
      {id:'results',label:'Investigation status',summary:'Ordered investigations are pending. The result list available to the nurse does not establish a cause.',kind:'Known process, unanswered question',priority:true,why:'Include pending results and a named follow-up owner in handover; do not invent a diagnosis or delay needed escalation.'},
      {id:'response',label:'Escalation status',summary:'The nurse has requested clinical review through the applicable local escalation system and is continuing observation and assessment while help is arranged.',kind:'Confirmed action',priority:true,why:'Handover must include who has been contacted, the current response and when to re-escalate.'}
    ],
    model:{
      I:'I am the nurse caring for the adult patient in ward [fictional bed]. Confirm identity using approved identifiers.',
      S:'I am concerned about increasing breathlessness and a new change in attention; clinical review has been requested.',
      B:'Admitted with an acute respiratory illness; daughter reports the person is normally alert. Transfer medication history is incomplete.',
      A:'Respiratory rate has risen from 18 to 25 and pulse from 88 to 112 over three hours; the person is newly inattentive. Pending investigations do not yet establish the cause.',
      R:'Please review promptly under the local CERS response. We will continue assessment and observations as appropriate and follow up the pending investigations, documentation and re-escalation plan.'
    },
    debrief:['Separate what you observed from what you suspect; do not announce an unsupported diagnosis.','Convey trajectory, change from baseline, carer concern and escalation status.','State what is not yet known, and who owns outstanding review, investigation and monitoring.'],
    sources:['adultChart','cers','concerns','isbar','communication']
  },
  spacing: {intervalDays:[1,3,7,21],note:'Suggested study intervals only. This simple schedule has not been validated as a personalised learning algorithm and is not evidence of clinical competence.'}
};

