import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Patient } from "@/lib/types";
import { SuggestTreatmentsDialog, PredictProgressionDialog, CheckInteractionsDialog } from "./ai-dialogs";

type AiToolsCardProps = {
  patient: Patient;
  allopathicMeds: string;
  ayushHerbs: string;
  patientDetails: string;
};

export function AiToolsCard({
  patient,
  allopathicMeds,
  ayushHerbs,
  patientDetails,
}: AiToolsCardProps) {
  const treatmentInput = {
    allopathicRecord: patient.allopathicRecords.map(r => `${r.condition}: ${r.notes}`).join('\n'),
    ayushRecord: patient.ayushRecords.map(r => `${r.diagnosis}: ${r.notes}`).join('\n'),
  }

  const interactionInput = {
    allopathicMedications: allopathicMeds,
    ayushMedications: ayushHerbs,
    patientDetails: patientDetails,
  }

  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">AI Decision Support</CardTitle>
        <Bot className="h-6 w-6 text-primary" />
      </CardHeader>
       <CardDescription className="px-6 pb-4">
          Leverage AI to get insights on patient data.
        </CardDescription>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <SuggestTreatmentsDialog input={treatmentInput} />
          <PredictProgressionDialog input={treatmentInput} />
          <CheckInteractionsDialog input={interactionInput} />
        </div>
      </CardContent>
    </Card>
  );
}
