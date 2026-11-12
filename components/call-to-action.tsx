import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section
      id="start-journey"
      className="relative isolate overflow-hidden bg-zinc-950"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Images/CTA.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[340px] max-w-[1200px] flex-col items-center justify-center px-6 py-20 text-center text-white sm:min-h-[420px] sm:py-24">
        <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight tracking-[-0.02em]">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-4 text-sm text-white/90 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="#destinations"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 h-12 gap-4 rounded-none bg-white px-8 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-900 hover:bg-zinc-100"
          )}
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
