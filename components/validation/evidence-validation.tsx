import { CheckCircle2, FileCheck2, ScanSearch } from "lucide-react";
import { evidenceChecks } from "@/components/dashboard/mock-data";
import type { RegulationAnalysis, UploadState } from "@/lib/regulation-analysis";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type EvidenceValidationProps = {
  analysis: RegulationAnalysis | null;
  state: UploadState;
};

export function EvidenceValidation({ analysis, state }: EvidenceValidationProps) {
  const isProcessing = state === "processing";
  const checks = analysis
    ? [
        { label: "MFA evidence readiness", value: 74, status: "Needs Review" },
        { label: "Log retention proof match", value: 86, status: "Passed" },
        { label: "Vulnerability assessment artifacts", value: 69, status: "Needs Review" }
      ]
    : evidenceChecks;
  const matchScore = analysis ? 76 : 82;
  const linkedMaps = analysis ? analysis.maps.length : 8;
  const passedCount = checks.filter((check) => check.status === "Passed").length;
  const reviewCount = checks.length - passedCount;

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
                {isProcessing ? (
                  <ScanSearch className="h-5 w-5 animate-pulse" />
                ) : (
                  <FileCheck2 className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {analysis ? "Evidence queue refreshed" : "Evidence bundle"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isProcessing
                    ? "Preparing validation requests"
                    : `17 files linked to ${linkedMaps} MAPs`}
                </p>
              </div>
            </div>
            <Badge>{isProcessing ? "Scanning" : `${matchScore}% match`}</Badge>
          </div>
        </div>

        {isProcessing ? (
          <EvidenceSkeleton />
        ) : (
          <div className="space-y-4">
            {checks.map((check) => (
            <div key={check.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{check.label}</span>
                <span className="font-medium text-white">{check.value}%</span>
              </div>
              <Progress value={check.value} />
            </div>
            ))}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <CheckCircle2 className="mb-2 h-4 w-4 text-teal-200" />
            <p className="text-sm font-medium text-white">
              {isProcessing ? "..." : `${analysis ? passedCount : 12} passed`}
            </p>
            <p className="text-xs text-muted-foreground">Control evidence checks</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <ScanSearch className="mb-2 h-4 w-4 text-amber-200" />
            <p className="text-sm font-medium text-white">
              {isProcessing ? "..." : `${analysis ? reviewCount : 5} need review`}
            </p>
            <p className="text-xs text-muted-foreground">
              {analysis ? "Evidence requested for new MAPs" : "Missing signatures or dates"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EvidenceSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((item) => (
        <div key={item} className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="h-4 w-48 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-2 animate-pulse rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}
