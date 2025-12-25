// src/ai/flows/suggest-personalized-treatments.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting personalized treatments based on patient data from both AYUSH and allopathic records.
 *
 * - suggestPersonalizedTreatments - A function that suggests personalized treatments.
 * - SuggestPersonalizedTreatmentsInput - The input type for the suggestPersonalizedTreatments function.
 * - SuggestPersonalizedTreatmentsOutput - The output type for the suggestPersonalizedTreatments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPersonalizedTreatmentsInputSchema = z.object({
  allopathicRecord: z.string().describe('The patient\u0027s allopathic medical record.'),
  ayushRecord: z.string().describe('The patient\u0027s AYUSH medical record.'),
});
export type SuggestPersonalizedTreatmentsInput = z.infer<typeof SuggestPersonalizedTreatmentsInputSchema>;

const SuggestPersonalizedTreatmentsOutputSchema = z.object({
  treatmentSuggestions: z.string().describe('Personalized treatment suggestions based on both AYUSH and allopathic records, considering potential interactions and contraindications.'),
});
export type SuggestPersonalizedTreatmentsOutput = z.infer<typeof SuggestPersonalizedTreatmentsOutputSchema>;

export async function suggestPersonalizedTreatments(input: SuggestPersonalizedTreatmentsInput): Promise<SuggestPersonalizedTreatmentsOutput> {
  return suggestPersonalizedTreatmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPersonalizedTreatmentsPrompt',
  input: {schema: SuggestPersonalizedTreatmentsInputSchema},
  output: {schema: SuggestPersonalizedTreatmentsOutputSchema},
  prompt: `You are an AI assistant specialized in providing personalized treatment suggestions based on both AYUSH and allopathic medical records.
  Consider potential interactions and contraindications between the two systems of medicine.

  Allopathic Record: {{{allopathicRecord}}}
  AYUSH Record: {{{ayushRecord}}}

  Provide treatment suggestions:
  `, // Updated prompt to include treatment history
});

const suggestPersonalizedTreatmentsFlow = ai.defineFlow(
  {
    name: 'suggestPersonalizedTreatmentsFlow',
    inputSchema: SuggestPersonalizedTreatmentsInputSchema,
    outputSchema: SuggestPersonalizedTreatmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
