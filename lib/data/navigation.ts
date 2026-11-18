export type NavItem = { id: string; label: string };

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "doctors", label: "Doctors" },
  { id: "conditions", label: "Conditions" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "resources", label: "Resources" },
  { id: "contact", label: "Contact" },
];

/** Every section id present on the page, in document order (used for scroll-spy). */
export const sectionIds = [
  "home",
  "trust",
  "about",
  "doctors",
  "conditions",
  "services",
  "process",
  "online",
  "pricing",
  "testimonials",
  "resources",
  "faq",
  "contact",
] as const;
