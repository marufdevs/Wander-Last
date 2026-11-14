import type { Metadata } from "next";

import { ProfileView } from "@/components/profile-view";

export const metadata: Metadata = {
  title: "My Profile | Wanderlast",
  description: "View your Wanderlast account information.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-[calc(100svh-72px)] bg-slate-50 px-5 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <ProfileView />
      </div>
    </main>
  );
}
