"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, Sparkles, BookMarked } from "lucide-react";
import { getTranslatedTerm } from "@/lib/actions";

const formSchema = z.object({
  ayushTerm: z.string().min(2, "AYUSH term must be at least 2 characters."),
  context: z.string().optional(),
});

export function TerminologyTranslator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ayushTerm: "",
      context: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    const response = await getTranslatedTerm(values);
    if (response.success) {
      setResult(response.data);
    } else {
      // response.error may be undefined — normalize to null for state
      setError(response.error ?? null);
    }
    setLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ayushTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AYUSH Term</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Agnimandya" {...field} />
                </FormControl>
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
                    placeholder="Provide context, e.g., patient symptoms like bloating and indigestion."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Translate
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        {!result && !loading && !error && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg h-full">
                <BookMarked className="h-10 w-10 text-primary mb-4"/>
                <p className="text-muted-foreground">Translation results will appear here.</p>
            </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-8 h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="space-y-4">
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Standardized Codes</AlertTitle>
              <AlertDescription>
                {result.standardizedCodes.join(", ")}
              </AlertDescription>
            </Alert>
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Reasoning</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap">
                {result.reasoning}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
