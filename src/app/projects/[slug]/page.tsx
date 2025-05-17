
import { projectsData, Project } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Container from '@/components/container';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

async function getProject(slug: string): Promise<Project | undefined> {
  return projectsData.find((project) => project.slug === slug);
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <article className="bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">{tech}</Badge>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              {project.liveDemoLink && (
                <Button asChild variant="default" size="sm">
                  <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.repoLink && (
                <Button asChild variant="outline" size="sm">
                  <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </Link>
                </Button>
              )}
            </div>
          </header>
          
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8 shadow-md">
            <Image
              src={project.imageUrl}
              alt={`Screenshot of ${project.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              data-ai-hint={project.imageHint || "project image"}
            />
          </div>

          <div className="prose prose-lg max-w-none text-foreground dark:prose-invert dark:text-foreground">
            <p className="lead text-xl text-muted-foreground mb-6">{project.summary}</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Project Overview</h2>
            <p>{project.description}</p>

            {/* Placeholder for more detailed content if available */}
            {/* {project.detailsContent && <div>{project.detailsContent}</div>} */}
          </div>
        </article>
      </Container>
    </div>
  );
}
