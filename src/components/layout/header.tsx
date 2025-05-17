
"use client";

import Link from 'next/link';
import { MountainSnow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button'; // Added import

const NavLink = ({ href, children, ...props }: { href: string; children: React.ReactNode } & HTMLAttributes<HTMLAnchorElement>) => (
  <Link href={href} className="text-sm font-medium hover:text-primary transition-colors" {...props}>
    {children}
  </Link>
);

export default function Header() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between max-w-screen-2xl px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Vishva's AI Canvas Home">
            <MountainSnow className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg tracking-tight">Vishva's AI Canvas</span>
          </Link>
          <div className="flex items-center gap-4"> {/* Wrapper for nav and toggle */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink href="/#projects">Projects</NavLink>
              <NavLink href="/#skills">Skills</NavLink>
              <NavLink href="/#recommender">AI Project Recommender</NavLink>
              <NavLink href="/#contact">Contact</NavLink>
            </nav>
            <ThemeToggleButton /> {/* Added ThemeToggleButton */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border">
                <div className="grid gap-4 p-4">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <MountainSnow className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-lg">Vishva's AI Canvas</span>
                  </Link>
                  <NavLink href="/#projects" aria-label="View Projects Section">Projects</NavLink>
                  <NavLink href="/#skills" aria-label="View Skills Section">Skills</NavLink>
                  <NavLink href="/#recommender" aria-label="View AI Project Recommender Section">AI Project Recommender</NavLink>
                  <NavLink href="/#contact" aria-label="View Contact Section">Contact</NavLink>
                  {/* <div className="mt-4 md:hidden">
                    <ThemeToggleButton />
                  </div> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Scroll Progress Bar */}
        <motion.div
          className="h-[3px] bg-primary origin-[0%]"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>
    </>
  );
}
