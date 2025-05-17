
"use client";

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import Container from '@/components/container';
import { motion } from 'framer-motion';

interface BgElementData {
  baseWidth: number;
  baseHeight: number;
  baseTop: number;
  baseLeft: number;
  index: number;
}

const BgElement: React.FC<BgElementData & { isVisible: boolean }> = ({
  baseWidth, baseHeight, baseTop, baseLeft, index, isVisible,
}) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-accent/20`}
      style={{
        width: `${baseWidth}px`,
        height: `${baseHeight}px`,
        top: `${baseTop}%`,
        left: `${baseLeft}%`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? ((baseTop % 40 + 10) / 150) : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{
        duration: 1.5,
        delay: index * 0.2,
        ease: "circOut",
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 1,
      }}
    />
  );
};

export default function AnimatedIntro() {
  const [isVisibleForBg, setIsVisibleForBg] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const bgElementProperties = useMemo(() => {
    if (!isMounted) return [];
    return Array(5).fill(null).map((_, i) => ({
      baseWidth: 80 + Math.random() * 120,
      baseHeight: 80 + Math.random() * 120,
      baseTop: 10 + Math.random() * 80,
      baseLeft: 10 + Math.random() * 80,
      index: i,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsVisibleForBg(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const name = "Vishva - Patel"; // Updated name
  const summary = "A passionate Generative AI and Data Science enthusiast, crafting innovative solutions and exploring the frontiers of artificial intelligence.";

  const pageIntroVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const imageAppearVariant = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
    },
  };

  const textElementsWrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4, 
      },
    },
  };

  const nameCharacterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }),
  };

  const textBlockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  return (
    <section className="bg-gradient-to-br from-background via-background to-secondary/10 relative overflow-hidden flex items-center min-h-[calc(100vh-4rem)]">
      <Container className="py-10 md:py-20 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 lg:gap-16 w-full"
          variants={pageIntroVariants}
          initial="hidden"
          animate="visible" 
          viewport={{ once: true }} 
        >
          {/* Image Area */}
          <motion.div
            className="w-full max-w-xs sm:max-w-sm md:w-2/5 lg:w-1/3 flex justify-center md:order-1"
            variants={imageAppearVariant}
          >
            {/*
              IMPORTANT: To display YOUR profile picture:
              1. If using a local image, save your image file (e.g., 'vishva-profile.png') 
                 in the `public` folder at the root of your project.
              2. Ensure the `src` attribute below matches that filename (e.g., `src="/vishva-profile.png"`).
              3. If using an external URL, ensure the hostname is added to next.config.ts
            */}
            <Image
              src="https://media.licdn.com/dms/image/v2/D4E03AQELgBEQ74PPDA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709721382062?e=1752710400&v=beta&t=HCcFgehoULqdC2YpGx5It4f2QFMS7-LJ9QjJbyhjIow"
              alt="Vishva Patel profile picture - a young man in a dark blue shirt and light pants, smiling, outdoors with yellow flowers and green foliage in the background."
              width={320}
              height={320}
              className="rounded-full shadow-2xl object-cover border-4 border-primary/50"
              priority
              data-ai-hint="Vishva profile"
            />
          </motion.div>

          {/* Text Content Area */}
          <motion.div
            className="md:w-3/5 lg:w-2/3 text-center md:text-left md:order-2"
            variants={textElementsWrapperVariants}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
            >
              {name.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className="inline-block"
                  variants={nameCharacterVariants}
                  custom={i} 
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/80 mt-4 md:mt-6"
              variants={textBlockVariants}
            >
              {summary}
            </motion.p>
            <motion.div
              className="pt-6 md:pt-8"
              variants={textBlockVariants}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="/#projects">
                  Explore Projects <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
      {/* Background elements */}
      {isMounted && bgElementProperties.length > 0 && ( 
        <div className="absolute inset-0 pointer-events-none z-0">
          {bgElementProperties.map(props => (
            <BgElement key={props.index} {...props} isVisible={isVisibleForBg} />
          ))}
        </div>
      )}
    </section>
  );
}
