"use client";
import { motion } from "framer-motion";

export default function AnimatedSection({ children, ...props }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.section>
  );
} 