import { CheckCircle2, FileCheck2, ScanSearch } from "lucide-react";
import { evidenceChecks } from "@/components/dashboard/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function EvidenceValidation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence Validation</CardTitle>
        <CardDescription>
          AI-assisted checks against mapped controls and documentary evidence.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-teal-400/10 text-teal-200">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Evidence bundle</p>
                <p className="text-xs text-muted-foreground">17 files linked to 8 MAPs</p>
              </div>
            </div>
            <Badge>82% match</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {evidenceChecks.map((check) => (
            <div key={check.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{check.label}</span>
                <span className="font-medium text-white">{check.value}%</span>
              </div>
              <Progress value={check.value} />
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <CheckCircle2 className="mb-2 h-4 w-4 text-teal-200" />
            <p className="text-sm font-medium text-white">12 passed</p>
            <p className="text-xs text-muted-foreground">Control evidence checks</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <ScanSearch className="mb-2 h-4 w-4 text-amber-200" />
            <p className="text-sm font-medium text-white">5 need review</p>
            <p className="text-xs text-muted-foreground">Missing signatures or dates</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
