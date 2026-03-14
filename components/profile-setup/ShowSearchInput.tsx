"use client";

import TextInput from "@/components/auth/TextInput";

type ShowSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function ShowSearchInput({
  value,
  onChange,
  disabled,
}: ShowSearchInputProps) {
  return (
    <div className="mb-4">
      <TextInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Hledat seriál podle názvu..."
        disabled={disabled}
      />
    </div>
  );
}
