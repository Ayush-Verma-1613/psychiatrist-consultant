"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  Languages,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  buildDays,
  buildTimeGroups,
  formatLongDate,
  LANGUAGES,
  makeReference,
  patientSchema,
  type PatientDetails,
} from "@/lib/booking";
import { useBooking } from "@/lib/booking-context";
import { doctors } from "@/lib/data/doctors";
import { useLockBodyScroll } from "@/lib/hooks";
import { Photo } from "./ui/Photo";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = ["Type", "Specialist", "Date", "Time", "Details", "Confirm"] as const;
type Mode = "online" | "in-person";

export function BookingModal() {
  const { isOpen, seed, closeBooking } = useBooking();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mode, setMode] = useState<Mode | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<{ reference: string } | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const days = useMemo(() => buildDays(14), []);

  useLockBodyScroll(isOpen);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PatientDetails>({
    resolver: zodResolver(patientSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", age: "", language: "English", notes: "" },
  });

  const patient = watch();

  /* ---------------- open / reset ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const seededDoctor = seed.doctorId ?? null;
    const seededMode = seed.mode ?? null;

    setMode(seededMode);
    setDoctorId(seededDoctor);
    setDate("");
    setTime("");
    setConfirmed(null);
    setSubmitting(false);
    setDirection(1);
    // Skip ahead past whatever the trigger already told us.
    setStep(seededMode ? (seededDoctor ? 2 : 1) : 0);
    reset();
  }, [isOpen, seed, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBooking();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeBooking]);

  // Keep the dialog scrolled to the top as steps change.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, confirmed]);

  const doctor = doctors.find((d) => d.id === doctorId) ?? null;

  const timeGroups = useMemo(
    () => (date && doctorId && mode ? buildTimeGroups(date, doctorId, mode) : []),
    [date, doctorId, mode]
  );

  const canContinue = [
    Boolean(mode),
    Boolean(doctorId),
    Boolean(date),
    Boolean(time),
    true, // step 4 is validated by react-hook-form
    true,
  ][step];

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onDetailsValid = () => goNext();

  const submitBooking = async () => {
    setSubmitting(true);
    // Demo scheduling — no real appointment is created and nothing is sent anywhere.
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    setConfirmed({ reference: makeReference() });
  };

  if (!isOpen) return null;

  const progress = confirmed ? 100 : ((step + 1) / STEPS.length) * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeBooking}
          className="absolute inset-0 bg-ink/55 backdrop-blur-md"
          aria-hidden="true"
        />

        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-t-[2rem] bg-canvas shadow-lift sm:rounded-[2rem]"
        >
          {/* ---------------- Header ---------------- */}
          <div className="sticky top-0 z-10 border-b border-ink/5 bg-canvas/95 px-5 pb-4 pt-5 backdrop-blur-xl sm:px-8 sm:pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="booking-title" className="font-serif text-[23px] leading-tight sm:text-[26px]">
                  {confirmed ? "Appointment Confirmed" : "Book Your Consultation"}
                </h2>
                <p className="mt-1 text-[12.5px] text-muted">
                  {confirmed
                    ? "A summary of your demo booking is below."
                    : `Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
                </p>
              </div>

              <button
                onClick={closeBooking}
                aria-label="Close booking"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-sage-light"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-ink/8">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>

              {!confirmed && (
                <ol className="mt-3 hidden items-center justify-between sm:flex">
                  {STEPS.map((label, i) => (
                    <li key={label} className="flex items-center gap-1.5">
                      <span
                        className={[
                          "grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold transition-colors duration-300",
                          i < step
                            ? "bg-accent text-white"
                            : i === step
                            ? "bg-ink text-white"
                            : "bg-ink/8 text-muted",
                        ].join(" ")}
                      >
                        {i < step ? <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /> : i + 1}
                      </span>
                      <span
                        className={[
                          "text-[11px] font-semibold",
                          i === step ? "text-ink" : "text-muted",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          {/* ---------------- Body ---------------- */}
          <div className="flex-1 px-5 py-6 sm:px-8 sm:py-7">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {confirmed ? (
                <ConfirmationScreen
                  key="confirmed"
                  reference={confirmed.reference}
                  mode={mode!}
                  doctorName={doctor?.name ?? ""}
                  date={date}
                  time={time}
                  name={String(patient.fullName ?? "")}
                  email={String(patient.email ?? "")}
                  onClose={closeBooking}
                />
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 44 : -44 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -44 : 44 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  {/* ---- Step 1: consultation type ---- */}
                  {step === 0 && (
                    <StepShell
                      title="How would you like to meet?"
                      hint="You can change this later with your psychiatrist if your preference shifts."
                    >
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        {(
                          [
                            {
                              id: "online" as const,
                              icon: Video,
                              title: "Online Consultation",
                              text: "Secure video call from wherever you are. Evening slots available.",
                            },
                            {
                              id: "in-person" as const,
                              icon: Building2,
                              title: "In-Person Consultation",
                              text: "A private consultation room at the clinic, face to face.",
                            },
                          ]
                        ).map(({ id, icon: Icon, title, text }) => {
                          const selected = mode === id;
                          return (
                            <button
                              key={id}
                              onClick={() => {
                                setMode(id);
                                setTime("");
                              }}
                              aria-pressed={selected}
                              className={[
                                "group rounded-2xl border p-5 text-left transition-all duration-300 ease-premium",
                                selected
                                  ? "border-accent bg-white shadow-card ring-4 ring-accent/10"
                                  : "border-ink/10 bg-white hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-soft",
                              ].join(" ")}
                            >
                              <span
                                className={[
                                  "grid h-11 w-11 place-items-center rounded-xl transition-colors",
                                  selected ? "bg-accent text-white" : "bg-sage text-ink",
                                ].join(" ")}
                              >
                                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                              </span>
                              <span className="mt-4 block font-serif text-[18px] text-ink">{title}</span>
                              <span className="mt-1.5 block text-[12.5px] leading-relaxed text-muted">
                                {text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </StepShell>
                  )}

                  {/* ---- Step 2: specialist ---- */}
                  {step === 1 && (
                    <StepShell
                      title="Choose your psychiatrist"
                      hint="Every clinician listed offers both online and in-person consultations."
                    >
                      <div className="space-y-3">
                        {doctors.map((d) => {
                          const selected = doctorId === d.id;
                          return (
                            <button
                              key={d.id}
                              onClick={() => {
                                setDoctorId(d.id);
                                setTime("");
                              }}
                              aria-pressed={selected}
                              className={[
                                "flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition-all duration-300 ease-premium",
                                selected
                                  ? "border-accent bg-white shadow-card ring-4 ring-accent/10"
                                  : "border-ink/10 bg-white hover:border-ink/25 hover:shadow-soft",
                              ].join(" ")}
                            >
                              <Photo
                                src={d.image}
                                alt={`Portrait of ${d.name}`}
                                sizes="64px"
                                ratio="h-16 w-16"
                                rounded="rounded-xl"
                                className="shrink-0"
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[14.5px] font-bold text-ink">
                                  {d.name}
                                </span>
                                <span className="mt-0.5 block truncate text-[12px] text-muted">
                                  {d.specializations.join(" · ")}
                                </span>
                                <span className="mt-1 block text-[11.5px] font-semibold text-accent-deep">
                                  {d.fee} · {d.experience}
                                </span>
                              </span>
                              <span
                                className={[
                                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                                  selected ? "border-accent bg-accent" : "border-ink/15 bg-white",
                                ].join(" ")}
                                aria-hidden="true"
                              >
                                {selected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </StepShell>
                  )}

                  {/* ---- Step 3: date ---- */}
                  {step === 2 && (
                    <StepShell
                      title="Pick a date"
                      hint="Demo availability for the next two weeks. Sundays are online-only."
                    >
                      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                        {days.map((d) => {
                          const selected = date === d.iso;
                          const blocked = d.isWeekend && mode === "in-person";
                          return (
                            <button
                              key={d.iso}
                              disabled={blocked}
                              onClick={() => {
                                setDate(d.iso);
                                setTime("");
                              }}
                              aria-pressed={selected}
                              className={[
                                "rounded-2xl border px-2 py-3 text-center transition-all duration-300 ease-premium",
                                blocked
                                  ? "cursor-not-allowed border-ink/5 bg-ink/[0.03] opacity-45"
                                  : selected
                                  ? "border-accent bg-ink text-white shadow-card"
                                  : "border-ink/10 bg-white hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-soft",
                              ].join(" ")}
                            >
                              <span
                                className={[
                                  "block text-[10.5px] font-bold uppercase tracking-[0.08em]",
                                  selected ? "text-white/60" : "text-muted",
                                ].join(" ")}
                              >
                                {d.weekday}
                              </span>
                              <span
                                className={[
                                  "mt-1 block font-serif text-[21px] leading-none",
                                  selected ? "text-white" : "text-ink",
                                ].join(" ")}
                              >
                                {d.day}
                              </span>
                              <span
                                className={[
                                  "mt-1 block text-[10.5px] font-medium",
                                  selected ? "text-white/60" : "text-muted",
                                ].join(" ")}
                              >
                                {d.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </StepShell>
                  )}

                  {/* ---- Step 4: time ---- */}
                  {step === 3 && (
                    <StepShell
                      title="Choose a time"
                      hint={`Showing demo availability for ${formatLongDate(date)}.`}
                    >
                      <div className="space-y-6">
                        {timeGroups.map((group) => (
                          <div key={group.label}>
                            <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted">
                              {group.label}
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                              {group.slots.map((slot) => {
                                const selected = time === slot.time;
                                return (
                                  <button
                                    key={slot.time}
                                    disabled={!slot.available}
                                    onClick={() => setTime(slot.time)}
                                    aria-pressed={selected}
                                    className={[
                                      "rounded-xl border px-2 py-2.5 text-[12.5px] font-semibold transition-all duration-300 ease-premium",
                                      !slot.available
                                        ? "cursor-not-allowed border-ink/5 bg-ink/[0.03] text-muted/45 line-through"
                                        : selected
                                        ? "border-accent bg-ink text-white shadow-card"
                                        : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-soft",
                                    ].join(" ")}
                                  >
                                    {slot.time}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </StepShell>
                  )}

                  {/* ---- Step 5: patient details ---- */}
                  {step === 4 && (
                    <StepShell
                      title="Your details"
                      hint="We only ask for what is needed to confirm the appointment — no health details here."
                    >
                      <form
                        id="patient-form"
                        onSubmit={handleSubmit(onDetailsValid)}
                        className="grid gap-4 sm:grid-cols-2"
                        noValidate
                      >
                        <Field
                          label="Full name"
                          error={errors.fullName?.message}
                          className="sm:col-span-2"
                        >
                          <input
                            {...register("fullName")}
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            className="field"
                            aria-invalid={Boolean(errors.fullName)}
                          />
                        </Field>

                        <Field label="Email" error={errors.email?.message}>
                          <input
                            {...register("email")}
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder="you@example.com"
                            className="field"
                            aria-invalid={Boolean(errors.email)}
                          />
                        </Field>

                        <Field label="Phone number" error={errors.phone?.message}>
                          <input
                            {...register("phone")}
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="+91 00000 00000"
                            className="field"
                            aria-invalid={Boolean(errors.phone)}
                          />
                        </Field>

                        <Field label="Age" error={errors.age?.message}>
                          <input
                            {...register("age")}
                            type="number"
                            min={1}
                            max={120}
                            inputMode="numeric"
                            placeholder="e.g. 32"
                            className="field"
                            aria-invalid={Boolean(errors.age)}
                          />
                        </Field>

                        <Field label="Preferred language" error={errors.language?.message}>
                          <select
                            {...register("language")}
                            className="field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718078' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                            }}
                            aria-invalid={Boolean(errors.language)}
                          >
                            {LANGUAGES.map((lang) => (
                              <option key={lang} value={lang}>
                                {lang}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <Field
                          label="Anything you would like us to know (optional)"
                          error={errors.notes?.message}
                          className="sm:col-span-2"
                        >
                          <textarea
                            {...register("notes")}
                            rows={3}
                            placeholder="For example, a preferred contact time. Please do not include medical details here."
                            className="field resize-none"
                            aria-invalid={Boolean(errors.notes)}
                          />
                        </Field>
                      </form>

                      <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-ink/5 bg-sage-light p-4 text-[12px] leading-relaxed text-muted">
                        <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        Your details are used only to arrange this appointment. Please share medical
                        history with your psychiatrist during the consultation, not through this form.
                      </p>
                    </StepShell>
                  )}

                  {/* ---- Step 6: summary ---- */}
                  {step === 5 && (
                    <StepShell
                      title="Review and confirm"
                      hint="Check everything over — you can go back and change any of it."
                    >
                      <div className="overflow-hidden rounded-2xl border border-ink/5 bg-white">
                        {doctor && (
                          <div className="flex items-center gap-4 border-b border-ink/5 bg-sage-light p-5">
                            <Photo
                              src={doctor.image}
                              alt={`Portrait of ${doctor.name}`}
                              sizes="56px"
                              ratio="h-14 w-14"
                              rounded="rounded-xl"
                              className="shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-[15px] font-bold text-ink">{doctor.name}</p>
                              <p className="truncate text-[12px] text-muted">{doctor.designation}</p>
                            </div>
                          </div>
                        )}

                        <dl className="divide-y divide-ink/5">
                          <SummaryRow
                            icon={mode === "online" ? Video : Building2}
                            label="Consultation type"
                            value={mode === "online" ? "Online (video call)" : "In-person at the clinic"}
                          />
                          <SummaryRow icon={CalendarDays} label="Date" value={formatLongDate(date)} />
                          <SummaryRow icon={Clock} label="Time" value={time} />
                          <SummaryRow icon={UserRound} label="Name" value={String(patient.fullName ?? "")} />
                          <SummaryRow icon={Mail} label="Email" value={String(patient.email ?? "")} />
                          <SummaryRow icon={Phone} label="Phone" value={String(patient.phone ?? "")} />
                          <SummaryRow
                            icon={Languages}
                            label="Preferred language"
                            value={String(patient.language ?? "")}
                          />
                          {doctor && (
                            <SummaryRow
                              icon={Sparkles}
                              label="Demo fee"
                              value={`${doctor.fee} per session`}
                            />
                          )}
                        </dl>
                      </div>

                      <p className="mt-5 rounded-2xl border border-accent/20 bg-accent/5 p-4 text-[12px] leading-relaxed text-muted">
                        <strong className="font-bold text-ink">Demo booking.</strong> This form uses
                        sample availability and does not create a real appointment or send your
                        details anywhere. A live scheduling integration will replace it.
                      </p>
                    </StepShell>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---------------- Footer ---------------- */}
          {!confirmed && (
            <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 border-t border-ink/5 bg-canvas/95 px-5 py-4 backdrop-blur-xl sm:px-8">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="btn border border-ink/10 bg-white px-5 py-3 text-[13px] text-ink hover:border-ink/25 disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>

              {step === 4 ? (
                <button type="submit" form="patient-form" className="btn-primary px-6 py-3 text-[13px]">
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : step === 5 ? (
                <button
                  onClick={submitBooking}
                  disabled={submitting}
                  className="btn-accent px-6 py-3 text-[13px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Confirming…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={goNext}
                  disabled={!canContinue}
                  className="btn-primary px-6 py-3 text-[13px]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-serif text-[20px] leading-snug text-ink">{title}</h3>
      {hint && <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22 }}
            role="alert"
            className="mt-1.5 text-[11.5px] font-semibold text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3.5 px-5 py-3.5">
      <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden={true} />
      <dt className="w-[42%] shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 truncate text-right text-[13px] font-semibold text-ink sm:text-left">
        {value}
      </dd>
    </div>
  );
}

function ConfirmationScreen({
  reference,
  mode,
  doctorName,
  date,
  time,
  name,
  email,
  onClose,
}: {
  reference: string;
  mode: Mode;
  doctorName: string;
  date: string;
  time: string;
  name: string;
  email: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="text-center"
    >
      <motion.span
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.15 }}
        className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-full bg-sage"
      >
        <CheckCircle2 className="h-9 w-9 text-ink" strokeWidth={1.6} aria-hidden="true" />
      </motion.span>

      <h3 className="mt-6 font-serif text-[26px] leading-tight">
        Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted">
        Your consultation request has been recorded. In a live deployment a confirmation would be
        sent to {email || "your email"} with joining details and how to reschedule.
      </p>

      <div className="mx-auto mt-7 max-w-md overflow-hidden rounded-2xl border border-ink/5 bg-white text-left">
        <div className="flex items-center justify-between gap-3 border-b border-ink/5 bg-sage-light px-5 py-3.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            Reference
          </span>
          <span className="font-mono text-[13px] font-bold text-ink">{reference}</span>
        </div>
        <dl className="divide-y divide-ink/5">
          <SummaryRow icon={UserRound} label="Psychiatrist" value={doctorName} />
          <SummaryRow
            icon={mode === "online" ? Video : Building2}
            label="Type"
            value={mode === "online" ? "Online (video call)" : "In-person"}
          />
          <SummaryRow icon={CalendarDays} label="Date" value={formatLongDate(date)} />
          <SummaryRow icon={Clock} label="Time" value={time} />
        </dl>
      </div>

      <p className="mx-auto mt-5 max-w-md rounded-2xl border border-accent/20 bg-accent/5 p-4 text-[12px] leading-relaxed text-muted">
        This is a demo confirmation. No appointment has been scheduled and no information has been
        transmitted or stored.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
        <button onClick={onClose} className="btn-primary">
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Done
        </button>
      </div>
    </motion.div>
  );
}
