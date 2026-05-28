"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Clock3, FileWarning, ShieldCheck } from "lucide-react";
import { activity, riskSignals, tasks } from "@/components/dashboard/mock-data";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { AnalysisResults } from "@/components/analysis/analysis-results";
import { RiskMonitoring } from "@/components/risk-monitoring/risk-monitoring";
import { TaskTable } from "@/components/tasks/task-table";
import { UploadPanel } from "@/components/upload/upload-panel";
import { EvidenceValidation } from "@/components/validation/evidence-validation";
import {
  createMockRegulationAnalysis,
  type RegulationAnalysis,
  type UploadedRegulationFile,
  type UploadState
} from "@/lib/regulation-analysis";

export function DashboardShell() {
  const [uploadedFile, setUploadedFile] = useState<UploadedRegulationFile | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<RegulationAnalysis | null>(null);

  useEffect(() => {
    if (!uploadedFile || uploadState === "idle" || uploadState === "complete") {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (uploadState === "uploading" && current >= 92) {
          setUploadState("processing");
          return 94;
        }

        if (uploadState === "processing" && current >= 100) {
          window.clearInterval(interval);
          setAnalysis(createMockRegulationAnalysis(uploadedFile.name));
          setUploadState("complete");
          return 100;
        }

        return Math.min(current + (uploadState === "uploading" ? 14 : 2), 100);
      });
    }, uploadState === "uploading" ? 260 : 360);

    return () => window.clearInterval(interval);
  }, [uploadedFile, uploadState]);

  function handleFileSelected(file: File) {
    setUploadedFile({
      name: file.name,
      size: file.size,
      uploadedAt: "just now"
    });
    setAnalysis(null);
    setProgress(8);
    setUploadState("uploading");
  }

  function resetWorkflow() {
    setUploadedFile(null);
    setAnalysis(null);
    setProgress(0);
    setUploadState("idle");
  }

  const dashboardKpis = useMemo(() => {
    const pendingCount = analysis ? 45 : 42;
    const overdueCount = analysis ? 10 : 9;
    const complianceScore = analysis?.complianceScore ?? 84;
    const riskLevel = analysis?.riskLevel ?? "Medium";

    return [
      {
        label: "Pending Tasks",
        value: String(pendingCount),
        delta: analysis ? "+3 AI-generated MAPs" : "+8 this week",
        icon: Clock3,
        tone: "text-sky-200"
      },
      {
        label: "Overdue Tasks",
        value: String(overdueCount),
        delta: analysis ? "1 critical workflow watched" : "3 high impact",
        icon: FileWarning,
        tone: "text-red-200"
      },
      {
        label: "Compliance Score",
        value: `${complianceScore}%`,
        delta: analysis ? "Refreshed after analysis" : "+6% vs last audit",
        icon: ShieldCheck,
        tone: "text-teal-200"
      },
      {
        label: "Risk Level",
        value: riskLevel,
        delta: analysis ? "Privileged access elevated" : "Cloud controls watched",
        icon: AlertTriangle,
        tone: riskLevel === "High" ? "text-red-200" : "text-amber-200"
      }
    ];
  }, [analysis]);

  const activeTasks = analysis ? [...analysis.maps, ...tasks] : tasks;
  const activeRiskSignals = analysis?.riskSignals ?? riskSignals;
  const activeActivity = analysis ? analysis.activity : activity;
  const activeRiskLevel = analysis?.riskLevel ?? "Medium";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <TopNav />
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-5 sm:px-6">
          <KpiCards items={dashboardKpis} />

          <div className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
            <UploadPanel
              file={uploadedFile}
              progress={progress}
              state={uploadState}
              onFileSelected={handleFileSelected}
              onReset={resetWorkflow}
            />
            <EvidenceValidation />
          </div>

          <AnalysisResults analysis={analysis} state={uploadState} />

          <div className="grid gap-5 2xl:grid-cols-[1.4fr_0.8fr]">
            <TaskTable items={activeTasks} state={uploadState} />
            <div className="grid gap-5">
              <RiskMonitoring signals={activeRiskSignals} riskLevel={activeRiskLevel} />
              <RecentActivity items={activeActivity} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
