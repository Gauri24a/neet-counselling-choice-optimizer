/**
 * PRD §4.1: category, budget range, priorities.
 */
export const CATEGORIES = [
  { value: 'GEN', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' },
];

export const BUDGET_RANGES = [
  { value: '0-2L', label: '₹0–2 L/year' },
  { value: '2-5L', label: '₹2–5 L/year' },
  { value: '5-10L', label: '₹5–10 L/year' },
  { value: '10L+', label: '₹10 L+/year' },
];

export const PRIORITY_LABELS = {
  governmentPreference: 'Government college preference',
  stayCloseToHome: 'Stay close to home',
  collegeReputation: 'College reputation',
  feeAffordability: 'Fee affordability',
  specificStatePreference: 'Specific state preference',
};

/** MVP: MCC + 2 states. Common state codes for dropdown. */
export const STATE_CODES = [
  { value: 'MH', label: 'Maharashtra' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'KL', label: 'Kerala' },
  { value: 'TG', label: 'Telangana' },
  { value: 'MP', label: 'Madhya Pradesh' },
];
