import { CallToAction } from "@/components/home/call-to-action";
import { HeroBanner } from "@/components/home/hero-banner";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseWanderlust } from "@/components/home/why-choose-wanderlust";

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
