"use client";

import ProfileSetupHeader from "@/components/profile-setup/ProfileSetupHeader";
import ProfileSummaryCard from "@/components/profile-setup/ProfileSummaryCard";
import ProfileFormCard from "@/components/profile-setup/ProfileFormCard";
import AuthLoadingOverlay from "@/components/auth/AuthLoadingOverlay";
import ProfileSetupPageLoader from "@/components/profile-setup/ProfileSetupPageLoader";
import { avatarOptions } from "@/features/profile-setup/constants";
import { useProfileSetup } from "@/features/profile-setup/hooks/useProfileSetup";

export default function ProfileSetupPageClient() {
  const {
    form,
    submitError,
    phase,
    isReady,
    isBusy,
    isFormLocked,
    selectedShows,
    selectedAvatar,
    selectedCount,
    watchedUsername,
    loadingTitle,
    loadingDescription,
    showSearch,
    setShowSearch,
    filteredShows,
    applyToggleShow,
    onSubmit,
  } = useProfileSetup();

  if (!isReady) {
    return <ProfileSetupPageLoader />;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <ProfileSetupHeader />

        <div className="relative">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <ProfileSummaryCard
              selectedAvatar={selectedAvatar}
              username={watchedUsername}
              selectedCount={selectedCount}
            />

            <ProfileFormCard
              form={form}
              avatarOptions={avatarOptions}
              showOptions={filteredShows}
              selectedShows={selectedShows}
              selectedCount={selectedCount}
              submitError={submitError}
              disabled={isFormLocked}
              saveLoading={phase === "saving-profile"}
              showSearch={showSearch}
              onShowSearchChange={setShowSearch}
              onToggleShow={applyToggleShow}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          </div>

          <AuthLoadingOverlay
            visible={isBusy}
            title={loadingTitle}
            description={loadingDescription}
          />
        </div>
      </div>
    </main>
  );
}
