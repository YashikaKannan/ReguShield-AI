"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileText, FileUp, Loader2, Sparkles, X } from "lucide-react";
import type { UploadState, UploadedRegulationFile } from "@/lib/regulation-analysis";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type UploadPanelProps = {
  file: UploadedRegulationFile | null;
  progress: number;
  state: UploadState;
  onFileSelected: (file: File) => void;
  onReset: () => void;
};

export function UploadPanel({
  file,
  progress,
  state,
  onFileSelected,
  onReset
}: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isBusy = state === "uploading" || state === "processing";

  function handleFiles(files: FileList | null) {
    const selected = files?.[0];
    if (selected) {
      onFileSelected(selected);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Regulatory PDF Upload</CardTitle>
          <CardDescription>
            Intake RBI circulars and CERT-In advisories for AI obligation extraction.
          </CardDescription>
        </div>
        <Button size="sm" disabled={!file || isBusy || state === "complete"}>
          {state === "processing" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {state === "complete" ? "Analyzed" : "Analyze"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_0.85fr]">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFiles(event.dataTransfer.files);
            }}
            className={`flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed px-6 text-center transition duration-300 ${
              isDragging
                ? "border-primary bg-primary/[0.10]"
                : "border-primary/[0.35] bg-primary/[0.045]"
            }`}
          >
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => handleFiles(event.target.files)}
            />
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg border border-primary/30 bg-primary/[0.15] text-primary">
              {state === "processing" ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : state === "complete" ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <FileUp className="h-6 w-6" />
              )}
            </div>
            <p className="text-sm font-medium text-white">
              {state === "processing"
                ? "AI agents are extracting obligations"
                : "Drop regulatory PDFs here"}
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {state === "complete"
                ? "Mock analysis complete. KPIs, MAPs, and risk signals have been refreshed."
                : "Mock-only upload surface for circular parsing, entity detection, and obligation mapping."}
            </p>
            <Button
              className="mt-4"
              variant="outline"
              disabled={isBusy}
              onClick={() => inputRef.current?.click()}
            >
              Select PDF
            </Button>
          </div>

          <div className="space-y-4">
            {file ? (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-sky-400/10 text-sky-200">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{file.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB uploaded {file.uploadedAt}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Clear uploaded file"
                    disabled={isBusy}
                    onClick={onReset}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{statusLabel[state]}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-medium text-white">No PDF selected</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try files such as RBI circulars, cyber security frameworks, or CERT-In advisories.
                </p>
              </div>
            )}

            <div className="rounded-lg border border-white/10 bg-black/15 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4 text-primary" />
                AI workflow
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <WorkflowStep label="Upload PDF" active={state !== "idle"} complete={progress > 30} />
                <WorkflowStep label="Extract obligations" active={state === "processing"} complete={state === "complete"} />
                <WorkflowStep label="Generate MAPs" active={state === "processing"} complete={state === "complete"} />
                <WorkflowStep label="Refresh dashboard risk" active={state === "complete"} complete={state === "complete"} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const statusLabel: Record<UploadState, string> = {
  idle: "Awaiting upload",
  uploading: "Uploading PDF",
  processing: "Processing with mock AI",
  complete: "Analysis complete"
};

function WorkflowStep({
  label,
  active,
  complete
}: {
  label: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          complete ? "bg-primary" : active ? "bg-sky-300 animate-pulse" : "bg-white/20"
        }`}
      />
      <span className={complete || active ? "text-white/85" : ""}>{label}</span>
    </div>
  );
}
