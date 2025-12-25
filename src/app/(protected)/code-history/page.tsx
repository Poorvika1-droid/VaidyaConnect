"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { History, Search, Download, Filter } from "lucide-react";

type CodeHistoryEntry = {
  id: string;
  diagnosis: string;
  tm2Code: string;
  icd11Code: string;
  patientId?: string;
  timestamp: string;
  status: "active" | "archived";
};

export default function CodeHistoryPage() {
  const [history, setHistory] = useState<CodeHistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("vaidya_connect_code_history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load code history", error);
      }
    }
  }, []);

  const filteredHistory = history.filter(
    (entry) =>
      entry.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tm2Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.icd11Code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportHistory = () => {
    const csv = [
      ["Diagnosis", "TM2 Code", "ICD-11 Code", "Patient ID", "Timestamp", "Status"],
      ...filteredHistory.map((entry) => [
        entry.diagnosis,
        entry.tm2Code,
        entry.icd11Code,
        entry.patientId || "N/A",
        entry.timestamp,
        entry.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-history-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Code Translation History</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all code translations performed
          </p>
        </div>
        <Button onClick={exportHistory} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Translation Records
              </CardTitle>
              <CardDescription>
                Complete history of all TM2 to ICD-11 code translations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search codes..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
              <History className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No translations found matching your search"
                  : "No code translations yet. Start translating diagnoses to see history here."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>TM2 Code</TableHead>
                  <TableHead>ICD-11 Code</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.diagnosis}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {entry.tm2Code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {entry.icd11Code}
                      </code>
                    </TableCell>
                    <TableCell>{entry.patientId || "N/A"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={entry.status === "active" ? "default" : "secondary"}
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

