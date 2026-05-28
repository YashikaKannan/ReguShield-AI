"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, CheckCircle2, Clock3, FileWarning, Search, Settings2, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DashboardFilters } from "@/lib/regulation-analysis";

type SearchHighlights = {
  tasks: string[];
  activity: string[];
  regulations: string[];
};

type TopNavProps = {
  title?: string;
  description?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  resultCounts: {
    tasks: number;
    activity: number;
    regulations: number;
  };
  searchHighlights: SearchHighlights;
};

export function TopNav({
  title = "Executive Compliance Dashboard",
  description = "RBI and CERT-In compliance workspace",
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  resultCounts,
  searchHighlights
}: TopNavProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((value) => value !== "All").length,
    [filters]
  );
  const unreadNotifications = notifications.filter((item) => item.unread).length;
  const showSearchPanel = searchFocused || searchQuery.trim().length > 0;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setSearchFocused(false);
      }

      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }

      if (filtersRef.current && !filtersRef.current.contains(target)) {
        setFiltersOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchFocused(false);
        setNotificationsOpen(false);
        setFiltersOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/70 px-4 py-4 backdrop-blur-xl transition-colors sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldAlert className="h-4 w-4 text-primary" />
            {description}
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div ref={searchContainerRef} className="relative">
            <div className="flex min-w-full items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-muted-foreground transition duration-200 focus-within:-translate-y-0.5 focus-within:border-primary/50 focus-within:bg-white/[0.085] focus-within:text-white focus-within:shadow-glow md:min-w-80">
              <Search className="h-4 w-4 text-primary" />
              <input
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-muted-foreground"
                placeholder="Search MAPs, activity, regulations"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="rounded p-0.5 text-muted-foreground transition hover:bg-white/10 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {showSearchPanel && (
              <div className="absolute left-0 top-12 z-30 w-[min(40rem,calc(100vw-2rem))] animate-in fade-in-0 zoom-in-95 rounded-lg border border-white/10 bg-background/95 p-4 shadow-glow backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Live search</p>
                    <p className="text-xs text-muted-foreground">
                      Filters MAP tasks, recent activity, and regulations in real time.
                    </p>
                  </div>
                  <Badge variant={searchQuery ? "info" : "muted"}>
                    {searchQuery ? "Filtering" : "Ready"}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <SearchMetric label="MAPs" value={resultCounts.tasks} />
                  <SearchMetric label="Activity" value={resultCounts.activity} />
                  <SearchMetric label="Regulations" value={resultCounts.regulations} />
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  <SearchResultsGroup
                    label="MAP tasks"
                    items={searchHighlights.tasks}
                    emptyText="No MAP tasks match the current filters."
                  />
                  <SearchResultsGroup
                    label="Recent activity"
                    items={searchHighlights.activity}
                    emptyText="No activity matches the current search."
                  />
                  <SearchResultsGroup
                    label="Regulations"
                    items={searchHighlights.regulations}
                    emptyText="No regulation names match the current search."
                  />
                </div>

                {!searchQuery && (
                  <div className="mt-4 rounded-md border border-primary/15 bg-primary/[0.06] p-3 text-xs text-primary/90">
                    Start typing to spotlight RBI or CERT-In controls, MAP ownership, and recent compliance activity.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative flex gap-2">
            <div ref={notificationsRef} className="relative">
            <Button
              variant="outline"
              size="icon"
              aria-label="Notifications"
              onClick={() => {
                setNotificationsOpen((open) => !open);
                setFiltersOpen(false);
              }}
              className="transition duration-200 hover:-translate-y-0.5"
            >
              <span className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-400" />
              </span>
            </Button>
            {unreadNotifications > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-400 px-1 text-[10px] font-semibold text-white">
                {unreadNotifications}
              </span>
            )}
            {notificationsOpen && <NotificationPanel />}
            </div>

            <div ref={filtersRef} className="relative">
            <Button
              variant="outline"
              size="icon"
              aria-label="Filters"
              onClick={() => {
                setFiltersOpen((open) => !open);
                setNotificationsOpen(false);
              }}
              className="transition duration-200 hover:-translate-y-0.5"
            >
              <span className="relative">
                <Settings2 className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </span>
            </Button>
            {filtersOpen && (
              <FilterPanel
                filters={filters}
                onFiltersChange={onFiltersChange}
                onClose={() => setFiltersOpen(false)}
              />
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-2 transition hover:bg-white/[0.06]">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function SearchResultsGroup({
  label,
  items,
  emptyText
}: {
  label: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3 transition hover:bg-white/[0.055]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <span className="text-[10px] uppercase tracking-wide text-primary/80">
          {items.length} match{items.length === 1 ? "" : "es"}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="text-xs leading-5 text-white/85">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const notifications = [
  {
    title: "Overdue compliance task",
    meta: "CERT-In reporting workflow needs owner review",
    time: "8 min ago",
    icon: FileWarning,
    unread: true
  },
  {
    title: "High-risk regulation detected",
    meta: "Privileged MFA obligation scored critical",
    time: "24 min ago",
    icon: ShieldAlert,
    unread: true
  },
  {
    title: "Evidence validation pending",
    meta: "MFA exception register requires signature",
    time: "1 hr ago",
    icon: Clock3,
    unread: true
  },
  {
    title: "Audit deadline reminder",
    meta: "Quarterly VA evidence due this week",
    time: "Yesterday",
    icon: CheckCircle2,
    unread: false
  }
];

function NotificationPanel() {
  return (
    <div className="absolute right-12 top-12 w-[min(22rem,calc(100vw-2rem))] animate-in fade-in-0 zoom-in-95 rounded-lg border border-white/10 bg-background/95 p-3 shadow-glow backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Notification Center</p>
        <Badge variant="destructive">3 unread</Badge>
      </div>
      <div className="space-y-2">
        {notifications.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3 transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/[0.12] text-primary">
              <item.icon className="h-4 w-4" />
              {item.unread && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-400" />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const filterOptions = {
  severity: ["All", "Critical", "High", "Medium", "Low"],
  department: ["All", "CISO Office", "SOC", "IAM", "Core Banking", "Security Engineering", "Third Party Risk"],
  status: ["All", "Queued", "In Progress", "Overdue", "Validated"],
  regulationType: ["All", "RBI", "CERT-In"]
} as const;

function FilterPanel({
  filters,
  onFiltersChange,
  onClose
}: {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  onClose: () => void;
}) {
  function updateFilter<Key extends keyof DashboardFilters>(key: Key, value: DashboardFilters[Key]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  return (
    <div className="absolute right-0 top-12 w-[min(24rem,calc(100vw-2rem))] animate-in fade-in-0 zoom-in-95 rounded-lg border border-white/10 bg-background/95 p-4 shadow-glow backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Frontend Filters</p>
          <p className="text-xs text-muted-foreground">Update visible dashboard data</p>
        </div>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground hover:bg-white/10 hover:text-white"
          onClick={onClose}
          aria-label="Close filters"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4 rounded-md border border-primary/15 bg-primary/[0.05] p-3 text-xs text-primary/90">
        Frontend-only filters update MAP tasks, activity, and regulation insights instantly.
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <FilterSelect
          label="Severity"
          value={filters.severity}
          options={filterOptions.severity}
          onChange={(value) => updateFilter("severity", value as DashboardFilters["severity"])}
        />
        <FilterSelect
          label="Department"
          value={filters.department}
          options={filterOptions.department}
          onChange={(value) => updateFilter("department", value)}
        />
        <FilterSelect
          label="Task status"
          value={filters.status}
          options={filterOptions.status}
          onChange={(value) => updateFilter("status", value as DashboardFilters["status"])}
        />
        <FilterSelect
          label="Regulation type"
          value={filters.regulationType}
          options={filterOptions.regulationType}
          onChange={(value) => updateFilter("regulationType", value as DashboardFilters["regulationType"])}
        />
      </div>

      <Button
        className="mt-4 w-full"
        variant="outline"
        onClick={() =>
          onFiltersChange({
            severity: "All",
            department: "All",
            status: "All",
            regulationType: "All"
          })
        }
      >
        Clear filters
      </Button>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2 text-xs text-muted-foreground">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none transition focus:border-primary/50 focus:bg-white/[0.09]"
      >
        {options.map((option) => (
          <option key={option} className="bg-slate-950 text-white" value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
