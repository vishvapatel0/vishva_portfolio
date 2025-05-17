
"use client";

import { skillsData } from '@/lib/data';
import type { Skill } from '@/lib/data';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';
import Container from '@/components/container';

// Skeleton sizes for consistent loading appearance
const SKELETON_SIZES = [
  { width: '80px', height: '36px' }, { width: '120px', height: '44px' },
  { width: '90px', height: '40px' }, { width: '100px', height: '42px' },
  { width: '70px', height: '34px' }, { width: '110px', height: '42px' },
  { width: '95px', height: '40px' }, { width: '85px', height: '38px' },
  { width: '130px', height: '46px' }, { width: '75px', height: '36px' },
];

const skillColorClasses = [
  { bg: 'bg-primary hover:bg-primary/90', text: 'text-primary-foreground' },
  { bg: 'bg-secondary hover:bg-secondary/80', text: 'text-secondary-foreground' },
  { bg: 'bg-accent hover:bg-accent/90', text: 'text-accent-foreground' },
  { bg: 'bg-skill1 hover:bg-skill1/90', text: 'text-skill1-foreground' }, 
  { bg: 'bg-skill2 hover:bg-skill2/80', text: 'text-skill2-foreground' }, 
  { bg: 'bg-skill3 hover:bg-skill3/90', text: 'text-skill3-foreground' }, 
  { bg: 'bg-skill4 hover:bg-skill4/80', text: 'text-skill4-foreground' }, 
];


export default function SkillCloud() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sortedSkills = [...skillsData].sort((a, b) => b.level - a.level);

  const getSkillAppearance = (level: number, index: number) => {
    const baseFontSize = 0.7; 
    const fontSize = baseFontSize + level * 0.12; 
    const paddingY = fontSize * 0.5; 
    const paddingX = fontSize * 1;  

    const colorSet = skillColorClasses[index % skillColorClasses.length];
    let shadow = 'shadow-md hover:shadow-lg';

    if (level >= 4) { 
      shadow = 'shadow-xl hover:shadow-2xl'; 
    } else if (level >= 3) { 
      shadow = 'shadow-lg hover:shadow-xl';
    }
    
    // Removing hover:scale-110 from here as framer-motion will handle hover effect
    return {
      fontSize: `${fontSize}rem`,
      padding: `${paddingY}rem ${paddingX}rem`,
      className: `${colorSet.bg} ${colorSet.text} ${shadow} rounded-full cursor-default transition-all duration-300 ease-in-out`,
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
  };
  
  if (!isMounted) {
    return (
      <section id="skills" className="bg-background">
        <Container className="text-center">
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 inline-flex items-center text-primary">
            <Brain className="mr-3 h-8 w-8" />
            My Skillset
          </h2>
          <p className="mt-2 mb-10 max-w-2xl mx-auto text-lg text-muted-foreground">
            A dynamic display of technologies I master, with prominence based on experience.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 px-4 py-8">
            {SKELETON_SIZES.map((size, i) => (
              <div 
                key={i} 
                className="animate-pulse bg-muted rounded-full" 
                style={{ width: size.width, height: size.height }}
              />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="bg-background">
      <Container className="text-center">
         <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }} // Changed to once: false
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-2 inline-flex items-center text-primary"
          >
          <Brain className="mr-3 h-8 w-8" />
          My Skillset
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }} // Changed to once: false
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 mb-10 max-w-2xl mx-auto text-lg text-muted-foreground"
        >
          A dynamic display of technologies I master, with prominence based on experience and a vibrant color palette.
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4 px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} // Changed to once: false
        >
          {sortedSkills.map((skill: Skill, index: number) => { 
            const appearance = getSkillAppearance(skill.level, index); 
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -3, transition: { type: "spring", stiffness:300, damping:15 } }}
                className={appearance.className}
                style={{
                  fontSize: appearance.fontSize,
                  padding: appearance.padding,
                }}
                title={`${skill.name} - Experience Level ${skill.level}/5`}
              >
                {skill.name}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
