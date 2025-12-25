import { patients } from "@/lib/data";
import { notFound } from "next/navigation";
import { PatientHeader } from "./_components/patient-header";
import { RecordsCard } from "./_components/records-card";
import { AiToolsCard } from "./_components/ai-tools-card";
import { Card, CardContent } from "@/components/ui/card";
import { List, Stethoscope, Leaf } from "lucide-react";

export default function PatientPage({
  params,
}: {
  params: { patientId: string };
}) {
  const patient = patients.find((p) => p.id === params.patientId);

  if (!patient) {
    notFound();
  }

  const allopathicMedications = patient.allopathicRecords
    .flatMap((r) => r.medications.map((m) => m.name))
    .join(", ");
  const ayushHerbs = patient.ayushRecords
    .flatMap((r) => r.herbs.map((h) => h.name))
    .join(", ");

  const patientDetails = `Age: ${patient.age}, Gender: ${patient.gender}, Blood Type: ${patient.bloodType}`;

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <PatientHeader patient={patient} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AiToolsCard
          patient={patient}
          allopathicMeds={allopathicMedications}
          ayushHerbs={ayushHerbs}
          patientDetails={patientDetails}
        />
        <RecordsCard
          title="Allopathic Records"
          icon={<Stethoscope className="h-6 w-6 text-primary" />}
          records={patient.allopathicRecords.map((r) => ({
            id: r.id,
            title: r.condition,
            subtitle: `Diagnosed: ${r.diagnosisDate}`,
            details: `Medications: ${r.medications
              .map((m) => m.name)
              .join(", ")}`,
            notes: r.notes,
          }))}
        />
        <RecordsCard
          title="AYUSH Records"
          icon={<Leaf className="h-6 w-6 text-green-600" />}
          records={patient.ayushRecords.map((r) => ({
            id: r.id,
            title: r.diagnosis,
            subtitle: `Dosha Type: ${r.dosha}`,
            details: `Herbs: ${r.herbs.map((h) => h.name).join(", ")}`,
            notes: r.notes,
          }))}
        />
      </div>
    </div>
  );
}
