import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type RecordItem = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  notes: string;
};

type RecordsCardProps = {
  title: string;
  icon: React.ReactNode;
  records: RecordItem[];
};

export function RecordsCard({ title, icon, records }: RecordsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {records.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {records.map((record) => (
              <AccordionItem value={record.id} key={record.id}>
                <AccordionTrigger>
                  <div className="text-left">
                    <p className="font-semibold">{record.title}</p>
                    <p className="text-sm text-muted-foreground">{record.subtitle}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-sm">{record.details}</p>
                    <p className="text-sm italic text-muted-foreground">
                      Notes: {record.notes}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-sm text-muted-foreground">No records found.</p>
        )}
      </CardContent>
    </Card>
  );
}
