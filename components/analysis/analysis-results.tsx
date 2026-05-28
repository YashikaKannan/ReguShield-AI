import { AlertCircle, Building2, CalendarClock, ListChecks, Shield } from "lucide-react";
import type React from "react";
import type { RegulationAnalysis, UploadState } from "@/lib/regulation-analysis";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type AnalysisResultsProps = {
  analysis: RegulationAnalysis | null;
  state: UploadState;
};

const severityVariant = {
  Critical: "destructive",
  High: "warning",
  Medium: "info",
  Low: "default"
} as const;

export function AnalysisResults({ analysis, state }: AnalysisResultsProps) {
  const isProcessing = state === "processing";

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Regulation Analysis</CardTitle>
        <CardDescription>
          Extracted obligations, deadlines, departments, and security controls.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isProcessing && <AnalysisSkeleton />}

        {!isProcessing && !analysis && (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
            <Shield className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-white">Awaiting regulatory PDF</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload a mock RBI or CERT-In file to simulate obligation extraction.
            </p>
          </div>
        )}

        {!isProcessing && analysis && (
          <div className="space-y-4">
            {analysis.obligations.map((obligation) => (
              <div
                key={obligation.title}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:bg-white/[0.055]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      {analysis.source}
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-white">{obligation.title}</h3>
                  </div>
                  <Badge variant={severityVariant[obligation.severity]}>
                    {obligation.severity}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <InfoBlock
                    icon={CalendarClock}
                    label="Deadline"
                    value={obligation.deadline}
                  />
                  <InfoBlock
                    icon={Building2}
                    label="Departments"
                    value={obligation.departments.join(", ")}
                  />
                  <InfoBlock
                    icon={ListChecks}
                    label="Security Requirements"
                    value={obligation.securityRequirements.join("; ")}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/15 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-sky-200" />
        {label}
      </div>
      <p className="text-xs leading-5 text-white/85">{value}</p>
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((item) => (
        <div key={item} className="animate-pulse rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <div className="h-4 w-1/3 rounded bg-white/10" />
          <div className="mt-4 h-5 w-3/4 rounded bg-white/10" />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="h-20 rounded-md bg-white/10" />
            <div className="h-20 rounded-md bg-white/10" />
            <div className="h-20 rounded-md bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
