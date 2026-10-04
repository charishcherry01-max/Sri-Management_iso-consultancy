"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard = ({ className, children, hoverEffect = true, ...props }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden group transition-all duration-300",
        hoverEffect && "hover:border-primary/60 hover:shadow-[0_12px_40px_rgba(37,99,235,0.25)] hover:ring-1 hover:ring-primary/40 transition-all duration-300",
        className
      )}
      {...(props as any)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
