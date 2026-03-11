import { Loader2 } from "lucide-react";

type AuthLoadingOverlayProps = {
  visible: boolean;
  title?: string;
  description?: string;
};

export default function AuthLoadingOverlay({
  visible,
  title = "Načítám…",
  description = "Chvilku strpení.",
}: AuthLoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[32px] bg-zinc-950/70 backdrop-blur-sm">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Loader2 className="animate-spin text-amber-300" size={28} />
        </div>

        <h3 className="mt-4 text-lg font-medium text-zinc-100">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
