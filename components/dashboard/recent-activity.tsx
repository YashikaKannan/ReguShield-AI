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
        {items.map((item, index) => {
          const Icon = item.icon ?? activityIcons[index % activityIcons.length];

          return (
          <div key={item.title} className="flex gap-3">
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
