import { AboutSection } from "@/components/AboutSection";
import { BookingModal } from "@/components/BookingModal";
import { ConditionsSection } from "@/components/ConditionsSection";
import { ContactSection } from "@/components/ContactSection";
import { DoctorsSection } from "@/components/DoctorsSection";
import { EmergencySupport } from "@/components/EmergencySupport";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { OnlineConsultationSection } from "@/components/OnlineConsultationSection";
import { PricingSection } from "@/components/PricingSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustSection } from "@/components/TrustSection";
import { BookingProvider } from "@/lib/booking-context";
import { doctors } from "@/lib/data/doctors";
import { faqs } from "@/lib/data/faq";
import { site } from "@/lib/data/site";

/** Structured data helps search engines understand the practice and its FAQ. */
function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "#clinic",
        name: site.name,
        description: site.description,
        medicalSpecialty: "Psychiatric",
        telephone: site.contact.phone,
        email: site.contact.email,
        availableService: doctors.flatMap((d) => d.specializations).filter((v, i, a) => a.indexOf(v) === i),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function Home() {
  return (
    <BookingProvider>
      <StructuredData />
      <Navbar />

      <main>
        <HeroSection />
        <TrustSection />
        <AboutSection />
        <DoctorsSection />
        <ConditionsSection />
        <ServicesSection />
        <ProcessSection />
        <OnlineConsultationSection />
        <PricingSection />
        <TestimonialsSection />
        <ResourcesSection />
        <FAQSection />
        <ContactSection />
        <EmergencySupport />
      </main>

      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
