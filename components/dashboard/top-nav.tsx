import { Bell, Search, Settings2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/70 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldAlert className="h-4 w-4 text-primary" />
            RBI and CERT-In compliance workspace
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Executive Compliance Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden min-w-72 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-muted-foreground md:flex">
            <Search className="h-4 w-4" />
            Search controls, circulars, owners
          </div>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Settings">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
