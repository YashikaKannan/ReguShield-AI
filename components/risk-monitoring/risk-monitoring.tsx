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
          {bars.slice(0, 8).map((height, index) => (
            <div key={index} className="flex h-32 items-end">
              <div
                className="w-full rounded-t bg-gradient-to-t from-primary/40 to-sky-300"
                style={{ height: `${Math.max(24, Math.min(height, 92))}%` }}
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {signals.map((signal) => (
            <div key={signal.label} className="flex items-center justify-between gap-4">
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
