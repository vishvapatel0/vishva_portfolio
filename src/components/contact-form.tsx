
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Instagram, Mail, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/container';
import { motion } from 'framer-motion';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const SocialLink = ({ href, icon: Icon, label, delay }: { href: string; icon: React.ElementType; label: string, delay: number }) => (
  <motion.div
    initial={{ opacity:0, scale: 0.5 }}
    whileInView={{ opacity:1, scale: 1 }}
    viewport={{ once: false }}
    transition={{ duration: 0.3, delay }}
  >
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Button variant="outline" size="icon" className="rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-300 transform hover:scale-110">
        <Icon className="h-5 w-5" />
      </Button>
    </Link>
  </motion.div>
);

export default function ContactForm() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    // Placeholder for form submission logic
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="bg-background">
      <Container>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight inline-flex items-center text-primary">
            <MessageSquare className="mr-3 h-8 w-8" />
            Get In Touch
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-lg text-muted-foreground">
            Have a project in mind, a question, or just want to connect? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Contact Information</h3>
              <p className="text-muted-foreground mb-2">
                You can reach me via email or connect with me on social media.
              </p>
              <div className="flex items-center gap-2 text-accent hover:underline">
                <Mail className="h-5 w-5" />
                <a href="mailto:pvishva39@gmail.com">pvishva39@gmail.com</a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Follow Me</h3>
              <div className="flex space-x-4">
                <SocialLink href="https://github.com/vishvapatel0" icon={Github} label="GitHub" delay={0.3} />
                <SocialLink href="https://www.linkedin.com/in/patel-vishva-46139a23b/" icon={Linkedin} label="LinkedIn" delay={0.4} />
                <SocialLink href="https://www.instagram.com/vishvapatel_908" icon={Instagram} label="Instagram" delay={0.5} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 md:p-8 bg-card rounded-lg shadow-xl border-border">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message here..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
