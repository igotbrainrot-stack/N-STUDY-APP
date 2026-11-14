
/* Branch-aware, explanatory simulations; educational only, never a patient-care algorithm. */
window.STUDY_CASES = [
  {
    id:'deterioration-case',title:'The changing observation chart',topic:'Clinical deterioration',
    subtitle:'Three decisions · adult inpatient setting',population:'Adult ward patient; check the actual chart and local CERS',
    sourceCheckedOn:'2026-10-26',clinicalReview:'awaiting-independent-clinician-review',
    sources:['adultChart','cers','sepsisAdult','concerns'],
    context:'A 68-year-old inpatient with a suspected respiratory infection has become noticeably more breathless over two hours. A family member says they are behaving differently. No validated diagnosis of sepsis has been established.',
    stages:[
      {heading:'01 / Recognise',snapshot:'You find a new Red Zone observation on the patient’s current NSW standard adult general observation chart. Their breathing effort has increased.',prompt:'What is the safest next step?',options:[
        {text:'Activate the local Rapid Response pathway, assess and provide appropriate care while help arrives.',preferred:true,feedback:'Supported. The adult chart calls for Rapid Response for Red Zone criteria, with clinical care and continued monitoring.'},
        {text:'Wait for two more observation sets before contacting anyone.',preferred:false,feedback:'Unsafe delay. A Red Zone finding is already an escalation trigger; repeat observations are not a substitute for urgent activation.'},
        {text:'Assume a confirmed infection diagnosis is required before urgent escalation.',preferred:false,feedback:'Unsafe assumption. Deterioration triggers require a response before the exact cause is known.'}
      ],rationale:'The NSW adult chart ties a Red Zone finding to a Rapid Response through local CERS. Organisational policy specifies how to call and whom to inform.'},
      {heading:'02 / Reassess',snapshot:'During the response the patient becomes more confused, and family concern persists. Their recent oxygenation measurement has improved slightly.',variantByPrevious:{preferred:'The response team is on its way and asks for an update.',other:'The learning simulation resets to safe escalation: help is activated immediately before proceeding.'},prompt:'How do you interpret the partial improvement?',options:[
        {text:'Reassess the whole patient and trend, communicate continued cognitive change and family concern.',preferred:true,feedback:'Supported. A single improving observation does not neutralise new confusion or sustained clinical concern.'},
        {text:'Cancel escalation because one parameter improved.',preferred:false,feedback:'Unsupported. Ongoing abnormal signs and concern still need assessment and coordinated response.'},
        {text:'Ignore family observations because the chart takes precedence.',preferred:false,feedback:'Unsupported. Patient and carer concern is part of the NSW deterioration safety net.'}
      ],rationale:'The trajectory, physiology, clinical judgement and family observation all matter. Continue coordinated reassessment.'},
      {heading:'03 / Hand over',snapshot:'A nurse from another shift takes over while review and investigations are ongoing.',variantByPrevious:{preferred:'You have updated observations and a record of the active review.',other:'The scenario corrects the earlier decision: assessment, escalation and documentation are now active.'},prompt:'Which handover supports safe continuity?',options:[
        {text:'Use ISBAR to state baseline, changes, urgency, actions, outstanding work and named follow-up.',preferred:true,feedback:'Supported. This helps the receiving nurse understand the current concern and responsibility for unresolved work.'},
        {text:'Describe only the latest vital signs.',preferred:false,feedback:'Incomplete. It hides the clinically relevant trend and current escalation plan.'},
        {text:'Say “sepsis confirmed” despite investigations still being underway.',preferred:false,feedback:'Overstates certainty. Describe suspected infection and observed deterioration without inventing a diagnosis.'}
      ],rationale:'A good handover preserves patient identification, situation, background, assessment and recommendation, including pending tasks and who owns them.'}
    ],
    debrief:['Red Zone on the adult chart: local Rapid Response, not routine observation alone.','Trends, confusion and family concerns contribute to urgency.','Clear communication, reassessment and response documentation are ongoing nursing responsibilities.']
  },
  {
    id:'medication-case',title:'The disputed medicine order',topic:'Medication safety',
    subtitle:'Three decisions · high-risk medication and allergy',population:'Hypothetical adult inpatient; no doses or prescribing advice',
    sourceCheckedOn:'2026-10-26',clinicalReview:'awaiting-independent-clinician-review',
    sources:['medDirective','medStandard','highrisk','medLaw'],
    context:'An adult inpatient has just transferred wards. Their old medicine chart and new list disagree about a high-risk medicine. The patient also reports a poorly documented past severe drug reaction. No medication or dose is specified.',
    stages:[
      {heading:'01 / Verify',snapshot:'An administration is due, but the current prescription conflicts with older records and the severe allergy history is unclear.',prompt:'How do you respond to the unresolved safety discrepancy?',options:[
        {text:'Pause potentially unsafe administration and promptly clarify the order and reaction with the authorised team.',preferred:true,feedback:'Supported. Check the actual order, reaction and relevant records, then escalate for an authorised decision.'},
        {text:'Use whichever list has the most recent date without checking its origin.',preferred:false,feedback:'Unsafe assumption. A later entry can still be incomplete or incorrect; reconcile the conflict.'},
        {text:'Independently substitute a different medication.',preferred:false,feedback:'Outside this scenario’s authority. Such a change requires the authorised prescriber and appropriate clinical assessment.'}
      ],rationale:'National medicine safety requirements and NSW handling procedures prioritise accurate orders, allergy information and safe administration.'},
      {heading:'02 / Information',snapshot:'The patient remembers swelling after a medicine but cannot name it. The previous facility may hold discharge documentation.',variantByPrevious:{preferred:'The authorised team has been contacted and the discrepancy is being clarified.',other:'For patient safety, the simulation corrects the choice: administration is paused pending urgent authorised clarification.'},prompt:'Which information would be most useful?',options:[
        {text:'Reaction characteristics, timing, suspected substance, existing records and trustworthy collateral information.',preferred:true,feedback:'Supported. Record the level of certainty as well as the observed or reported reaction.'},
        {text:'Only a generic “allergy yes” flag, without details.',preferred:false,feedback:'Insufficient. Specific information helps the responsible team assess risk and distinguish reported reactions.'},
        {text:'Delete the allergy alert because the exact name is unknown.',preferred:false,feedback:'Unsafe. Missing detail calls for documentation of uncertainty and clinical clarification, not removal of a possible severe risk.'}
      ],rationale:'Uncertain allergy information should be documented honestly and shared with the authorised clinicians.'},
      {heading:'03 / Transfer safety',snapshot:'The responsible clinician has reviewed the records and decided on the treatment plan. The patient is moving to another team.',variantByPrevious:{preferred:'Relevant reaction details and uncertainty have been recorded.',other:'The corrected safety workflow records the factual reaction history and verified plan.'},prompt:'What completes the safety process?',options:[
        {text:'Document the verified order, reaction and monitoring plan and communicate changes in handover.',preferred:true,feedback:'Supported. Treatment decisions, monitoring and follow-up must travel with the patient.'},
        {text:'Assume the receiving team will identify all discrepancies unaided.',preferred:false,feedback:'Unsupported. Reconciliation and explicit handover reduce preventable information loss.'},
        {text:'Record only that the medicine was reviewed, without clarifying the outcome.',preferred:false,feedback:'Incomplete. The relevant verified plan and unresolved uncertainties should be available to subsequent clinicians.'}
      ],rationale:'Medication reconciliation is a continuing process; source information, documented decisions and reliable handover all matter.'}
    ],
    debrief:['A prescription may exist but safety-critical information may still be missing.','Pause the unsafe step while seeking rapid authorised clarification—not independent prescribing.','Reconcile, document and transfer the verified information with an appropriate monitoring plan.']
  }
];

