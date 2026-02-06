# NEET Counselling Choice Optimizer & Process Navigator
## Architecture Overview, Folder Structure & MVP Scope

**Source:** PRD.md v2.0  
**Timeline:** 6 months (Academic)  
**Scope:** Strictly PRD-defined; no extra features

---

## 1. Architecture Overview (High-Level)

### In Simple Terms

- **User** uses a **web app** (React) to:
  - Enter NEET score, rank, category, state, budget, and priorities.
  - Build and reorder a choice list with drag-and-drop (colleges shown as Safe / Target / Dream).
  - See a **process timeline** and **document checklist** for their state/counselling authority.
  - During counselling, use a **Round Decision Helper** to compare “accept current seat” vs “withdraw and try upgrade,” including refund rules.

- The **frontend** talks to a **backend** over **REST APIs**. The backend:
  - Fetches colleges and 3-year cutoff data from the database.
  - Runs **choice optimization logic** (categorize colleges, suggest order, validate balance).
  - Serves state-specific **process timelines** and **document checklists**.
  - Powers **Round Decision Helper** (remaining choices, upgrade probability, withdrawal refund).
  - Can support **PDF export** (choice list, document checklist) — PRD allows client-side (e.g. jsPDF) or server-assisted.

- A **PostgreSQL database** holds:
  - **Colleges** (name, type, state, fee, seats, NIRF, etc.).
  - **Cutoffs** (last 3 years, by college, round, category).
  - **User choices** (anonymized: score, rank, category, choice order, result) for “similar profile” suggestions.
  - **Counselling timeline** (state/authority, phases, dates, documents).

- **Data preparation** is done **offline** with **Python scripts** (cleaning, cutoff analysis); results are imported into PostgreSQL. No real-time government APIs.

- **Hosting** (post-MVP): Frontend on Vercel/Netlify; Backend + DB on Railway/Render (free tier acceptable for academic scale).

**Flow:** Browser → React (Tailwind, react-beautiful-dnd, jsPDF) → REST → Express (Node.js) → PostgreSQL. Python only for offline data pipeline.

---

## 2. Recommended Folder Structure

### React Frontend

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── index.jsx
│   ├── App.jsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Disclaimer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── choice-builder/
│   │   │   ├── InputForm.jsx
│   │   │   ├── PrioritySliders.jsx
│   │   │   ├── CollegeList.jsx
│   │   │   ├── DragDropChoiceList.jsx
│   │   │   ├── ListValidation.jsx
│   │   │   └── ExportChoiceList.jsx
│   │   ├── process-navigator/
│   │   │   ├── AuthoritySelector.jsx
│   │   │   ├── Timeline.jsx
│   │   │   ├── DocumentChecklist.jsx
│   │   │   ├── ProcessFlowchart.jsx
│   │   │   └── DownloadChecklist.jsx
│   │   └── round-decision/
│   │       ├── ScenarioInput.jsx
│   │       ├── RemainingChoices.jsx
│   │       ├── UpgradeProbability.jsx
│   │       ├── WithdrawalCalculator.jsx
│   │       └── RiskAssessment.jsx
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── InputDetails.jsx
│   │   ├── ChoiceBuilder.jsx
│   │   ├── ProcessNavigator.jsx
│   │   ├── RoundDecisionHelper.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── hooks/
│   │   └── (e.g. useColleges, useCutoffs, useTimeline)
│   │
│   └── utils/
│       └── (e.g. constants, formatters)
│
├── package.json
├── tailwind.config.js
├── vite.config.js (or similar)
└── README.md
```

### Node.js + Express Backend

```
backend/
├── src/
│   ├── index.js
│   ├── app.js
│   │
│   ├── routes/
│   │   ├── colleges.js
│   │   ├── cutoffs.js
│   │   ├── choice-optimizer.js
│   │   ├── process-navigator.js
│   │   ├── round-decision.js
│   │   └── user-choices.js
│   │
│   ├── controllers/
│   │   ├── collegeController.js
│   │   ├── cutoffController.js
│   │   ├── choiceOptimizerController.js
│   │   ├── processNavigatorController.js
│   │   ├── roundDecisionController.js
│   │   └── userChoiceController.js
│   │
│   ├── services/
│   │   ├── choiceOptimizer.js
│   │   ├── withdrawalCalculator.js
│   │   └── upgradeProbability.js
│   │
│   ├── models/
│   │   ├── college.js
│   │   ├── cutoff.js
│   │   ├── userChoice.js
│   │   └── counsellingTimeline.js
│   │
│   ├── db/
│   │   ├── connection.js
│   │   └── migrations/ (or schema.sql)
│   │
│   ├── middleware/
│   │   ├── validation.js
│   │   ├── rateLimit.js
│   │   └── errorHandler.js
│   │
│   └── config/
│       └── env.js
│
├── scripts/
│   └── seed.js (optional; seed from Python output)
│
├── package.json
└── README.md
```

### Python Data Pipeline (Offline)

```
data-pipeline/
├── scripts/
│   ├── clean_colleges.py
│   ├── clean_cutoffs.py
│   └── export_for_db.py
├── raw/          (optional; raw scraped/collected data)
├── processed/    (output for DB import)
├── requirements.txt
└── README.md
```

### Project Root

```
project/
├── PRD.md
├── ARCHITECTURE_AND_MVP.md
├── frontend/
├── backend/
└── data-pipeline/
```

---

## 3. MVP Modules List (Build Order)

Build order follows **Phase 1 (Mini Project, Months 1–3)** then **Phase 2 (Major Project, Months 4–6)** as in the PRD. No new features beyond PRD.

### Phase 1: Mini Project (Months 1–3)

| # | Module | Description | PRD Reference |
|---|--------|-------------|---------------|
| 1 | **Database & schema** | PostgreSQL: `colleges`, `cutoffs`, `user_choices`, `counselling_timeline`. Seed with MCC + 1 state (e.g. Maharashtra). | §6.1, §16 Appendix A |
| 2 | **College & cutoff API** | REST endpoints to list/filter colleges and get 3-year cutoffs by category. Used by choice builder. | §4.4, §6.2 |
| 3 | **Input collection (frontend)** | Form: NEET score, rank, category, home state, budget range, priority sliders (govt preference, stay close, reputation, fee, state). | §4.1 Input Collection |
| 4 | **Choice list builder (core)** | Backend: fetch colleges by rank/category, categorize Safe/Target/Dream (3-year cutoffs), suggest order. Frontend: display tiers, drag-and-drop reorder (react-beautiful-dnd), visual validation (top-heavy / bottom-heavy / balanced). | §4.1 Smart Suggestions, Choice List Optimizer |
| 5 | **Basic process navigator** | Select state + authority (MCC / State). Show text-based timeline: phases, what to do, deadlines. Stored in `counselling_timeline`. | §4.2, Phase 1 “Simple process navigator” |
| 6 | **Basic UI/UX & landing** | Landing page (“Create Your NEET Counselling Strategy in 30 Minutes”), navigation, layout, disclaimer on every page. Mobile-responsive. | §7 User Flow, §12.1 |
| 7 | **Anonymized choice submission** | Optional save of choice order (no PII); store in `user_choices` for future “similar profile” use. | §4.1 Key Innovation, §16 user_choices |

**Phase 1 outcome:** User can create a choice list, see a simple process timeline, and get a demo-ready product for mini project evaluation (PRD §10 Phase 1).

---

### Phase 2: Major Project (Months 4–6)

| # | Module | Description | PRD Reference |
|---|--------|-------------|---------------|
| 8 | **Document checklist generator** | Based on state + category: list documents (originals, copies, attestation, formats). Downloadable checklist PDF (e.g. jsPDF). | §4.2 Document Checklist Generator |
| 9 | **Process flowchart** | Visual flow of counselling with “You are here” and decision points (e.g. “If allotted Round 1 → Accept OR Wait for upgrade”). | §4.2 Process Flowchart |
| 10 | **Second state support** | Add second state (e.g. Karnataka) to DB and process navigator (timeline + documents). | §6.3 “MVP focuses on MCC + 2 states” |
| 11 | **Round Decision Helper** | Input: “Got College X in Round 1.” Show: remaining choices in list, upgrade probability (LOW/MEDIUM/HIGH from historical data), financial impact of withdrawal. | §4.3 Scenario Analysis |
| 12 | **Withdrawal calculator** | Refund rules by state, net loss for withdraw scenarios. Used inside Round Decision Helper. | §4.3 Withdrawal Calculator |
| 13 | **Export choice list PDF** | Export final choice list as PDF with college codes for form filling (e.g. jsPDF). | §4.1 Export as PDF |
| 14 | **“Similar profile” suggestions** | Use anonymized `user_choices`: “Students with similar profiles chose these in this order” and risk indicator. | §4.1 Key Innovation |
| 15 | **Optional email save** | Optional email signup only for saving choice list; no phone, no payment. | §5.2 Optional email only |
| 16 | **Performance & polish** | Load testing, caching for college/cutoff APIs, improved UI/UX, documentation, deploy (e.g. Vercel + Railway/Render). | §10 Phase 2, §11 |

**Phase 2 outcome:** Full MVP with Choice Builder, Process Navigator (with checklist + flowchart), Round Decision Helper, two states, PDF exports, and live deployment (PRD §10 Phase 2).

---

## 4. Out-of-Scope for the MVP (Explicit Confirmation)

The following are **not** part of the MVP and must **not** be built within this 6-month academic scope.

### Features Not to Build (PRD §5.1)

| Item | Reason (per PRD) |
|------|-------------------|
| College predictor with “chances” / admission probability | Market saturated; high liability. |
| Drop year advice | Requires professional counselling and psychological assessment. |
| Seat booking / counselling portal integration | Legal and official integration complexity. |
| Payment processing | Out of scope for academic project. |
| Student reviews or ratings | Quality and legal liability. |
| Real-time seat availability | No official data feeds. |
| AI chatbot | Cost and maintenance; unnecessary for MVP. |
| Native mobile app | Focus on web-responsive only. |

### College Database – Not in MVP (PRD §4.4)

- Reviews/ratings  
- Campus photos  
- Infrastructure details  
- Placement data  

Only: name, type, state, fee, seats, NIRF (if any), and **past 3 years’ closing ranks** (category-wise).

### Data Not to Collect (PRD §5.2)

- Phone numbers  
- Aadhaar or other sensitive documents  
- Payment information  
- **Optional:** Email only for saving choice list.

### Future / Post-Academic (PRD §14 – Not in 6-Month MVP)

- Additional states beyond MCC + 2  
- Choice sharing / community features  
- Counselling Q&A forum  
- Reminder system (email/SMS)  
- What-if simulator (beyond basic Round Decision Helper)  
- B2B API for institutions  
- Any monetization (freemium, B2B licensing)

---

**Summary:** The system is a **React + Express + PostgreSQL** stack with an offline **Python** data pipeline. Build **database and Choice List Builder first**, then **basic Process Navigator**, then **Round Decision Helper**, document checklist, second state, PDF exports, and polish. Everything above is scoped strictly to the PRD with **no extra features** and is intended to be **realistic for a 6-month academic timeline**.
