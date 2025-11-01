'use server';
/**
 * @fileOverview An AI agent for validating statements made by the President of Zimbabwe and about the party.
 *
 * - validateStatement - A function that handles the statement validation process.
 * - ValidateStatementInput - The input type for the validateStatement function.
 * - ValidateStatementOutput - The return type for the validateStatement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateStatementInputSchema = z.object({
  statement: z.string().describe('The statement to validate.'),
});
export type ValidateStatementInput = z.infer<typeof ValidateStatementInputSchema>;

const ValidateStatementOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the statement is valid or not.'),
  explanation: z.string().describe('An explanation of why the statement is valid or not, with sources and context.'),
});
export type ValidateStatementOutput = z.infer<typeof ValidateStatementOutputSchema>;

export async function validateStatement(input: ValidateStatementInput): Promise<ValidateStatementOutput> {
  return validateStatementFlow(input);
}

const validateStatementPrompt = ai.definePrompt({
  name: 'validateStatementPrompt',
  input: {schema: ValidateStatementInputSchema},
  output: {schema: ValidateStatementOutputSchema},
  prompt: `You are an expert fact-checker specializing in Zimbabwean politics.

You will use your knowledge and access to reliable sources to check the validity of the following statement.

Statement: {{{statement}}}

You will make a determination as to whether the statement is valid or not, and provide an explanation with sources and context.

Set the isValid output field appropriately.`,
});

const validateStatementFlow = ai.defineFlow(
  {
    name: 'validateStatementFlow',
    inputSchema: ValidateStatementInputSchema,
    outputSchema: ValidateStatementOutputSchema,
  },
  async input => {
    const {output} = await validateStatementPrompt(input);
    return output!;
  }
);
