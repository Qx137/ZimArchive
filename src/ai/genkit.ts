'use server';

import {ai} from 'genkit/ai';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

genkit({
  plugins: [googleAI()],
});

export const gemini = ai.model('gemini-2.5-flash');
