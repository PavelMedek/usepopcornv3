import type { UseFormRegisterReturn } from "react-hook-form";

type TermsCheckboxProps = {
  error?: string;
  registration: UseFormRegisterReturn;
  disabled?: boolean;
};

export default function TermsCheckbox({
  error,
  registration,
  disabled,
}: TermsCheckboxProps) {
  return (
    <>
      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <input
          {...registration}
          type="checkbox"
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-900 text-amber-400 focus:ring-amber-400 disabled:opacity-60"
        />
        <span className="text-sm text-zinc-300">
          Souhlasím s podmínkami používání a zásadami ochrany soukromí.
        </span>
      </label>

      {error && <p className="text-sm text-rose-300">{error}</p>}
    </>
  );
}
