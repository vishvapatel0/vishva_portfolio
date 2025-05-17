'use server';
/**
 * @fileOverview Generates images based on text prompts using AI.
 *
 * - generateImageFromPrompt - A function that generates an image.
 * - GenerateImageInput - The input type for the generateImageFromPrompt function.
 * - GenerateImageOutput - The return type for the generateImageFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().min(3, { message: "Prompt must be at least 3 characters." }).max(200, {message: "Prompt must be 200 characters or less."}),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
  revisedPrompt: z.string().optional().describe("The prompt that was actually used by the model, if revised.")
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImageFromPrompt(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return imageGenerationFlow(input);
}

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const generationResult = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // MUST use this model for image generation
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        // Optional: Adjust safety settings if needed
        // safetySettings: [
        //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        // ],
      },
    });
    
    const { media, finishReason, text, usage } = generationResult;

    if (finishReason !== 'stop' && finishReason !== 'length' || !media || !media.url) {
      console.error('Image generation failed or did not produce an image.', { finishReason, media, text });
      // Try to extract a more specific message if available
      const candidate = generationResult.candidates?.[0];
      let errorMessage = 'Failed to generate image.';
      if (candidate?.finishReason === 'safety') {
        errorMessage = 'Image generation blocked due to safety settings. Please try a different prompt.';
      } else if (candidate?.finishMessage) {
        errorMessage = `Image generation failed: ${candidate.finishMessage}`;
      } else if (text) {
        errorMessage = `Image generation failed. Model response: ${text}`;
      }
      throw new Error(errorMessage);
    }
    
    // The media.url will be a data URI for the generated image
    // Sometimes the model might return a text response as well, which could be a revised prompt or explanation.
    return { 
      imageDataUri: media.url,
      revisedPrompt: text 
    };
  }
);
