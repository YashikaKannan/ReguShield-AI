"use client";

import React, { useMemo } from "react";
import { Bolt, CalendarClock, ChartLine, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RegulationAnalysis, GeneratedMapTask, RiskSignal } from "@/lib/regulation-analysis";

type ExecutiveDashboardProps = {
  analysis: RegulationAnalysis | null;
  tasks: GeneratedMapTask[];
  riskSignals: RiskSignal[];
  onNavigate: (view: string) => void;
};

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => `${(i * 100) / (values.length - 1)},${100 - (v / max) * 100}`);
  const points = pts.join(" ");
  // area polygon closes down to bottom of viewBox for a subtle fill
  const areaPoints = `${points} 100,100 0,100`;
  return (
    <svg className="w-full h-16" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="sparkGradientArea" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#sparkGradientArea)" />
      <polyline fill="none" stroke="url(#sparkGradient)" strokeWidth={1.6} points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExecutiveDashboard({ analysis, tasks, riskSignals, onNavigate }: ExecutiveDashboardProps) {
  const overdueCount = tasks.filter((t) => t.status === "Overdue").length;
  const upcoming = tasks
    .slice()
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 3);

  const departmentHealth = useMemo(() => {
    const departments = new Map<string, number>();
    tasks.forEach((t) => {
      const key = t.owner || "Unknown";
      const prev = departments.get(key) ?? 0;
      departments.set(key, prev + 1);
    });
    return Array.from(departments.entries()).map(([dept, count]) => ({ dept, score: Math.max(60, 100 - count * 6) }));
  }, [tasks]);

  const governanceScore = analysis?.complianceScore ?? 84;
  const sparkValues = riskSignals.map((s) => s.score).slice(0, 8);

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="col-span-2 transform-gpu rounded-2xl border border-white/8 bg-gradient-to-b from-black/60 to-black/40 shadow-[0_12px_40px_rgba(2,6,23,0.6)] hover:shadow-[0_16px_56px_rgba(2,6,23,0.7)] transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-6">
              <div>
                <CardTitle className="text-2xl font-semibold">Compliance Posture</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Executive summary of governance and control posture</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Governance Score</div>
                <div className="mt-2 flex items-baseline gap-4">
                  <div className="text-5xl font-extrabold tracking-tight text-white">{governanceScore}%</div>
                  <Badge className="px-3 py-1.5 text-sm" variant={governanceScore > 80 ? "default" : governanceScore > 60 ? "info" : "destructive"}>{analysis?.riskLevel ?? "Medium"}</Badge>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Overall compliance across regulated domains</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="col-span-2">
                <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Risk trend</div>
                <div className="rounded-md bg-gradient-to-b from-white/3 to-transparent p-3">
                  {sparkValues.length > 0 ? <Sparkline values={sparkValues} /> : <div className="h-16 w-full rounded bg-white/6" />}
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">High-priority alerts</div>
                <div className="mt-3 space-y-3">
                  {riskSignals.slice(0, 3).map((s) => (
                    <div key={s.label} className="flex items-center justify-between gap-3 rounded-lg border border-white/6 p-3 hover:bg-white/[0.02] transition-all">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-amber-600/10 p-2">
                          <AlertCircle className="h-5 w-5 text-amber-300" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate">{s.label}</div>
                          <div className="text-xs text-muted-foreground truncate">{s.trend}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-white">{s.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-white/8 bg-black/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Jump to operational areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button onClick={() => onNavigate("uploads")} className="justify-start rounded-md border border-white/6 bg-white/5 px-4 py-2 hover:bg-white/8 transition" variant="ghost">
                <Bolt className="mr-3 h-4 w-4 text-primary" /> <span className="font-medium">Open Uploads</span>
              </Button>
              <Button onClick={() => onNavigate("tasks")} className="justify-start rounded-md border border-white/6 bg-white/5 px-4 py-2 hover:bg-white/8 transition" variant="ghost">
                <ShieldCheck className="mr-3 h-4 w-4 text-primary" /> <span className="font-medium">Review MAPs</span>
              </Button>
              <Button onClick={() => onNavigate("validation")} className="justify-start rounded-md border border-white/6 bg-white/5 px-4 py-2 hover:bg-white/8 transition" variant="ghost">
                <CalendarClock className="mr-3 h-4 w-4 text-primary" /> <span className="font-medium">Validate Evidence</span>
              </Button>
              <Button onClick={() => onNavigate("risk")} className="justify-start rounded-md border border-white/6 bg-white/5 px-4 py-2 hover:bg-white/8 transition" variant="ghost">
                <ChartLine className="mr-3 h-4 w-4 text-primary" /> <span className="font-medium">View Risk Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-xl border border-white/8 bg-black/15 shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Regulation Health Snapshot</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Top-level view of regulation coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">RBI</div>
                  <div className="text-lg font-semibold text-white">{analysis ? "Covered" : "Partial"}</div>
                </div>
                <div className="text-sm font-medium text-white">{analysis ? "85%" : "68%"}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">CERT-In</div>
                  <div className="text-lg font-semibold text-white">{analysis ? "Covered" : "Partial"}</div>
                </div>
                <div className="text-sm font-medium text-white">{analysis ? "79%" : "54%"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-white/8 bg-black/15 shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Department Health</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Top departments by compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentHealth.map((d) => (
                <div key={d.dept} className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{d.dept}</div>
                  <div className="text-sm font-semibold text-white">{d.score}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-white/8 bg-black/15 shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Overdue & Upcoming</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Counts and imminent deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Overdue items</div>
                <div className="text-3xl font-bold text-white">{overdueCount}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Upcoming deadlines</div>
                <div className="mt-2 space-y-2">
                  {upcoming.map((u) => (
                    <div key={u.id} className="flex items-center justify-between rounded-md border border-white/6 p-3 hover:bg-white/[0.02] transition">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate">{u.obligation}</div>
                        <div className="text-xs text-muted-foreground truncate">{u.owner}</div>
                      </div>
                      <div className="text-sm font-semibold text-white">{u.due}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-white/8 bg-black/12 p-5 shadow-sm">
        <div className="text-sm text-muted-foreground uppercase tracking-wide">Recent governance insights</div>
        <div className="mt-4 grid gap-3">
          <div className="text-sm text-white">Privileged access controls elevated to high — review MFA exceptions.</div>
          <div className="text-sm text-white">Quarterly vulnerability assessments scheduled for next 2 weeks.</div>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveDashboard;
