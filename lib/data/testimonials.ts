export type Testimonial = {
  id: string;
  name: string;
  context: string;
  rating: number;
  quote: string;
};

/**
 * ILLUSTRATIVE DEMO CONTENT.
 * These are written examples showing how patient feedback would appear.
 * They are not genuine patient reviews and are labelled as such in the UI.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya",
    context: "Online consultation",
    rating: 5,
    quote:
      "I had put off speaking to anyone for nearly two years. The first session never felt like an interrogation — I was asked what I wanted help with, and then actually listened to.",
  },
  {
    id: "t2",
    name: "Arjun",
    context: "In-person consultation",
    rating: 5,
    quote:
      "What stood out was how much was explained. Why a particular approach was being suggested, what to expect, what to watch for. I left understanding my own treatment for the first time.",
  },
  {
    id: "t3",
    name: "Meera",
    context: "Follow-up consultation",
    rating: 5,
    quote:
      "Booking around a full-time job is usually the hardest part. Evening slots meant I could keep appointments consistently instead of cancelling every other one.",
  },
  {
    id: "t4",
    name: "Rahul",
    context: "Online consultation",
    rating: 4,
    quote:
      "Speaking from my own home made an enormous difference. I said things in the first twenty minutes that I would not have managed in a waiting room.",
  },
  {
    id: "t5",
    name: "Fatima",
    context: "Parent consultation",
    rating: 5,
    quote:
      "As a parent you worry you are either overreacting or missing something. We were taken seriously without being alarmed, and my daughter felt comfortable from the first visit.",
  },
  {
    id: "t6",
    name: "Vikram",
    context: "Initial consultation",
    rating: 5,
    quote:
      "No rushing, no clock-watching. The confidentiality was explained clearly at the start, which mattered more to me than I expected it would.",
  },
];
