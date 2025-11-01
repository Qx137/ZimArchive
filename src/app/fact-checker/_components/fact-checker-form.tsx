"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { checkStatement, type FormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Loader2, Info, AlertCircle, XCircle } from "lucide-react";

const initialState: FormState = {
  status: 'idle',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Validating...
        </>
      ) : (
        "Validate Statement"
      )}
    </Button>
  );
}

export function FactCheckerForm() {
  const [state, formAction] = useActionState(checkStatement, initialState);

  return (
    <Card className="shadow-2xl border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Statement Validator</CardTitle>
        <CardDescription className="font-body text-base">
          Enter a statement to check its validity using our AI-powered tool.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Textarea
            name="statement"
            placeholder="e.g., 'The government has built 100 new schools in the last year.'"
            rows={5}
            className="text-base"
            required
            defaultValue={state?.statement}
          />
          {state?.status === 'error' && state.error && (
             <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
      
      {state.status === 'loading' && (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
            <span className="text-lg text-muted-foreground">Analyzing statement...</span>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <div className="p-6 pt-0">
          <Card className={state.result.isValid ? "bg-green-100/50 border-green-500" : "bg-red-100/50 border-red-500"}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {state.result.isValid ? 
                  <CheckCircle2 className="w-8 h-8 mr-3 text-green-700" /> : 
                  <XCircle className="w-8 h-8 mr-3 text-red-700" />
                }
                <span className={state.result.isValid ? "text-green-800" : "text-red-800"}>
                    Statement is Likely {state.result.isValid ? "Valid" : "Invalid"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm max-w-none text-gray-800">
                    <h3 className="font-headline text-xl text-primary mb-2">Explanation</h3>
                    <p className="font-body leading-relaxed">{state.result.explanation}</p>
                </div>
            </CardContent>
          </Card>
        </div>
      )}

      {state.status === 'idle' && (
         <div className="p-6 pt-0">
          <Alert className="bg-blue-100/50 border-blue-400">
            <Info className="h-4 w-4 text-blue-700" />
            <AlertTitle className="text-blue-800">Ready to Analyze</AlertTitle>
            <AlertDescription className="text-blue-700">
              Your results will appear here once you submit a statement for validation.
            </AlertDescription>
          </Alert>
         </div>
      )}

    </Card>
  );
}
