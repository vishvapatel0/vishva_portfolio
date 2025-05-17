
"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateImageFromPrompt, GenerateImageInput } from '@/ai/flows/image-generation-flow';
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Image as ImageIcon, Zap, AlertTriangle } from 'lucide-react';
import Container from '@/components/container';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Using next/image for optimized image display

const FormSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters.",
  }).max(200, { message: "Prompt should be 200 characters or less for best results."}),
});

export default function AiImageGenerator() {
  const [generatedImageDataUri, setGeneratedImageDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setGeneratedImageDataUri(null); 
    try {
      const result = await generateImageFromPrompt({ prompt: data.prompt });
      setGeneratedImageDataUri(result.imageDataUri);
      toast({
        title: "Image Generated!",
        description: result.revisedPrompt || "Your AI-powered image is ready.",
        variant: "default",
      });
    } catch (err: any) {
      console.error("Error generating image:", err);
      const errorMessage = err.message || "Could not generate image. Please try a different prompt or try again later.";
      setError(errorMessage);
      toast({
        title: "Image Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <section id="ai-spark" className="bg-background py-16 md:py-24">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight inline-flex items-center text-primary">
            <Sparkles className="mr-3 h-8 w-8" />
            AI Image Spark
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Describe an image, and let AI bring your vision to life! Type a prompt below.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="shadow-xl bg-card border-border sticky top-24">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                    <CardTitle>Generate Your Image</CardTitle>
                    <CardDescription>Enter a descriptive prompt (e.g., "a cat wearing a spacesuit on the moon").</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="prompt-input">Your Creative Prompt</FormLabel>
                          <FormControl>
                            <Input id="prompt-input" placeholder="e.g., surreal landscape, neon jungle" {...field} />
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
                          Generating...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Spark Image
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="md:col-span-3"
          >
            <Card className="shadow-xl bg-card border-border min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center p-6">
              {isLoading && (
                <div className="flex flex-col items-center text-center space-y-4">
                  <Zap className="h-16 w-16 text-primary animate-pulse" />
                  <p className="text-xl font-semibold text-muted-foreground">Conjuring pixels...</p>
                  <p className="text-sm text-muted-foreground/70">This might take a few moments.</p>
                  <div className="w-3/4 h-64 bg-muted/50 rounded-lg animate-pulse mt-4"></div>
                </div>
              )}
              {!isLoading && error && (
                 <div className="flex flex-col items-center text-center text-destructive space-y-3 p-4">
                  <AlertTriangle className="h-12 w-12" />
                  <p className="font-semibold">Oops! Something went wrong.</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {!isLoading && !error && generatedImageDataUri && (
                <div className="w-full aspect-square relative rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src={generatedImageDataUri} 
                    alt="AI Generated Image" 
                    layout="fill"
                    objectFit="contain" // or "cover" depending on desired display
                    className="transition-opacity duration-500 opacity-0 data-[loaded=true]:opacity-100"
                    data-loaded="false"
                    onLoad={(event) => {
                      const target = event.target as HTMLImageElement;
                      target.setAttribute('data-loaded', 'true');
                    }}
                  />
                </div>
              )}
              {!isLoading && !error && !generatedImageDataUri && (
                <div className="flex flex-col items-center text-center text-muted-foreground space-y-3">
                  <ImageIcon className="h-16 w-16" />
                  <p className="text-xl font-semibold">Your masterpiece awaits!</p>
                  <p className="text-sm">Enter a prompt and click "Spark Image".</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
