"use client";

import { Check } from "lucide-react";

type AvatarPickerProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function AvatarPicker({
  options,
  value,
  onChange,
  disabled,
}: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((avatar) => {
        const active = value === avatar;

        return (
          <button
            key={avatar}
            type="button"
            onClick={() => onChange(avatar)}
            disabled={disabled}
            className={[
              "group relative overflow-hidden rounded-2xl border transition",
              active
                ? "border-amber-400 ring-2 ring-amber-400/30"
                : "border-white/10 hover:border-white/20",
              disabled ? "opacity-70" : "",
            ].join(" ")}
          >
            <img
              src={avatar}
              alt="Profilový avatar"
              className="aspect-square w-full bg-zinc-900 object-cover"
            />

            {active && (
              <div className="absolute inset-0 flex items-end justify-end p-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
                  <Check size={16} />
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
