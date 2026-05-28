import { AlertCircle, Building2, CalendarClock, FileUp, ListChecks, Shield, Sparkles } from "lucide-react";
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
  const isComplete = state === "complete";

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

        {!isProcessing && !analysis && <AnalysisEmptyState state={state} />}

        {!isProcessing && analysis && analysis.obligations.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
            <SearchPulse />
            <p className="text-sm font-medium text-white">No matching obligations</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Adjust search or filters to bring regulatory findings back into view.
            </p>
          </div>
        )}

        {!isProcessing && analysis && analysis.obligations.length > 0 && (
          <div className="space-y-4">
            {isComplete && (
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/[0.07] p-3 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                Analysis complete. Mock AI generated obligations, MAPs, and evidence prompts.
              </div>
            )}
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

function AnalysisEmptyState({ state }: { state: UploadState }) {
  const isComplete = state === "complete";

  return (
    <div className="overflow-hidden rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
      <SearchPulse />
      <p className="text-sm font-medium text-white">
        {isComplete ? "Analysis complete" : "Awaiting regulatory PDF"}
      </p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
        {isComplete
          ? "The frontend mock AI has refreshed obligations, MAP tasks, and risk signals. Review the generated findings below or switch views to inspect the updated dashboard."
          : "Upload an RBI circular or CERT-In advisory from the Regulatory Uploads panel. The frontend mock AI will extract obligations, infer security requirements, and generate MAPs."}
      </p>
      <div className="mx-auto mt-4 grid max-w-xl gap-3 text-left sm:grid-cols-3">
        <Hint icon={FileUp} label="Upload" value="Drop or select a PDF" />
        <Hint icon={Sparkles} label="Process" value="Simulated AI extraction" />
        <Hint icon={ListChecks} label="Generate" value="MAPs and risk updates" />
      </div>
      <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-black/15 p-4 text-left">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          AI processing hint
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 animate-pulse rounded-full bg-white/10" />
          <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs text-muted-foreground">Current step</p>
              <p className="mt-1 text-sm text-white">Parsing regulatory clauses</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs text-muted-foreground">Output</p>
              <p className="mt-1 text-sm text-white">MAP tasks, control owners, and evidence prompts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPulse() {
  return (
    <div className="relative mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg border border-primary/30 bg-primary/[0.10] text-primary">
      <span className="absolute h-full w-full animate-ping rounded-lg bg-primary/10" />
      <Shield className="relative h-6 w-6" />
    </div>
  );
}

function Hint({
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
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </div>
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
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
