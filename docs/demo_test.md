# Demo Test Plan – NEET Counselling Choice Optimizer (MVP)

## 1. Goals

**Show**
- Smart Choice List Builder working end-to-end (Frontend → Backend → Algorithm → DB).

**Prove**
- Colleges are categorized into **Safe / Target / Dream** as per PRD.
- Suggested order and validation rules behave correctly.

**Avoid**
- Any non-MVP features.
- No Process Navigator, no Round Decision Helper, no PDF export, no drag-and-drop.

---

## 2. Preconditions

### Environment
- OS: Windows
- Browser: Chrome / Edge

### Backend
- Command:
  ```cmd
  cd backend
  npm start
Expected:

Server listening on port 3000

Frontend

Command:

cd frontend
npm run dev


Expected:

Local: http://localhost:5173

Database

PostgreSQL schema applied (schema.sql).

Test data condition:

Either empty DB (logic-only demo), OR

Minimal demo data:

10–20 colleges

3 years of cutoff data

One category (e.g. GEN)

Both cases are acceptable for demo.

3. Backend API Sanity Tests

Endpoint:

POST /api/choice-optimizer/generate

3.1 Happy Path (Typical Candidate)

Request Body

{
  "rank": 45000,
  "category": "GEN",
  "stateCode": "MH",
  "budgetRange": "5-10L",
  "priorities": {
    "governmentPreference": 8,
    "stayCloseToHome": 7,
    "collegeReputation": 6,
    "feeAffordability": 5,
    "specificStatePreference": 5
  }
}


Expected Response

HTTP 200 OK

Fields present:

safe

target

dream

suggestedOrder

validation

validation.balanced is boolean.

Empty arrays are acceptable if DB is empty.

3.2 Validation Error – Invalid Rank

Request Body

{
  "rank": 0,
  "category": "GEN",
  "stateCode": "MH"
}


Expected

HTTP 400

Error message indicating rank must be a positive integer.

3.3 Validation Error – Unsupported Category

Request Body

{
  "rank": 45000,
  "category": "ABC",
  "stateCode": "MH"
}


Expected

HTTP 400

Error message indicating invalid category.

3.4 No Database (Optional Test)

Temporarily unset DATABASE_URL.

Restart backend.

Expected

HTTP 200

Empty safe, target, dream, suggestedOrder.

Graceful handling with validation warnings.

4. Frontend Demo Flow (Happy Path)
4.1 Landing Page

URL:

http://localhost:5173


Verify:

Headline: “Create Your NEET Counselling Strategy in 30 Minutes”

“Get Started” button visible.

Action:

Click Get Started.

Expected:

Navigation to /input-details.

4.2 Input Details Page

Enter:

Rank: 45000

Category: General

Home State: Maharashtra

Budget Range: ₹5–10 L/year

Adjust priority sliders.

Action:

Click Generate Choice List.

Expected:

Button shows loading state.

On success, navigation to /choice-builder.

4.3 Choice Builder Page

Verify:

Heading: “Your Choice List”

Validation message visible.

Validation behavior:

If Safe < 20 → warning shown.

If Safe ≥ 20 → “Your list looks balanced ✓”.

Verify sections:

Safe Zone

Target Zone

Dream Zone

Each college card shows:

College name

Type (Govt / Private / Deemed)

State

Annual fee

NIRF rank (if available)

Suggested Order:

First ~30 choices listed with tier labels (SAFE / TARGET / DREAM).

Buttons:

Change inputs → navigates back to /input-details.

Back to home → navigates to /.

4.4 Direct Navigation Protection

Manually open:

http://localhost:5173/choice-builder


(without submitting form)

Expected:

Message: “No choice list data. Please start from the form.”

Button to navigate to Input Details.

5. Edge Cases for Demo
Strong Rank

Rank: 5000

Expect:

Many Safe colleges.

validation.balanced = true (if data exists).

Borderline Rank

Rank near cutoff.

Expect:

Higher Target and Dream count.

Sensible tier distribution.

Budget Sensitivity

Budget 0–2L vs 10L+.

Expect:

Fewer colleges in low budget.

More colleges available in high budget.

6. Out of Scope for This Demo

The following are explicitly not demonstrated:

Process Navigator (timelines, documents).

Round Decision Helper.

Drag-and-drop reordering.

PDF export.

Login, accounts, or email features.

Real-time seat availability.

These are planned for future phases as per PRD.

7. Demo Conclusion Statement

“This demo shows the MVP Smart Choice List Builder working end-to-end.
The system correctly categorizes colleges into Safe, Target, and Dream zones using historical cutoff logic and user preferences.
Additional counselling features are planned for future phases.”