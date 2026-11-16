"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: string;
};

export function PasswordInput({
  id,
  label,
  placeholder,
  autoComplete,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-zinc-900"
      >
        {label}
      </label>
      <div className="relative">
        <Lock
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 pl-10 pr-10 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          aria-pressed={visible}
          className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:text-brand focus-visible:outline-none"
        >
          {visible ? (
            <EyeOff className="size-4" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Eye className="size-4" strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
