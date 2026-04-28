import HeroSection from "@/components/sections/HeroSection";
import StatsTicker from "@/components/sections/StatsTicker";
import BentoServices from "@/components/sections/BentoServices";
import LiveDashboard from "@/components/sections/LiveDashboard";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import AccreditationsCarousel from "@/components/sections/AccreditationsCarousel";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <StatsTicker />
      <BentoServices />
      <LiveDashboard />
      <ProjectsShowcase />
      <AccreditationsCarousel />
      <ContactSection />
    </main>
  );
}
