import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * useMagnetic Hook
 * 
 * Provides a magnetic pull effect for interactive elements (like buttons).
 * When the mouse cursor is within a specific threshold (e.g. 60px) from the element's center,
 * the element is pulled up to 8px toward the cursor.
 * 
 * Usage:
 * ```tsx
 * const { ref, x, y } = useMagnetic();
 * return (
 *   <motion.button ref={ref} style={{ x, y }}>
 *     Hover Me
 *   </motion.button>
 * );
 * ```
 */
export function useMagnetic() {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a responsive, elastic pull feel
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check user preference for reduced motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      // We look for the cursor within 40px of the button's boundary.
      // Dynamic boundary threshold: button radius + 40px margin
      const radius = Math.max(rect.width, rect.height) / 2;
      const threshold = radius + 40; 

      if (distance < threshold) {
        // Compute direction vector
        const dirX = distanceX / distance;
        const dirY = distanceY / distance;

        // Pull strength scales up to 8px. Closer cursor = stronger pull.
        const maxPull = 8;
        const scale = 1 - distance / threshold; // 1 at center, 0 at threshold
        
        x.set(dirX * maxPull * scale);
        y.set(dirY * maxPull * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return { ref, x: springX, y: springY };
}
