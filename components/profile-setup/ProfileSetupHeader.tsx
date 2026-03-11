import Link from "next/link";

export default function ProfileSetupHeader() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        use<span className="text-amber-400">Popcorn</span>
      </Link>

      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
        Nastavení profilu
      </div>
    </div>
  );
}
