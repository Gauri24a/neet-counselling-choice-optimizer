# Product Requirements Document
# NEET Counselling Choice Optimizer & Process Navigator

**Version:** 2.0  
**Last Updated:** January 2026  
**Project Type:** Academic Major Project  
**Timeline:** 6 months (Mini Project → Major Project)

---

## 1. Executive Summary

### The Real Problem
NEET counselling isn't confusing because students can't find college predictions—dozens of platforms already do that. The real problems are:

1. **Choice Filling Paralysis**: Students must fill 100+ choices but don't know how to order them optimally
2. **Process Navigation**: Multi-round, multi-authority counselling with unclear timelines and requirements
3. **Financial Risk Management**: Students lose deposits due to poor withdrawal timing
4. **Document Confusion**: Each state/authority has different document requirements with no central checklist

### Our Solution
**A focused tool that does THREE things exceptionally well:**
1. Helps students create and optimize their choice list based on their preferences
2. Provides state-specific, step-by-step process navigation with document checklists
3. Tracks counselling rounds and helps students make informed withdrawal/upgrade decisions

### What We're NOT Building
- ❌ Another "college predictor" (market saturated)
- ❌ Guaranteed admission promises (legal liability)
- ❌ Drop year recommendations (requires professional counselors)
- ❌ Unverified reviews (quality/liability issues)

---

## 2. Market Analysis & Differentiation

### Existing Solutions (Competitive Landscape)

| Platform | What They Do Well | What They Miss |
|----------|------------------|----------------|
| Careers360, CollegeDekho | College predictions | No choice optimization strategy |
| MCC Website | Official data | Terrible UX, no guidance |
| YouTube "Counselling Guides" | Process explanation | Not interactive, not personalized |
| Private Counselors | Personalized strategy | Expensive (₹5,000-50,000), not scalable |

### Our Unique Value Proposition

**We focus on the "action" phase, not the "information" phase:**
- Students know colleges exist → They don't know how to order choices
- Students know rounds happen → They don't know what to do when
- Students find cutoffs → They don't know if they should withdraw or upgrade

**Differentiation:**
1. **Interactive choice builder** with drag-and-drop priority setting
2. **State-specific process timelines** with document checklists
3. **Withdrawal calculator** showing financial implications
4. **Real user data** (anonymized) showing common choice patterns

---

## 3. Target Users

### Primary User Persona: "First-Time NEET Candidate"

**Name:** Priya (18 years old)  
**Score:** 550/720 (General category)  
**Location:** Tier-2 city, Maharashtra  
**Financial Status:** Middle class (can afford up to ₹5L/year)

**Pain Points:**
- Got her score, checked predictors, found 50 possible colleges
- No idea which 50 to add to her 100-choice list
- Confused about MCC vs Maharashtra state counselling
- Doesn't know if she should wait for round 2 or accept round 1 seat
- Parents asking relatives who gave NEET 5 years ago (outdated info)

**Current Behavior:**
- Watches 10+ YouTube videos
- Joins 5 Telegram groups with conflicting advice
- Parents considering hiring a counselor
- Makes choice list randomly based on "college names that sound good"

**Success Criteria:**
- Can create a choice list in 30 minutes with confidence
- Understands exactly what to do in each counselling round
- Knows document requirements before round starts
- Makes informed decisions about seat acceptance/withdrawal

### Secondary User: "Parents/Guardians"

**Pain Points:**
- Want to help but don't understand the system
- Worried about making expensive mistakes
- Need simple explanations without jargon

---

## 4. Core Features (MVP Scope)

### 4.1 Smart Choice List Builder ⭐ (PRIMARY FEATURE)

**Problem Solved:** Students don't know how to strategically order their 100+ choices

**Functionality:**

**Input Collection:**
- NEET score & rank
- Category (Gen/OBC/SC/ST/EWS)
- Home state & domicile
- Budget range (₹0-2L, 2-5L, 5-10L, 10L+)
- Priorities (rank using sliders):
  - Government college preference (0-10)
  - Stay close to home (0-10)
  - College reputation (0-10)
  - Fee affordability (0-10)
  - Specific state preference

**Smart Suggestions:**
- Based on previous year cutoffs (last 3 years), show colleges in 3 tiers:
  - 🎯 **Safe Zone** (90%+ probability based on historical data)
  - ⚡ **Target Zone** (50-90% probability)
  - 🚀 **Dream Zone** (<50% probability)

**Choice List Optimizer:**
- Drag-and-drop interface to reorder colleges
- System suggests optimal ordering strategy:
  - Place dream colleges in top 20 choices
  - Place safe colleges in bottom 30 choices
  - Mix target colleges in middle
- **Visual validation**: Shows if list is "top-heavy" (too many dreams) or "bottom-heavy" (too conservative)
- Export as PDF with college codes for actual form filling

**Key Innovation:**
- Uses anonymized data from previous users who successfully got admitted
- Shows "Students with similar profiles chose these in this order"
- Risk indicator for each choice based on historical data

---

### 4.2 Process Navigator with State-Specific Guidance

**Problem Solved:** Students don't know what to do, when to do it, and what documents they need

**Functionality:**

**Interactive Timeline:**
- Select your state + counselling authority (MCC/State)
- See personalized timeline with all rounds and dates
- Each phase shows:
  - What happens in this phase
  - What you need to do
  - What documents to prepare
  - Important deadlines
  - Common mistakes to avoid

**Document Checklist Generator:**
- Based on user's state/category, generates complete document list:
  - ✅ Original + photocopies needed
  - ✅ Attestation requirements
  - ✅ Online/offline submission modes
  - ✅ Specific formats (e.g., "OBC certificate must be issued after April 1")
  
**Downloadable Checklist PDF** to carry during document verification

**Process Flowchart:**
- Visual representation of counselling flow
- "You are here" indicator
- Shows decision points: "If allotted in Round 1 → Accept OR Wait for upgrade"

---

### 4.3 Round Decision Helper

**Problem Solved:** Students don't know whether to accept a seat now or wait for the next round

**Functionality:**

**Scenario Analysis:**
- Student inputs: "I got College X in Round 1"
- System shows:
  - Colleges still available in choice list
  - Historical data: "In last 3 years, Y% of students who withdrew upgraded"
  - Financial implication: "If you accept and withdraw later, you lose ₹X"
  - Risk assessment: "Based on your rank and remaining choices, upgrade probability is LOW/MEDIUM/HIGH"

**Withdrawal Calculator:**
- Shows exact refund rules for different states
- Calculates net loss for each withdrawal scenario
- Helps students make financially informed decisions

---

### 4.4 College Database (Simplified)

**Problem Solved:** Basic college information access

**Scope (Minimal for MVP):**
- College name, type (Govt/Private/Deemed), state
- Fee structure (annual)
- Seats available (total + category-wise)
- NIRF ranking (if applicable)
- **Past 3 years' closing ranks** (category-wise)

**NOT included (out of scope):**
- Reviews/ratings
- Campus photos
- Infrastructure details
- Placement data

**Rationale:** Students can find this info elsewhere; we focus on decision-making, not marketing

---

## 5. Out of Scope (Explicitly NOT Building)

### 5.1 Features We Won't Build

❌ **College Predictor with "Chances"** - Market saturated, high liability  
❌ **Drop Year Advice** - Requires professional counseling, psychological assessment  
❌ **Seat Booking Integration** - Legal complexity, official government integration required  
❌ **Payment Processing** - Out of scope for academic project  
❌ **Student Reviews** - Quality control nightmare, legal liability  
❌ **Real-Time Seat Availability** - Requires official data feeds we can't access  
❌ **AI Chatbot** - Expensive, unnecessary for MVP, high maintenance  
❌ **Mobile App** - Focus on web-responsive design first  

### 5.2 Data We Won't Collect

- No phone numbers (reduces spam/data breach risk)
- No Aadhaar/sensitive documents
- No payment information
- Optional email only (for saving choice list)

---

## 6. Technical Architecture

### 6.1 Tech Stack (Realistic for Academic Project)

**Frontend:**
- **React.js** (component reusability for choice builder)
- **Tailwind CSS** (rapid UI development)
- **Drag-and-Drop:** react-beautiful-dnd library
- **PDF Export:** jsPDF library

**Backend:**
- **Node.js + Express** (JavaScript full-stack, easier for team)
- **RESTful API** design

**Database:**
- **PostgreSQL** (structured data, complex queries)
- Schema:
  - `colleges` (college master data)
  - `cutoffs` (historical cutoff data)
  - `user_choices` (anonymized, for pattern analysis)
  - `counselling_timeline` (state-wise process data)

**Data Processing:**
- **Python scripts** (data cleaning, cutoff analysis)
- Can be run offline, output imported to PostgreSQL

**Hosting:**
- **Vercel/Netlify** (frontend)
- **Railway/Render** (backend + DB)
- Free tier sufficient for academic project scale

### 6.2 System Architecture

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  React Frontend             │
│  - Choice List Builder      │
│  - Process Navigator        │
│  - Round Decision Helper    │
└──────────┬──────────────────┘
           │
           ▼ (REST API)
┌─────────────────────────────┐
│  Express Backend            │
│  - Choice optimization logic│
│  - Data retrieval APIs      │
│  - PDF generation           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  PostgreSQL Database        │
│  - College data             │
│  - Cutoff history (3 years) │
│  - User choice patterns     │
└─────────────────────────────┘
```

### 6.3 Data Strategy

**Data Sources:**
1. **Official Government Sources:**
   - MCC website (All India Quota cutoffs)
   - State counselling websites (state quota cutoffs)
   - NIRF rankings (publicly available)

2. **Manual Data Collection:**
   - Previous year information bulletins
   - RTI requests if needed
   - College websites for fee structures

3. **Data Validation:**
   - Cross-reference multiple sources
   - Flag uncertain data with warnings
   - Annual data refresh cycle

**Data Limitations (Transparent to Users):**
- Only last 3 years of data (beyond that, relevance drops)
- State-specific data availability varies
- MVP focuses on: MCC (All India) + 2 states (Maharashtra, Karnataka)
- Clear disclaimer: "Data is indicative, based on previous years"

---

## 7. User Flow (Primary Use Case)

### Journey: "Priya Uses the Platform"

1. **Landing Page**
   - Clear headline: "Create Your NEET Counselling Strategy in 30 Minutes"
   - "Get Started" button

2. **Input Your Details** (Form Page)
   - NEET score: 550
   - Rank: 45,000
   - Category: General
   - State: Maharashtra
   - Budget: ₹5L/year
   - Set priorities (sliders)

3. **Choose Your Counselling Path**
   - Select: "MCC + Maharashtra State Counselling"
   - System shows both timelines side-by-side

4. **Build Your Choice List** (Core Feature)
   - System shows 87 colleges matching her criteria
   - Categorized into Dream/Target/Safe
   - She drags colleges to create her priority list
   - System warns: "Your safe zone has only 10 colleges, recommend 20+"
   - She adjusts
   - Visual validation: "Your list looks balanced ✓"

5. **Review Process Timeline**
   - Downloads document checklist PDF
   - Saves counselling round calendar

6. **Export Choice List**
   - Downloads choice list PDF with college codes
   - Optional: Saves to account (email signup)

7. **Returns During Counselling**
   - Round 1 result: "Allotted to College X"
   - Uses "Round Decision Helper"
   - Inputs: "Got College X, rank 67 in my list"
   - System shows: "12 better colleges still in your list"
   - Shows: "Upgrade probability: MEDIUM (65% based on similar profiles)"
   - Shows: "If you withdraw now, you lose ₹50,000"
   - She makes informed decision

---

## 8. Success Metrics

### Primary Metrics (MVP Phase)

1. **User Engagement:**
   - Target: 100+ users complete choice list creation
   - Time to complete: Average <30 minutes
   - Return rate: 30%+ users return during counselling rounds

2. **Quality Metrics:**
   - Choice list validation: 80%+ users get "balanced list" indication
   - Feature usage: 60%+ users use Process Navigator
   - PDF downloads: 70%+ users download choice list or checklist

3. **Feedback Metrics:**
   - Post-counselling survey: 4+/5 average rating
   - Qualitative feedback: "Helped me feel confident about my choices"

### Success Definition (Post-Counselling)

- Survey users who got admitted
- Question: "Did our tool help you in your decision-making?" → Target 70%+ YES

---

## 9. Risk Analysis & Mitigation

### Risk 1: Inaccurate Historical Data
**Impact:** HIGH - Wrong suggestions harm students  
**Mitigation:**
- Triple-verify all cutoff data from official sources
- Show data source and year for each cutoff
- Large disclaimer: "Based on previous years, not a guarantee"
- Allow users to report data errors

### Risk 2: Legal Liability
**Impact:** HIGH - Student makes wrong decision, blames platform  
**Mitigation:**
- Clear Terms of Service: "Advisory tool only"
- No guarantees of admission
- Recommend users verify with official websites
- Professional legal review of disclaimers
- Show: "This is a decision support tool, not a replacement for official counselling"

### Risk 3: Data Freshness
**Impact:** MEDIUM - Outdated data leads to poor decisions  
**Mitigation:**
- Annual data refresh mandatory
- Flag when data is >1 year old
- Phase out the platform if we can't maintain it post-graduation

### Risk 4: Scalability During Peak Season
**Impact:** MEDIUM - Platform crashes during counselling season  
**Mitigation:**
- Load testing before counselling season
- Caching for college/cutoff data
- Static PDF generation (doesn't require server)
- Use CDN for static assets

### Risk 5: Feature Creep
**Impact:** MEDIUM - Project becomes too ambitious, incomplete  
**Mitigation:**
- Strict scope adherence
- Mini project: Only Choice List Builder + Basic Navigator
- Major project: Add Round Decision Helper + 2nd state support
- Monthly progress reviews

### Risk 6: User Abandonment
**Impact:** LOW - Students find tool not useful  
**Mitigation:**
- User testing with 10 actual NEET candidates before launch
- Iterative feedback incorporation
- Simple onboarding tutorial

---

## 10. Project Phases & Timeline

### Phase 1: Mini Project (Months 1-3)

**Deliverables:**
- Choice List Builder (core feature)
- Basic college database (MCC + 1 state)
- Simple process navigator (text-based)
- Basic UI/UX

**Success Criteria:**
- 20 test users can create a choice list
- Demo-ready for mini project evaluation

### Phase 2: Major Project (Months 4-6)

**Additions:**
- Round Decision Helper
- Advanced process navigator with document checklist
- Second state support
- PDF export functionality
- Improved UI/UX with visualizations
- Load testing and optimization

**Success Criteria:**
- 100+ real users during counselling season
- Complete documentation and presentation
- Deployed live version

---

## 11. Non-Functional Requirements

### 11.1 Performance
- Page load time: <3 seconds
- Choice list generation: <2 seconds
- Support 100 concurrent users (MVP scale)

### 11.2 Usability
- Mobile responsive (60% of NEET students use mobile)
- Works on 3G networks
- Simple language, no jargon without explanation
- Onboarding tutorial (<2 minutes)

### 11.3 Accessibility
- Readable on small screens
- High contrast for readability
- Works without JavaScript (basic functionality)

### 11.4 Security
- No sensitive data storage
- HTTPS for all connections
- Input validation to prevent SQL injection
- Rate limiting to prevent scraping

### 11.5 Maintainability
- Clean code with comments
- API documentation
- Database schema documentation
- Data refresh process documented

---

## 12. Compliance & Disclaimers

### 12.1 Mandatory Disclaimers (Visible on Every Page)

> **Important Notice:**
> This is an educational project and decision-support tool. It does not guarantee admission to any college. All predictions are based on historical data and may not reflect current year trends. Always verify information with official counselling authorities. We are not responsible for any admission or financial decisions made using this platform.

### 12.2 Data Privacy

- **Data collected:** NEET score, rank, category, state (anonymous)
- **Data NOT collected:** Name, phone, email (unless user opts in), Aadhaar
- **Data usage:** Improving choice recommendations, anonymized analytics
- **Data retention:** Deleted after counselling season ends (6 months)

### 12.3 Terms of Service (Summary)

- Platform is free, educational, no guarantees
- Users must verify all information independently
- We update data annually but cannot guarantee real-time accuracy
- Not affiliated with MCC, NTA, or any government body

---

## 13. Why This Will Succeed (Unlike the Original Plan)

### Original Plan Issues:
❌ Too broad (trying to be everything)  
❌ Saturated market (college predictors everywhere)  
❌ High liability (drop year suggestions)  
❌ Unrealistic scope (6-month project trying to do 2 years of work)  

### Revised Plan Strengths:
✅ **Solves a specific, under-served problem** (choice optimization, not just prediction)  
✅ **Differentiated value** (interactive builder, not static predictor)  
✅ **Realistic scope** (achievable in 6 months)  
✅ **Lower liability** (advisory, not prescriptive)  
✅ **Sustainable** (focused data requirements)  
✅ **User-centered** (based on actual pain points)  

---

## 14. Future Enhancements (Post-Academic Project)

**Only if project succeeds and we choose to continue:**

1. **Additional State Support** (scale to top 10 states)
2. **Choice Sharing** (anonymized patterns from successful students)
3. **Counselling Community** (Q&A forum, moderated)
4. **Reminder System** (email/SMS for important dates)
5. **What-If Simulator** (advanced scenario analysis)
6. **API for Educational Institutions** (B2B model)

**Monetization (if pursued post-graduation):**
- Freemium model: Basic features free, advanced analytics paid
- B2B: Licensing to schools/coaching institutes
- **Never:** Selling user data, misleading guarantees

---

## 15. Key Takeaways

### For Evaluators:
- Focused, realistic scope appropriate for academic project
- Solves genuine problem with differentiated approach
- Technically feasible with available resources
- Lower risk than typical "prediction" platforms

### For Development Team:
- Clear priorities: Choice List Builder is THE feature
- Everything else supports this core functionality
- When in doubt, cut features, don't compromise quality

### For Users:
- We're here to help you make informed decisions
- We don't replace counsellors, we democratize counselling strategy
- We're transparent about what we can and cannot do

---

## 16. Appendix

### A. Sample Data Structure

**colleges table:**
```sql
id, name, type (govt/private/deemed), state, annual_fee, seats_total, nirf_rank
```

**cutoffs table:**
```sql
id, college_id, year, round, category, opening_rank, closing_rank
```

**user_choices table (anonymized):**
```sql
id, user_hash, score, rank, category, choice_order (JSON array), result (admitted_college_id)
```

### B. Sample Choice List Algorithm

```
1. Fetch all colleges where user's rank <= (last_3_years_max_cutoff * 1.1)
2. Categorize:
   - Safe: Rank < (avg_cutoff - 2*std_dev)
   - Target: Rank within 1 std_dev of avg_cutoff
   - Dream: Rank > avg_cutoff
3. Sort within each category by user's priority weights
4. Suggest ordering: Top 20% dreams, Middle 50% targets, Bottom 30% safe
5. Validate: Check if safe zone >= 20 colleges, warn if not
```

### C. Sample Colleges for MVP (Maharashtra State)

Government:
- Grant Medical College, Mumbai
- BJ Medical College, Pune
- Government Medical College, Nagpur

Private:
- DY Patil Medical College, Pune
- MGM Medical College, Navi Mumbai
- LTMMC and LTMGH, Mumbai

---

**Document Status:** Ready for Review  
**Next Steps:** Team review → User research validation → Technical feasibility confirmation → Development kickoff