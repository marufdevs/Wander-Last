import Image from "next/image";

const features = [
  {
    icon: "/Images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/Images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/Images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseWanderlust() {
  return (
    <section id="why-choose" className="bg-brand/10">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl lg:text-[44px]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-12">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-8"
              />
              <h3 className="mt-6 text-lg font-medium text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
