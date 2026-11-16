import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In | Wanderlast",
  description: "Sign in to your Wanderlast account and continue your adventure.",
};

export default function SignInPage() {
  return (
    <main className="flex min-h-[calc(100svh-72px)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900">
            Welcome Back
          </h1>
          <p className="mt-3 text-base text-zinc-500">
            Resume your adventure with Wanderlast
          </p>
        </div>

        <div className="mt-8 border border-zinc-200 bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-8">
          <SignInForm />
        </div>
      </div>
    </main>
  );
}
