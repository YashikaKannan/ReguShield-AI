import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { tasks } from "@/components/dashboard/mock-data";
import type { GeneratedMapTask, UploadState } from "@/lib/regulation-analysis";

const statusVariant = {
  "In Progress": "info",
  Overdue: "destructive",
  Queued: "muted",
  Validated: "default"
} as const;

const riskVariant = {
  Critical: "destructive",
  High: "warning",
  Medium: "info",
  Low: "default"
} as const;

type TaskTableProps = {
  items?: GeneratedMapTask[];
  state?: UploadState;
};

export function TaskTable({ items = tasks, state = "idle" }: TaskTableProps) {
  const isProcessing = state === "processing";

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Generated MAPs</CardTitle>
        <CardDescription>
          Measurable action points generated from current regulatory inputs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isProcessing && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/[0.06] p-3 text-sm text-primary">
            Generating measurable action points from extracted obligations...
          </div>
        )}
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="bg-white/[0.045] text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">MAP ID</th>
                  <th className="px-4 py-3 font-medium">Obligation</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Due</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isProcessing && <TaskSkeletonRows />}
                {!isProcessing && items.map((task) => (
                  <tr key={task.id} className="bg-white/[0.018]">
                    <td className="px-4 py-4 font-medium text-primary">{task.id}</td>
                    <td className="max-w-md px-4 py-4">
                      <p className="font-medium text-white">{task.obligation}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{task.regulation}</p>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{task.owner}</td>
                    <td className="px-4 py-4 text-muted-foreground">{task.due}</td>
                    <td className="px-4 py-4">
                      <Badge variant={statusVariant[task.status as keyof typeof statusVariant]}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={riskVariant[task.risk as keyof typeof riskVariant]}>
                        {task.risk}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskSkeletonRows() {
  return (
    <>
      {[0, 1, 2].map((row) => (
        <tr key={row} className="animate-pulse bg-white/[0.018]">
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <td key={cell} className="px-4 py-4">
              <div className="h-4 rounded bg-white/10" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
