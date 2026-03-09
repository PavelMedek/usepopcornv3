import { cn, landing } from "../styles";

export default function SurfaceCard({
  className,
  children,
  hover = false,
  padded = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        hover ? landing.cardHover : landing.card,
        padded && "p-6 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
