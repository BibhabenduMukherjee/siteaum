"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
interface BookAbstractProps {
  description: string;
}

export default function BookAbstract({ description }: BookAbstractProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-semibold text-lg"
      >
        Abstract
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Description (Visible when isOpen is true) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-2">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
