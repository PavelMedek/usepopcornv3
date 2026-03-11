import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  loading?: boolean;
  loadingText: string;
  children: ReactNode;
  disabled?: boolean;
};

export default function SubmitButton({
  loading,
  loadingText,
  children,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          {loadingText}
          <Loader2 className="animate-spin" size={16} />
        </>
      ) : (
        children
      )}
    </button>
  );
}
