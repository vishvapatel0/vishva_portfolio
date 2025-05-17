
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  variants?: any;
}

export default function ProjectCard({ project, variants }: ProjectCardProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0px 10px 25px hsla(var(--primary)/0.4), 0px 5px 10px hsla(var(--primary)/0.2)",
        transition: { duration: 0.3 }
      }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-card border-border">
        <CardHeader className="p-0">
          <Link href={`/projects/${project.slug}`} className="block aspect-video relative overflow-hidden group">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint={project.imageHint || "tech project"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 group-hover:from-black/60 transition-all duration-300"></div>
            {/* Shine effect */}
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
          </Link>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <Link href={`/projects/${project.slug}`}>
            <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{project.title}</CardTitle>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
            {project.technologies.length > 4 && (
               <Badge variant="secondary" className="text-xs">+{project.technologies.length - 4} more</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <Button asChild variant="default" className="w-full sm:w-auto flex-grow sm:flex-grow-0 transition-transform hover:scale-105">
            <Link href={`/projects/${project.slug}`}>View Details</Link>
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            {project.liveDemoLink && (
              <Button asChild variant="outline" size="icon" className="flex-grow sm:flex-grow-0" title="Live Demo">
                <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Live Demo</span>
                </Link>
              </Button>
            )}
            {project.repoLink && (
              <Button asChild variant="outline" size="icon" className="flex-grow sm:flex-grow-0" title="GitHub Repository">
                <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub Repository</span>
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
