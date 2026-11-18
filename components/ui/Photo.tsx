"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". */
  ratio?: string;
  rounded?: string;
};

/**
 * next/image wrapper with a blur-up placeholder, a soft brand-coloured
 * loading state, and a graceful fallback if a remote photo ever fails.
 */
export function Photo({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  ratio = "",
  rounded = "",
}: PhotoProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div
      className={`relative overflow-hidden bg-sage-light ${ratio} ${rounded} ${className}`}
      aria-busy={status === "loading"}
    >
      {status !== "error" ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={82}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={[
            "object-cover transition-[opacity,transform] duration-[900ms] ease-premium",
            status === "loaded" ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]",
            imgClassName,
          ].join(" ")}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sage-light to-sage">
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <ImageOff className="h-6 w-6 text-muted/60" aria-hidden="true" />
            <span className="text-xs font-medium text-muted/80">{alt}</span>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        </div>
      )}
    </div>
  );
}
