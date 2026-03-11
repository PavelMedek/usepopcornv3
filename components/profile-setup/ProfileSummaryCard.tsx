"use client";

import { motion } from "framer-motion";

type ProfileSummaryCardProps = {
  selectedAvatar: string;
  username: string;
  selectedCount: number;
};

export default function ProfileSummaryCard({
  selectedAvatar,
  username,
  selectedCount,
}: ProfileSummaryCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        👤 Profil jako na streamovací platformě
      </p>

      <h1 className="mt-5 text-4xl font-semibold tracking-tight">
        Dokonči svůj profil
      </h1>

      <p className="mt-3 max-w-xl text-zinc-300">
        Vyber název profilu, profilový obrázek a alespoň 3 oblíbené seriály.
        Díky tomu bude usePopcorn působit víc jako tvoje vlastní streamovací
        aplikace.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-950/40 p-5">
        <p className="text-sm text-zinc-400">Aktuálně vybraný profil</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {selectedAvatar ? (
              <img
                src={selectedAvatar}
                alt="Vybraný avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                Avatar
              </div>
            )}
          </div>

          <div>
            <p className="text-lg font-medium">{username || "Název profilu"}</p>
            <p className="text-sm text-zinc-400">
              {selectedCount} / 3+ oblíbených seriálů
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
