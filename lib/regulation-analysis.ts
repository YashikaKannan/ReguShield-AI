export type UploadState = "idle" | "uploading" | "processing" | "complete";

export type UploadedRegulationFile = {
  name: string;
  size: number;
  uploadedAt: string;
};

export type ExtractedObligation = {
  title: string;
  deadline: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  departments: string[];
  securityRequirements: string[];
};

export type GeneratedMapTask = {
  id: string;
  regulation: string;
  obligation: string;
  owner: string;
  due: string;
  status: "In Progress" | "Overdue" | "Queued" | "Validated";
  risk: "Critical" | "High" | "Medium" | "Low";
};

export type RiskSignal = {
  label: string;
  score: number;
  trend: string;
};

export type ActivityItem = {
  title: string;
  meta: string;
};

export type RegulationAnalysis = {
  source: string;
  obligations: ExtractedObligation[];
  maps: GeneratedMapTask[];
  riskLevel: "Low" | "Medium" | "High";
  complianceScore: number;
  riskSignals: RiskSignal[];
  activity: ActivityItem[];
};

export function createMockRegulationAnalysis(fileName: string): RegulationAnalysis {
  const source = fileName.includes("CERT") ? "CERT-In Advisory" : "RBI Cyber Security Circular";

  return {
    source,
    obligations: [
      {
        title: "Privileged access must enforce phishing-resistant MFA",
        deadline: "30 days",
        severity: "Critical",
        departments: ["IAM", "CISO Office", "Core Banking"],
        securityRequirements: [
          "Enable MFA for privileged accounts",
          "Review exception register weekly",
          "Retain approval evidence"
        ]
      },
      {
        title: "Centralized audit logging must cover critical systems",
        deadline: "45 days",
        severity: "High",
        departments: ["SOC", "Infrastructure", "Audit"],
        securityRequirements: [
          "Maintain centralized audit logs",
          "Protect logs from tampering",
          "Monitor failed administrator actions"
        ]
      },
      {
        title: "External-facing assets require recurring vulnerability assessments",
        deadline: "Quarterly",
        severity: "High",
        departments: ["Security Engineering", "Application Owners"],
        securityRequirements: [
          "Conduct quarterly vulnerability assessments",
          "Track remediation SLAs",
          "Report unresolved critical findings"
        ]
      }
    ],
    maps: [
      {
        id: "MAP-2046",
        regulation: source,
        obligation: "Enable MFA for privileged accounts within 30 days",
        owner: "IAM Team",
        due: "30 days",
        status: "Queued",
        risk: "Critical"
      },
      {
        id: "MAP-2047",
        regulation: source,
        obligation: "Maintain centralized audit logs for critical banking systems",
        owner: "SOC Lead",
        due: "45 days",
        status: "In Progress",
        risk: "High"
      },
      {
        id: "MAP-2048",
        regulation: source,
        obligation: "Conduct quarterly vulnerability assessments for internet-facing assets",
        owner: "Security Engineering",
        due: "Quarterly",
        status: "Queued",
        risk: "High"
      }
    ],
    riskLevel: "High",
    complianceScore: 78,
    riskSignals: [
      { label: "Privileged access controls", score: 86, trend: "New critical requirement" },
      { label: "Audit log coverage", score: 79, trend: "Elevated" },
      { label: "Vulnerability remediation", score: 74, trend: "Rising" }
    ],
    activity: [
      {
        title: `${source} analyzed`,
        meta: "3 obligations and 3 MAPs generated"
      },
      {
        title: "Risk posture refreshed",
        meta: "Privileged access moved to high attention"
      },
      {
        title: "Evidence queue prepared",
        meta: "MFA policy and log retention proof requested"
      }
    ]
  };
}
