import { Suspense } from "react";
import ProfileSetupPageClient from "./ProfileSetupPageClient";
import ProfileSetupPageLoader from "@/components/profile-setup/ProfileSetupPageLoader";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfileSetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <Suspense fallback={<ProfileSetupPageLoader />}>
      <ProfileSetupPageClient />
    </Suspense>
  );
}
