export type Service = {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon:
    | "stethoscope" | "video" | "building" | "clipboard"
    | "pill" | "refresh" | "baby" | "moon";
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "psychiatric-consultation",
    title: "Psychiatric Consultation",
    description:
      "A thorough first conversation about what you are experiencing, your history and what you would like to change — followed by a clear plan.",
    duration: "45–60 minutes",
    icon: "stethoscope",
    featured: true,
  },
  {
    id: "online-consultation",
    title: "Online Psychiatric Consultation",
    description:
      "The same clinical care over a secure video call, from wherever you feel most comfortable speaking openly.",
    duration: "30–45 minutes",
    icon: "video",
    featured: true,
  },
  {
    id: "in-person",
    title: "In-Person Consultation",
    description:
      "A private, quiet consultation room designed to feel calm rather than clinical, for those who prefer meeting face to face.",
    duration: "45–60 minutes",
    icon: "building",
  },
  {
    id: "assessment",
    title: "Mental Health Assessment",
    description:
      "A structured evaluation using established clinical tools, so that any treatment that follows is built on a careful understanding.",
    duration: "60 minutes",
    icon: "clipboard",
  },
  {
    id: "medication",
    title: "Medication Management",
    description:
      "Ongoing review of how a medication is working, its effects and any adjustments — with the reasoning explained at every step.",
    duration: "20–30 minutes",
    icon: "pill",
  },
  {
    id: "follow-up",
    title: "Follow-up Consultation",
    description:
      "Shorter continuing sessions to track progress, respond to changes and keep your care plan matched to where you are now.",
    duration: "20–30 minutes",
    icon: "refresh",
  },
  {
    id: "child-adolescent",
    title: "Child & Adolescent Psychiatry",
    description:
      "Age-appropriate assessment and support for younger patients, with dedicated time for parents and caregivers.",
    duration: "45–60 minutes",
    icon: "baby",
  },
  {
    id: "sleep-stress",
    title: "Sleep & Stress Management",
    description:
      "Focused care for persistent insomnia, disturbed sleep and the sustained stress that so often sits underneath both.",
    duration: "30–45 minutes",
    icon: "moon",
  },
];
