
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './theme-provider'; // To adapt to light/dark mode

const GREETINGS = [
  "Hello",      // English
  "Hola",       // Spanish
  "Bonjour",    // French
  "Ciao",       // Italian
  "Hallo",      // German
  "Olá",        // Portuguese
  "こんにちは",   // Japanese (Konnichiwa)
  "안녕하세요", // Korean (Annyeonghaseyo)
  "नमस्ते",    // Hindi (Namaste)
  "Привет",     // Russian (Privet)
];

const FIRST_GREETING_DURATION = 1000; // ms for the first greeting
const SUBSEQUENT_GREETING_DURATION = 300; // ms for other greetings
const ANIMATION_DURATION = 0.4; // seconds for individual greeting transition

interface PreloaderProps {
  onFinished: () => void;
}

export default function Preloader({ onFinished }: PreloaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (currentIndex >= GREETINGS.length) {
      // Allow last fade out animation to complete
      const timer = setTimeout(onFinished, ANIMATION_DURATION * 1000); 
      return () => clearTimeout(timer);
    }

    const duration = currentIndex === 0 ? FIRST_GREETING_DURATION : SUBSEQUENT_GREETING_DURATION;

    const timer = setTimeout(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, onFinished]);

  const currentGreeting = GREETINGS[currentIndex];

  const greetingVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: ANIMATION_DURATION, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: ANIMATION_DURATION, ease: "easeIn" } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: theme === 'dark' ? 'hsl(var(--background))' : 'hsl(var(--background))',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }} // Overall preloader fade out
    >
      <AnimatePresence mode="wait">
        {currentGreeting && (
          <motion.h1
            key={currentGreeting}
            variants={greetingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
            style={{
              color: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))',
            }}
          >
            {currentGreeting}
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
