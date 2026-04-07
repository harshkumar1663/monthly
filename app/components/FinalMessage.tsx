'use client';

import { motion } from 'framer-motion';

interface FinalMessageProps {
  onRestart: () => void;
}

export default function FinalMessage({ onRestart }: FinalMessageProps) {
  const message = `
    Nine months of memories, laughter, and love.
    Every moment with you feels like a dream come true.
    From our first meeting to today, you've made my life
    infinitely more beautiful.
    
    Here's to forever with you. 💕
  `;

  const hearts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: i * 0.15,
  }));

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-10 relative overflow-hidden">
      {/* Animated hearts background */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-5xl opacity-20 pointer-events-none"
          initial={{ x: 0, y: window.innerHeight + 100, opacity: 0 }}
          animate={{
            x: Math.random() * 200 - 100,
            y: -100,
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={{ left: `${heart.x}%` }}
        >
          💕
        </motion.div>
      ))}

      {/* Main card */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 50 }}
        className="pixel-card w-full max-w-[min(94vw,52rem)] shadow-xl relative z-10"
      >
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Celebration emojis */}
          <motion.div
            className="flex gap-4 text-4xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>✨</span>
            <span>💕</span>
            <span>✨</span>
            <span>💕</span>
            <span>✨</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="pixel-title text-center text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Forever Starts Here
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-pixel-pink via-pixel-lavender to-pixel-blue"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          {/* Message */}
          <motion.p
            className="text-center text-sm md:text-base font-pixel-body text-pixel-dark leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ whiteSpace: 'pre-line' }}
          >
            {message}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-2 md:gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="pixel-card text-center">
              <p className="text-2xl font-bold text-pixel-pink">9</p>
              <p className="text-xs font-pixel-body text-pixel-dark">Months</p>
            </div>
            <div className="pixel-card text-center">
              <p className="text-2xl font-bold text-pixel-lavender">∞</p>
              <p className="text-xs font-pixel-body text-pixel-dark">Forever</p>
            </div>
            <div className="pixel-card text-center">
              <p className="text-2xl font-bold text-pixel-blue">100%</p>
              <p className="text-xs font-pixel-body text-pixel-dark">Love</p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col gap-3 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              onClick={onRestart}
              className="pixel-button w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Start
            </motion.button>
            <p className="text-center text-xs font-pixel-body text-pixel-dark opacity-60">
              Made with 💕 for someone special
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Confetti-like elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute text-3xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        >
          {['⭐', '✨', '💫', '🌟'][i % 4]}
        </motion.div>
      ))}
    </div>
  );
}
