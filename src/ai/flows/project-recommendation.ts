
'use server';

/**
 * @fileOverview Recommends projects based on user interests, including existing projects and new ideas.
 *
 * - getProjectRecommendations - A function that recommends projects.
 * - ProjectRecommendationInput - The input type for the getProjectRecommendations function.
 * - ProjectRecommendationOutput - The return type for the getProjectRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectRecommendationInputSchema = z.object({
  interests: z
    .string()
    .describe('The interests of the visitor, as a comma separated string.'),
  projectList: z.array(z.string()).describe('A list of existing project names to consider.'),
});
export type ProjectRecommendationInput = z.infer<typeof ProjectRecommendationInputSchema>;

const RecommendationItemSchema = z.object({
  name: z.string().describe('The name of the recommended project or project idea.'),
  type: z.enum(['existing', 'new_idea']).describe('Indicates if the recommendation is an "existing" project from the provided list or a "new_idea".'),
  reason: z.string().optional().describe('A brief reason why this project is recommended based on the interests.')
});

const ProjectRecommendationOutputSchema = z.object({
  recommendations: z
    .array(RecommendationItemSchema)
    .max(5)
    .describe('A list of up to 5 project recommendations. Each item includes the project name, its type ("existing" or "new_idea"), and an optional brief reason for the recommendation.'),
});
export type ProjectRecommendationOutput = z.infer<typeof ProjectRecommendationOutputSchema>;

export async function getProjectRecommendations(input: ProjectRecommendationInput): Promise<ProjectRecommendationOutput> {
  return projectRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectRecommendationPrompt',
  input: {schema: ProjectRecommendationInputSchema},
  output: {schema: ProjectRecommendationOutputSchema},
  prompt: `You are an expert AI assistant that recommends projects to users based on their stated interests.

  The user has the following interests: {{{interests}}}

  Consider this list of existing project names:
  {{#if projectList}}
  {{#each projectList}}
  - {{{this}}}
  {{/each}}
  {{else}}
  (No existing projects provided by the user)
  {{/if}}

  Your task is to:
  1. Suggest relevant projects from the "existing project names" list if they match the user's interests. For these, set the 'type' to "existing".
  2. Brainstorm and suggest NEW project IDEAS that are highly relevant to the user's interests. For these, set the 'type' to "new_idea".
  3. Provide a very brief 'reason' (10-15 words) for each recommendation, explaining its relevance to the user's interests.
  4. Return a combined list of up to 5 recommendations (a mix of "existing" and "new_idea" is good).
  5. Prioritize highly relevant suggestions. If no existing projects are relevant, suggest only new ideas.

  Format your output strictly according to the ProjectRecommendationOutput schema. Ensure each recommendation has a name, type, and a brief reason.
  Do not include any other text or explanation outside the structured output.
  `,
});

const projectRecommendationFlow = ai.defineFlow(
  {
    name: 'projectRecommendationFlow',
    inputSchema: ProjectRecommendationInputSchema,
    outputSchema: ProjectRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure output is not null and adheres to the schema, especially if the model returns fewer than 5.
    return output || { recommendations: [] };
  }
);

