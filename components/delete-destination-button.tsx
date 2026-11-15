"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type DeleteDestinationButtonProps = {
  destinationId: string;
  destinationName: string;
};

export function DeleteDestinationButton({
  destinationId,
  destinationName,
}: DeleteDestinationButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (isDeleting) {
      return;
    }

    setOpen(nextOpen);
  }

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const response = await fetch(
        `${apiBaseUrl}/destinations/${destinationId}`,
        { method: "DELETE" },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        toast.add({
          type: "error",
          description: result?.message ?? "Could not delete this destination.",
        });
        return;
      }

      setOpen(false);
      toast.add({
        type: "success",
        description: "Travel package deleted successfully.",
      });

      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: "Unable to reach the server." });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-9 gap-2 rounded-none border-red-200 bg-white px-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <Trash2 className="size-3.5" aria-hidden="true" />
        Cancel
      </Button>

      <DialogContent
        showCloseButton={!isDeleting}
        className="rounded-none border border-zinc-200 bg-white p-6 ring-0 sm:max-w-[440px]"
      >
        <DialogHeader>
          <div className="flex size-10 items-center justify-center border border-red-200 bg-red-50">
            <TriangleAlert
              className="size-5 text-red-600"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>
          <DialogTitle className="text-lg font-medium text-zinc-900">
            Delete this destination?
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-zinc-500">
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-zinc-900">
              {destinationName}
            </strong>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="h-10 rounded-none border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-10 gap-2 rounded-none bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
          >
            {isDeleting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="size-4" aria-hidden="true" />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
