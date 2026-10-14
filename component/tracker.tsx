"use client";

import clsx from "clsx";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

const MIN_VALUE = 0;
const MAX_VALUE = 100;
// 0 10 20 30 40 50 60
// 0 1 2 3

const Tracker = ({
  boxColor = "#F6F3BA",
  measurement = "kg",
}: {
  boxColor?: string;
  measurement?: "kg" | "cm";
}) => {
  const x = useMotionValue(0);
  const [value, setValue] = useState(0);

  const scaleFactor = 10;

  const onDrag = () => {
    const currentX = x.get();
    const calculatedValue = Math.round(48 - currentX / scaleFactor);
    const clamped = Math.min(Math.max(calculatedValue, MIN_VALUE), MAX_VALUE);
    setValue(clamped);
  };

  return (
    <motion.div
      className={clsx(
        "h-[282px] w-[351px] rounded-[44px] flex flex-col items-center justify-center text-black ",
        measurement === "kg" ? "bg-[#F6F3BA]" : "bg-[#D6EBEB]",
      )}
    >
      <motion.div>
        <motion.span
          key={value}
          className="text-7xl font-medium"
          initial={{ y: -5, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {value}
        </motion.span>
      </motion.div>

      <motion.div className="absolute top-10 h-8 w-[2] bg-black"></motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -1000, right: 1000 }}
        style={{ x }}
        onDrag={onDrag}
        className="relative absolute top-0 flex items-end cursor-grab active:cursor-grabbing"
      >
        {Array.from({ length: MAX_VALUE - MIN_VALUE + 1 }).map((a, i) => {
          const currentVal = MIN_VALUE + i;
          const isMajorTick = currentVal % 10 === 0;

          return (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-end"
              style={{ width: "12px" }}
            >
              {isMajorTick && (
                <motion.span className="text-xs text-gray-600 mb-2 font-medium">
                  {currentVal}
                </motion.span>
              )}

              <motion.div
                className={clsx(
                  "bg-gray-700 rounded-full",
                  isMajorTick ? "h-6 w-[2px]" : "h-3 w-[1px]",
                )}
              ></motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.span className="text-sm">{measurement}</motion.span>
    </motion.div>
  );
};

export default Tracker;
