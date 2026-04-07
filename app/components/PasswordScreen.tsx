'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { APP_PASSWORD } from '@/app/utils/constants';
import { validatePassword } from '@/app/utils/helpers';

interface PasswordScreenProps {
  onPasswordCorrect: () => void;
}

export default function PasswordScreen({ onPasswordCorrect }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setShake(false);

    // Simulate processing delay
    setTimeout(() => {
      if (validatePassword(password, APP_PASSWORD)) {
        setShowHearts(true);
        setTimeout(() => {
          onPasswordCorrect();
        }, 1500);
      } else {
        setError('Hmm… that doesn\'t look right! 💕');
        setPassword('');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setIsLoading(false);
    }, 500);
  };

  // Generate floating hearts positions
  const floatingHearts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: Math.random() * 1 + 1.5,
    delay: i * 0.1,
  }));

  // Generate clouds
  const clouds = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    top: Math.random() * 40 + 10,
    left: i * 20 - 10,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-10 relative overflow-hidden bg-gradient-to-b from-pixel-light-lavender via-pixel-light-blue to-pixel-cream">
      {/* Animated sky background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Clouds */}
        {clouds.map((cloud) => (
          <motion.div
            key={`cloud-${cloud.id}`}
            className="absolute text-6xl opacity-30"
            style={{ top: `${cloud.top}%`, left: `${cloud.left}%` }}
            animate={{ x: 200 }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          >
            ☁️
          </motion.div>
        ))}

        {/* Stars */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Floating hearts on success */}
      {showHearts &&
        floatingHearts.map((heart) => (
          <motion.div
            key={`float-heart-${heart.id}`}
            className="fixed text-4xl pointer-events-none"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 300,
              y: -400,
              opacity: 0,
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
            }}
            style={{
              left: `${heart.x}%`,
              top: '50%',
            }}
          >
            💕
          </motion.div>
        ))}

      {/* Main container */}
      <motion.div
        className="relative z-10"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Main card */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
          className="pixel-card w-full max-w-[min(92vw,34rem)] md:max-w-[min(86vw,40rem)] shadow-xl backdrop-blur-sm bg-white/95"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Greeting */}
            <motion.h1
              className="pixel-title text-3xl md:text-4xl text-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hey Divya ❤️
            </motion.h1>

            {/* Pixel Cat Illustration */}
            <motion.div
              className="text-6xl"
              animate={{
                rotateZ: [0, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delayChildren: 0.1,
              }}
            >
              <svg
                viewBox="0 0 64 64"
                className="w-24 h-24"
                style={{ imageRendering: 'pixelated' }}
              >
                {/* Head */}
                <rect x="16" y="16" width="32" height="28" fill="#FFF8F0" stroke="#4A4A4A" strokeWidth="1" />
                {/* Ears Left */}
                <rect x="12" y="8" width="8" height="12" fill="#FFF8F0" stroke="#4A4A4A" strokeWidth="1" />
                {/* Ears Right */}
                <rect x="44" y="8" width="8" height="12" fill="#FFF8F0" stroke="#4A4A4A" strokeWidth="1" />
                {/* Inner ears */}
                <rect x="14" y="10" width="4" height="8" fill="#FFB6C1" />
                <rect x="46" y="10" width="4" height="8" fill="#FFB6C1" />
                {/* Eyes */}
                <rect x="22" y="20" width="4" height="4" fill="#4A4A4A" />
                <rect x="38" y="20" width="4" height="4" fill="#4A4A4A" />
                {/* Eye shine */}
                <rect x="23" y="21" width="2" height="2" fill="#FFFFFF" />
                <rect x="39" y="21" width="2" height="2" fill="#FFFFFF" />
                {/* Nose */}
                <rect x="30" y="27" width="4" height="3" fill="#FFB6C1" />
                {/* Mouth */}
                <line x1="28" y1="31" x2="36" y2="31" stroke="#4A4A4A" strokeWidth="1" />
                <line x1="24" y1="32" x2="20" y2="35" stroke="#4A4A4A" strokeWidth="1" />
                <line x1="40" y1="32" x2="44" y2="35" stroke="#4A4A4A" strokeWidth="1" />
                {/* Body */}
                <rect x="18" y="44" width="28" height="16" fill="#FFF8F0" stroke="#4A4A4A" strokeWidth="1" />
                {/* Paws */}
                <rect x="20" y="59" width="8" height="4" fill="#FFF8F0" stroke="#4A4A4A" strokeWidth="1" />
                <rect x="36" y="59" width="8" height="4" fill="#FFF8F0" stroke="#4A4A4A" strokeWidth="1" />
              </svg>
            </motion.div>

            {/* Decorative elements */}
            <div className="flex gap-3 text-2xl animate-bounce-soft">
              <span>💕</span>
              <span>✨</span>
              <span>💕</span>
            </div>

            {/* Password input */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div className="relative">
                <label className="block text-xs font-pixel-body font-bold text-pixel-dark mb-2 ml-1">
                  What's your name (the one i love calling you :D)?
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmit(e)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-pixel-white border-3 border-pixel-pink rounded-lg font-pixel-body text-sm focus:outline-none focus:border-pixel-dark-pink focus:shadow-[0_0_8px_rgba(255,182,193,0.5)] transition-all placeholder:text-pixel-dark placeholder:opacity-40"
                  autoFocus
                />
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-pixel-dark-pink text-sm font-pixel-body text-center bg-pixel-cream p-2 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading || !password}
                className={`pixel-button w-full ${
                  isLoading ? 'pixel-button-disabled opacity-60' : 'hover:scale-105'
                }`}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
              >
                {isLoading ? '✨ Unlocking...' : '💕 Enter Our World'}
              </motion.button>
            </form>

            {/* Hint section */}
            <motion.div
              className="text-center mt-2 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="font-pixel-body text-pixel-dark opacity-60 mb-1">
                Hint? 🤔
              </p>
              <p className="font-pixel-body text-pixel-dark opacity-50 text-xs">
                ( )
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corners */}
      <motion.div
        className="absolute top-10 left-10 text-5xl opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-5xl opacity-20 pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        💖
      </motion.div>

      {/* Bottom accent hearts */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-6 text-2xl z-5">
        <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          💕
        </motion.span>
        <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>
          💕
        </motion.span>
        <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>
          💕
        </motion.span>
      </div>
    </div>
  );
}
