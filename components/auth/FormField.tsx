import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export default function FormField({
  label,
  error,
  icon,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
        {icon && <span className="text-zinc-400">{icon}</span>}
        {label}
      </label>

      <div className="relative">{children}</div>

      {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
    </div>
  );
}
