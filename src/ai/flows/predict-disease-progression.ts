'use server';
/**
 * @fileOverview This file defines a Genkit flow for predicting disease progression and potential health risks based on integrated patient data.
 *
 * - predictDiseaseProgression - A function that takes patient data as input and returns a prediction of disease progression and potential health risks.
 * - PredictDiseaseProgressionInput - The input type for the predictDiseaseProgression function.
 * - PredictDiseaseProgressionOutput - The return type for the predictDiseaseProgression function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictDiseaseProgressionInputSchema = z.object({
  allopathicData: z.string().describe('Patient data from allopathic records.'),
  ayushData: z.string().describe('Patient data from AYUSH records.'),
});
export type PredictDiseaseProgressionInput = z.infer<
  typeof PredictDiseaseProgressionInputSchema
>;

const PredictDiseaseProgressionOutputSchema = z.object({
  diseaseProgressionPrediction: z
    .string()
    .describe('A prediction of the disease progression.'),
  potentialHealthRisks: z
    .string()
    .describe('Potential health risks based on the patient data.'),
});
export type PredictDiseaseProgressionOutput = z.infer<
  typeof PredictDiseaseProgressionOutputSchema
>;

export async function predictDiseaseProgression(
  input: PredictDiseaseProgressionInput
): Promise<PredictDiseaseProgressionOutput> {
  return predictDiseaseProgressionFlow(input);
}

const predictDiseaseProgressionPrompt = ai.definePrompt({
  name: 'predictDiseaseProgressionPrompt',
  input: {schema: PredictDiseaseProgressionInputSchema},
  output: {schema: PredictDiseaseProgressionOutputSchema},
  prompt: `You are an expert medical researcher specializing in disease progression and risk prediction.

  Based on the integrated patient data from both allopathic and AYUSH records, predict the disease progression and potential health risks. Provide a detailed explanation of your reasoning.

  Allopathic Data: {{{allopathicData}}}
  AYUSH Data: {{{ayushData}}}`,
});

const predictDiseaseProgressionFlow = ai.defineFlow(
  {
    name: 'predictDiseaseProgressionFlow',
    inputSchema: PredictDiseaseProgressionInputSchema,
    outputSchema: PredictDiseaseProgressionOutputSchema,
  },
  async input => {
    const {output} = await predictDiseaseProgressionPrompt(input);
    return output!;
  }
);
