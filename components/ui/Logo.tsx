export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-[14px] bg-ink ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[58%] w-[58%]">
        {/* A leaf resting inside an open circle — growth held with care. */}
        <path
          d="M12 20.5c-4.2 0-7.2-3-7.2-6.9 0-4.6 3.9-8.3 10.8-10.1.6 1.9.9 3.6.9 5.2 0 6.5-3.2 11.8-4.5 11.8Z"
          fill="#DCECE5"
        />
        <path
          d="M12 20.8V12.4c0-2.3 1.2-4.4 3.1-5.6"
          stroke="#C69B80"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "invert";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[21px] tracking-tight ${
            tone === "invert" ? "text-white" : "text-ink"
          }`}
        >
          MindWell
        </span>
        <span
          className={`mt-[3px] text-[9px] font-semibold uppercase tracking-[0.22em] ${
            tone === "invert" ? "text-white/50" : "text-muted/80"
          }`}
        >
          Mental Wellness
        </span>
      </span>
    </span>
  );
}
