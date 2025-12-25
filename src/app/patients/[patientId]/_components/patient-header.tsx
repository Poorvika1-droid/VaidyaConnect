import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Patient } from "@/lib/types";

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] items-start">
      <Avatar className="h-24 w-24 sm:h-full sm:w-full sm:rounded-lg">
        <AvatarImage src={patient.avatarUrl} alt={patient.name} className="aspect-square object-cover" />
        <AvatarFallback className="text-4xl rounded-lg">{patient.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="sm:ml-4">
        <h1 className="text-3xl font-bold tracking-tight">{patient.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
            <span>{patient.age} years old</span>
            <Separator orientation="vertical" className="h-4"/>
            <span>{patient.gender}</span>
            <Separator orientation="vertical" className="h-4"/>
            <span>Blood Type: <Badge variant="secondary">{patient.bloodType}</Badge></span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{patient.address}</p>
        <p className="text-sm text-muted-foreground">{patient.contact}</p>
      </div>
    </div>
  );
}
