"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type AnimatedSectionProps = HTMLMotionProps<"section">;

export function AnimatedSection({
  children,
  ...props
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: [0.98, 1], y: [8, 0] }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
