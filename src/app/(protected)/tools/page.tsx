import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminologyTranslator } from "@/app/tools/_components/terminology-translator";

export default function ToolsPage() {
    return (
        <div>
            <h1 className="text-lg font-semibold md:text-2xl mb-4">AI Tools</h1>
            <Card>
                <CardHeader>
                    <CardTitle>AYUSH Terminology Translator</CardTitle>
                    <CardDescription>
                        Translate traditional AYUSH terms into standardized medical codes (e.g., ICD-11).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TerminologyTranslator />
                </CardContent>
            </Card>
        </div>
    )
}

