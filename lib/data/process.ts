export type Step = {
  number: string;
  title: string;
  description: string;
  icon: "search" | "calendar" | "message" | "sprout";
};

export const processSteps: Step[] = [
  {
    number: "01",
    title: "Choose Your Specialist",
    description:
      "Read through our psychiatrists' areas of focus, languages and consultation styles, and pick whoever feels like the right fit.",
    icon: "search",
  },
  {
    number: "02",
    title: "Book Your Appointment",
    description:
      "Select online or in-person, choose a date and time that works around your life, and share a few details. It takes about two minutes.",
    icon: "calendar",
  },
  {
    number: "03",
    title: "Meet Your Psychiatrist",
    description:
      "An unhurried first conversation. You set the pace, say as much or as little as you want, and ask anything you need to.",
    icon: "message",
  },
  {
    number: "04",
    title: "Begin Your Care Journey",
    description:
      "You leave with a plan you understand and agree with, plus scheduled follow-up so that progress is reviewed, not assumed.",
    icon: "sprout",
  },
];
