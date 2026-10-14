"use client";

import clsx from "clsx";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const Tracker = ({
  boxColor = "#F6F3BA",
  measurement = "kg",
}: {
  boxColor?: string;
  measurement?: "kg" | "cm";
}) => {
  const x = useMotionValue(0);
  const [value, setValue] = useState(50); // Default starting value

  const scaleFactor = 12; // Must match the tick width style below (12px per item)
  const totalItems = MAX_VALUE - MIN_VALUE + 1;
  const totalRulerWidth = totalItems * scaleFactor;

  const onDrag = () => {
    const currentX = x.get();
    // Calculate value based on drag offset relative to center
    const calculatedValue = Math.round(50 - currentX / scaleFactor);
    const clamped = Math.min(Math.max(calculatedValue, MIN_VALUE), MAX_VALUE);
    setValue(clamped);
  };

  return (
    <motion.div
      className={clsx(
        "relative h-[282px] w-[351px] rounded-[44px] flex flex-col items-center justify-between py-8 text-black overflow-hidden shadow-lg select-none",
        measurement === "kg" ? "bg-[#F6F3BA]" : "bg-[#D6EBEB]",
      )}
    >
      {/* Value Display */}
      <div className="flex justify-center items-center z-10 mt-2">
        <motion.span
          key={value}
          className="text-7xl font-medium tracking-tight"
          initial={{ y: -5, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {value}
        </motion.span>
      </div>

      {/* Center Indicator Needle */}
      <div className="absolute top-[130px] z-20 h-8 w-[3px] bg-black rounded-full pointer-events-none" />

      {/* Ruler Container */}
      <div className="relative w-full h-24 overflow-hidden flex items-end">
        <motion.div
          drag="x"
          dragConstraints={{
            left: -totalRulerWidth + 180, // Allow dragging until end of ruler hits center
            right: 180,
          }}
          style={{ x }}
          onDrag={onDrag}
          className="absolute left-1/2 flex items-end cursor-grab active:cursor-grabbing"
        >
          {Array.from({ length: totalItems }).map((_, i) => {
            const currentVal = MIN_VALUE + i;
            const isMajorTick = currentVal % 10 === 0;

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-end flex-shrink-0"
                style={{ width: `${scaleFactor}px` }}
              >
                {isMajorTick && (
                  <span className="text-xs text-gray-600 mb-2 font-medium">
                    {currentVal}
                  </span>
                )}
                <div
                  className={clsx(
                    "bg-gray-700 rounded-full",
                    isMajorTick ? "h-6 w-[2px]" : "h-3 w-[1px]",
                  )}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Measurement Unit Label */}
      <span className="text-sm font-medium uppercase tracking-wider z-10">
        {measurement}
      </span>
    </motion.div>
  );
};

export default Tracker;
