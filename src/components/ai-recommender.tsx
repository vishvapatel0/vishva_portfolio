
"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { projectsData } from '@/lib/data';
import { getProjectRecommendations, ProjectRecommendationOutput } from '@/ai/flows/project-recommendation';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Wand2, Zap, ThumbsUp, Lightbulb } from 'lucide-react';
import Container from '@/components/container';
import { motion } from 'framer-motion';

const FormSchema = z.object({
  interests: z.string().min(3, {
    message: "Please enter at least 3 characters for your interests.",
  }),
});

type RecommendationItem = ProjectRecommendationOutput['recommendations'][0];

export default function AiRecommender() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interests: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const projectList = projectsData.map(p => p.title);
      const result = await getProjectRecommendations({ interests: data.interests, projectList });
      setRecommendations(result.recommendations);
      
      if (result.recommendations.length === 0) {
        toast({
          title: "No specific recommendations found",
          description: "Try broadening your interests or check out all projects!",
          variant: "default",
        });
      } else {
         toast({
          title: "Recommendations Ready!",
          description: "Here are some projects and ideas you might like.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Could not fetch recommendations. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="recommender" className="bg-background">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} // Changed to once: false
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight inline-flex items-center text-primary">
            <Wand2 className="mr-3 h-8 w-8" />
            AI Project & Idea Suggester
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tell me your interests (e.g., "data visualization, machine learning") and I'll suggest existing projects or new ideas!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }} // Changed to once: false
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Card className="shadow-lg bg-card border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                    <CardTitle>Find Your Next Project or Spark an Idea</CardTitle>
                    <CardDescription>Enter comma-separated interests below.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="interests-input">Your Interests</FormLabel>
                          <FormControl>
                            <Input id="interests-input" placeholder="e.g., web development, AI, design" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Zap className="mr-2 h-4 w-4 animate-spin" />
                          Thinking...
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Get Suggestions
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </motion.div>

          { (recommendations.length > 0 || isLoading) && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }} // Changed to once: false
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="md:mt-0"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">Suggested Projects & Ideas:</h3>
              {isLoading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border border-border rounded-lg bg-muted/50 animate-pulse">
                      <div className="h-5 w-3/4 bg-muted rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-muted rounded"></div>
                      <div className="h-3 w-5/6 bg-muted rounded mt-1"></div>
                    </div>
                  ))}
                </div>
              )}
              {!isLoading && recommendations.length > 0 && (
                <ul className="space-y-4">
                  {recommendations.map((item, index) => {
                    const existingProject = item.type === 'existing' 
                      ? projectsData.find(p => p.title.toLowerCase() === item.name.toLowerCase()) 
                      : null;
                    
                    return (
                      <motion.li 
                        key={`${item.name}-${index}`}
                        variants={listItemVariants} // Using variants for items
                        initial="hidden"
                        whileInView="visible" // Items re-animate too
                        viewport={{ once: false, amount: 0.2 }} // Items re-animate too
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="p-4 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card"
                      >
                        <div className="flex items-center mb-1">
                          {item.type === 'new_idea' && <Lightbulb className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />}
                          {existingProject ? (
                            <Link href={`/projects/${existingProject.slug}`} className="font-semibold text-accent hover:underline text-lg">
                              {item.name}
                            </Link>
                          ) : (
                            <span className="font-semibold text-foreground text-lg">{item.name}</span>
                          )}
                          {item.type === 'existing' && !existingProject && (
                            <span className="ml-2 text-xs text-muted-foreground/70">(Details not found for this existing project)</span>
                          )}
                        </div>
                        {item.reason && (
                           <p className="text-sm text-muted-foreground italic">"{item.reason}"</p>
                        )}
                        {existingProject && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{existingProject.summary}</p>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              )}
              {!isLoading && recommendations.length === 0 && (
                 <p className="text-muted-foreground">No suggestions found for these interests. Try being more specific or general!</p>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
