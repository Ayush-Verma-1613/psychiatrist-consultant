import { z } from "zod";

export const LANGUAGES = [
  "English",
  "Hindi",
  "Kannada",
  "Marathi",
  "Gujarati",
  "Konkani",
  "French",
] as const;

export const patientSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "That name looks too long")
    .regex(/^[\p{L}\p{M}'’.\- ]+$/u, "Please use letters only"),
  email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .refine((v) => v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15, {
      message: "Please enter a valid phone number",
    }),
  age: z
    .union([z.string(), z.number()])
    .transform((v) => (typeof v === "number" ? v : v.trim()))
    .refine((v) => v !== "", { message: "Please enter your age" })
    .transform((v) => Number(v))
    .refine((n) => Number.isFinite(n) && Number.isInteger(n), { message: "Please enter a whole number" })
    .refine((n) => n >= 1 && n <= 120, { message: "Please enter an age between 1 and 120" }),
  language: z.string().min(1, "Please choose a preferred language"),
  notes: z.string().trim().max(400, "Please keep this under 400 characters").optional(),
});

export type PatientDetails = z.input<typeof patientSchema>;
export type PatientDetailsParsed = z.output<typeof patientSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "That name looks too long"),
  email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || (v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15), {
      message: "Please enter a valid phone number",
    }),
  subject: z.string().min(1, "Please choose a subject"),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(1000, "Please keep this under 1000 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/* Demo availability                                                   */
/* ------------------------------------------------------------------ */

export type DaySlot = {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  isWeekend: boolean;
};

/** Builds the next `count` selectable days starting tomorrow. */
export function buildDays(count = 14, from: Date = new Date()): DaySlot[] {
  const days: DaySlot[] = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());

  for (let i = 1; days.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const weekday = d.getDay();
    // Clinic is closed on Sundays for in-person; kept selectable but marked.
    days.push({
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      isWeekend: weekday === 0,
    });
  }
  return days;
}

const MORNING = ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", "12:00 PM"];
const AFTERNOON = ["02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM", "05:00 PM"];
const EVENING = ["06:00 PM", "06:45 PM", "07:30 PM"];

export type TimeGroup = { label: string; slots: { time: string; available: boolean }[] };

/**
 * Deterministic pseudo-availability so the same date + doctor always shows the
 * same slots (no hydration mismatch, no reshuffling between renders).
 * Replace with a real scheduling integration.
 */
export function buildTimeGroups(dateIso: string, doctorId: string, mode: "online" | "in-person"): TimeGroup[] {
  const seedSource = `${dateIso}-${doctorId}-${mode}`;
  let seed = 0;
  for (let i = 0; i < seedSource.length; i++) seed = (seed * 31 + seedSource.charCodeAt(i)) >>> 0;

  const rand = (i: number) => {
    const x = Math.sin(seed + i * 97.31) * 10000;
    return x - Math.floor(x);
  };

  const groups: { label: string; times: string[] }[] = [
    { label: "Morning", times: MORNING },
    { label: "Afternoon", times: AFTERNOON },
    // Evening slots are offered for online consultations only.
    ...(mode === "online" ? [{ label: "Evening", times: EVENING }] : []),
  ];

  let n = 0;
  return groups.map((g) => ({
    label: g.label,
    slots: g.times.map((time) => ({ time, available: rand(n++) > 0.32 })),
  }));
}

export function formatLongDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function makeReference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `MW-${n}`;
}
