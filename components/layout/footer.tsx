"use client";

import { useState, type FormEvent, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const socialLinks = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 4.5A2.5 2.5 0 0 0 19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h8.1v-7.2H10v-2.8h2.6V9.9c0-2.6 1.6-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6v1.8h2.9l-.5 2.8h-2.4V22h4.7A2.5 2.5 0 0 0 22 19.5v-15Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
      {children}
    </h3>
  );
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer id="footer" className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-8 lg:pt-24">
        <Link href="/" aria-label="Wanderlast home" className="inline-block">
          <Image
            src="/Images/Wanderlast-1.png"
            alt="Wanderlast"
            width={542}
            height={80}
            className="h-auto w-[280px] sm:w-[360px] lg:w-[420px]"
          />
        </Link>

        <p className="mt-4 max-w-md text-sm text-zinc-300">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <ColumnHeading>Newsletter</ColumnHeading>
            <p className="mt-4 text-xs text-zinc-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 lg:max-w-[300px]">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  className="h-11 w-full bg-white/10 px-4 pr-12 text-sm text-white outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-brand"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-white transition-colors hover:text-brand"
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </button>
              </div>
              {subscribed ? (
                <p aria-live="polite" className="mt-2 text-xs text-brand">
                  Thanks for subscribing!
                </p>
              ) : null}
            </form>
          </div>

          <nav aria-label="Quick links">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <ColumnHeading>Support</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+17869011622"
                  className="text-sm text-zinc-300 transition-colors hover:text-brand"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlast.com"
                  className="text-sm text-zinc-300 transition-colors hover:text-brand"
                >
                  info@wanderlast.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © 2026 Wanderlast. All rights reserved.
          </p>

          <ul className="flex items-center gap-5">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`Wanderlast on ${label}`}
                  className="flex text-zinc-300 transition-colors hover:text-brand"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
