import type { LucideIcon } from "lucide-react";
import { kpis } from "@/components/dashboard/mock-data";
import { Card, CardContent } from "@/components/ui/card";

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone: string;
};

type KpiCardsProps = {
  items?: Kpi[];
};

export function KpiCards({ items = kpis }: KpiCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => (
        <Card key={kpi.label} className="transition duration-300 hover:-translate-y-0.5">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {kpi.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{kpi.delta}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.08] p-2">
                <kpi.icon className={`h-5 w-5 ${kpi.tone}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
