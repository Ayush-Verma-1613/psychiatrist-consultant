export type Plan = {
  id: string;
  name: string;
  duration: string;
  price: string;
  cadence: string;
  summary: string;
  includes: string[];
  highlighted?: boolean;
};

/**
 * DEMO PRICING — placeholder figures for layout and demonstration only.
 * These are not real clinic fees. Replace before launch.
 */
export const plans: Plan[] = [
  {
    id: "initial",
    name: "Initial Consultation",
    duration: "45–60 minutes",
    price: "₹1,500",
    cadence: "per session",
    summary: "A complete first assessment with a consultant psychiatrist.",
    includes: [
      "Detailed clinical history",
      "Structured mental health assessment",
      "Written care plan and next steps",
      "Prescription if clinically indicated",
      "Summary shared securely after the session",
    ],
  },
  {
    id: "follow-up",
    name: "Follow-up Consultation",
    duration: "20–30 minutes",
    price: "₹900",
    cadence: "per session",
    summary: "Continuing care with the psychiatrist who already knows your history.",
    includes: [
      "Progress and symptom review",
      "Medication adjustment if needed",
      "Side-effect check and guidance",
      "Updated care plan",
      "Priority rescheduling",
    ],
  },
  {
    id: "online",
    name: "Online Consultation",
    duration: "30–45 minutes",
    price: "₹1,200",
    cadence: "per session",
    summary: "The full consultation experience over a private, secure video call.",
    includes: [
      "Secure video consultation",
      "Flexible evening slots",
      "Digital prescription where appropriate",
      "Session notes shared securely",
      "Follow-up booking support",
    ],
    highlighted: true,
  },
];
