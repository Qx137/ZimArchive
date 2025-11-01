"use server";

import { validateStatement, type ValidateStatementOutput } from "@/ai/flows/validate-presidential-statements";
import { z } from "zod";

export type FormState = {
  statement?: string;
  result?: ValidateStatementOutput;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

const StatementSchema = z.object({
  statement: z.string().min(10, "Please enter a statement of at least 10 characters."),
});

export async function checkStatement(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = StatementSchema.safeParse({
    statement: formData.get('statement'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      error: validatedFields.error.flatten().fieldErrors.statement?.[0] || 'Invalid input.',
    };
  }

  const statement = validatedFields.data.statement;
  
  try {
    const result = await validateStatement({ statement });
    return {
      statement,
      result,
      status: 'success',
    };
  } catch (error) {
    console.error("AI flow error:", error);
    return {
      statement,
      status: 'error',
      error: "An unexpected error occurred while validating the statement. Please try again later.",
    };
  }
}
