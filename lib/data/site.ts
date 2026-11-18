/** Placeholder clinic details — replace with real contact information before launch. */
export const site = {
  name: "MindWell",
  tagline: "Mental Wellness & Psychiatric Care",
  description:
    "MindWell connects you with experienced mental health professionals who listen, understand and guide you — online or in person.",
  contact: {
    addressLines: ["MindWell Clinic (address placeholder)", "Ground Floor, Wellness Centre", "City, State — PIN"],
    phone: "+91 00000 00000",
    phoneLabel: "Phone (placeholder)",
    email: "hello@example.com",
    emailLabel: "Email (placeholder)",
    hours: [
      { days: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
      { days: "Saturday", time: "9:00 AM – 2:00 PM" },
      { days: "Sunday", time: "Online consultations only" },
    ],
  },
  emergency: {
    number: "112",
    label: "India — National Emergency Number",
  },
  social: [
    { label: "Instagram", href: "#", icon: "instagram" as const },
    { label: "LinkedIn", href: "#", icon: "linkedin" as const },
    { label: "Facebook", href: "#", icon: "facebook" as const },
    { label: "YouTube", href: "#", icon: "youtube" as const },
  ],
};

export type TrustStat = {
  label: string;
  value: string;
  caption: string;
  icon: "shield" | "award" | "video" | "heart";
};

/**
 * Demo labels rather than invented figures — no patient counts or clinic
 * achievements are claimed here. Replace with verified data when available.
 */
export const trustStats: TrustStat[] = [
  {
    label: "Confidential Consultations",
    value: "Private",
    caption: "Protected by medical confidentiality standards",
    icon: "shield",
  },
  {
    label: "Experienced Professionals",
    value: "Qualified",
    caption: "Consultant psychiatrists with specialist training",
    icon: "award",
  },
  {
    label: "Online Consultation",
    value: "Nationwide",
    caption: "Secure video appointments wherever you are",
    icon: "video",
  },
  {
    label: "Personalized Care",
    value: "Tailored",
    caption: "A plan built around you, reviewed as you progress",
    icon: "heart",
  },
];

export const aboutPoints = [
  {
    title: "Patient-centered approach",
    text: "You set the pace and the priorities. Care is built around what you want to change, not a template.",
  },
  {
    title: "Personalized treatment",
    text: "Plans are shaped to your history, circumstances and preferences, then adjusted as things move.",
  },
  {
    title: "Evidence-informed care",
    text: "Recommendations rest on established clinical evidence, and the reasoning is always explained to you.",
  },
  {
    title: "Respectful consultations",
    text: "No judgement, no rushing, no assumptions. Questions are welcome at any point in a session.",
  },
  {
    title: "Supportive environment",
    text: "Quiet consultation rooms and secure video sessions designed to feel calm rather than clinical.",
  },
];
