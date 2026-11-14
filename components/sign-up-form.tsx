"use client";

import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";

import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "./ui/toast";
import { useRouter } from "next/navigation";


const fields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your name",
    autoComplete: "name",
    icon: User,
  },
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
    placeholder: "Create a password",
    autoComplete: "new-password",
    icon: Lock,
  },
  {
    id: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    autoComplete: "new-password",
    icon: Lock,
  },
] as const;

const handleEmpty = (data: Record<string, FormDataEntryValue>) => {
  const { name, email, password, confirm_password } = data;

  if (!name || !email || !password || !confirm_password) {
    toast.add({
      type: "warning",
      description: "Please fill up all the required fields.",
    });
    return false;
  }

  if (password !== confirm_password) {
    toast.add({
      type: "warning",
      description: "Passwords do not match!",
    });
    return false;
  }

  return true;
};

export function SignUpForm() {
  const router = useRouter()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!handleEmpty(data)) {
      return;
    }

    const { name, email, password } = data;
    try {
      const { data: user, error } = await authClient.signUp.email({
        name: String(name),
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
          description: "Successfully Created the Account",
        });
        router.push("/")
      }
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

      <Button
        type="submit"
        className="mt-6 h-11 w-full rounded-none bg-brand text-sm font-medium text-white hover:bg-brand/90"
      >
        Create Account
      </Button>

      <div className="my-5 flex items-center gap-4">
        <span className="h-px flex-1 bg-zinc-200" aria-hidden="true" />
        <span className="text-sm text-zinc-500">Or sign up with</span>
        <span className="h-px flex-1 bg-zinc-200" aria-hidden="true" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full gap-2.5 rounded-none border-zinc-200 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50"
      >
        <GoogleIcon className="size-4" />
        Sign Up With Google
      </Button>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-brand hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
