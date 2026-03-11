import type { ReactNode } from "react";

type AuthShellProps = {
  left: ReactNode;
  right: ReactNode;
};

export default function AuthShell({ left, right }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-2">
        {left}
        {right}
      </div>
    </main>
  );
}
