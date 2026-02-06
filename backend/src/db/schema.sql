-- =============================================================================
-- NEET Counselling Choice Optimizer & Process Navigator
-- PostgreSQL Database Schema (MVP)
-- =============================================================================
-- Source: PRD.md §16 Appendix A, §6.2 System Architecture
-- Scope: colleges, cutoffs (3 years), user_choices (anonymized), counselling
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Custom types (PRD: category Gen/OBC/SC/ST/EWS; college type govt/private/deemed)
-- -----------------------------------------------------------------------------
CREATE TYPE category_enum AS ENUM ('GEN', 'OBC', 'SC', 'ST', 'EWS');
CREATE TYPE college_type_enum AS ENUM ('GOVT', 'PRIVATE', 'DEEMED');
CREATE TYPE authority_type_enum AS ENUM ('MCC', 'STATE');

-- -----------------------------------------------------------------------------
-- 1. COLLEGES (PRD §4.4, Appendix A)
-- College name, type, state, fee, seats, NIRF. No reviews/photos/placements.
-- -----------------------------------------------------------------------------
CREATE TABLE colleges (
  id             SERIAL PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  type           college_type_enum NOT NULL,
  state_code     VARCHAR(10) NOT NULL,
  annual_fee     INTEGER NOT NULL,
  seats_total    INTEGER NOT NULL,
  nirf_rank      INTEGER,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_colleges_state ON colleges(state_code);
CREATE INDEX idx_colleges_type ON colleges(type);
CREATE INDEX idx_colleges_nirf ON colleges(nirf_rank) WHERE nirf_rank IS NOT NULL;

COMMENT ON TABLE colleges IS 'College master data. MVP: MCC + 2 states. No reviews/photos/placements (PRD §4.4).';

-- -----------------------------------------------------------------------------
-- 2. CUTOFFS (PRD §4.1, Appendix A)
-- Past 3 years closing ranks by college, round, category.
-- -----------------------------------------------------------------------------
CREATE TABLE cutoffs (
  id             SERIAL PRIMARY KEY,
  college_id     INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  year           INTEGER NOT NULL,
  round          INTEGER NOT NULL,
  category       category_enum NOT NULL,
  opening_rank   INTEGER,
  closing_rank   INTEGER NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (college_id, year, round, category)
);

CREATE INDEX idx_cutoffs_college ON cutoffs(college_id);
CREATE INDEX idx_cutoffs_year_category ON cutoffs(year, category);
CREATE INDEX idx_cutoffs_closing_rank ON cutoffs(college_id, category, year, closing_rank);

COMMENT ON TABLE cutoffs IS 'Historical cutoff data. Last 3 years only (PRD §6.3).';

-- -----------------------------------------------------------------------------
-- 3. USER_CHOICES (PRD §4.1 Key Innovation, Appendix A, §12.2)
-- Anonymized: user_hash, score, rank, category, choice_order, result.
-- State stored for "similar profile" filtering (PRD §12.2 data collected).
-- -----------------------------------------------------------------------------
CREATE TABLE user_choices (
  id                  SERIAL PRIMARY KEY,
  user_hash            VARCHAR(64) NOT NULL,
  score                INTEGER NOT NULL,
  rank                 INTEGER NOT NULL,
  category             category_enum NOT NULL,
  state_code           VARCHAR(10) NOT NULL,
  choice_order         JSONB NOT NULL,
  admitted_college_id  INTEGER REFERENCES colleges(id),
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_choices_hash ON user_choices(user_hash);
CREATE INDEX idx_user_choices_profile ON user_choices(rank, category, state_code);
CREATE INDEX idx_user_choices_created ON user_choices(created_at);

COMMENT ON TABLE user_choices IS 'Anonymized choice lists for "similar profile" suggestions. No PII (PRD §5.2). Retention: 6 months (PRD §12.2).';

-- -----------------------------------------------------------------------------
-- 4. COUNSELLING AUTHORITIES (PRD §4.2, §6.3)
-- MCC (All India) or State (e.g. Maharashtra, Karnataka).
-- -----------------------------------------------------------------------------
CREATE TABLE counselling_authorities (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  type        authority_type_enum NOT NULL,
  state_code  VARCHAR(10),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (type, state_code)
);

COMMENT ON TABLE counselling_authorities IS 'MCC or state counselling body. state_code NULL for MCC.';

-- -----------------------------------------------------------------------------
-- 5. COUNSELLING TIMELINE (PRD §4.2, §6.2)
-- Phases per authority: what happens, what to do, deadlines, common mistakes.
-- -----------------------------------------------------------------------------
CREATE TABLE counselling_timeline (
  id            SERIAL PRIMARY KEY,
  authority_id  INTEGER NOT NULL REFERENCES counselling_authorities(id) ON DELETE CASCADE,
  phase_order   INTEGER NOT NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  start_date    DATE,
  end_date      DATE,
  what_to_do    TEXT,
  common_mistakes TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (authority_id, phase_order)
);

CREATE INDEX idx_counselling_timeline_authority ON counselling_timeline(authority_id);

COMMENT ON TABLE counselling_timeline IS 'Process phases per authority. Used by Process Navigator (PRD §4.2).';

-- -----------------------------------------------------------------------------
-- Trigger: updated_at for colleges and counselling_timeline
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER colleges_updated_at
  BEFORE UPDATE ON colleges
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER counselling_timeline_updated_at
  BEFORE UPDATE ON counselling_timeline
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
