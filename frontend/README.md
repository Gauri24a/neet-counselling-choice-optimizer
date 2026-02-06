# NEET Counselling Choice Optimizer – Frontend

React + Vite + Tailwind. Integrates with backend `POST /api/choice-optimizer/generate`.

## Run

1. Install: `npm install`
2. Start backend on port 3000 (from `backend/`: `npm start`)
3. Start frontend: `npm run dev` (Vite dev server on port 5173, proxies `/api` to backend)

## Flow

- **/** – Landing → Get Started
- **/input-details** – Form: rank, category, state, budget, priorities → "Generate Choice List" calls API
- **/choice-builder** – Shows Safe / Target / Dream tiers, suggested order, validation (only when navigated from form with result)
