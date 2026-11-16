"use client";

import { useState, type FormEvent } from "react";
import { Pencil } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

type EditProfileDialogProps = {
  user: {
    name: string;
    email: string;
  };
};

const inputClassName =
  "h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40";

export function EditProfileDialog({ user }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setName(user.name);
    }

    setOpen(nextOpen);
  }

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const trimmedName = name.trim();

  if (!trimmedName) {
    toast.add({
      type: "warning",
      description: "Please enter your name.",
    });
    return;
  }

  try {
    const { error } = await authClient.updateUser({
      name: trimmedName,
    });

    if (error) {
      toast.add({
        type: "error",
        description: error.message ?? "Could not update your profile.",
      });
      return;
    }

    setOpen(false);
    toast.add({
      type: "success",
      description: "Profile updated successfully.",
    });
  } catch (error) {
    console.error(error);
    toast.add({
      type: "error",
      description: "Unable to reach the server.",
    });
  }
}

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        onClick={() => handleOpenChange(true)}
        className="h-11 w-full gap-2 rounded-none bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90 sm:w-auto"
      >
        <Pencil className="size-4" aria-hidden="true" />
        Edit your information
      </Button>

      <DialogContent className="rounded-none border border-zinc-200 bg-white ring-0 sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="pr-8">
            <DialogTitle className="font-serif text-2xl font-normal tracking-tight text-zinc-900">
              Edit your information
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-zinc-500">
              Update the details associated with your Wanderlast account.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-1.5 block text-sm font-semibold text-zinc-900"
              >
                Full name
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="mb-1.5 block text-sm font-semibold text-zinc-900"
              >
                Email address
              </label>
              <input
                id="profile-email"
                name="email"
                type="email"
                value={user.email}
                autoComplete="email"
                readOnly
                className={cn(inputClassName, "cursor-not-allowed text-zinc-500")}
              />
              <p className="mt-1.5 text-xs text-zinc-500">
                Email changes will be available later.
              </p>
            </div>
          </div>

          <DialogFooter className="-mx-4 -mb-4 mt-5 rounded-b-none border-zinc-200 bg-zinc-50 px-4 py-4 sm:px-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-10 rounded-none border-zinc-200 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 rounded-none bg-brand text-sm font-semibold text-white hover:bg-brand/90"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
