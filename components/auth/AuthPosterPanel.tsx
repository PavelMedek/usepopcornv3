import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AuthPosterPanelProps = {
  posters: { src: string }[];
  borderRight?: boolean;
  gradientDirection?: "left" | "right";
  children: ReactNode;
};

export default function AuthPosterPanel({
  posters,
  borderRight,
  gradientDirection = "left",
  children,
}: AuthPosterPanelProps) {
  return (
    <section
      className={[
        "relative hidden h-screen overflow-hidden lg:block",
        borderRight ? "border-r border-white/10" : "",
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <div className="grid h-full grid-cols-3 gap-3 p-6 opacity-70">
          {posters.map((poster, i) => (
            <motion.div
              key={poster.src}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <img
                src={poster.src}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className={[
          "pointer-events-none absolute inset-0",
          gradientDirection === "left"
            ? "bg-gradient-to-l from-zinc-950/20 via-zinc-950/30 to-zinc-950"
            : "bg-gradient-to-r from-zinc-950/20 via-zinc-950/30 to-zinc-950",
        ].join(" ")}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/80" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10">
        {children}
      </div>
    </section>
  );
}
