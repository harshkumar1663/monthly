'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const PasswordScreen = dynamic(() => import('@/app/components/PasswordScreen'), { ssr: false });
const TimelineSection = dynamic(() => import('@/app/components/TimelineSection'), { ssr: false });
const GameBoard = dynamic(() => import('@/app/components/GameBoard'), { ssr: false });
const FinalMessage = dynamic(() => import('@/app/components/FinalMessage'), { ssr: false });

type ScreenType = 'password' | 'timeline' | 'game' | 'message' | null;

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Always begin from password screen on every reload.
    setCurrentScreen('password');
  }, []);

  const handlePasswordCorrect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentScreen('timeline');
      setIsLoading(false);
    }, 500);
  };

  const handleGameComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentScreen('message');
      setIsLoading(false);
    }, 500);
  };

  const handleScrollComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentScreen('game');
      setIsLoading(false);
    }, 500);
  };

  const handleRestart = () => {
    setCurrentScreen('password');
  };

  if (!isClient) {
    return <div className="w-full min-h-screen bg-gradient-to-br from-pixel-pink to-pixel-blue" />;
  }

  return (
    <main className="w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-4xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}

        {currentScreen === 'password' && !isLoading && (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PasswordScreen onPasswordCorrect={handlePasswordCorrect} />
          </motion.div>
        )}

        {currentScreen === 'timeline' && !isLoading && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TimelineSection onScrollComplete={handleScrollComplete} />
          </motion.div>
        )}

        {currentScreen === 'game' && !isLoading && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameBoard onGameComplete={handleGameComplete} />
          </motion.div>
        )}

        {currentScreen === 'message' && !isLoading && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FinalMessage onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
