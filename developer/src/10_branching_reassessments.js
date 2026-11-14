/* v1.7. Branch-dependent reassessment exercises for advanced personal nursing study.
   Every result is a fictional possible finding, NOT a prediction or clinical management algorithm.
   The initial six rounds and 100-question bank are preserved. */
(function () {
  'use strict';
  const bank = window.STUDY_BANK;
  const rounds = window.STUDY_ROUNDS;
  bank.version = '1.7.0';
  rounds.version = '1.7.0';
  rounds.branchingReviewedOn = '2026-11-13';
  const updates = {
    'acs-uncertainty': {
      id: 'branching-reassessment', kind: 'branch', heading: 'Choose a reassessment route',
      prompt: 'Symptoms persist at 08:50. Which information-gathering or safety route would you take next, and how should the finding change your handover?',
      introduction: 'Pick one route. You will see a plausible *new* finding and make a second decision. Explore the other routes to compare their implications; the findings do not establish a diagnosis.',
      paths: [
        {
          title: 'Repeat the ECG and obtain experienced review',
          development: 'A new 12-lead ECG is recorded while pain continues. The reviewing clinician reports new dynamic ST–T changes compared with the first tracing and asks for ongoing monitoring.',
          interpretation: 'Dynamic changes increase concern for an evolving ischaemic process, but the precise mechanism, severity and treatment remain clinical decisions. The tracing must be interpreted by an experienced clinician.',
          followup: 'What is the strongest nursing communication response to the new ECG finding?',
          replies: [
            {text: 'Escalate the evolving symptoms and ECG changes promptly; communicate the time of each tracing and the clinician’s assessment.', why: 'Supported. Changing ECG findings and ongoing pain require urgent, context-aware review; preserve the serial evidence.'},
            {text: 'Tell the patient that a specific infarction type is confirmed because the ECG changed.', why: 'Not supported. Dynamic changes may be concerning, but the case has not established a final diagnosis.'},
            {text: 'Wait for another troponin before informing the senior team of the new ECG finding.', why: 'Not supported. Ongoing symptoms and dynamic ECG change should not be left uncommunicated pending another test.'}
          ], correct: 0
        },
        {
          title: 'Clarify the history and examination while escalating',
          development: 'The patient now describes intermittent discomfort between the shoulder blades that was not reported at triage. The treating clinician is notified and begins assessing for other dangerous chest-pain causes as well as ACS.',
          interpretation: 'A new symptom broadens the differential. This does not prove aortic pathology or invalidate ACS concern. Document the exact description and communicate it immediately.',
          followup: 'How should this new symptom affect the handover?',
          replies: [
            {text: 'Add the new symptom and its timing, and ask for urgent reassessment of other time-critical causes.',why: 'Supported. Urgent alternative diagnoses need clinician assessment when new features are reported.'},
            {text: 'Make a definitive diagnosis of aortic dissection without further assessment.',why: 'Not supported. A symptom alone is not a definitive diagnosis.'},
            {text: 'Omit the new history because the first ECG was not diagnostic.',why: 'Not supported. ECG findings do not negate clinically important history.'}
          ], correct: 0
        },
        {
          title: 'Focus on the pending result and postpone review',
          development: 'In this fictional pathway, the patient remains distressed. Repeat observations show HR 120/min and BP 108/70 mmHg. The repeat sample is still pending; no further ECG has been reviewed.',
          interpretation: 'This is one plausible simulated progression, not a claim that waiting always causes these findings. It shows the information lost by failing to reassess a changing presentation.',
          followup: 'What is the priority now?',
          replies: [
            {text: 'Escalate immediately, reassess the patient and arrange the relevant local chest-pain pathway actions with the responsible team.',why: 'Supported. Current clinical changes matter more than an outstanding sample.'},
            {text: 'Conclude the patient can be discharged because the first troponin was low.',why: 'Not supported while symptoms persist and observations change.'},
            {text: 'Continue waiting without repeat observations or communicating the change.',why: 'Not supported. A deteriorating or uncertain presentation needs timely reassessment and escalation.'}
          ], correct: 0
        }
      ],
      debrief: 'Australian ACS guidance emphasises serial symptom/ECG assessment and careful use of validated high-sensitivity troponin pathways. A new finding changes the urgency and the content of communication, not automatically the final diagnosis.'
    },
    'hypercapnic-fatigue': {
      id: 'branching-reassessment', kind: 'branch', heading: 'A second look at ventilation',
      prompt: 'The patient is less responsive and their arterial pH is falling. What do you focus on next, and what would you do with the new information?',
      introduction: 'Each route reveals a different plausible clinical observation. No option creates a guaranteed outcome; the patient already requires urgent clinical review.',
      paths: [
        {
          title: 'Repeat a structured airway/breathing and alertness assessment',
          development: 'The patient speaks only in short phrases, has visibly increased work of breathing and intermittently drifts off during conversation. A senior clinician has been called.',
          interpretation: 'Reduced ability to maintain alertness and increased breathing effort add concern about ventilatory fatigue. Respiratory rate alone may not reflect adequate ventilation.',
          followup: 'Which handover best communicates this assessment?',
          replies: [
            {text: 'State the change in consciousness and work of breathing, give the pH/PaCO₂ trend, and request urgent respiratory/CERS reassessment.',why: 'Supported. Integrate the patient’s clinical state and blood-gas trend.'},
            {text: 'Describe the patient as improving solely because respiratory rate decreased.',why: 'Not supported. A slower rate may accompany fatigue and impaired ventilation.'},
            {text: 'Wait for oxygen saturation to fall before contacting the team.',why: 'Not supported. Pulse oximetry does not measure carbon dioxide clearance or acid-base status.'}
          ], correct: 0
        },
        {
          title: 'Compare oxygenation, ventilation and the oxygen device',
          development: 'With supplemental oxygen the SpO₂ reading is 94%, but the patient remains drowsy and the documented pH/PaCO₂ trend indicates worsening respiratory acidosis. Device settings and target range are checked with the treating team.',
          interpretation: 'A reassuring saturation does not override concerning consciousness, breathing or blood-gas findings. Controlled oxygen targets and changes to ventilatory support need the authorised clinical pathway.',
          followup: 'What is a safe conclusion?',
          replies: [
            {text: 'Communicate suspected ventilatory failure despite the saturation, and obtain urgent authorised clinical review.',why: 'Supported. Do not substitute SpO₂ for ventilation assessment.'},
            {text: 'Declare normal ventilation because the SpO₂ is above 90%.',why: 'Not supported. Pulse oximetry is not a carbon-dioxide monitor.'},
            {text: 'Change ventilatory support independently without checking authorisation, setting or competence.',why: 'Not supported. Complex respiratory support follows local policies and qualified assessment.'}
          ], correct: 0
        },
        {
          title: 'Check alternative or additional contributors',
          development: 'A recent medication record includes an as-needed sedating medicine, but it is unclear whether the dose was administered. There is also a possible infective trigger. The patient’s current condition still requires immediate assessment.',
          interpretation: 'Medication exposure, pneumonia, cardiac disease, pulmonary embolism and other causes may coexist. Verify records rather than assuming the medicine was given or that COPD explains everything.',
          followup: 'What should happen while the history is being clarified?',
          replies: [
            {text: 'Escalate the altered alertness and abnormal gas trend now, then reconcile records and investigate alternative contributors with the team.',why: 'Supported. Safety assessment is not postponed by an incomplete history.'},
            {text: 'Wait until the medicine history is complete before calling for clinical review.',why: 'Not supported. Delayed review is unsafe in this fictional deteriorating presentation.'},
            {text: 'Assert that sedative medication is the confirmed cause without evidence of administration.',why: 'Not supported. An order or history does not prove administration or causation.'}
          ], correct: 0
        }
      ],
      debrief: 'Acute respiratory failure reasoning must bring together mental state, work of breathing, oxygenation, blood gases and competing causes. Declining respiratory rate or improved SpO₂ can be misleading in isolation.'
    },
    'aki-potassium': {
      id: 'branching-reassessment', kind: 'branch', heading: 'Find the missing kidney evidence',
      prompt: 'Creatinine and potassium are rising as urine output falls. Which additional line of assessment would you investigate, and what does it change?',
      introduction: 'Explore one route, reassess the significance, then compare alternative lines of inquiry. These are deliberately incomplete fictional findings.',
      paths: [
        {
          title: 'Verify the blood result and ask for a current ECG review',
          development: 'A promptly collected repeat sample is confirmed non-haemolysed and shows potassium 6.4 mmol/L. The treating clinician has been informed; a current ECG is being assessed by a qualified clinician.',
          interpretation: 'The repeat result reinforces a potentially time-critical electrolyte problem. The absence of a supplied ECG finding is not evidence of cardiac safety; no medication administration is implied.',
          followup: 'Which response is most defensible?',
          replies: [
            {text: 'Communicate the confirmed potassium trend and AKI context urgently, with clinical monitoring and team-led management under local policy.',why: 'Supported. NSW emergency referral guidance includes rapidly changing electrolytes with AKI; a number must be considered with clinical context.'},
            {text: 'Assume there is no risk until a specific ECG abnormality is documented.',why: 'Not supported. Serious potassium elevation may occur without a supplied ECG feature.'},
            {text: 'Initiate a drug regimen from memory without an order, clinical review or indication checks.',why: 'Not supported. High-risk treatment decisions require authorisation and monitoring.'}
          ], correct: 0
        },
        {
          title: 'Reconstruct fluid balance and reconcile the medicine record',
          development: 'The fluid chart has gaps. A family member reports reduced intake and a community medicine list includes a renin–angiotensin system medicine; actual administration and current prescribing are not yet verified.',
          interpretation: 'A plausible perfusion problem or medicine contribution warrants investigation, but an incomplete chart and historical list cannot establish the AKI cause. Fluid therapy choices require careful assessment, not a blanket assumption.',
          followup: 'What would you include in an ISBAR?',
          replies: [
            {text: 'State the measured trends, note missing intake/administration data explicitly, and request urgent review of volume status and medicines.',why: 'Supported. Separate confirmed observations from suspected contributors.'},
            {text: 'Conclude dehydration is definitively responsible and omit other possibilities.',why: 'Not supported. Acute kidney injury has multiple causes; assessment must address alternatives.'},
            {text: 'Treat the home medicine list as proof of the dose administered today.',why: 'Not supported. Reconcile history with the active prescription and administration record.'}
          ], correct: 0
        },
        {
          title: 'Assess for possible urinary retention or obstruction',
          development: 'The patient reports lower abdominal discomfort and there is uncertain catheter-free urine output. A bladder assessment suggests retention, which the appropriate clinician is asked to review.',
          interpretation: 'Possible post-renal obstruction is an important reversible consideration. It does not explain away a rising potassium, nor does the fictional observation justify an unsupervised procedure.',
          followup: 'What is the appropriate response?',
          replies: [
            {text: 'Communicate possible obstruction alongside the evolving AKI and potassium abnormality; request prompt authorised assessment and management.',why: 'Supported. Multiple urgent issues can coexist and need coordinated review.'},
            {text: 'Stop concern about potassium because retention is now suspected.',why: 'Not supported. A potential cause does not make the associated electrolyte issue harmless.'},
            {text: 'Present a single definitive diagnosis from the bladder finding alone.',why: 'Not supported. Assessment and test interpretation remain necessary.'}
          ], correct: 0
        }
      ],
      debrief: 'Kidney deterioration is a pattern. Verification of sampling, volume status, medicines and possible obstruction can refine the explanation without delaying urgent communication of a rising potassium and reduced output.'
    }
  };
  // Existing v1.5 reasoning rounds now have artwork too, without changing their four-stage content.
  const legacyArt = {'sepsis-trajectory':'sepsis','opioid-sedation':'opioid','delirium-pattern':'delirium'};
  for (const r of rounds.scenarios) if(legacyArt[r.id]) r.imageKey=legacyArt[r.id];
  let inserted = 0;
  for (const r of rounds.scenarios) {
    const branch = updates[r.id];
    if (!branch) continue;
    if (r.stages.some(s => s.id === branch.id)) continue;
    const handoverIndex = r.stages.findIndex(s => s.kind === 'handover');
    if (handoverIndex < 0) throw Error(`Round ${r.id} missing handover stage`);
    r.stages.splice(handoverIndex, 0, branch);
    r.duration = '25–35 min';
    inserted++;
  }
  if (inserted !== 3) throw Error(`Expected to insert 3 branching reassessments; got ${inserted}`);
})();
