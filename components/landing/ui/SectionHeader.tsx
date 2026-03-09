import { cn, landing } from "../styles";
import { motion } from "framer-motion";

export default function SectionHeader({
  title,
  description,
  align = "left",
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <motion.h2
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl font-semibold tracking-tight md:text-3xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <p className={cn(landing.subtitle, align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
