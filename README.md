# ReguShield AI

**ReguShield AI** is a frontend MVP for an agentic cyber governance dashboard designed specifically for banking cyber governance and regulatory compliance. It provides an executive-level command center for monitoring governance posture, compliance status, risk signals, and regulatory obligations across banking institutions.

## Overview

ReguShield AI is a production-ready Next.js application that serves as a governance operations hub. It features a high-level **executive dashboard** as the main entry point, alongside operational modules for:

- **Document Upload** — Upload regulatory evidence and governance documents
- **MAP Tasks** — Manage Mitigation Action Plans and compliance obligations
- **Evidence Validation** — Review and validate evidence artifacts against requirements
- **Risk Monitoring** — Track governance and control risk signals in real-time
- **Analytics/Insights** — View recent governance insights and compliance trends

The application operates as a **frontend-only MVP** with mock data, making it ideal for demonstration, design validation, and pre-backend development.

## Features

### Executive Dashboard
- **Governance Score** — High-level compliance posture with real-time trend visualization
- **High-Priority Alerts** — Filterable risk signals and control exceptions
- **Regulation Health Snapshot** — Compliance coverage across RBI and CERT-In domains
- **Department Health** — Compliance scores by department
- **Overdue & Upcoming** — Deadline tracking and task management
- **Recent Governance Insights** — Key policy and control alerts
- **Quick Actions** — One-click navigation to operational modules

### Operational Modules
- **Uploads** — Drag-and-drop file upload with mock validation feedback
- **Tasks (MAPs)** — Browse, filter, and sort Mitigation Action Plans by status and owner
- **Validation** — Evidence artifact review with pass/fail criteria and checkpoints
- **Risk Monitoring** — Real-time risk signal dashboard with trend indicators
- **Analysis** — Extracted obligation insights and compliance mapping results

### Core Capabilities
- **Mock-First Architecture** — All data is frontend-only; perfect for UI/UX prototyping
- **Role-Based UI** — Executive vs. operational views (frontend only)
- **Responsive Design** — Mobile-friendly dark theme with Tailwind CSS
- **Type-Safe** — Full TypeScript support with types for all data models
- **Premium Styling** — Polished UI with subtle gradients, shadows, and transitions
- **Accessibility** — Semantic HTML and keyboard navigation support

## Tech Stack

### Core Framework
- **Next.js 15.0** — React-based framework with App Router (SSR & SSG)
- **React 19** — Latest React library for UI components
- **TypeScript 5.6** — Type-safe development

### Styling & UI
- **Tailwind CSS 3.4** — Utility-first CSS framework
- **shadcn/ui Pattern** — Component library philosophy (custom components)
- **Radix UI 1.x** — Unstyled, accessible component primitives
- **Lucide React 0.468** — Icon library with 400+ icons

### Utilities
- **clsx** — Conditional class name management
- **tailwind-merge** — Tailwind class conflict resolution

## Project Structure

```
d:\ReguShield AI\
├── app/
│   ├── globals.css           # Global styles and Tailwind setup
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Home page (renders DashboardShell)
├── components/
│   ├── dashboard/            # Dashboard layout & navigation
│   │   ├── dashboard-shell.tsx       # Main layout container
│   │   ├── executive-dashboard.tsx   # Executive command center
│   │   ├── sidebar.tsx               # Navigation sidebar (client component)
│   │   ├── top-nav.tsx               # Top navigation with search & alerts
│   │   ├── kpi-cards.tsx             # KPI display cards
│   │   ├── recent-activity.tsx       # Activity timeline
│   │   └── mock-data.ts              # Frontend mock data
│   ├── upload/
│   │   └── upload-panel.tsx          # File upload interface
│   ├── tasks/
│   │   └── task-table.tsx            # MAP task list & management
│   ├── validation/
│   │   └── evidence-validation.tsx   # Evidence review interface
│   ├── risk-monitoring/
│   │   └── risk-monitoring.tsx       # Risk signal dashboard
│   ├── analysis/
│   │   └── analysis-results.tsx      # Analysis insights view
│   └── ui/                   # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── progress.tsx
├── lib/
│   ├── regulation-analysis.ts        # Type definitions & data models
│   └── utils.ts                      # Utility functions
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.mjs        # PostCSS configuration
└── package.json              # Dependencies & scripts
```

## Getting Started

### Prerequisites
- **Node.js 18+** (recommended 20 LTS)
- **npm 9+** or **pnpm**

### Local Development

1. **Clone and install:**
   ```bash
   cd d:\ReguShield AI
   npm install
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. **Browse the dashboard:**
   - **Executive Dashboard** — Main view with governance score and insights
   - **Uploads Tab** — Try uploading mock files
   - **Tasks Tab** — Browse MAP tasks (searchable, filterable)
   - **Validation Tab** — View evidence artifacts
   - **Risk Tab** — Check risk signals and trends
   - **Analytics Tab** — See recent activity and insights

### Production Build

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm run start
   ```
   Serves from `http://localhost:3000`

3. **Lint check:**
   ```bash
   npm run lint
   ```

## How the Mock Workflow Works

All data in ReguShield AI is **frontend-only mock data**, enabling rapid UI iteration without backend dependencies.

### Data Sources

1. **Mock Data Storage** (`components/dashboard/mock-data.ts`)
   - Tasks, risk signals, activity logs, KPIs, and evidence checks
   - Frontend-only; no API calls

2. **Type Definitions** (`lib/regulation-analysis.ts`)
   - `RegulationAnalysis` — Governance analysis with score, risk level, obligations
   - `GeneratedMapTask` — MAP task with ID, title, status, owner, due date
   - `RiskSignal` — Risk signal with label, score, trend
   - `UploadState` — Upload status tracking
   - `ActivityItem` — Activity log entry
   - `EvidenceCheck` — Evidence validation checkpoint

3. **Stateful Views** (`components/dashboard/dashboard-shell.tsx`)
   - Manages local state for uploads, search, filters
   - Mocks analysis results and task filtering
   - Simulates upload processing without backend

### Typical User Flow

1. **Executive Dashboard (Default)**
   - User lands on governance score overview
   - Reviews high-priority alerts and compliance posture
   - Uses quick actions to jump to operational areas

2. **Upload Documents**
   - Select file tab → click "Upload Evidence"
   - Mock upload feedback shows validation in progress
   - "Analyze" button triggers mock analysis result

3. **Review Tasks**
   - Tasks tab shows MAP obligations
   - Filter by owner or status (Pending, In Progress, Overdue)
   - Search for specific obligations
   - Click task to view details

4. **Validate Evidence**
   - Validation tab displays evidence artifacts
   - Each artifact has pass/fail checkpoints
   - Mock score reflects validation progress

5. **Monitor Risk**
   - Risk tab aggregates risk signals with trends
   - See control exceptions and compliance gaps
   - Trends update to show positive/negative direction

### Extending Mock Data

To add or modify mock data:

1. Edit `components/dashboard/mock-data.ts`:
   ```typescript
   export const tasks: GeneratedMapTask[] = [
     { id: "1", title: "...", status: "...", owner: "...", due: "..." },
     // Add more tasks
   ];
   ```

2. Update types in `lib/regulation-analysis.ts` if adding new fields.

3. Use the data in components via `import { tasks } from "@/components/dashboard/mock-data"`.

## Deployment

### GitHub & Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Production-ready ReguShield AI"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import repository → Select `d:\ReguShield AI`
   - Default settings work (Next.js detected automatically)
   - Deploy

3. **Environment Variables** (if needed later):
   - Add `.env.local` for local secrets
   - Add variables in Vercel project settings for production

### Custom Hosting

- **Build output:** `npm run build` creates `.next` folder with optimized bundles
- **Node server:** `npm run start` serves production build on port 3000
- **Static export:** (Optional) Configure `output: "export"` in `next.config.ts` for static hosting

## Configuration Files

### `next.config.ts`
- React strict mode enabled
- Standard Next.js defaults

### `tailwind.config.ts`
- Dark theme base colors
- Custom spacing and font sizes
- Animation utilities included

### `tsconfig.json`
- Target: ES2020
- Module resolution: Node
- Path alias: `@/*` → `./`

## Current Limitations & Future Enhancements

### Current State (MVP)
- ✅ Frontend-only, no backend API
- ✅ Mock data with realistic workflows
- ✅ Type-safe component architecture
- ✅ Responsive dark UI
- ✅ All tabs functional and interactive

### Planned Enhancements
- Backend API for uploads, analysis, and data persistence
- Real AI extraction pipeline for document analysis
- Authentication & role-based access control (RBAC)
- Database integration for task & evidence storage
- Email/notification alerts
- Export capabilities (PDF, Excel reports)
- Audit logging and compliance history
- Multi-tenant support for banking groups

## Development Guidelines

### Adding a New Component
1. Create file in appropriate `components/` subdirectory
2. Use React functional components with TypeScript
3. Import UI primitives from `components/ui/`
4. Style with Tailwind CSS utility classes
5. Export named export (not default)

### Adding a New Tab
1. Create component and add to `dashboard-shell.tsx` imports
2. Add tab button in tab navigation
3. Add case in view switch logic
4. Pass relevant props (analysis, tasks, riskSignals, etc.)

### Styling Conventions
- Use Tailwind utility classes exclusively
- Color palette: `gray`, `white`, `blue`, `amber`, `red`, `green`
- Dark theme: `bg-black`, `text-white`, backgrounds with `/` opacity
- Spacing: use Tailwind scale (gap-2, p-4, etc.)
- Borders: `border-white/8`, `border-white/6` for subtle divides

## Support & Questions

For issues, feature requests, or questions:
1. Check existing code in `components/` for similar patterns
2. Review type definitions in `lib/regulation-analysis.ts`
3. Consult mock data in `components/dashboard/mock-data.ts`

## License

Proprietary — ReguShield AI (Banking Cyber Governance)
