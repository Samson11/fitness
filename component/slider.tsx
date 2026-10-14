"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function DraggableBottomSlider({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const sliderX = useMotionValue(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const DRAG_THRESHOLD = 200; // pixels needed to cross to trigger completion

  const handleSliderDragEnd = () => {
    const currentDragX = sliderX.get();
    if (currentDragX >= DRAG_THRESHOLD) {
      setIsCompleted(true);
      if (onComplete) onComplete();
    } else {
      setIsCompleted(false);
      // Spring back if threshold is not met
      sliderX.set(0);
    }
  };

  const textOpacity = useTransform(sliderX, [0, 100], [1, 0.2]);

  return (
    <div className="relative w-full max-w-[390px] h-18 bg-[#1f1a29] border border-white/10 rounded-full p-2 flex items-center overflow-hidden shadow-xl select-none">
      {/* Center Instruction Text */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-white font-medium text-sm tracking-wide">
          {isCompleted ? "Completed!" : "Lets start"}
        </span>
      </motion.div>

      {/* Draggable Handle Button */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 230 }}
        dragElastic={0.05}
        style={{ x: sliderX }}
        onDragEnd={handleSliderDragEnd}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-lg cursor-grab active:cursor-grabbing"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </motion.div>

      {/* Trailing Arrow Indicators */}
      <div className="absolute right-6 flex items-center space-x-1 text-gray-600 pointer-events-none">
        <ChevronRight className="w-4 h-4 text-gray-600" />
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <ChevronRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}
