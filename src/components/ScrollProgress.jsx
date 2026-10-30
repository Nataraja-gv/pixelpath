import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#2F5BEA,#E4447B,#F0A030,#0F9D86)' }}
      aria-hidden="true"
    />
  );
}
