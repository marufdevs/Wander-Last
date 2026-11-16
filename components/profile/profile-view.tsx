"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Mail,
  ShieldCheck,
  User,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";

import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { authClient } from "@/lib/auth-client";

function getInitials(name?: string | null) {
  if (!name) return "W";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function formatMemberSince(value?: Date | string | null) {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <dt className="flex items-center gap-2 text-sm text-zinc-500">
        <Icon
          className="size-4 shrink-0 text-zinc-400"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        {label}
      </dt>
      <dd className="text-sm font-medium text-zinc-900 sm:text-right">
        {value}
      </dd>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="Loading profile">
      <div className="space-y-3">
        <div className="h-3 w-24 animate-pulse bg-zinc-200" />
        <div className="h-10 w-64 max-w-full animate-pulse bg-zinc-200" />
        <div className="h-4 w-96 max-w-full animate-pulse bg-zinc-200" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        <div className="h-72 animate-pulse border border-zinc-200 bg-white" />
        <div className="h-96 animate-pulse border border-zinc-200 bg-white" />
      </div>
    </div>
  );
}

export function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="border border-zinc-200 bg-white p-8 text-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          My Account
        </p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl">
          Sign in to view your profile
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
          You need to be signed in to see your Wanderlast account information.
        </p>
        <Link
          href="/sign-in"
          className="mt-7 inline-flex h-11 items-center justify-center bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  const initials = getInitials(user.name);
  const memberSince = formatMemberSince(user.createdAt);

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            My Account
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            My Profile
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-500">
            Your account details and travel profile, all in one place.
          </p>
        </div>

        <EditProfileDialog user={{ name: user.name, email: user.email }} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        <aside className="border border-zinc-200 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center border border-brand/20 bg-brand/10 font-serif text-2xl font-medium text-brand">
              {initials}
            </div>
            <div className="min-w-0 pt-1">
              <h2 className="truncate font-serif text-2xl leading-tight text-zinc-900">
                {user.name}
              </h2>
              <p className="mt-1 flex items-center gap-2 truncate text-sm text-zinc-500">
                <Mail
                  className="size-3.5 shrink-0 text-zinc-400"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
                user.emailVerified
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700",
              )}
            >
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {user.emailVerified ? "Verified" : "Not verified"}
            </span>
          </div>

          <dl className="mt-6 border-t border-zinc-100 pt-5">
            <dt className="flex items-center gap-2 text-sm text-zinc-500">
              <CalendarDays
                className="size-4 text-zinc-400"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Member since
            </dt>
            <dd className="mt-1 text-sm font-medium text-zinc-900">
              {memberSince}
            </dd>
          </dl>

          <p className="mt-6 border-t border-zinc-100 pt-5 text-xs leading-5 text-zinc-500">
            Your account is secured with email and password sign-in.
          </p>
        </aside>

        <section className="border border-zinc-200 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl leading-tight text-zinc-900">
                Account Information
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                The details associated with your Wanderlast account.
              </p>
            </div>
            <UserRound
              className="mt-1 size-5 shrink-0 text-brand"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <dl className="mt-6 divide-y divide-zinc-100 border-t border-zinc-100">
            <InfoRow icon={User} label="Full name" value={user.name} />
            <InfoRow icon={Mail} label="Email address" value={user.email} />
            <InfoRow
              icon={CalendarDays}
              label="Member since"
              value={memberSince}
            />
            <InfoRow
              icon={ShieldCheck}
              label="Email status"
              value={user.emailVerified ? "Verified" : "Not verified"}
            />
            <InfoRow
              icon={UserRound}
              label="Sign-in method"
              value="Email & password"
            />
          </dl>
        </section>
      </div>
    </div>
  );
}
