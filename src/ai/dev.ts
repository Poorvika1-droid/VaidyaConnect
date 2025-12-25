import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-personalized-treatments.ts';
import '@/ai/flows/predict-disease-progression.ts';
import '@/ai/flows/identify-drug-interactions.ts';
import '@/ai/flows/translate-ayush-terminology.ts';