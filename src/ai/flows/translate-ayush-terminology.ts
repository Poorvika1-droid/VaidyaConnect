'use server';

/**
 * @fileOverview A flow that translates AYUSH terms into standardized medical codes.
 *
 * - translateAyushTerm - A function that translates an AYUSH term to standardized medical codes.
 * - TranslateAyushTermInput - The input type for the translateAyushTerm function.
 * - TranslateAyushTermOutput - The output type for the translateAyushTerm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateAyushTermInputSchema = z.object({
  ayushTerm: z
    .string()
    .describe('The AYUSH term to translate into standardized medical codes.'),
  context: z.string().optional().describe('Context for the AYUSH term.'),
});
export type TranslateAyushTermInput = z.infer<typeof TranslateAyushTermInputSchema>;

const TranslateAyushTermOutputSchema = z.object({
  standardizedCodes: z
    .array(z.string())
    .describe('An array of standardized medical codes (e.g., ICD-11) that correspond to the AYUSH term.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the selected standardized medical codes.'),
});
export type TranslateAyushTermOutput = z.infer<typeof TranslateAyushTermOutputSchema>;

export async function translateAyushTerm(input: TranslateAyushTermInput): Promise<TranslateAyushTermOutput> {
  return translateAyushTermFlow(input);
}

const translateAyushTermPrompt = ai.definePrompt({
  name: 'translateAyushTermPrompt',
  input: {schema: TranslateAyushTermInputSchema},
  output: {schema: TranslateAyushTermOutputSchema},
  prompt: `You are an expert in translating AYUSH (traditional medicine) terminology into standardized medical codes such as ICD-11.

  Given the AYUSH term and its context (if available), provide the most appropriate standardized medical codes and explain your reasoning for selecting those codes.

  AYUSH Term: {{{ayushTerm}}}
  Context: {{{context}}}

  Output the standardized medical codes and the reasoning behind their selection.
  Ensure that the standardizedCodes field is an array of strings, and the reasoning field is a string.
  `, 
});

const translateAyushTermFlow = ai.defineFlow(
  {
    name: 'translateAyushTermFlow',
    inputSchema: TranslateAyushTermInputSchema,
    outputSchema: TranslateAyushTermOutputSchema,
  },
  async input => {
    const {output} = await translateAyushTermPrompt(input);
    return output!;
  }
);
