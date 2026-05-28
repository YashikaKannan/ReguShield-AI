import {
  Activity,
  ClipboardCheck,
  FileUp,
  Gauge,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Regulatory Uploads", icon: FileUp },
  { label: "MAP Tasks", icon: ClipboardCheck },
  { label: "Evidence Validation", icon: ShieldCheck },
  { label: "Risk Monitoring", icon: Activity },
  { label: "Control Analytics", icon: Gauge }
];

export function Sidebar() {
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
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-white",
              item.active && "bg-primary/[0.12] text-primary"
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
