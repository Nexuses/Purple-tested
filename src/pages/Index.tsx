import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustedBySection from "@/components/landing/TrustedBySection";
import ProblemSection from "@/components/landing/ProblemSection";
import BentoSection from "@/components/landing/BentoSection";
import PipelineSection from "@/components/landing/PipelineSection";
import PurpleRangeSection from "@/components/landing/PurpleRangeSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import TechStackSection from "@/components/landing/TechStackSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <ProblemSection />
      <BentoSection />
      <PurpleRangeSection />
      <PipelineSection />
      <ComparisonSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
