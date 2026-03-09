"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export type PlanOption = {
  value: "free" | "plus" | "premium" | "payg";
  label: string;
  description: string;
  price: string;
};

type PlanSelectProps = {
  value?: string;
  onChange: (value: "free" | "plus" | "premium" | "payg") => void;
  options: PlanOption[];
};

export default function PlanSelect({
  value,
  onChange,
  options,
}: PlanSelectProps) {
  const selected =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <Select.Root
      value={selected.value}
      onValueChange={(nextValue) =>
        onChange(nextValue as "free" | "plus" | "premium" | "payg")
      }
    >
      <Select.Trigger
        className="
          flex w-full items-center justify-between rounded-2xl border border-white/10
          bg-zinc-950/40 px-4 py-3 text-left text-sm text-zinc-100 outline-none transition
          hover:bg-zinc-950/60 focus:border-amber-400/40
        "
        aria-label="Vybraný plán"
      >
        <div className="min-w-0">
          <Select.Value asChild>
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{selected.label}</span>
              <span className="truncate text-xs text-zinc-400">
                {selected.description}
              </span>
            </div>
          </Select.Value>
        </div>

        <Select.Icon>
          <ChevronDown size={18} className="text-zinc-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="
            z-[100] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl
            border border-white/10 bg-zinc-950 shadow-2xl
          "
        >
          <Select.Viewport className="p-2">
            {options.map((plan) => (
              <Select.Item
                key={plan.value}
                value={plan.value}
                className="
                  relative flex cursor-pointer items-start justify-between gap-4 rounded-xl
                  px-4 py-3 outline-none transition
                  data-[highlighted]:bg-white/5
                "
              >
                <div className="min-w-0">
                  <Select.ItemText asChild>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-100">
                        {plan.label}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {plan.description}
                      </span>
                    </div>
                  </Select.ItemText>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-zinc-400">{plan.price}</span>
                  <Select.ItemIndicator>
                    <Check size={16} className="text-amber-400" />
                  </Select.ItemIndicator>
                </div>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
