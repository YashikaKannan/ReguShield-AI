import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileWarning,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import type { GeneratedMapTask, RiskSignal } from "@/lib/regulation-analysis";

export const kpis = [
  {
    label: "Pending Tasks",
    value: "42",
    delta: "+8 this week",
    icon: Clock3,
    tone: "text-sky-200"
  },
  {
    label: "Overdue Tasks",
    value: "9",
    delta: "3 high impact",
    icon: FileWarning,
    tone: "text-red-200"
  },
  {
    label: "Compliance Score",
    value: "84%",
    delta: "+6% vs last audit",
    icon: ShieldCheck,
    tone: "text-teal-200"
  },
  {
    label: "Risk Level",
    value: "Medium",
    delta: "Cloud controls watched",
    icon: AlertTriangle,
    tone: "text-amber-200"
  }
];

export const tasks: GeneratedMapTask[] = [
  {
    id: "MAP-1042",
    regulation: "RBI Cyber Security Framework",
    obligation: "Quarterly vulnerability assessment for internet-facing assets",
    owner: "CISO Office",
    due: "14 Jun",
    status: "In Progress",
    risk: "High"
  },
  {
    id: "MAP-1043",
    regulation: "CERT-In Incident Reporting",
    obligation: "Validate 6-hour reporting workflow and escalation matrix",
    owner: "SOC Lead",
    due: "08 Jun",
    status: "Overdue",
    risk: "Critical"
  },
  {
    id: "MAP-1044",
    regulation: "RBI Digital Payment Security",
    obligation: "Reconcile MFA exceptions for privileged payment systems",
    owner: "IAM Team",
    due: "21 Jun",
    status: "Queued",
    risk: "Medium"
  },
  {
    id: "MAP-1045",
    regulation: "RBI IT Outsourcing Directions",
    obligation: "Collect vendor cyber resilience attestations",
    owner: "Third Party Risk",
    due: "29 Jun",
    status: "Validated",
    risk: "Low"
  }
];

export const evidenceChecks = [
  { label: "Policy document freshness", value: 92, status: "Passed" },
  { label: "Control owner signature", value: 68, status: "Needs Review" },
  { label: "Evidence-regulation match", value: 81, status: "Passed" }
];

export const riskSignals: RiskSignal[] = [
  { label: "Incident reporting SLA", score: 73, trend: "Elevated" },
  { label: "Vendor concentration", score: 58, trend: "Stable" },
  { label: "Cloud misconfiguration", score: 66, trend: "Rising" }
];

export const activity = [
  {
    title: "CERT-In advisory parsed",
    meta: "4 obligations extracted",
    icon: TrendingUp
  },
  {
    title: "Evidence accepted for MAP-1036",
    meta: "SOC2 bridge letter validated",
    icon: CheckCircle2
  },
  {
    title: "RBI circular queued for review",
    meta: "Digital lending controls",
    icon: FileWarning
  }
];
