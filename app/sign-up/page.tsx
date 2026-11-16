import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up | Wanderlast",
  description: "Create your Wanderlast account and start your next adventure.",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100svh-72px)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-[420px]">
        <div className="text-center">
          <h1 className="font-serif text-[40px] font-normal leading-tight tracking-tight text-zinc-900 sm:text-[44px]">
            Create Account
          </h1>
          <p className="mt-3 text-base text-zinc-500">
            Start your adventure with Wanderlast
          </p>
        </div>

        <div className="mt-8 border border-zinc-200 bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-8">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
