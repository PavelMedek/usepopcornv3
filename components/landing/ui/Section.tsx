import { cn, landing } from "../styles";
import Container from "./Container";

type SectionSpacing = "compact" | "default" | "spacious";

export default function Section({
  id,
  className,
  contentClassName,
  spacing = "default",
  withContainer = true,
  children,
}: {
  id?: string;
  className?: string;
  contentClassName?: string;
  spacing?: SectionSpacing;
  withContainer?: boolean;
  children: React.ReactNode;
}) {
  const spacingClass =
    spacing === "compact"
      ? landing.sectionCompact
      : spacing === "spacious"
        ? landing.sectionSpacious
        : landing.section;

  return (
    <section id={id} className={cn("scroll-mt-24", spacingClass, className)}>
      {withContainer ? (
        <Container className={contentClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
