// import { Suspense } from "react";
// import { redirect } from "next/navigation";
// import SignupPageClient from "./SignupPageClient";
// import { createClient } from "@/lib/supabase/server";

// export default async function SignupPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     redirect("/home");
//   }

//   return (
//     <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
//       <SignupPageClient />
//     </Suspense>
//   );
// }

import { Suspense } from "react";
import { redirect } from "next/navigation";
import SignupPageClient from "./SignupPageClient";
import { createClient } from "@/lib/supabase/server";
import AuthPageLoader from "@/components/auth/AuthPageLoader";

export default async function SignupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return (
    <Suspense fallback={<AuthPageLoader variant="signup" />}>
      <SignupPageClient />
    </Suspense>
  );
}
