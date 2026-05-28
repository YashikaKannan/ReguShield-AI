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
    regulation: "RBI Cyber Security Framework for Banks and NBFCs",
    obligation: "Quarterly vulnerability assessment for internet-facing assets and payment gateways",
    owner: "CISO Office",
    due: "14 Jun",
    status: "In Progress",
    risk: "High"
  },
  {
    id: "MAP-1043",
    regulation: "CERT-In Directions on Incident Reporting",
    obligation: "Validate 6-hour incident reporting workflow and escalation matrix",
    owner: "SOC Lead",
    due: "08 Jun",
    status: "Overdue",
    risk: "Critical"
  },
  {
    id: "MAP-1044",
    regulation: "RBI Master Direction on Digital Payment Security Controls",
    obligation: "Reconcile MFA exceptions for privileged payment systems and UPI admin roles",
    owner: "IAM Team",
    due: "21 Jun",
    status: "Queued",
    risk: "Medium"
  },
  {
    id: "MAP-1045",
    regulation: "RBI IT Outsourcing Directions",
    obligation: "Collect vendor cyber resilience attestations and annual assurance letters",
    owner: "Third Party Risk",
    due: "29 Jun",
    status: "Validated",
    risk: "Low"
  },
  {
    id: "MAP-1046",
    regulation: "RBI Master Direction - Digital Lending",
    obligation: "Confirm customer consent logs and lender disclosure timestamps",
    owner: "Core Banking",
    due: "05 Jul",
    status: "In Progress",
    risk: "High"
  },
  {
    id: "MAP-1047",
    regulation: "CERT-In Cyber Security Directions",
    obligation: "Retain log aggregation evidence for critical banking services",
    owner: "Security Engineering",
    due: "01 Jul",
    status: "Queued",
    risk: "Medium"
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
    meta: "4 obligations extracted from incident reporting update",
    icon: TrendingUp
  },
  {
    title: "Evidence accepted for MAP-1036",
    meta: "SOC2 bridge letter validated for core banking audit",
    icon: CheckCircle2
  },
  {
    title: "RBI circular queued for review",
    meta: "Digital lending controls mapped to customer consent logs",
    icon: FileWarning
  },
  {
    title: "Vendor attestation reviewed",
    meta: "Third-party cyber resilience evidence signed off",
    icon: CheckCircle2
  },
  {
    title: "MFA exception register refreshed",
    meta: "Privileged access controls moved to high priority",
    icon: FileWarning
  }
];
