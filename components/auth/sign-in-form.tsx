"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";

import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FormEvent } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const fields = [
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
    icon: Mail,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    icon: Lock,
  },
] as const;

const handleEmpty = (data: Record<string, FormDataEntryValue>) => {
  const { email, password } = data;

  if (!email || !password) {
    toast.add({
      type: "warning",
      description: "Please fill up all the required fields.",
    });
    return false;
  }
  return true;
};

export function SignInForm() {
  const router = useRouter()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (!handleEmpty(data)) {
      return;
    }
    const {email, password } = data;
    try {
      const { data: user, error } = await authClient.signIn.email({
        email: String(email),
        password: String(password),
      });
      if (error) {
        toast.add({
          type: "error",
          description: error.message ?? "Sign up failed",
        });
        return;
      }
      if (user) {
        toast.add({
          type: "success",
          description: "Successfully Login your Account",
        });
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.add({ type: "error", description: "Unable to reach the server" });
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        toast.add({
          type: "error",
          description: error.message ?? "Google sign in failed",
        });
      }
      // On success the better-auth client has already redirected to Google.
    } catch (err) {
      console.error(err);
      toast.add({ type: "error", description: "Unable to reach the server" });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        {fields.map(
          ({ id, label, type, placeholder, autoComplete, icon: Icon }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold text-zinc-900"
              >
                {label}
              </label>
              <div className="relative">
                <Icon
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  required
                  className="h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 pl-10 pr-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40"
                />
              </div>
            </div>
          ),
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <label
          htmlFor="remember-me"
          className="flex items-center gap-2 text-sm text-zinc-600"
        >
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="size-4 rounded-none border-zinc-300 accent-brand"
          />
          Remember me
        </label>

        <Link
          href="#"
          className="text-sm font-medium text-brand hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="mt-5 h-11 w-full rounded-none bg-brand text-sm font-medium text-white hover:bg-brand/90"
      >
        Sign In
      </Button>

      <div className="my-5 flex items-center gap-4">
        <span className="h-px flex-1 bg-zinc-200" aria-hidden="true" />
        <span className="text-sm text-zinc-500">Or continue with</span>
        <span className="h-px flex-1 bg-zinc-200" aria-hidden="true" />
      </div>

      <Button
        onClick={handleGoogleSignIn}
        type="button"
        variant="outline"
        className="h-11 w-full gap-2.5 rounded-none border-zinc-200 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50"
      >
        <GoogleIcon className="size-4" />
        Sign In With Google
      </Button>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-brand hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
