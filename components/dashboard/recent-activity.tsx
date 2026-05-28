import { CheckCircle2, FileWarning, TrendingUp, type LucideIcon } from "lucide-react";
import { activity } from "@/components/dashboard/mock-data";
import type { ActivityItem } from "@/lib/regulation-analysis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type RecentActivityProps = {
  items?: RecentActivityItem[];
};

type RecentActivityItem = ActivityItem & {
  icon?: LucideIcon;
};

export function RecentActivity({ items = activity }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Regulations & Activity</CardTitle>
        <CardDescription>Latest mock regulatory events and platform updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-5 text-center text-sm text-muted-foreground">
            <p className="font-medium text-white">No recent activity matches the current view</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the header search or filters to bring RBI and CERT-In events back into focus.
            </p>
          </div>
        )}
        {items.map((item, index) => {
          const Icon = item.icon ?? activityIcons[index % activityIcons.length];

          return (
            <div key={item.title} className="flex gap-3 rounded-md px-2 py-1 transition hover:bg-white/[0.03]">
              <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/[0.08] text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

const activityIcons = [TrendingUp, CheckCircle2, FileWarning];
