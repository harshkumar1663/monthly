'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_EVENTS } from '@/app/utils/constants';

interface TimelineProps {
  onScrollComplete: () => void;
}

export default function TimelineSection({ onScrollComplete }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = TIMELINE_EVENTS.length + 2;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45 },
    },
  };

  const handleScrollToGame = () => {
    setTimeout(() => {
      onScrollComplete();
    }, 300);
  };

  const clampIndex = (index: number) => Math.min(Math.max(index, 0), totalSlides - 1);

  const scrollToSlide = (targetIndex: number) => {
    if (lockRef.current) return;

    const bounded = clampIndex(targetIndex);
    const targetSlide = slideRefs.current[bounded];

    if (!targetSlide || bounded === indexRef.current) return;

    lockRef.current = true;
    indexRef.current = bounded;
    setActiveIndex(bounded);

    targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      lockRef.current = false;
    }, 520);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({ top: 0, behavior: 'auto' });
    indexRef.current = 0;
    setActiveIndex(0);

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (lockRef.current || Math.abs(event.deltaY) < 8) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      scrollToSlide(indexRef.current + direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (lockRef.current) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        scrollToSlide(indexRef.current + 1);
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        scrollToSlide(indexRef.current - 1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (lockRef.current || touchStartYRef.current === null) return;
      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - endY;
      if (Math.abs(deltaY) < 40) {
        touchStartYRef.current = null;
        return;
      }
      const direction = deltaY > 0 ? 1 : -1;
      scrollToSlide(indexRef.current + direction);
      touchStartYRef.current = null;
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [totalSlides]);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden snap-y snap-mandatory scroll-smooth overscroll-none">
      <section
        ref={(el) => {
          slideRefs.current[0] = el;
        }}
        className="h-screen snap-start snap-always grid place-items-center px-4 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <h2 className="pixel-title text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-5">Our Journey</h2>
          <div className="flex justify-center gap-4 text-2xl">
            <span className="animate-pulse-heart">💕</span>
            <span className="animate-sparkle">✨</span>
            <span className="animate-float">🌙</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-white/90">Swipe once to move one card</p>
        </motion.div>
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {TIMELINE_EVENTS.map((event, eventIndex) => (
          <section
            key={event.id}
            ref={(el) => {
              slideRefs.current[eventIndex + 1] = el;
            }}
            className="h-screen snap-start snap-always grid place-items-center px-4 py-8 md:py-12"
          >
            <motion.article
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="pixel-card mx-auto w-[min(94vw,48rem)] md:w-[min(88vw,56rem)] h-[76vh] md:h-[78vh] lg:h-[84vh] flex flex-col justify-center text-center border-2 border-white/70 bg-gradient-to-b from-white/95 to-pixel-cream/80 shadow-[0_16px_45px_rgba(74,74,74,0.15)]"
            >
              <div className="mb-6">
                <motion.div
                  className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-pixel-pink to-pixel-dark-pink flex items-center justify-center text-5xl shadow-lg border-2 border-white/80"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                >
                  {event.emoji}
                </motion.div>
                
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-dark-pink mb-5 px-3">{event.title}</h3>
              <div className="w-full flex justify-center px-4">
                <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-pixel-dark opacity-90 leading-relaxed w-full max-w-[28ch] break-words">
                  {event.description}
                </p>
              </div>
            </motion.article>
          </section>
        ))}
      </motion.div>

      <section
        ref={(el) => {
          slideRefs.current[totalSlides - 1] = el;
        }}
        className="h-screen snap-start snap-always grid place-items-center px-4 py-12"
      >
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            className="text-5xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            ⭐
          </motion.div>
          <p className="text-center text-sm md:text-base text-pixel-dark">Ready for the next chapter?</p>
          <motion.button
            onClick={handleScrollToGame}
            className="pixel-button mt-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play The Game →
          </motion.button>
        </motion.div>
      </section>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={`dot-${idx}`}
            onClick={() => scrollToSlide(idx)}
            className={`h-2.5 rounded-full transition-all ${
              activeIndex === idx ? 'w-7 bg-pixel-dark-pink' : 'w-2.5 bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
