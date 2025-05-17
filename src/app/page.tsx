
"use client"; // This page now needs to be a client component to manage preloader state

import { useState, useEffect } from 'react';
import AnimatedIntro from '@/components/animated-intro';
import ProjectGallery from '@/components/project-gallery';
import AiRecommender from '@/components/ai-recommender';
import SkillCloud from '@/components/skill-cloud';
import ContactForm from '@/components/contact-form';
import Preloader from '@/components/preloader'; // Import the new Preloader component

export default function HomePage() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client after mount to avoid hydration issues
    // with immediate state changes related to preloading.
    setIsClient(true); 
  }, []);

  const handlePreloaderFinished = () => {
    setIsPreloading(false);
  };

  if (!isClient) {
    // Render nothing or a basic static placeholder on the server / before hydration
    // This helps prevent a flash of content or hydration mismatch.
    return null; 
  }

  if (isPreloading) {
    return <Preloader onFinished={handlePreloaderFinished} />;
  }

  // Once preloading is finished, render the main page content
  return (
    <>
      <AnimatedIntro />
      <ProjectGallery />
      <SkillCloud />
      <AiRecommender />
      <ContactForm />
    </>
  );
}
