(function(){
function __init(){
/* ============================================================
   GHL BUILD ROADMAP — REAL ESTATE WHOLESALING
   ============================================================ */

const PHASES = [
  {id:"W0", win:"Days 1–3", name:"Discovery & Blueprint", done:true, active:false,
   h:"Learn how your team actually works before touching the account.",
   p:"I sit with acquisitions and dispo, map your current lead-to-close process on a whiteboard, and write it up as a build blueprint: pipelines, stages, fields, who does what, and what fires automatically. Nothing gets built until you've signed off on this document — it's what keeps the build from drifting.",
   out:["Process map of your current lead → contract → close flow","Build blueprint: pipelines, stages, field list, automation inventory","Agreed naming conventions (pipelines, tags, workflows, fields)","Scope + milestone schedule confirmed"]},

  {id:"W1", win:"Week 1", name:"Account Foundation & Compliance", done:true, active:false,
   h:"Get the plumbing right so nothing has to be rebuilt later.",
   p:"Users, permissions, phone numbers, email authentication, calendars, and — critically for wholesaling — A2P 10DLC brand and campaign registration. Carriers now block 100% of unregistered traffic, so this starts on day one because approval is the long pole, not the build.",
   out:["Users, roles & permissions (acquisitions, dispo, VAs, admin)","Phone numbers + A2P 10DLC brand & campaign submitted","Email domain authentication (SPF / DKIM / DMARC)","Calendars, business hours, call-window guardrails","Tag taxonomy + naming conventions locked"]},

  {id:"W2", win:"Week 2", name:"Pipelines, Stages & Data Model", done:false, active:true,
   h:"Build the four pipelines and the fields that feed your numbers.",
   p:"Acquisitions, Dispositions, Transaction Coordination, and Cash Buyers — each with stages that mean something operationally, plus the custom fields (ARV, repairs, MAO, assignment fee) that make reporting possible. Fields come before workflows, because a workflow can only act on data that exists.",
   out:["4 pipelines with defined stages + entry/exit criteria","Custom field set for property, seller, buyer & deal economics","Contact vs. Opportunity data model documented","Lead-source tracking wired to every intake point"]},

  {id:"W3", win:"Week 3", name:"Intake, Routing & Follow-Up", done:false, active:false,
   h:"Every lead captured, assigned, and followed up without anyone remembering to.",
   p:"Inbound forms, calls, and list-pull imports land in one place, get deduped, get assigned to the right acquisitions rep, and enter a follow-up cadence. Missed-call text-back and speed-to-lead fire instantly. This is the week the phone stops being a single point of failure.",
   out:["Intake: web forms, inbound calls, missed-call text-back, imports","Deduplication so one seller never gets two texts","Round-robin / rule-based assignment to acquisitions","Speed-to-lead + long-term nurture cadences (with opt-out handling)","Task + notification rules for every stage"]},

  {id:"W4", win:"Week 4", name:"Deal Workflows: Contract → Close", done:false, active:false,
   h:"Automate the deal path, including dispo and transaction coordination.",
   p:"Stage-change automations that move a deal from offer through contract, push it to the cash-buyer list, and track it through title to closing. Contract triggers, document requests, buyer blasts, and TC checklists all fire from pipeline movement rather than someone's memory.",
   out:["Offer → contract → under contract automation chain","Dispo: buyer-match + blast workflow off Under Contract","Transaction coordination checklist & deadline reminders","Internal notifications + escalation for stalled deals","Post-close: review request, referral ask, buyer list growth"]},

  {id:"W5", win:"Week 5", name:"Dashboards & Reporting", done:false, active:false,
   h:"Visibility into team activity and deal progress — the numbers you asked for.",
   p:"Dashboards for the owner (pipeline value, deals by stage, cost per contract by source) and for managers (rep activity, speed-to-lead, conversation volume, stage conversion). Built on the fields and stages from Week 2, which is why that sequencing matters.",
   out:["Owner dashboard: pipeline value, deals by stage, source ROI","Acquisitions dashboard: activity, speed-to-lead, stage conversion","Dispo dashboard: buyer engagement, days-to-assign","Attribution reporting by marketing channel"]},

  {id:"W6", win:"Week 6", name:"Testing, Snapshot, Docs & Handoff", done:false, active:false,
   h:"Prove it works, package it, and train the team to run it without me.",
   p:"Full end-to-end test with dummy deals through every pipeline, then a reusable snapshot, written SOPs, Loom walkthroughs per role, and live training. You finish owning a system your team can actually use — and one you can clone for a second market or entity.",
   out:["End-to-end test: dummy deal through all 4 pipelines","Reusable snapshot saved & version-tagged","Written SOPs + Loom walkthrough per role","Live team training + 2-week post-launch support window"]}
];

const PIPELINES = [
  {name:"Acquisitions Pipeline", tag:"Seller side", note:"The core motivated-seller pipeline. The Attempted Contact / Contacted split is deliberate — without it you cannot tell a bad phone number apart from a seller who said no, and your whole marketing ROI report becomes guesswork.",
   stages:[
    ["New Lead","Lead entered, no outreach attempted yet","Auto-assign + speed-to-lead sequence fires"],
    ["Attempted Contact","Dialed or texted, no conversation yet","Multi-attempt cadence; bad numbers flagged for skip trace"],
    ["Contacted","Live conversation happened","Qualification questions logged to custom fields"],
    ["Qualified / Analyzing","Motivation + condition confirmed, running numbers","ARV, repairs, MAO fields required to advance"],
    ["Appointment Set","Walkthrough or offer call booked","Reminder sequence + rep notification"],
    ["Offer Made","Number presented to seller","Offer-follow-up cadence starts; task set for rep"],
    ["Under Contract","PSA signed","Creates Dispo + TC opportunities automatically"],
    ["Dead / Nurture","Not now — wrong price, not ready, listed","Long-term drip; re-engage on interval"]
   ]},
  {name:"Dispositions Pipeline", tag:"Buyer side", note:"Wholesaling is two businesses running at once. Dispo gets its own pipeline because a contract in hand is a completely different sales motion from a motivated seller — different contacts, different urgency, different KPIs.",
   stages:[
    ["New Contract","Deal received from Acquisitions","Auto-created on Under Contract; property packet assembled"],
    ["Marketing to Buyers","Blast sent to matched cash buyers","Buyer-match by area + property type + budget"],
    ["Buyer Inquiries","Buyers responding / requesting access","Inquiry tasks routed to dispo rep"],
    ["Showings / Walkthroughs","Access scheduled","Calendar + reminder automation"],
    ["Offers Received","Buyer offers in hand","Comparison task for dispo manager"],
    ["Assigned / Accepted","Assignment agreement signed","Pushes to Transaction Coordination"],
    ["Fell Through","Buyer backed out","Returns to Marketing to Buyers with reason logged"]
   ]},
  {name:"Transaction Coordination", tag:"Contract → close", note:"The stage most wholesalers run in a spreadsheet — which is where deals quietly die. Deadline-driven, checklist-driven, and the pipeline where automated reminders earn their keep.",
   stages:[
    ["Opened at Title","Contract sent to title/escrow","Doc checklist created; TC notified"],
    ["Title Work / Clearing","Title search, liens, payoff","Deadline reminders; stalled-deal escalation"],
    ["Inspection / Due Diligence","Buyer DD period running","Countdown reminders to all parties"],
    ["Funding / Clear to Close","Buyer funds confirmed","Closing-date confirmation sequence"],
    ["Closed","Funded and recorded","Assignment fee logged; post-close automations fire"],
    ["Cancelled","Dead at title","Reason logged for reporting"]
   ]},
  {name:"Cash Buyer List", tag:"Asset", note:"Your buyer list is an appreciating asset, so it gets a pipeline rather than living as a tag. Buyer criteria fields are what make automated buyer-matching possible in the dispo workflow.",
   stages:[
    ["New Buyer Lead","Inbound or scraped buyer","Criteria intake form sent"],
    ["Criteria Captured","Areas, property types, budget on file","Enters match pool"],
    ["Verified Buyer","Proof of funds / track record confirmed","Priority tier tag applied"],
    ["Active — Bought Before","Has closed with you","VIP tier; first look on new contracts"],
    ["Inactive","No engagement in 90+ days","Re-engagement campaign"]
   ]}
];

const FIELDS = [
  {g:"Property", items:["Property Address","City / State / ZIP","County","Property Type","Beds / Baths","Square Footage","Year Built","Occupancy Status","Condition Notes"]},
  {g:"Seller & Motivation", items:["Seller Motivation","Reason for Selling","Timeline to Sell","Asking Price","Mortgage / Liens Owed","Behind on Payments?","Decision Makers on Title","Best Contact Time"]},
  {g:"Deal Economics", items:["ARV Estimate","Repair Estimate","MAO (calculated)","Offer Amount","Contract Price","Assignment Fee (projected)","Assignment Fee (actual)","Profit Margin %"]},
  {g:"Cash Buyer Criteria", items:["Cash Available / Budget","Preferred Areas (multi-select)","Property Types Bought","Max Rehab Appetite","Proof of Funds on File","Buyer Tier","Last Purchase Date"]},
  {g:"Attribution & Ops", items:["Lead Source","Campaign / List Name","Skip Trace Status","Assigned Acquisitions Rep","Assigned Dispo Rep","Date of First Contact","Speed-to-Lead (minutes)","DNC / Opt-Out Status"]}
];

const WORKFLOWS = [
  {n:"Speed-to-Lead Response", pri:"p1", flow:'<span class="trg">Trigger:</span> Form submitted / inbound call missed <span class="arrow">→</span> dedupe check <span class="arrow">→</span> create Opportunity in New Lead <span class="arrow">→</span> instant SMS + email <span class="arrow">→</span> assign rep <span class="arrow">→</span> task: "Call within 5 min" <span class="arrow">→</span> internal Slack/SMS alert',
   d:"The highest-ROI workflow in the build. Fires in seconds, day or night, and stamps the Speed-to-Lead field so response time becomes a reportable number rather than a feeling."},
  {n:"Missed-Call Text-Back", pri:"p1", flow:'<span class="trg">Trigger:</span> Inbound call unanswered <span class="arrow">→</span> immediate SMS "Sorry we missed you…" <span class="arrow">→</span> if reply, route to rep + open conversation <span class="arrow">→</span> if no reply, enter callback cadence',
   d:"Sellers call several wholesalers in a row. Whoever answers first usually gets the contract; this catches the ones you couldn't pick up."},
  {n:"Multi-Attempt Contact Cadence", pri:"p1", flow:'<span class="trg">Trigger:</span> Stage = Attempted Contact <span class="arrow">→</span> day 1/2/4/7/11 call tasks + SMS + email <span class="arrow">→</span> on reply, auto-move to Contacted <span class="arrow">→</span> after final attempt, move to Dead/Nurture',
   d:"Stops leads dying after one dial. Auto-advancing the stage on reply keeps the pipeline honest without relying on reps to drag cards."},
  {n:"Qualification → Analysis Handoff", pri:"p2", flow:'<span class="trg">Trigger:</span> Stage = Qualified <span class="arrow">→</span> require ARV + Repairs fields <span class="arrow">→</span> calculate MAO <span class="arrow">→</span> notify acquisitions manager <span class="arrow">→</span> task: "Review numbers & approve offer"',
   d:"Field-gating the stage is what keeps deal economics clean enough to report on later."},
  {n:"Offer Follow-Up Sequence", pri:"p1", flow:'<span class="trg">Trigger:</span> Stage = Offer Made <span class="arrow">→</span> day 1/3/7/14/30 touches <span class="arrow">→</span> escalating value framing <span class="arrow">→</span> on acceptance, move to Under Contract <span class="arrow">→</span> else Dead/Nurture with re-engage date',
   d:"Most wholesaling revenue hides here. An offer that got one follow-up and a shrug is the most expensive thing in the pipeline."},
  {n:"Contract Execution Chain", pri:"p1", flow:'<span class="trg">Trigger:</span> Stage = Under Contract <span class="arrow">→</span> send PSA for e-sign <span class="arrow">→</span> on signature, create Dispo opportunity + TC opportunity <span class="arrow">→</span> assemble property packet <span class="arrow">→</span> notify dispo team',
   d:"One stage change spawns both downstream pipelines. This is the join between acquisitions and dispo that most builds leave manual."},
  {n:"Cash Buyer Match & Blast", pri:"p1", flow:'<span class="trg">Trigger:</span> Dispo stage = Marketing to Buyers <span class="arrow">→</span> query buyer list by area + type + budget <span class="arrow">→</span> tiered send (VIP first, then list) <span class="arrow">→</span> log responders <span class="arrow">→</span> create inquiry tasks',
   d:"Tiered sending protects your best buyer relationships and keeps blast volume compliant rather than spraying the whole list."},
  {n:"Stalled Deal Escalation", pri:"p2", flow:'<span class="trg">Trigger:</span> Opportunity in any stage > X days <span class="arrow">→</span> notify owning rep <span class="arrow">→</span> no action in 48h, escalate to manager <span class="arrow">→</span> flag on dashboard',
   d:"The quiet killer in wholesaling is a deal nobody touched for eleven days. This surfaces it automatically."},
  {n:"Transaction Deadline Reminders", pri:"p2", flow:'<span class="trg">Trigger:</span> TC stage change <span class="arrow">→</span> calculate deadline dates <span class="arrow">→</span> reminders at T-7 / T-3 / T-1 to TC + parties <span class="arrow">→</span> escalate if docs missing',
   d:"Contract-to-close is a deadline business. Missing an inspection date can cost the entire assignment fee."},
  {n:"Post-Close & Reactivation", pri:"p2", flow:'<span class="trg">Trigger:</span> Stage = Closed <span class="arrow">→</span> log actual assignment fee <span class="arrow">→</span> review request to seller + buyer <span class="arrow">→</span> add buyer to Active tier <span class="arrow">→</span> 6/12-month seller-referral touch',
   d:"Closes the loop and feeds the buyer list, which compounds the value of every future contract."},
  {n:"Dead Lead Long-Term Nurture", pri:"p2", flow:'<span class="trg">Trigger:</span> Stage = Dead/Nurture <span class="arrow">→</span> monthly value touch <span class="arrow">→</span> quarterly direct ask <span class="arrow">→</span> on any reply, reopen into Contacted + notify rep',
   d:"Wholesaling timelines are long. Sellers who said no in March sign in September, and this is the only system that's still there when they do."}
];

const NOTIFS = [
  {h:"New lead assigned", p:"SMS + in-app to the owning acquisitions rep the moment a lead is routed, with property address and source."},
  {h:"Call within 5 minutes", p:"Task auto-created with due time, appearing in the rep's task list; overdue tasks roll up to the manager view."},
  {h:"Seller replied", p:"Instant alert on any inbound SMS or email so a live conversation never sits unanswered in a shared inbox."},
  {h:"Appointment set / reminder", p:"Confirmation to the seller, calendar invite to the rep, reminders at 24h and 1h to cut no-shows."},
  {h:"Offer made — follow-up due", p:"Recurring task chain tied to the offer cadence so nobody has to remember day 7 or day 14."},
  {h:"Contract signed", p:"Broadcast to dispo team plus TC, with the property packet link attached."},
  {h:"Buyer inquiry received", p:"Routed to the dispo rep with buyer tier and criteria match shown."},
  {h:"Deadline approaching", p:"T-7 / T-3 / T-1 alerts on every transaction milestone to TC and the deal owner."},
  {h:"Deal stalled", p:"Escalation to manager when an opportunity sits past the stage threshold without activity."}
];

const KPIS = [
  {n:"Speed-to-lead (median)", d:"Minutes from lead arrival to first human-quality response, by rep and by source.", b:"Target: under 5 minutes"},
  {n:"Contact rate", d:"Attempted Contact → Contacted. Isolates list quality and phone data from rep performance.", b:"Diagnoses bad data"},
  {n:"Lead → contract rate", d:"Full funnel conversion, segmented by lead source and campaign.", b:"The headline number"},
  {n:"Cost per contract by source", d:"Marketing spend ÷ contracts, per channel. Tells you where the next dollar goes.", b:"Kills bad channels"},
  {n:"Stage conversion & drop-off", d:"Where deals die. Usually Offer Made — this makes it visible instead of anecdotal.", b:"Find the bottleneck"},
  {n:"Average days in stage", d:"Velocity per stage, and the trigger threshold for stalled-deal escalation.", b:"Drives escalation"},
  {n:"Rep activity", d:"Calls, texts, conversations, appointments set, offers made — per rep, per day.", b:"Manager view"},
  {n:"Days to assign (dispo)", d:"Under Contract → Assigned. Your capital-risk and buyer-list-health metric.", b:"Dispo health"},
  {n:"Average assignment fee", d:"Projected vs. actual, by source and by rep, so bad deals get caught early.", b:"Margin control"},
  {n:"Buyer list engagement", d:"Open and response rates by buyer tier; flags list decay before a deal needs it.", b:"Asset health"}
];

const HANDOFF = [
  {h:"End-to-end test with dummy deals", p:"A test seller runs the full path — intake, assignment, cadence, offer, contract, dispo blast, TC, close — with every automation firing. Then the same for a buyer and a dead lead."},
  {h:"Edge-case testing", p:"Duplicate leads, opt-out replies, bad phone numbers, deals that fall through and re-enter dispo, and reassignment between reps. This is where most builds break in month two."},
  {h:"Reusable snapshot", p:"The entire build saved as a version-tagged GHL snapshot so it can be cloned to a second market, entity, or sub-account without a rebuild."},
  {h:"Written SOPs per role", p:"Acquisitions, dispo, TC, and admin each get a short written guide: what they do in the CRM daily, which views to work from, and what the system does for them."},
  {h:"Loom walkthroughs", p:"Screen recordings per role, kept short and task-specific, so onboarding a new VA is watching four videos rather than shadowing someone for a week."},
  {h:"Live team training", p:"A working session per team with real leads, plus a Q&A pass once they've used it for a few days."},
  {h:"Automation inventory doc", p:"Every workflow listed with its trigger, purpose, and owner — so future changes are safe to make and you're never dependent on me to understand your own system."},
  {h:"Two-week hypercare", p:"Post-launch support window for tuning cadences, fixing edge cases, and adjusting anything the team hits in real use."}
];

const QUESTIONS = [
  {g:"Lead flow & sources", items:["Where do seller leads come from today, and roughly what volume per month by channel?","Do you pull and import lists (PropStream, BatchLeads, DealMachine), run inbound marketing, or both?","Who touches a new lead first — in-house acquisitions, VAs, or a call center?","What's your current speed-to-lead, and do you measure it today?"]},
  {g:"Team & responsibility", items:["How many acquisitions reps, dispo reps, VAs and TCs are on the team?","How are leads assigned today — round robin, by market, by rep seniority?","Who owns a deal once it's under contract: same rep, or a handoff?","What should each role be able to see and edit in the CRM?"]},
  {g:"Deal process", items:["Walk me through your last closed deal, stage by stage, including who did what.","What qualification criteria decide whether a lead is worth an offer?","How do you calculate offers — fixed % of ARV, MAO formula, case by case?","How do you currently market contracts to buyers, and how big is your buyer list?"]},
  {g:"Current systems", items:["What are you using now — a CRM, spreadsheets, REsimpli, Podio, something else?","Is there existing data to migrate, and how clean is it?","What e-sign, dialer, skip trace and title tools do you use that need to connect?","Is there an existing GHL account, or are we starting from a fresh sub-account?"]},
  {g:"Compliance", items:["Is your A2P 10DLC brand and campaign already registered and approved?","How is SMS consent captured and documented today?","Do you scrub against DNC lists, and where is your internal suppression list kept?","Which states do you operate in? Several have stricter texting rules than federal."]},
  {g:"Reporting", items:["What three numbers do you want to see every Monday morning?","Do you track cost per contract by marketing channel today?","Who needs dashboards — just ownership, or managers and reps too?","Is this build for one market/entity, or will it be cloned across several?"]}
];

/* ============================================================ RENDER ============================================================ */
const $ = s=>document.querySelector(s);

function renderPhases(){
  $("#phaserail").innerHTML = PHASES.map((p,i)=>`
    <div class="phase ${p.done?'done':''} ${p.active?'active-phase':''}">
      <div class="node"></div>
      <div class="when">
        <div class="win">${p.win}</div>
        <div class="ph">${p.name}</div>
        <button class="phase-toggle admin-only" data-toggle="${i}">${p.done?'✓ done':'mark done'}</button>
      </div>
      <div class="body">
        <h3>${p.h} <span class="mstone">${p.id}</span></h3>
        <p>${p.p}</p>
        <div class="ownrow">
          <div class="col" style="flex:1 1 100%"><b>Deliverables</b><ul>${p.out.map(x=>`<li>${x}</li>`).join("")}</ul></div>
        </div>
      </div>
    </div>`).join("");

  $("#progressStrip").innerHTML = PHASES.map(p=>{
    const cls = p.done?'done':(p.active?'now':'');
    return `<div class="pstep ${cls}"><div class="pi">${p.id}</div><div class="pn">${p.name}</div><div class="pm">${p.win}</div></div>`;
  }).join("");

  document.querySelectorAll('[data-toggle]').forEach(b=>{
    b.onclick=e=>{e.stopPropagation();const i=+b.dataset.toggle;PHASES[i].done=!PHASES[i].done;if(PHASES[i].done)PHASES[i].active=false;renderPhases();};
  });
}

function renderPipelines(){
  $("#pipeWrap").innerHTML = PIPELINES.map(p=>`
    <div class="panel">
      <div class="pipehead"><h3>${p.name}</h3><span class="tag">${p.tag}</span></div>
      <p class="pipenote">${p.note}</p>
      <table class="stagetable">
        <thead><tr><th style="width:26%">Stage</th><th style="width:34%">Means</th><th>What fires automatically</th></tr></thead>
        <tbody>${p.stages.map((s,i)=>`<tr><td><span class="num">${String(i+1).padStart(2,'0')}</span> <span class="stg">${s[0]}</span></td><td>${s[1]}</td><td>${s[2]}</td></tr>`).join("")}</tbody>
      </table>
    </div>`).join("");
}

function renderFields(){
  $("#fieldWrap").innerHTML = FIELDS.map(f=>`
    <div class="fieldgroup">
      <h4>${f.g}</h4>
      <div class="chips">${f.items.map(i=>`<span class="chip">${i}</span>`).join("")}</div>
    </div>`).join("");
}

function renderWorkflows(){
  $("#wfWrap").innerHTML = WORKFLOWS.map(w=>`
    <div class="wf">
      <div class="wfh"><h4>${w.n}</h4><span class="pri ${w.pri}">${w.pri==='p1'?'Core':'Phase 2'}</span></div>
      <div class="flow">${w.flow}</div>
      <p>${w.d}</p>
    </div>`).join("");
}

function renderNotifs(){
  $("#notifWrap").innerHTML = NOTIFS.map(n=>`
    <div class="checkitem"><div class="bx"></div><div class="ci"><h4>${n.h}</h4><p>${n.p}</p></div></div>`).join("");
}

function renderKPIs(){
  $("#kpiWrap").innerHTML = KPIS.map(k=>`
    <div class="kpi"><div class="kn">${k.n}</div><div class="kd">${k.d}</div><div class="kb">${k.b}</div></div>`).join("");
}

function renderHandoff(){
  $("#handoffWrap").innerHTML = HANDOFF.map(h=>`
    <div class="checkitem"><div class="bx"></div><div class="ci"><h4>${h.h}</h4><p>${h.p}</p></div></div>`).join("");
}

function renderQuestions(){
  $("#qWrap").innerHTML = QUESTIONS.map(q=>`
    <div class="qblock"><h4>${q.g}</h4><ul>${q.items.map(i=>`<li>${i}</li>`).join("")}</ul></div>`).join("");
}

/* ---------- nav ---------- */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.dataset.page===id));
  document.querySelectorAll('.navlink').forEach(n=>n.classList.toggle('active',n.dataset.page===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.navlink').forEach(n=> n.onclick=()=>showPage(n.dataset.page));
document.querySelectorAll('[data-jump]').forEach(a=> a.onclick=e=>{e.preventDefault();showPage(a.dataset.jump);});

$("#viewswitch").addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  document.querySelectorAll('#viewswitch button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  document.body.classList.toggle('admin', b.dataset.view==='admin');
});

renderPhases(); renderPipelines(); renderFields(); renderWorkflows();
renderNotifs(); renderKPIs(); renderHandoff(); renderQuestions();
}
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', __init); } else { __init(); }
})();
