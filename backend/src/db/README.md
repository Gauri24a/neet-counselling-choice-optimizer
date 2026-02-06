# Database Schema Documentation

**Project:** NEET Counselling Choice Optimizer & Process Navigator  
**Source:** PRD.md §16 Appendix A, §6.2; ARCHITECTURE_AND_MVP.md  
**Scope:** MVP only. No extra tables or columns.

---

## Overview

PostgreSQL database with seven tables:

| Table | Purpose |
|-------|--------|
| `colleges` | College master data (name, type, state, fee, seats, NIRF) |
| `cutoffs` | Historical closing ranks (last 3 years, by college, round, category) |
| `user_choices` | Anonymized choice lists for "similar profile" suggestions |
| `counselling_authorities` | MCC or state counselling body |
| `counselling_timeline` | Process phases per authority (timeline, what to do, deadlines) |
| `counselling_documents` | Document checklist by authority and category |
| `refund_rules` | Refund rules by state (Withdrawal Calculator) |

---

## Enums

- **category_enum:** `GEN`, `OBC`, `SC`, `ST`, `EWS` (PRD §4.1)
- **college_type_enum:** `GOVT`, `PRIVATE`, `DEEMED` (PRD §4.4)
- **authority_type_enum:** `MCC`, `STATE` (PRD §4.2, §6.3)

---

## Tables (PRD Reference)

### 1. colleges

**PRD §4.4, Appendix A.** Minimal college info. No reviews, photos, placement data.

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| name | VARCHAR(255) | College name |
| type | college_type_enum | GOVT / PRIVATE / DEEMED |
| state_code | VARCHAR(10) | e.g. MH, KA |
| annual_fee | INTEGER | Annual fee (₹) |
| seats_total | INTEGER | Total seats |
| nirf_rank | INTEGER | NIRF rank if applicable |
| created_at, updated_at | TIMESTAMPTZ | Audit |

**Indexes:** state_code, type, nirf_rank (partial).

---

### 2. cutoffs

**PRD §4.1 Smart Suggestions, Appendix A.** Last 3 years only (§6.3).

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| college_id | INTEGER | FK → colleges(id) |
| year | INTEGER | e.g. 2024 |
| round | INTEGER | Round number |
| category | category_enum | GEN / OBC / SC / ST / EWS |
| opening_rank | INTEGER | Optional |
| closing_rank | INTEGER | Required |
| created_at | TIMESTAMPTZ | Audit |

**Unique:** (college_id, year, round, category).  
**Indexes:** college_id, (year, category), (college_id, category, year, closing_rank).

---

### 3. user_choices

**PRD §4.1 Key Innovation, Appendix A, §12.2.** Anonymized only. No PII.

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| user_hash | VARCHAR(64) | Anonymized user id (e.g. hash) |
| score | INTEGER | NEET score |
| rank | INTEGER | NEET rank |
| category | category_enum | |
| state_code | VARCHAR(10) | For "similar profile" filter (§12.2) |
| choice_order | JSONB | Array of college_id in order |
| admitted_college_id | INTEGER | FK → colleges(id), nullable |
| created_at | TIMESTAMPTZ | Audit |

**Retention:** Delete after counselling season (6 months) per PRD §12.2.  
**Indexes:** user_hash, (rank, category, state_code), created_at.

---

### 4. counselling_authorities

**PRD §4.2, §6.3.** MCC (All India) or State. MVP: MCC + Maharashtra + Karnataka.

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| name | VARCHAR(100) | e.g. "MCC", "Maharashtra State Counselling" |
| type | authority_type_enum | MCC or STATE |
| state_code | VARCHAR(10) | NULL for MCC |
| created_at | TIMESTAMPTZ | Audit |

**Unique:** (type, state_code).

---

### 5. counselling_timeline

**PRD §4.2 Interactive Timeline, §6.2.** One row per phase per authority.

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| authority_id | INTEGER | FK → counselling_authorities(id) |
| phase_order | INTEGER | Display order |
| title | VARCHAR(255) | Phase title |
| description | TEXT | What happens |
| start_date, end_date | DATE | Optional |
| what_to_do | TEXT | User action |
| common_mistakes | TEXT | Warnings |
| created_at, updated_at | TIMESTAMPTZ | Audit |

**Unique:** (authority_id, phase_order).

---

### 6. counselling_documents

**PRD §4.2 Document Checklist Generator.** By authority and category.

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| authority_id | INTEGER | FK → counselling_authorities(id) |
| category | category_enum | GEN / OBC / SC / ST / EWS |
| document_name | VARCHAR(255) | |
| requirement_text | TEXT | e.g. "Original + 2 photocopies" |
| attestation_required | BOOLEAN | Default false |
| format_notes | TEXT | e.g. "OBC certificate after April 1" |
| sort_order | INTEGER | Display order |
| created_at | TIMESTAMPTZ | Audit |

---

### 7. refund_rules

**PRD §4.3 Withdrawal Calculator.** Refund rules per state.

| Column | Type | Notes |
|--------|------|--------|
| id | SERIAL | PK |
| state_code | VARCHAR(10) | e.g. MH, KA |
| scenario_label | VARCHAR(255) | e.g. "Withdraw before Round 2" |
| description | TEXT | Refund amount/percentage and conditions |
| sort_order | INTEGER | Display order |
| created_at | TIMESTAMPTZ | Audit |

---

## Applying the Schema

```bash
# From project root, with PostgreSQL running and DB created:
psql -U postgres -d neet_counselling_db -f backend/src/db/schema.sql
```

Or run `schema.sql` via your migration runner or DB client.

---

## Data Scope (MVP)

- **Colleges & cutoffs:** MCC (All India) + 1 state in Phase 1; + 2nd state in Phase 2 (PRD §6.3, §10).
- **Counselling:** Same authorities (MCC + Maharashtra, then + Karnataka).
- **user_choices:** Populated only by anonymized saves; no PII (PRD §5.2).
