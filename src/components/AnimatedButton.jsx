import React from 'react'
import { motion } from "framer-motion";

export default function AnimatedButton({ children, damping = 10, stiffness = 300 }) {
  return (
    <motion.button
      initial={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ type: "spring", stiffness, damping }}
      className="body-text flex-shrink-0 bg-[#D4A017] text-[#1B3A2D] font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-[#BF8F12] transition-colors"
       >
      {children} <span>→</span>
    </motion.button>
  );
}