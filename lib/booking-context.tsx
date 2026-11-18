"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type BookingSeed = {
  doctorId?: string;
  mode?: "online" | "in-person";
  planId?: string;
};

type BookingContextValue = {
  isOpen: boolean;
  seed: BookingSeed;
  openBooking: (seed?: BookingSeed) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState<BookingSeed>({});

  const openBooking = useCallback((next: BookingSeed = {}) => {
    setSeed(next);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, seed, openBooking, closeBooking }),
    [isOpen, seed, openBooking, closeBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
