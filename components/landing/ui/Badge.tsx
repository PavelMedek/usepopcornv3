import { cn, landing } from "../styles";

export default function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn(landing.badge, className)}>{children}</span>;
}
