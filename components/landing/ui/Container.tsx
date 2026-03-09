import { landing, cn } from "../styles";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(landing.container, className)}>{children}</div>;
}
