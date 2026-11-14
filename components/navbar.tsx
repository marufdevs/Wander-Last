"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "./ui/toast";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Add New Destination", href: "/add-new-destination" },
];

function NavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
          : "text-sm font-medium text-zinc-800 transition-colors hover:text-brand"
      }
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const signOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.add({
        type: "error",
        description: error.message,
      });
      return;
    }

    toast.add({
      type: "success",
      description: "Successfully signed out!",
    });

    router.push("/sign-in");
    router.refresh();
  };

  return (
    <header className="relative z-50 border-b border-black/5 bg-white">
      <div className="mx-auto grid h-[72px] max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-6">
        <nav
          aria-label="Main navigation"
          className="hidden justify-self-start lg:flex lg:items-center lg:gap-8"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              active={link.label === "Home"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="col-start-2 justify-self-center"
        >
          <Image
            src="/Images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-auto w-[162px] sm:w-[180px]"
          />
        </Link>

        <div className="col-start-3 hidden items-center justify-self-end gap-5 lg:flex">
          {session?.user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-800 transition-colors hover:text-brand"
              >
                <User className="size-4" strokeWidth={1.8} aria-hidden="true" />
                Profile
              </Link>
              <Button
                className="flex items-center gap-1.5 text-sm font-medium text-white transition-colors bg-brand hover:bg-brand/90"
                onClick={signOut}
              >
                <User className="size-4" strokeWidth={1.8} aria-hidden="true" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-zinc-800 transition-colors hover:text-brand"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-semibold text-zinc-900 transition-colors hover:text-brand"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          className="col-start-3 justify-self-end p-2 text-zinc-800 lg:hidden"
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-black/5 bg-white px-5 py-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                active={link.label === "Home"}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-5 border-t border-black/5 pt-4">
            {session?.user ? (
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-800"
              >
                <User className="size-4" strokeWidth={1.8} aria-hidden="true" />
                Profile
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-800"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-zinc-900"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
