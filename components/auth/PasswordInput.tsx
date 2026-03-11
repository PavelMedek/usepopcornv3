"use client";

import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import TextInput from "./TextInput";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  hasError?: boolean;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ hasError, placeholder = "••••••••", disabled, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="relative">
        <TextInput
          ref={ref}
          id={inputId}
          {...props}
          type={visible ? "text" : "password"}
          withRightIcon
          placeholder={placeholder}
          hasError={hasError}
          disabled={disabled}
        />

        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-4 text-zinc-400 transition hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={visible ? "Skrýt heslo" : "Zobrazit heslo"}
          aria-controls={inputId}
          disabled={disabled}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
