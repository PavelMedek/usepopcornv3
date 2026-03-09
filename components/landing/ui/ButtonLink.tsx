"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn, landing } from "../styles";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  block?: boolean;
  rounded?: "full" | "xl" | "2xl";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  block = false,
  rounded = "full",
  className,
  arrow = false,
  onClick,
}: ButtonLinkProps) {
  const base =
    variant === "primary" ? landing.primaryButton : landing.secondaryButton;

  const roundedClass =
    rounded === "2xl"
      ? "rounded-2xl"
      : rounded === "xl"
        ? "rounded-xl"
        : "rounded-full";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={cn(block && "w-full")}
    >
      <Link
        href={href}
        onClick={onClick}
        className={cn(base, roundedClass, block && "flex w-full", className)}
      >
        {children}
        {arrow ? <span>→</span> : null}
      </Link>
    </motion.div>
  );
}
