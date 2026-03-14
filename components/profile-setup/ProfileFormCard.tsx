"use client";

import { motion } from "framer-motion";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { FormEventHandler, MouseEventHandler } from "react";
import type { ProfileSetupValues } from "@/features/profile-setup/schemas";
import FormField from "@/components/auth/FormField";
import TextInput from "@/components/auth/TextInput";
import SubmitButton from "@/components/auth/SubmitButton";
import AuthErrorAlert from "@/components/auth/AuthErrorAlert";
import AvatarPicker from "./AvatarPicker";
import ShowPicker, { type ShowOption } from "./ShowPicker";
import ShowSearchInput from "./ShowSearchInput";

type ProfileFormCardProps = {
  form: UseFormReturn<ProfileSetupValues>;
  avatarOptions: string[];
  showOptions: ShowOption[];
  selectedShows: string[];
  selectedCount: number;
  submitError?: string;
  disabled?: boolean;
  saveLoading?: boolean;
  showSearch: string;
  onShowSearchChange: (value: string) => void;
  onToggleShow: (showId: string) => void;

  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function ProfileFormCard({
  form,
  avatarOptions,
  showOptions,
  selectedShows,
  selectedCount,
  submitError,
  disabled,
  saveLoading,
  showSearch,
  onShowSearchChange,
  onToggleShow,

  onSubmit,
}: ProfileFormCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          label="Název profilu"
          error={form.formState.errors.username?.message}
        >
          <TextInput
            {...form.register("username")}
            type="text"
            placeholder="Třeba: Medek, Večerní profil, Seriálový geek"
            hasError={!!form.formState.errors.username}
            disabled={disabled}
          />
        </FormField>

        <div>
          <p className="mb-3 text-sm font-medium text-zinc-200">
            Vyber profilový obrázek
          </p>

          <Controller
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <AvatarPicker
                options={avatarOptions}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
              />
            )}
          />

          {form.formState.errors.avatar && (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.avatar.message}
            </p>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-zinc-200">
              Vyber alespoň 3 oblíbené seriály
            </p>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {selectedCount} vybráno
            </span>
          </div>

          <ShowSearchInput
            value={showSearch}
            onChange={onShowSearchChange}
            disabled={disabled}
          />

          {showOptions.length > 0 ? (
            <ShowPicker
              options={showOptions}
              selected={selectedShows}
              onToggle={onToggleShow}
              disabled={disabled}
            />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4 text-sm text-zinc-400">
              Pro zadaný výraz jsme nenašli žádný seriál.
            </div>
          )}

          {form.formState.errors.favoriteShows && (
            <p className="mt-3 text-sm text-rose-300">
              {form.formState.errors.favoriteShows.message}
            </p>
          )}
        </div>

        <AuthErrorAlert message={submitError} />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <SubmitButton
            loading={saveLoading}
            loadingText="Ukládám"
            disabled={disabled}
          >
            <>
              Dokončit profil <span>→</span>
            </>
          </SubmitButton>
        </div>
      </form>
    </motion.section>
  );
}
