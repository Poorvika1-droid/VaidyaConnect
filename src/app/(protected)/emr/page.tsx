"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Code, CheckCircle2, AlertCircle } from "lucide-react";
import { translateAyushTerm } from "@/ai/flows/translate-ayush-terminology";

const emrFormSchema = z.object({
  diagnosis: z.string().min(3, "Diagnosis must be at least 3 characters"),
  context: z.string().optional(),
  patientId: z.string().optional(),
});

type EMRFormValues = z.infer<typeof emrFormSchema>;

export default function EMRIntegrationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    tm2Code: string;
    icd11Code: string;
    reasoning: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EMRFormValues>({
    resolver: zodResolver(emrFormSchema),
    defaultValues: {
      diagnosis: "",
      context: "",
      patientId: "",
    },
  });

  const onSubmit = async (values: EMRFormValues) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await translateAyushTerm({
        ayushTerm: values.diagnosis,
        context: values.context,
      });

      // Simulate TM2 code generation (in real app, this would come from API)
      const tm2Code = `TM2-${values.diagnosis.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      
      const resultData = {
        tm2Code,
        icd11Code: response.standardizedCodes[0] || "N/A",
        reasoning: response.reasoning,
      };
      
      setResult(resultData);

      // Save to history
      const historyEntry = {
        id: Date.now().toString(),
        diagnosis: values.diagnosis,
        tm2Code,
        icd11Code: resultData.icd11Code,
        patientId: values.patientId || undefined,
        timestamp: new Date().toISOString(),
        status: "active" as const,
      };

      const existingHistory = JSON.parse(
        localStorage.getItem("vaidya_connect_code_history") || "[]"
      );
      existingHistory.unshift(historyEntry);
      // Keep only last 100 entries
      const limitedHistory = existingHistory.slice(0, 100);
      localStorage.setItem("vaidya_connect_code_history", JSON.stringify(limitedHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to translate diagnosis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">EMR Integration</h1>
          <p className="text-sm text-muted-foreground">
            Translate traditional medicine diagnoses to standardized codes
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Enter Diagnosis
            </CardTitle>
            <CardDescription>
              Input a traditional medicine diagnosis to get dual code mapping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traditional Medicine Diagnosis</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Agnimandya, Vata imbalance"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the AYUSH or traditional medicine diagnosis term
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="context"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Context (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Patient symptoms, history, or additional context"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide additional context for better code mapping
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="PAT-12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-4 w-4" />
                      Generate Dual Codes
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Mapping Result</CardTitle>
            <CardDescription>
              Dual code pair for EMR storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !loading && !error && (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
                <Code className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Enter a diagnosis to get TM2 and ICD-11 code mapping
                </p>
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Translation Successful</AlertTitle>
                  <AlertDescription>
                    Both codes have been generated and are ready for EMR storage
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10">
                        TM2 Code
                      </Badge>
                    </div>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {result.tm2Code}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-accent/10">
                        ICD-11 Code
                      </Badge>
                    </div>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {result.icd11Code}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Reasoning</Badge>
                    </div>
                    <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                      {result.reasoning}
                    </div>
                  </div>
                </div>
                <Alert>
                  <AlertDescription className="text-xs">
                    <strong>Next Steps:</strong> Store both codes in the patient's unified digital record.
                    Any authorized allopathic doctor, insurer, or health authority can now understand
                    this diagnosis within a standardized framework.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <strong>Input:</strong> A doctor enters a traditional medicine diagnosis into their EMR.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <strong>Translation:</strong> The EMR calls the API, which maps the term to its official TM2 code
                and its closest related standard ICD-11 code.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <strong>Output & Storage:</strong> The API returns this "dual code" pair. The EMR stores both codes
                in the patient's unified digital record.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <strong>Result:</strong> Any authorized allopathic doctor, insurer, or health authority can now
                understand that diagnosis within a standardized framework, enabling safer, coordinated care
                and standardized data.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

