import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CursorSpotlight: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for spotlight
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(-500, springConfig);
  const cursorY = useSpring(-500, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Also set CSS variables on document for cards with mouse tracking borders
      document.documentElement.style.setProperty('--cursor-viewport-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-viewport-y', `${e.clientY}px`);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Viewport ambient cursor glow */}
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-30 transition-opacity duration-300"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-500/8 via-cyan-500/8 to-indigo-500/8 blur-3xl pointer-events-none" />
        </motion.div>
      )}

      {/* Ambient background glow layers (subtly shifting) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-cyan-600/8 rounded-full blur-[160px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      </div>
    </>
  );
};
