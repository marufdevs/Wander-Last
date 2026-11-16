import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned, The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/Images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/Images/person1.png",
  },
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned, The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Che",
    location: "Singapore",
    image: "/Images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnso",
    location: "New York, USA",
    image: "/Images/person1.png",
  },
];

const arrowClassName =
  "static size-10 rounded-full border-zinc-300 text-zinc-500 hover:border-brand hover:bg-transparent hover:text-brand disabled:opacity-100";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
        <Carousel
          opts={{ align: "start" }}
          aria-label="Traveler testimonials"
          className="w-full"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl lg:text-[44px]">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 pb-1">
              <CarouselPrevious className={arrowClassName} />
              <CarouselNext className={arrowClassName} />
            </div>
          </div>

          <CarouselContent className="-ml-6 mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="pl-6 lg:basis-1/2">
                <article className="flex h-full flex-col justify-between gap-6 border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row">
                  <div className="flex flex-1 flex-col">
                    <blockquote className="font-serif text-[15px] leading-6 text-zinc-800">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <div className="mt-6 sm:mt-auto sm:pt-6">
                      <div className="flex items-center gap-2">
                        <span className="h-px w-5 bg-brand" aria-hidden="true" />
                        <span className="text-sm font-semibold text-zinc-900">
                          {testimonial.name}
                        </span>
                      </div>
                      <p className="mt-1 pl-7 text-xs text-zinc-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <Image
                    src={testimonial.image}
                    alt={`Portrait of ${testimonial.name}`}
                    width={218}
                    height={264}
                    className="h-44 w-full shrink-0 object-cover object-center sm:h-[168px] sm:w-[132px]"
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
