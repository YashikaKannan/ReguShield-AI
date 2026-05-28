import {
  Activity,
  ClipboardCheck,
  FileUp,
  Gauge,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DashboardView =
  | "dashboard"
  | "uploads"
  | "tasks"
  | "validation"
  | "risk"
  | "analytics";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { label: "Regulatory Uploads", icon: FileUp, view: "uploads" },
  { label: "MAP Tasks", icon: ClipboardCheck, view: "tasks" },
  { label: "Evidence Validation", icon: ShieldCheck, view: "validation" },
  { label: "Risk Monitoring", icon: Activity, view: "risk" },
  { label: "Control Analytics", icon: Gauge, view: "analytics" }
] as const;

type SidebarProps = {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
};

export const viewTitles: Record<DashboardView, string> = {
  dashboard: "Executive Compliance Dashboard",
  uploads: "Regulatory Uploads",
  tasks: "AI-Generated MAP Tasks",
  validation: "Evidence Validation",
  risk: "Compliance Risk Monitoring",
  analytics: "Control Analytics"
};

export const viewDescriptions: Record<DashboardView, string> = {
  dashboard: "RBI and CERT-In compliance workspace",
  uploads: "Upload circulars and simulate AI obligation extraction",
  tasks: "Review generated measurable action points",
  validation: "Track evidence readiness against mapped controls",
  risk: "Monitor compliance risk signals across cyber controls",
  analytics: "Analyze control posture and department ownership"
};

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-black/20 px-4 py-5 backdrop-blur-xl lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/15 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">ReguShield AI</p>
          <p className="text-xs text-muted-foreground">Cyber governance cockpit</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onViewChange(item.view)}
            aria-current={activeView === item.view ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-white",
              activeView === item.view && "bg-primary/[0.12] text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export function MobileNav({
  activeView,
  onViewChange
}: SidebarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-black/10 px-4 py-3 lg:hidden">
      {navItems.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onViewChange(item.view)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-muted-foreground",
            activeView === item.view && "border-primary/30 bg-primary/[0.12] text-primary"
          )}
        >
          <item.icon className="h-3.5 w-3.5" />
          {item.label}
        </button>
      ))}
    </div>
  );
}
