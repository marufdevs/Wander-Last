import { CallToAction } from "@/components/call-to-action";
import { HeroBanner } from "@/components/hero-banner";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseWanderlust } from "@/components/why-choose-wanderlust";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      
      <main className="flex-1">
        <HeroBanner />
        <WhyChooseWanderlust />
        <Testimonials />
        <CallToAction />
      </main>
    
    </div>
  );
}
