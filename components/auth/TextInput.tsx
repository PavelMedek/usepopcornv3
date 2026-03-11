import { forwardRef, type InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  withRightIcon?: boolean;
  withLeftIcon?: boolean;
};

function getInputClass({
  hasError,
  withRightIcon,
  withLeftIcon,
}: {
  hasError?: boolean;
  withRightIcon?: boolean;
  withLeftIcon?: boolean;
}) {
  return [
    "w-full rounded-2xl border bg-zinc-950/40 py-3 text-sm text-zinc-100 outline-none transition",
    withLeftIcon ? "pl-11" : "pl-4",
    withRightIcon ? "pr-12" : "pr-4",
    "placeholder:text-zinc-500",
    "focus:border-amber-400/50 focus:bg-zinc-950/60",
    hasError ? "border-rose-400/40" : "border-white/10",
  ].join(" ");
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ hasError, withLeftIcon, withRightIcon, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={[
          getInputClass({ hasError, withLeftIcon, withRightIcon }),
          className ?? "",
        ].join(" ")}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
