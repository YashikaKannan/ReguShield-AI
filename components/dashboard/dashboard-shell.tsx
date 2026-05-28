"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BarChart3, Clock3, FileWarning, ShieldCheck } from "lucide-react";
import { activity, riskSignals, tasks } from "@/components/dashboard/mock-data";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import {
  MobileNav,
  Sidebar,
  type DashboardView,
  viewDescriptions,
  viewTitles
} from "@/components/dashboard/sidebar";
import ExecutiveDashboard from "@/components/dashboard/executive-dashboard";
import { TopNav } from "@/components/dashboard/top-nav";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { AnalysisResults } from "@/components/analysis/analysis-results";
import { RiskMonitoring } from "@/components/risk-monitoring/risk-monitoring";
import { TaskTable } from "@/components/tasks/task-table";
import { UploadPanel } from "@/components/upload/upload-panel";
import { EvidenceValidation } from "@/components/validation/evidence-validation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  createMockRegulationAnalysis,
  type DashboardFilters,
  type RegulationAnalysis,
  type UploadedRegulationFile,
  type UploadState
} from "@/lib/regulation-analysis";

const defaultFilters: DashboardFilters = {
  severity: "All",
  department: "All",
  status: "All",
  regulationType: "All"
};

export function DashboardShell() {
  const [activeView, setActiveView] = useState<DashboardView>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
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

  const activeTasks = useMemo(() => (analysis ? [...analysis.maps, ...tasks] : tasks), [analysis]);
  const activeRiskSignals = analysis?.riskSignals ?? riskSignals;
  const activeActivity = analysis ? analysis.activity : activity;
  const activeRiskLevel = analysis?.riskLevel ?? "Medium";
  const query = searchQuery.trim().toLowerCase();

  const filteredTasks = useMemo(
    () =>
      activeTasks.filter((task) => {
        const searchable = [
          task.id,
          task.regulation,
          task.obligation,
          task.owner,
          task.due,
          task.status,
          task.risk
        ]
          .join(" ")
          .toLowerCase();
        const matchesSearch = !query || searchable.includes(query);
        const matchesSeverity = filters.severity === "All" || task.risk === filters.severity;
        const matchesDepartment =
          filters.department === "All" ||
          task.owner.toLowerCase().includes(filters.department.toLowerCase());
        const matchesStatus = filters.status === "All" || task.status === filters.status;
        const matchesRegulation =
          filters.regulationType === "All" || task.regulation.includes(filters.regulationType);

        return (
          matchesSearch &&
          matchesSeverity &&
          matchesDepartment &&
          matchesStatus &&
          matchesRegulation
        );
      }),
    [activeTasks, filters, query]
  );

  const filteredAnalysis = useMemo(() => {
    if (!analysis) {
      return null;
    }

    const obligations = analysis.obligations.filter((obligation) => {
      const searchable = [
        analysis.source,
        obligation.title,
        obligation.deadline,
        obligation.severity,
        obligation.departments.join(" "),
        obligation.securityRequirements.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesSeverity =
        filters.severity === "All" || obligation.severity === filters.severity;
      const matchesDepartment =
        filters.department === "All" || obligation.departments.includes(filters.department);
      const matchesRegulation =
        filters.regulationType === "All" || analysis.source.includes(filters.regulationType);

      return matchesSearch && matchesSeverity && matchesDepartment && matchesRegulation;
    });

    return { ...analysis, obligations };
  }, [analysis, filters, query]);

  const filteredActivity = useMemo(
    () =>
      activeActivity.filter((item) => {
        const searchable = `${item.title} ${item.meta}`.toLowerCase();
        const matchesSearch = !query || searchable.includes(query);
        const matchesRegulation =
          filters.regulationType === "All" ||
          searchable.includes(filters.regulationType.toLowerCase());

        return matchesSearch && matchesRegulation;
      }),
    [activeActivity, filters.regulationType, query]
  );

  const filteredRiskSignals = useMemo(
    () =>
      activeRiskSignals.filter((signal) => {
        if (!query) {
          return true;
        }

        return `${signal.label} ${signal.trend}`.toLowerCase().includes(query);
      }),
    [activeRiskSignals, query]
  );

  const searchHighlights = useMemo(() => {
    const regulationNames = Array.from(
      new Set([
        ...(filteredAnalysis ? [filteredAnalysis.source] : []),
        ...filteredTasks.map((task) => task.regulation)
      ])
    ).slice(0, 3);

    return {
      tasks: filteredTasks.slice(0, 3).map((task) => `${task.id} · ${task.obligation}`),
      activity: filteredActivity.slice(0, 3).map((item) => item.title),
      regulations: regulationNames
    };
  }, [filteredActivity, filteredAnalysis, filteredTasks]);

  const hasActiveRefinement =
    query.length > 0 || Object.values(filters).some((value) => value !== "All");

  const dashboardKpis = useMemo(() => {
    const pendingCount = hasActiveRefinement
      ? filteredTasks.filter((task) => task.status !== "Validated").length
      : analysis
        ? 45
        : 42;
    const overdueCount = hasActiveRefinement
      ? filteredTasks.filter((task) => task.status === "Overdue").length
      : analysis
        ? 10
        : 9;
    const complianceScore = analysis?.complianceScore ?? 84;
    const riskLevel = analysis?.riskLevel ?? "Medium";

    return [
      {
        label: "Pending Tasks",
        value: String(pendingCount),
        delta: hasActiveRefinement ? "Filtered visible MAPs" : analysis ? "+3 AI-generated MAPs" : "+8 this week",
        icon: Clock3,
        tone: "text-sky-200"
      },
      {
        label: "Overdue Tasks",
        value: String(overdueCount),
        delta: hasActiveRefinement ? "Filtered by current view" : analysis ? "1 critical workflow watched" : "3 high impact",
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
  }, [analysis, filteredTasks, hasActiveRefinement]);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="min-w-0 flex-1">
        <TopNav
          title={viewTitles[activeView]}
          description={viewDescriptions[activeView]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          resultCounts={{
            tasks: filteredTasks.length,
            activity: filteredActivity.length,
            regulations: filteredAnalysis?.obligations.length ?? 0
          }}
          searchHighlights={searchHighlights}
        />
        <MobileNav activeView={activeView} onViewChange={setActiveView} />
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-5 sm:px-6">
          <KpiCards items={dashboardKpis} />

          {activeView === "dashboard" && (
            <ExecutiveDashboard
              analysis={filteredAnalysis}
              tasks={filteredTasks}
              riskSignals={filteredRiskSignals}
              onNavigate={(view) => setActiveView(view as DashboardView)}
            />
          )}

          {activeView === "uploads" && (
            <UploadWorkflow
              file={uploadedFile}
              progress={progress}
              uploadState={uploadState}
              analysis={filteredAnalysis}
              onFileSelected={handleFileSelected}
              onReset={resetWorkflow}
            />
          )}

          {activeView === "tasks" && (
            <TaskTable items={filteredTasks} state={uploadState} />
          )}

          {activeView === "validation" && (
            <EvidenceValidation analysis={analysis} state={uploadState} />
          )}

          {activeView === "risk" && (
            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <RiskMonitoring signals={filteredRiskSignals} riskLevel={activeRiskLevel} />
              <RecentActivity items={filteredActivity} />
            </div>
          )}

          {activeView === "analytics" && (
            <ControlAnalytics
              analysis={analysis}
              taskCount={filteredTasks.length}
              riskLevel={activeRiskLevel}
              complianceScore={analysis?.complianceScore ?? 84}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function UploadWorkflow({
  file,
  progress,
  uploadState,
  analysis,
  onFileSelected,
  onReset
}: {
  file: UploadedRegulationFile | null;
  progress: number;
  uploadState: UploadState;
  analysis: RegulationAnalysis | null;
  onFileSelected: (file: File) => void;
  onReset: () => void;
}) {
  return (
    <div className="grid gap-5">
      <UploadPanel
        file={file}
        progress={progress}
        state={uploadState}
        onFileSelected={onFileSelected}
        onReset={onReset}
      />
      <AnalysisResults analysis={analysis} state={uploadState} />
    </div>
  );
}

function ControlAnalytics({
  analysis,
  taskCount,
  riskLevel,
  complianceScore
}: {
  analysis: RegulationAnalysis | null;
  taskCount: number;
  riskLevel: string;
  complianceScore: number;
}) {
  const departments = analysis
    ? Array.from(new Set(analysis.obligations.flatMap((obligation) => obligation.departments)))
    : ["CISO Office", "SOC", "IAM", "Third Party Risk"];

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Control Analytics</CardTitle>
          <CardDescription>
            Mock posture overview for control owners and compliance leadership.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Metric label="Mapped tasks" value={String(taskCount)} />
          <Metric label="Compliance score" value={`${complianceScore}%`} />
          <Metric label="Risk level" value={riskLevel} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Ownership</CardTitle>
          <CardDescription>
            Impacted teams based on current mock regulatory analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {departments.map((department, index) => (
              <div
                key={department}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/[0.12] text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-white">{department}</p>
                </div>
                <span className="text-xs text-muted-foreground">{index + 2} controls</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
