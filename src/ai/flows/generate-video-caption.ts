'use server';

/**
 * @fileOverview AI flow to generate video captions and descriptions.
 *
 * - generateVideoCaption - A function that generates video captions and descriptions.
 * - GenerateVideoCaptionInput - The input type for the generateVideoCaption function.
 * - GenerateVideoCaptionOutput - The return type for the generateVideoCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoCaptionInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  topic: z.string().describe('The topic of the video.'),
});
export type GenerateVideoCaptionInput = z.infer<typeof GenerateVideoCaptionInputSchema>;

const GenerateVideoCaptionOutputSchema = z.object({
  caption: z.string().describe('The generated caption for the video.'),
  description: z.string().describe('The generated description for the video.'),
});
export type GenerateVideoCaptionOutput = z.infer<typeof GenerateVideoCaptionOutputSchema>;

export async function generateVideoCaption(input: GenerateVideoCaptionInput): Promise<GenerateVideoCaptionOutput> {
  return generateVideoCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoCaptionPrompt',
  input: {schema: GenerateVideoCaptionInputSchema},
  output: {schema: GenerateVideoCaptionOutputSchema},
  prompt: `You are an expert video caption and description writer.

  Generate a caption and description for the given video, based on its topic.

  Topic: {{{topic}}}
  Video: {{media url=videoDataUri}}

  Caption:
  Description:`,
});

const generateVideoCaptionFlow = ai.defineFlow(
  {
    name: 'generateVideoCaptionFlow',
    inputSchema: GenerateVideoCaptionInputSchema,
    outputSchema: GenerateVideoCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
