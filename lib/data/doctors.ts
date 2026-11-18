import { images } from "@/lib/images";

export type Doctor = {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  experience: string;
  specializations: string[];
  languages: string[];
  consultationType: string;
  fee: string;
  image: string;
  about: string;
  focusAreas: string[];
};

/**
 * SAMPLE PROFILES — illustrative demo content.
 * Replace with real practitioners and verified credentials before launch.
 */
export const doctors: Doctor[] = [
  {
    id: "ananya-rao",
    name: "Dr. Ananya Rao",
    designation: "Consultant Psychiatrist",
    qualifications: "MBBS, MD (Psychiatry)",
    experience: "12 years of experience",
    specializations: ["General Psychiatry", "Anxiety & Depression"],
    languages: ["English", "Hindi", "Kannada"],
    consultationType: "Online & In-Person",
    fee: "₹1,500",
    image: images.doctors.ananya,
    about:
      "Dr. Rao works with adults navigating anxiety, low mood and life transitions. Her approach combines careful clinical assessment with unhurried conversation, so that treatment decisions are made together rather than handed down.",
    focusAreas: [
      "Generalised anxiety and panic",
      "Depressive disorders",
      "Workplace burnout and stress",
      "Medication review and optimisation",
    ],
  },
  {
    id: "rohan-mehta",
    name: "Dr. Rohan Mehta",
    designation: "Senior Consultant, Adult Psychiatry",
    qualifications: "MBBS, DNB (Psychiatry), MRCPsych",
    experience: "15 years of experience",
    specializations: ["Addiction Psychiatry", "Bipolar Disorder"],
    languages: ["English", "Hindi", "Gujarati"],
    consultationType: "Online & In-Person",
    fee: "₹1,800",
    image: images.doctors.rohan,
    about:
      "Dr. Mehta supports people and families living with mood disorders and substance dependence. He places particular emphasis on relapse prevention, structured follow-up and involving the people closest to a patient in the plan.",
    focusAreas: [
      "Bipolar spectrum disorders",
      "Alcohol and substance dependence",
      "Relapse prevention planning",
      "Family and caregiver support",
    ],
  },
  {
    id: "sara-fernandes",
    name: "Dr. Sara Fernandes",
    designation: "Child & Adolescent Psychiatrist",
    qualifications: "MBBS, MD (Psychiatry), Fellowship in Child Psychiatry",
    experience: "9 years of experience",
    specializations: ["Child & Adolescent Psychiatry", "ADHD"],
    languages: ["English", "Konkani", "Marathi"],
    consultationType: "Online & In-Person",
    fee: "₹1,600",
    image: images.doctors.sara,
    about:
      "Dr. Fernandes sees children, teenagers and their parents. Sessions are paced for younger patients, with time set aside for caregivers so that school, home and clinic are working from the same understanding.",
    focusAreas: [
      "ADHD assessment and management",
      "Adolescent anxiety and low mood",
      "School refusal and exam stress",
      "Parent guidance sessions",
    ],
  },
  {
    id: "daniel-okoye",
    name: "Dr. Daniel Okoye",
    designation: "Consultant Psychiatrist, Trauma & Sleep",
    qualifications: "MBBS, MD (Psychiatry)",
    experience: "11 years of experience",
    specializations: ["PTSD & Trauma", "Sleep Disorders"],
    languages: ["English", "Hindi", "French"],
    consultationType: "Online & In-Person",
    fee: "₹1,700",
    image: images.doctors.daniel,
    about:
      "Dr. Okoye works with trauma-related difficulties and persistent sleep problems. He is careful to move at a pace each person sets, and to explain what every step of an assessment or treatment is for.",
    focusAreas: [
      "Post-traumatic stress",
      "Insomnia and disturbed sleep",
      "Obsessive-compulsive disorder",
      "Stress-related physical symptoms",
    ],
  },
];
