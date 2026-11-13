import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DemoVideoSection from '@/components/DemoVideoSection';
import Services from '@/components/Services';
import TestimonialsSection from '@/components/TestimonialsSection';
import LeadershipSection from '@/components/LeadershipSection';
import ProjectTracker from '@/components/ProjectTracker';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import Room3DPreview from '@/components/Room3DPreview';
import CostCalculator from '@/components/CostCalculator';
import EMICalculator from '@/components/EMICalculator';
import SchedulingSection from '@/components/SchedulingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <DemoVideoSection />
          <Services />
          <TestimonialsSection />
          <LeadershipSection />
          <ProjectTracker />
          <BeforeAfterGallery />
          <Room3DPreview />
          <CostCalculator />
          <EMICalculator />
          <SchedulingSection />
          <ContactSection />
        </main>
        <Footer />
        <AIChat />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
