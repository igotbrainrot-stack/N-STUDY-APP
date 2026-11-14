
/* Original study notes. Source identifiers resolve through STUDY_BANK.sources.
   Educational discussion only; check the linked current guidance and local procedures. */
window.STUDY_READINGS = {
  deterioration: {
    lead: 'Deterioration is a pattern to recognise and act on, not a diagnosis produced by a chart. NSW Between the Flags combines routine observations with a system for clinical review and emergency response.',
    sections: [
      {heading:'Read the trajectory',body:'Interpret observations alongside the person’s usual state, presenting illness, treatment and recent trend. A single value may matter, but a change in behaviour, work of breathing or level of consciousness can also be significant. Take patient and carer concern seriously even if a threshold has not yet been crossed.'},
      {heading:'Respond to triggers',body:'Standard observation charts include Yellow and Red Zone criteria linked to local Clinical Emergency Response Systems (CERS). Understand which chart is appropriate, who to call, what information to share and how to reassess while help is arranged. Local escalation rules and a patient-specific alteration, when formally authorised, must be understood in context.'},
      {heading:'Think sepsis early',body:'Suspected infection with acute clinical change warrants prompt assessment and consideration of the appropriate NSW sepsis pathway. Different pathways exist for adults, maternity, children and neonates. A pathway supports, but does not replace, urgent assessment and escalation.'}
    ], reflection:'What observations or concerns might make you escalate even before a numerical trigger appears?', sources:['btf','charts','cers','concerns','sepsis']
  },
  infection: {
    lead:'Infection prevention is a series of decisions about hands, equipment, environment and exposure risk throughout every patient interaction.',
    sections:[
      {heading:'The 5 Moments',body:'Hand hygiene is required at defined points in patient care, including before patient contact, before a procedure, after body-fluid exposure risk, after patient contact and after contact with patient surroundings. Gloves do not eliminate hand hygiene requirements. Choose the correct method for visibly soiled hands and the clinical situation.'},
      {heading:'Build from standard precautions',body:'Apply standard precautions to all people, whether or not infection is known. Add transmission-based precautions when the suspected or confirmed pathogen, route of transmission or local infection-control advice requires them. Appropriate PPE depends on task and risk, not a blanket rule.'},
      {heading:'See the entire workflow',body:'Think about what happens between tasks: glove removal, hand cleaning, shared devices, clean versus contaminated surfaces, and safe disposal. Infection prevention can break down at transitions even when the main procedure is performed correctly.'}
    ],reflection:'Where are the contamination risks when moving from one bedside task to another?',sources:['hands','moments','precautions','gloves']
  },
  medicines: {
    lead:'Medication safety combines accurate information, clear responsibility, monitoring and communication—especially when patients move between teams.',
    sections:[
      {heading:'Reconcile at transitions',body:'Medication reconciliation compares the medicines a person actually takes with orders at admission, transfer and discharge. Look for omissions, unintended duplication, discrepancies in directions and unclear reasons for changes. Escalate questions to the authorised team; do not assume every difference is deliberate.'},
      {heading:'Make allergies useful',body:'A medicine name alone may be insufficient. Record the reported reaction, timing, severity and certainty where known, and distinguish an adverse effect from a suspected allergy through appropriate clinical assessment. Share relevant information across the care pathway.'},
      {heading:'High-risk does not mean never use',body:'Certain medicines and systems can cause disproportionate harm if errors occur. High-risk categories require reliable checking, monitoring and local safeguards. The aim is safer individualised use, not arbitrary omission of necessary treatment.'}
    ],reflection:'At handover, what medicine discrepancy would require clarification before proceeding?',sources:['medStandard','chartsMed','highrisk']
  },
  communication: {
    lead:'A handover is successful when the receiving person understands the present risk, the plan and what they are responsible for next.',
    sections:[
      {heading:'Structure the information',body:'ISBAR—Identify, Situation, Background, Assessment, Recommendation—provides a way to lead with urgency and make the requested action explicit. State what has changed, not only the patient’s history. Include pending reviews, results and escalation triggers.'},
      {heading:'Close the loop',body:'Invite questions, confirm understanding and make responsibility for outstanding tasks explicit. In time-critical communication, use the local system for urgent escalation rather than assuming routine documentation alone is enough.'},
      {heading:'Partner with the patient',body:'Consider the person’s preferred communication method, language and ability to participate. Include family or carers appropriately, with consent and confidentiality requirements considered. Concerns raised by the patient or supporter should reach the clinical team.'}
    ],reflection:'What could be lost in a technically complete but poorly prioritised handover?',sources:['handover','communication','isbar','concerns']
  },
  delirium: {
    lead:'Delirium is an acute change in attention, awareness or cognition that can fluctuate. A quiet, withdrawn presentation can be as important as agitation.',
    sections:[
      {heading:'Know the baseline',body:'Ask what the person is normally like. Check onset, fluctuations, attention and accompanying medical changes. Sudden confusion should not be assumed to be dementia or a normal part of ageing. Use approved assessment tools and escalate potential acute causes.'},
      {heading:'Prevent and support',body:'Individualised measures may include orientation, glasses and hearing aids, sleep support, mobility, nutrition, hydration, comfort and family involvement when appropriate. Review medicines and possible contributing factors with the care team.'},
      {heading:'Protect continuity',body:'Communicate the baseline and current cognitive status, effective supportive strategies, outstanding issues and follow-up needs during care transitions. A note reading simply “confused” fails to capture clinically important information.'}
    ],reflection:'How would you recognise hypoactive delirium in someone who is normally alert?',sources:['delirium','comprehensive']
  },
  falls: {
    lead:'Preventing harm involves balancing risks. Falls risk, skin integrity, hydration and safe mobility often interact.',
    sections:[
      {heading:'Look beyond a risk score',body:'Individualised assessment considers previous falls, current illness, medicines, cognition, mobility, toileting, footwear and the environment. Risk can change rapidly with new symptoms or treatment.'},
      {heading:'Avoid creating another problem',body:'Prolonged immobility may worsen function and pressure injury risk. Tailor supervision, assisted movement, skin inspection, repositioning and equipment decisions to the patient’s needs and the multidisciplinary plan.'},
      {heading:'Include devices and nutrition',body:'Pressure can occur under or beside devices as well as over bony prominences. Nutrition and hydration affect overall resilience and care planning. Reassess and document new skin changes or shifts in functional status.'}
    ],reflection:'How could a falls-prevention strategy unintentionally increase pressure injury or deconditioning risk?',sources:['comprehensive','cecCare','rounding','nutrition']
  },
  resuscitation: {
    lead:'Resuscitation readiness means recognising an emergency, obtaining help early and working within current training and workplace processes.',
    sections:[
      {heading:'Recognise and activate',body:'Respond rapidly when a patient is unresponsive or showing signs of a life-threatening emergency. Follow the applicable ANZCOR guidance and your organisation’s emergency call process. Current skill training, team roles and locally available equipment matter.'},
      {heading:'Know your role',body:'Resuscitation involves coordinated assessment, activation, compression and defibrillation processes where indicated. This short study app does not teach or certify practical performance and should never replace hands-on education or periodic reassessment.'},
      {heading:'Learn from the system',body:'Knowing where to find response equipment, whom to alert and how local teams function improves preparedness. Debriefing and ongoing education support team reliability.'}
    ],reflection:'Which immediate local actions and team roles would you need to know before a real emergency?',sources:['anzcor','resuscitation','resusFaq']
  },
  professional: {
    lead:'Safe nursing practice includes accountable reasoning, reflective learning, accurate communication and awareness of professional scope.',
    sections:[
      {heading:'Scope is contextual',body:'Whether an activity is within an individual nurse’s scope depends on education, competency, role, context and applicable legislation and policies. EN and RN standards describe different responsibilities. Seek support when the situation exceeds preparation or authority.'},
      {heading:'Reason, document, improve',body:'Professional standards expect assessment, planning, evidence-informed care, evaluation and therapeutic relationships. Good records explain observations, actions, escalation and response in clinically useful language.'},
      {heading:'Use this as self-directed learning',body:'A quiz can identify a knowledge gap, but does not demonstrate workplace competence. Reflect on the gap, read the cited primary guidance and seek educator-supported practice or accredited CPD where appropriate. Keep the required CPD record under current NMBA rules.'}
    ],reflection:'When would you seek supervision or further education before attempting a task?',sources:['rn','en','scope','cpd']
  },
  'deep-sepsis': {
    lead:'Advanced lens: identify deterioration when the story, observations and investigations do not neatly agree. Sepsis care is time-sensitive, but no single sign confirms or excludes it.',
    sections:[
      {heading:'Start with a dynamic clinical picture',body:'Possible infection, altered mentation, changing respiratory rate, circulatory signs and concern from staff or family all influence urgency. Follow the appropriate current NSW sepsis pathway while also activating local CERS when indicated. Repeated reassessment matters: a patient can deteriorate after the first response.'},
      {heading:'Interpret lactate carefully',body:'Lactate may be useful in evaluating a deteriorating patient, but it is not a stand-alone diagnosis of sepsis or tissue hypoperfusion. Other physiological processes can elevate it, and the result needs interpretation with examination, trend and the overall context. Avoid both false reassurance and overconfident conclusions from one measurement.'},
      {heading:'Communicate uncertainty without delay',body:'A strong escalation message conveys the observed changes, suspected problem, urgency, investigations or actions already underway, and what review is required. Do not wait for microbiological confirmation before escalating a clinically concerning pattern.'},
      {heading:'Follow through',body:'The sepsis standard emphasises timely assessment, pathway-based management, appropriate antimicrobial stewardship, monitoring and escalation. Individual treatment decisions remain with the authorised clinical team and local protocol.'}
    ],reflection:'How would you explain a concerning patient trajectory if lactate was normal or only mildly raised?',sources:['sepsisAdult','sepsisStd','lactate','cers']
  },
  'deep-medication': {
    lead:'Advanced lens: decide how to act when a medicine order is technically present but information needed for safe use is incomplete or contradictory.',
    sections:[
      {heading:'High-risk classes and systems',body:'The Australian APINCHS framework highlights medicines or systems that can cause serious harm when something goes wrong. Classes include anticoagulants, insulin, certain electrolytes, sedatives and others. Local high-risk policies define concrete controls, monitoring and responsibilities; the acronym is a prompt, not a substitute for them.'},
      {heading:'Reconciliation is investigation',body:'When lists differ at handover or discharge, ask whether a medicine was deliberately commenced, ceased or changed. Cross-check reliable sources, determine what remains uncertain and communicate discrepancies to the authorised team. Important omissions may otherwise become long-term errors.'},
      {heading:'Handle incomplete allergy information',body:'Explore the substance, symptom pattern, timing, severity, prior documentation and alternatives with appropriate clinicians. Record both known facts and uncertainty. Do not invent a precise diagnosis or independently alter treatment outside authority.'},
      {heading:'Ask what happens after the dose',body:'Administration is one point in a larger safety system. Monitoring, adverse-reaction recognition, patient understanding and communication to the next clinician are necessary to make the treatment plan safe over time.'}
    ],reflection:'What would you do if the old chart and new prescription disagree about a high-risk medicine?',sources:['highrisk','medStandard','chartsMed']
  },
  'deep-delirium': {
    lead:'Advanced lens: work with intertwined problems—cognition, medication effects, immobility, nutrition, pressure and patient distress—without reducing the person to a diagnosis.',
    sections:[
      {heading:'A change may be subtle',body:'Hypoactive delirium can look like sleepiness or withdrawal. Establish the baseline with reliable collateral history, assess fluctuation and attention, and consider physiological causes. Acute cognitive change warrants appropriate medical assessment, not an assumption of dementia.'},
      {heading:'Use multicomponent prevention',body:'Tailored delirium care can address sleep, familiar communication, glasses or hearing aids, mobilisation, hydration, nutrition, pain and a calm environment. Family and carers can contribute details about what is normal and reassuring, within the person’s preferences.'},
      {heading:'Balance harms',body:'Preventing a fall should not automatically mean indefinite bed rest; managing agitation should not automatically mean sedation. Review risks together, consider the least restrictive appropriate approach, and plan with the patient, carers and multidisciplinary team.'},
      {heading:'Review psychotropics carefully',body:'For cognitive disability or impairment, national guidance emphasises clear indications, assessment of causes of distress, non-medicine alternatives where appropriate, informed consent processes, monitoring and timely review. Local authorisation and safeguards remain essential.'}
    ],reflection:'Which three modifiable factors would you examine first for a newly withdrawn, inattentive patient?',sources:['delirium','psychotropic','comprehensive','nutrition']
  },
  'deep-communication': {
    lead:'Advanced lens: a safe communication episode should preserve urgency, responsibility, patient rights and an accurate record—even when events are uncertain or uncomfortable.',
    sections:[
      {heading:'Give the receiving clinician a usable plan',body:'In an urgent handover, distinguish current concern from historical background. State the relevant assessment, what has changed, pending investigations, recommended review and the threshold for further escalation. Confirm who owns outstanding tasks.'},
      {heading:'Consent is a process',body:'Support a person’s understanding of the proposed care, alternatives and material risks as appropriate to the clinical decision and professional role. Respect preferences and seek qualified help for language, communication or decision-making barriers. Escalate uncertainty about capacity or consent rather than assuming agreement.'},
      {heading:'After an incident',body:'Attend first to the immediate patient safety response, prompt escalation and factual documentation. NSW open disclosure guidance addresses honest, empathetic communication with affected patients and families through an organisational process. Avoid speculation, blame or assurances not supported by facts.'},
      {heading:'Treat concerns as actionable data',body:'The standard NSW adult chart treats a Yes to the specific getting-worse question as a Yellow Zone criterion: document the answer, listen, assess and promptly consult the nurse in charge about CERS. Serious patient, carer, family or staff concern is a Red Zone criterion requiring Rapid Response under local CERS. Communicate the plan and use the correct chart for the patient group.'}
    ],reflection:'What would you say in a handover when a safety issue is suspected but its cause is not yet known?',sources:['communication','isbar','consent','disclosure','concerns']
  }
};

