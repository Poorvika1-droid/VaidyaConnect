'use server';

/**
 * @fileOverview Identifies potential interactions between AYUSH and allopathic medications.
 *
 * - identifyDrugInteractions - A function that identifies potential drug interactions.
 * - IdentifyDrugInteractionsInput - The input type for the identifyDrugInteractions function.
 * - IdentifyDrugInteractionsOutput - The return type for the identifyDrugInteractions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyDrugInteractionsInputSchema = z.object({
  ayushMedications: z.string().describe('List of AYUSH medications the patient is taking.'),
  allopathicMedications: z.string().describe('List of allopathic medications the patient is taking.'),
  patientDetails: z.string().describe('Relevant patient details such as age, weight, and existing conditions.'),
});
export type IdentifyDrugInteractionsInput = z.infer<typeof IdentifyDrugInteractionsInputSchema>;

const IdentifyDrugInteractionsOutputSchema = z.object({
  interactions: z.array(z.string()).describe('A list of potential interactions between the medications.'),
  summary: z.string().describe('A summary of the potential risks and recommendations.'),
});
export type IdentifyDrugInteractionsOutput = z.infer<typeof IdentifyDrugInteractionsOutputSchema>;

export async function identifyDrugInteractions(input: IdentifyDrugInteractionsInput): Promise<IdentifyDrugInteractionsOutput> {
  return identifyDrugInteractionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyDrugInteractionsPrompt',
  input: {schema: IdentifyDrugInteractionsInputSchema},
  output: {schema: IdentifyDrugInteractionsOutputSchema},
  prompt: `You are an expert in pharmacology, specializing in identifying interactions between AYUSH and allopathic medications.

  Given the following information about a patient and their medications, identify any potential interactions between the AYUSH and allopathic medications.

  AYUSH Medications: {{{ayushMedications}}}
  Allopathic Medications: {{{allopathicMedications}}}
  Patient Details: {{{patientDetails}}}

  Provide a list of potential interactions and a summary of the potential risks and recommendations.
  `,
});

const identifyDrugInteractionsFlow = ai.defineFlow(
  {
    name: 'identifyDrugInteractionsFlow',
    inputSchema: IdentifyDrugInteractionsInputSchema,
    outputSchema: IdentifyDrugInteractionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
