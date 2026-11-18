export type Condition = {
  id: string;
  title: string;
  blurb: string;
  detail: string;
  signs: string[];
  icon:
    | "wind" | "cloud-rain" | "flame" | "moon" | "repeat"
    | "activity" | "zap" | "shield" | "unlink" | "heart";
};

/**
 * Educational summaries only. Nothing here is a diagnosis, and the site
 * does not assess or diagnose visitors — that happens with a clinician.
 */
export const conditions: Condition[] = [
  {
    id: "anxiety",
    title: "Anxiety Disorders",
    blurb: "Persistent worry, restlessness or fear that feels hard to switch off.",
    detail:
      "Anxiety becomes a clinical concern when worry is frequent, difficult to control, and starts to shape everyday choices. It is common, well understood, and responds well to treatment.",
    signs: ["Ongoing worry or dread", "Racing heart or breathlessness", "Avoiding certain situations", "Difficulty concentrating"],
    icon: "wind",
  },
  {
    id: "depression",
    title: "Depression",
    blurb: "Low mood, loss of interest and fatigue that lasts beyond a passing phase.",
    detail:
      "Depression affects mood, energy, sleep, appetite and concentration together. It is not a question of effort or character, and a clinician can help distinguish it from other causes of low energy.",
    signs: ["Low mood most of the day", "Loss of interest or pleasure", "Changes in sleep or appetite", "Low energy and self-worth"],
    icon: "cloud-rain",
  },
  {
    id: "stress-burnout",
    title: "Stress & Burnout",
    blurb: "Exhaustion and detachment that build up under sustained pressure.",
    detail:
      "Burnout develops gradually under prolonged demand, often at work or in caregiving. Recognising it early makes recovery considerably easier than waiting for a breaking point.",
    signs: ["Emotional exhaustion", "Cynicism or detachment", "Reduced effectiveness", "Physical tension or headaches"],
    icon: "flame",
  },
  {
    id: "sleep",
    title: "Sleep Disorders",
    blurb: "Trouble falling asleep, staying asleep, or waking unrefreshed.",
    detail:
      "Sleep and mental health move together in both directions. Persistent sleep difficulty is worth assessing properly, because treating it often improves mood, focus and physical health.",
    signs: ["Difficulty falling asleep", "Frequent night waking", "Daytime fatigue", "Irregular sleep timing"],
    icon: "moon",
  },
  {
    id: "ocd",
    title: "OCD",
    blurb: "Intrusive thoughts paired with rituals that are hard to resist.",
    detail:
      "Obsessive-compulsive disorder involves unwanted thoughts and repetitive behaviours performed to reduce distress. Effective, structured treatments exist and are well established.",
    signs: ["Repetitive intrusive thoughts", "Checking or washing rituals", "Need for symmetry or order", "Distress when rituals are interrupted"],
    icon: "repeat",
  },
  {
    id: "bipolar",
    title: "Bipolar Disorder",
    blurb: "Shifts in mood and energy between elevated and depressive periods.",
    detail:
      "Bipolar disorder involves distinct episodes of elevated and low mood with changes in energy and sleep. Accurate assessment matters, because it shapes which treatments are appropriate.",
    signs: ["Periods of elevated mood", "Reduced need for sleep", "Episodes of low mood", "Marked changes in activity"],
    icon: "activity",
  },
  {
    id: "adhd",
    title: "ADHD",
    blurb: "Difficulty with attention, organisation or restlessness across settings.",
    detail:
      "ADHD is a neurodevelopmental difference affecting attention, impulse control and activity. It is recognised in both children and adults, and assessment looks at patterns across the whole of life.",
    signs: ["Difficulty sustaining attention", "Disorganisation and lost items", "Restlessness or fidgeting", "Acting before thinking"],
    icon: "zap",
  },
  {
    id: "ptsd",
    title: "PTSD & Trauma",
    blurb: "Lasting distress after frightening or overwhelming experiences.",
    detail:
      "Trauma-related difficulties can appear long after an event, through memories, avoidance and a sense of being constantly on alert. Care is paced carefully and always led by the person receiving it.",
    signs: ["Intrusive memories or flashbacks", "Avoiding reminders", "Feeling constantly on guard", "Disturbed sleep or nightmares"],
    icon: "shield",
  },
  {
    id: "addiction",
    title: "Addiction",
    blurb: "Dependence on alcohol, substances or behaviours that is hard to break.",
    detail:
      "Dependence is a medical condition, not a failure of willpower. Treatment usually combines medical support, structured follow-up and help for the people around the patient.",
    signs: ["Loss of control over use", "Increasing tolerance", "Withdrawal when stopping", "Continuing despite harm"],
    icon: "unlink",
  },
  {
    id: "emotional",
    title: "Emotional Difficulties",
    blurb: "Grief, relationship strain or life changes that feel overwhelming.",
    detail:
      "Not every difficulty fits a diagnostic label. Loss, change and relationship strain are real reasons to seek support, and talking them through with a professional is entirely reasonable.",
    signs: ["Grief that feels unmanageable", "Difficulty with major change", "Relationship distress", "Feeling persistently overwhelmed"],
    icon: "heart",
  },
];
