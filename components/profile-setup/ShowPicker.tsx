"use client";

import { Check } from "lucide-react";

export type ShowOption = {
  id: string;
  title: string;
  year: number;
  image: string;
};

type ShowPickerProps = {
  options: ShowOption[];
  selected: string[];
  onToggle: (showId: string) => void;
  disabled?: boolean;
};

export default function ShowPicker({
  options,
  selected,
  onToggle,
  disabled,
}: ShowPickerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {options.map((show) => {
        const active = selected.includes(show.id);

        return (
          <button
            key={show.id}
            type="button"
            onClick={() => onToggle(show.id)}
            disabled={disabled}
            className={[
              "group relative overflow-hidden rounded-3xl border text-left transition",
              active
                ? "border-amber-400 ring-2 ring-amber-400/30"
                : "border-white/10 hover:border-white/20",
              disabled ? "opacity-70" : "",
            ].join(" ")}
          >
            <img
              src={show.image}
              alt={show.title}
              className="aspect-[2/3] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{show.title}</p>
                  <p className="text-xs text-zinc-300">{show.year}</p>
                </div>

                {active && (
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
