"use server";

import {
  suggestPersonalizedTreatments,
  type SuggestPersonalizedTreatmentsInput,
} from "@/ai/flows/suggest-personalized-treatments";
import {
  predictDiseaseProgression,
  type PredictDiseaseProgressionInput,
} from "@/ai/flows/predict-disease-progression";
import {
  identifyDrugInteractions,
  type IdentifyDrugInteractionsInput,
} from "@/ai/flows/identify-drug-interactions";
import {
  translateAyushTerm,
  type TranslateAyushTermInput,
} from "@/ai/flows/translate-ayush-terminology";

export async function getPersonalizedTreatments(
  input: SuggestPersonalizedTreatmentsInput
) {
  try {
    const result = await suggestPersonalizedTreatments(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get treatment suggestions." };
  }
}

export async function getDiseasePrediction(
  input: PredictDiseaseProgressionInput
) {
  try {
    const result = await predictDiseaseProgression(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to predict disease progression." };
  }
}

export async function getDrugInteractions(
  input: IdentifyDrugInteractionsInput
) {
  try {
    const result = await identifyDrugInteractions(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to identify drug interactions." };
  }
}

export async function getTranslatedTerm(input: TranslateAyushTermInput) {
  try {
    const result = await translateAyushTerm(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to translate AYUSH term." };
  }
}
