"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// CONTEXTS
import { useLinks } from '../../contexts/links-context';
import { CustomError } from "../CustomError/CustomError";

// COUNTER COMPONENT
export const Counter = () => {
  /* Hooks */
  const { registeredLinks, errorLinksMetrics } =  useLinks();

  /* States */
  const [count, setCount] = useState(0);

  /* Vars */
  const value = registeredLinks.length;
  const duration = 2500;

  const error = true;

  /* Utils */
  const easeOutQuad = (t: number, b: number, c: number, d: number) => {
    t = t > d ? d : t / d;
    return Math.round(-c * t * (t - 2) + b);
  };

  /* LifeCycles */
  useEffect(() => {
    let startTime: number | undefined;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const timePassed = timestamp - startTime;
      const progress = timePassed / duration;
      const currentCount = easeOutQuad(progress, 0, value, 1);
      if (currentCount >= value) {
        setCount(value);
        return;
      }
      setCount(currentCount);
      requestAnimationFrame(animateCount);
    };
    requestAnimationFrame(animateCount);
  }, [value, duration]);

  /* Renders */
  if (errorLinksMetrics) {
    return <CustomError />
  }
  return (
    <div className="relative h-full w-full">
      <motion.svg
        className="absolute inset-0 m-auto"
        viewBox="0 0 100 100"
        width={140}
        height={140}
      >
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
          strokeWidth={7}
          strokeDasharray="0 1"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          cx="50"
          cy="50"
          r="45"
          fill="#c0e9f1"
          stroke="#06B6D4"
        />
      </motion.svg>
      <p className="absolute inset-0 mx-auto flex items-center justify-center font-display text-5xl text-cyan-500">
        {Intl.NumberFormat().format(count)}
      </p>
    </div>
  );
}
