"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import {
  getPersonalizedTreatments,
  getDiseasePrediction,
  getDrugInteractions,
} from "@/lib/actions";

type SuggestTreatmentsDialogProps = {
  input: { allopathicRecord: string; ayushRecord: string };
};

export function SuggestTreatmentsDialog({ input }: SuggestTreatmentsDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const response = await getPersonalizedTreatments(input);
    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error ?? "Failed to get treatment suggestions.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Suggest Personalized Treatments</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Personalized Treatment Suggestions</DialogTitle>
          <DialogDescription>
            AI-powered suggestions based on integrated patient records.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
                <Sparkles className="h-10 w-10 text-primary mb-4"/>
                <p className="text-muted-foreground">Click generate to get AI-powered treatment suggestions.</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center p-8">
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
            <ScrollArea className="h-72">
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap p-4 bg-muted/50 rounded-lg">
                    {result.treatmentSuggestions}
                </div>
            </ScrollArea>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type PredictProgressionDialogProps = {
  input: { allopathicRecord: string; ayushRecord: string };
};

export function PredictProgressionDialog({ input }: PredictProgressionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const response = await getDiseasePrediction({
      allopathicData: input.allopathicRecord,
      ayushData: input.ayushRecord,
    });
    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error ?? "Failed to predict disease progression.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Predict Disease Progression</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Disease Progression Prediction</DialogTitle>
          <DialogDescription>
            Predict potential health risks and disease progression using AI.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
                <Sparkles className="h-10 w-10 text-primary mb-4"/>
                <p className="text-muted-foreground">Click generate to get an AI-powered disease progression analysis.</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center p-8">
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
            <ScrollArea className="h-72">
              <div className="space-y-4 p-1">
                <Alert>
                    <AlertTitle>Disease Progression Prediction</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">{result.diseaseProgressionPrediction}</AlertDescription>
                </Alert>
                <Alert>
                    <AlertTitle>Potential Health Risks</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">{result.potentialHealthRisks}</AlertDescription>
                </Alert>
              </div>
            </ScrollArea>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


type CheckInteractionsDialogProps = {
  input: { allopathicMedications: string; ayushMedications: string; patientDetails: string };
};

export function CheckInteractionsDialog({ input }: CheckInteractionsDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const response = await getDrugInteractions(input);
    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error ?? "Failed to identify drug interactions.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Check Drug Interactions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Drug Interaction Checker</DialogTitle>
          <DialogDescription>
            Identify potential interactions between AYUSH and Allopathic medications.
          </DialogDescription>
        </DialogHeader>
         <div className="py-4">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
                <Sparkles className="h-10 w-10 text-primary mb-4"/>
                <p className="text-muted-foreground">Click check to analyze potential drug interactions.</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center p-8">
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
            <ScrollArea className="h-72">
              <div className="space-y-4 p-1">
                 {result.interactions.length > 0 ? (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Potential Interactions Found!</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-5 mt-2">
                          {result.interactions.map((interaction: string, index: number) => (
                            <li key={index}>{interaction}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                 ) : (
                    <Alert variant="default" className="border-green-500">
                        <AlertTriangle className="h-4 w-4 text-green-500" />
                        <AlertTitle className="text-green-600">No Potential Interactions Found</AlertTitle>
                        <AlertDescription>The analysis did not find any potential interactions between the specified medications.</AlertDescription>
                    </Alert>
                 )}

                <Alert>
                    <AlertTitle>Summary & Recommendations</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">{result.summary}</AlertDescription>
                </Alert>
              </div>
            </ScrollArea>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...</> : "Check"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
