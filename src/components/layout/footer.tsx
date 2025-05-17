
"use client";

import { MountainSnow } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }} // Changed to once: false
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t border-border"
    >
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <MountainSnow className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Vishva's AI Canvas. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </motion.footer>
  );
}
