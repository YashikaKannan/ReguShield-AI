import { Activity, BarChart3 } from "lucide-react";
import { riskSignals } from "@/components/dashboard/mock-data";
import type { RiskSignal } from "@/lib/regulation-analysis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type RiskMonitoringProps = {
  signals?: RiskSignal[];
  riskLevel?: string;
};

export function RiskMonitoring({ signals = riskSignals, riskLevel = "Medium" }: RiskMonitoringProps) {
  const bars = signals.flatMap((signal) => [signal.score - 24, signal.score - 12, signal.score]);
  const chartBars = bars.length > 0 ? bars.slice(0, 8) : [0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Risk Monitoring</CardTitle>
        <CardDescription>
          Live risk posture mockup across critical cyber controls. Current level: {riskLevel}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-8 items-end gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-4">
          {chartBars.map((height, index) => (
            <div key={index} className="flex h-32 items-end">
              <div
                className={`w-full rounded-t ${
                  signals.length > 0
                    ? "bg-gradient-to-t from-primary/40 to-sky-300"
                    : "bg-white/10"
                }`}
                style={{ height: `${Math.max(24, Math.min(height, 92))}%` }}
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {signals.length === 0 && (
            <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-5 text-center text-sm text-muted-foreground">
              <p className="font-medium text-white">No risk signals match the current view</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Adjust search or filters to surface compliance posture signals again.
              </p>
            </div>
          )}
          {signals.map((signal) => (
            <div key={signal.label} className="flex items-center justify-between gap-4 rounded-md px-2 py-1 transition hover:bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-white/[0.08] text-sky-200">
                  {signal.trend === "Rising" ? (
                    <Activity className="h-4 w-4" />
                  ) : (
                    <BarChart3 className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{signal.label}</p>
                  <p className="text-xs text-muted-foreground">{signal.trend}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-white">{signal.score}/100</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
