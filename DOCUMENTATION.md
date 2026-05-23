# STEM-ED-AI — Complete Platform Documentation

**Version:** 1.0.0  
**Brand:** SERA Neural Labs  
**Pilot Institutions:** Atlanta Technical College (ATC) · Georgia Southern University (GSU)  
**Live URL:** https://stem-ed-ai.vercel.app  
**GitHub:** https://github.com/peddapudisiva/stem-ed-ai  

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [User Roles](#4-user-roles)
5. [Dashboards](#5-dashboards)
6. [AI Agents](#6-ai-agents)
7. [Features](#7-features)
8. [Pages & Routes](#8-pages--routes)
9. [Security & Compliance](#9-security--compliance)
10. [Design System](#10-design-system)
11. [Demo Data](#11-demo-data)
12. [Environment Variables](#12-environment-variables)
13. [Deployment](#13-deployment)

---

## 1. Platform Overview

STEM-ED-AI is a full-stack enterprise EdTech SaaS platform built to solve three core problems in higher education:

| Problem | Solution |
|---------|----------|
| High student dropout rates | SKORA retention scoring + at-risk alerts |
| Fragmented tools (LMS, SIS, gradebook) | Unified platform across all roles |
| Manual curriculum governance | AI-powered proposal workflow + eCatalog |

The platform serves **8 different user roles** through dedicated dashboards, powered by **10 specialized AI agents** that each operate within strict ethical boundaries.

**Pilot Data:**
- Atlanta Technical College: 3,493 students · 60% retention · 73% target
- Georgia Southern University: 26,500 students · 78% retention · 85% target
- Kennesaw State University: 43,000 students · 81% retention · 88% target

---

## 2. Tech Stack

### Frontend
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 16.2.6 | App Router, SSR, file-based routing |
| Language | TypeScript | 5.x (strict) | Type safety across all files |
| Styling | Tailwind CSS | v4 | Utility-first CSS, @theme inline tokens |
| UI Components | shadcn/ui (New York) | Latest | Accessible, customizable components |
| Animation | Framer Motion | ^12 | Page transitions, micro-animations |
| State Management | Zustand | ^5 | Global auth, notifications, assistant state |
| Data Fetching | TanStack Query | v5 | Server state, caching, background refetch |
| Forms | React Hook Form + Zod | Latest | Validated forms with schema inference |
| Charts | Recharts | Latest | Data visualization, retention charts |
| Calendar | date-fns | ^4.1.0 | Date arithmetic for calendar views |
| Icons | Lucide React | Latest | Consistent icon system (no emoji in UI) |
| Drag & Drop | Native HTML5 DnD | — | Dashboard widget reordering |
| Font | Outfit (display) + Inter (body) + JetBrains Mono | Google Fonts | Typography system |

### Backend (Planned / Integration-ready)
| Layer | Technology | Purpose |
|-------|-----------|---------|
| API | FastAPI (Python 3.11+) | REST endpoints for AI agent pipeline |
| Database | Supabase (PostgreSQL) | Primary data store with RLS |
| Auth | Supabase Auth | Email/password, Google SSO, SAML |
| Storage | Supabase Storage | Course files, avatars, documents |
| Realtime | Supabase Realtime | Live notifications, messaging |
| Vector DB | Qdrant | RAG retrieval for AI agents |
| LLM | Groq API (Llama 3.1 8B) | AI agent inference, fast responses |
| LLM Fallback | Ollama | Local LLM fallback |

### DevOps
| Tool | Purpose |
|------|---------|
| Vercel | Frontend deployment, auto-deploy from GitHub |
| Railway | Backend API deployment |
| GitHub | Source control, CI/CD trigger |
| GitHub CLI (gh) | Repo management from terminal |
| Vercel CLI | Manual deployments |

---

## 3. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     STEM-ED-AI Frontend                  │
│              Next.js 16 App Router (Vercel)              │
├──────────────┬──────────────┬──────────────┬────────────┤
│  Student     │   Teacher    │    Admin     │  District  │
│  Dashboard   │  Dashboard   │  Dashboard   │ Dashboard  │
├──────────────┴──────────────┴──────────────┴────────────┤
│              Shared: AppShell + Sidebar + Topbar         │
│              Zustand Store · TanStack Query               │
├─────────────────────────────────────────────────────────┤
│                    AI Workspace Layer                    │
│         10 Agents · Streaming UI · Multi-agent mode      │
├─────────────────────────────────────────────────────────┤
│                   FastAPI Backend (Railway)              │
│    RAG Pipeline: Memory → Context → LLM → Audit Log     │
├──────────────┬──────────────┬──────────────────────────┤
│  Supabase    │    Qdrant    │      Groq API            │
│  PostgreSQL  │  Vector DB   │   Llama 3.1 8B           │
│  + RLS Auth  │  (RAG)       │   (Inference)            │
└──────────────┴──────────────┴──────────────────────────┘
```

### AI Agent Pipeline
```
User Message
    ↓
Fetch memory (Supabase)
    ↓
RAG context retrieval (Qdrant)
    ↓
Merge: memory + context + message
    ↓
LLM call (Groq API)
    ↓
Save memory (Supabase)
    ↓
Write audit log entry
    ↓
Stream response to UI
```

### Data Isolation (Multi-Tenancy)
```
ATC tenant ──→ Supabase RLS Policy ──→ ATC data only
GSU tenant ──→ Supabase RLS Policy ──→ GSU data only
                     ↑
              FERPA boundary enforced
         Student data NEVER crosses institutions
```

---

## 4. User Roles

The platform supports **8 distinct roles**, each with a dedicated dashboard and navigation set.

| Role | Key Responsibilities | Dashboard URL |
|------|---------------------|---------------|
| **Student** | Learning, assessments, mentoring, credentials | `/dashboard/student` |
| **Teacher** | Teaching, grading, attendance, curriculum | `/dashboard/teacher` |
| **Admin** | School management, reports, faculty oversight | `/dashboard/admin` |
| **District Leader** | Multi-school analytics, retention strategy | `/dashboard/district` |
| **Curriculum Committee** | Course proposals, eCatalog, approval workflow | `/dashboard/curriculum` |
| **GovCon** | Federal opportunity tracking, compliance | `/dashboard/govcon` |
| **IT / Cyber** | NIST RMF, FERPA compliance, audit logs | `/dashboard/cyber` |
| **Parent** | Child overview, messaging, fee status | `/dashboard/parent` |

**Role Switching:** Users can switch roles from the sidebar footer dropdown to preview other dashboards. Active role is persisted in Zustand store.

---

## 5. Dashboards

### 5.1 Student Dashboard
**Route:** `/dashboard/student`

**Features:**
- KPI strip: GPA, XP level, attendance %, active streak
- Course progress cards with percentage bars and next class time
- Assignment feed with deadline countdown and direct quiz launch
- Gamification: XP bar, level badge, daily streak flame
- At-a-glance grade status per course
- Quick-launch AI Tutor widget

**Sub-pages:**
| Page | Route | Description |
|------|-------|-------------|
| Courses | `/dashboard/student/courses` | All enrolled courses with progress |
| Course Detail | `/dashboard/student/courses/[id]` | Materials, assessments, overview tabs |
| AI Tutor | `/dashboard/student/tutor` | Live AI chat with course context |
| Timed Assessment | `/dashboard/student/assessment/[id]` | Countdown timer, MCQ, auto-submit |
| Credentials | `/dashboard/student/credentials` | Badges, XP, certifications, LinkedIn share |
| Mentors | `/dashboard/student/mentors` | NABA mentor matching with match score ring |
| Community | `/dashboard/student/community` | Course discussion boards, threaded replies |

---

### 5.2 Teacher Dashboard
**Route:** `/dashboard/teacher`

**Features:**
- Class roster KPIs: enrolled students, avg grade, attendance rate
- At-risk student alerts with SKORA scores
- Recent submissions feed
- Quick links to gradebook, attendance, curriculum tools

**Sub-pages:**
| Page | Route | Description |
|------|-------|-------------|
| Classes | `/dashboard/teacher/classes` | All classes with student counts and actions |
| Gradebook | `/dashboard/teacher/gradebook` | Full grade table, letter grades, GPA |
| Attendance | `/dashboard/teacher/attendance` | Mark present/absent/tardy/excused per student |
| Course Files | `/dashboard/teacher/files` | Drag-and-drop file uploads, file type detection |
| Curriculum | `/dashboard/teacher/curriculum` | Lesson plan builder, curriculum maps |
| AI Assistant | `/dashboard/teacher/assistant` | Teacher-focused AI for lesson generation |
| Assessment Builder | `/dashboard/teacher/assessment` | Create MCQ/short-answer quizzes |

---

### 5.3 Admin Dashboard
**Route:** `/dashboard/admin`

**Features:**
- Institution-wide KPIs: total students, faculty count, avg retention, compliance score
- At-risk student directory with risk scores and intervention flags
- Faculty list with course load and PD compliance status
- Quick-access report launcher

**Sub-pages:**
| Page | Route | Description |
|------|-------|-------------|
| Students | `/dashboard/admin/students` | Full student directory with search and filters |
| Faculty | `/dashboard/admin/faculty` | Faculty roster, course assignments, PD status |
| PD Catalog | `/dashboard/admin/pd-catalog` | Professional development courses, completion tracking |
| Reports | `/dashboard/admin/reports` | Compliance, custom builder, saved reports |
| Tenants | `/dashboard/admin/tenants` | Super-admin: all institutions, storage, FERPA status |

---

### 5.4 District Leader Dashboard
**Route:** `/dashboard/district`

**Features:**
- Multi-institution retention comparison chart
- SKORA score trends across schools
- At-risk student count per institution
- GovCon pipeline overview

**Sub-pages:**
| Page | Route | Description |
|------|-------|-------------|
| Retention | `/dashboard/district/retention` | SKORA retention analytics, cohort trends |
| Schools | `/dashboard/district/schools` | School-by-school comparison table |
| GovCon | `/dashboard/district/govcon` | Federal opportunity pipeline |
| Reports | `/dashboard/admin/reports` | Shared reporting access |

---

### 5.5 Curriculum Committee Dashboard
**Route:** `/dashboard/curriculum`

**Features:**
- Proposal pipeline overview (Draft → Review → Approved)
- AI score for each proposal (curriculum quality rating)
- Recent activity feed
- eCatalog quick access

**Sub-pages:**
| Page | Route | Description |
|------|-------|-------------|
| Proposals | `/dashboard/curriculum/proposals` | All proposals with status and AI scores |
| New Proposal | `/dashboard/curriculum/proposals/new` | Multi-step proposal creation wizard |
| Proposal Detail | `/dashboard/curriculum/proposals/[id]` | Full proposal view, approval workflow |
| eCatalog | `/dashboard/curriculum/catalog` | Course catalog with enrollment data |
| AI Assistant | `/dashboard/curriculum/assistant` | Curriculum Architect AI agent |

---

### 5.6 GovCon Dashboard
**Route:** `/dashboard/govcon`

**Features:**
- SAM.gov opportunity feed (mock)
- Pipeline stages: Identified → Qualifying → Bidding → Won/Lost
- Compliance checklist per opportunity
- Win rate and pipeline value metrics

---

### 5.7 IT / Cyber Dashboard
**Route:** `/dashboard/cyber`

**Sub-pages:**
| Page | Route | Description |
|------|-------|-------------|
| Risk | `/dashboard/cyber/risk` | NIST RMF score, risk heatmap, open findings |
| Compliance | `/dashboard/cyber/compliance` | FERPA, CMMC, Section 508 compliance status |
| Audit Log | `/dashboard/cyber/audit` | Every agent action and admin operation logged |

---

### 5.8 Parent Dashboard
**Route:** `/dashboard/parent`

**Features:**
- Multi-child overview cards with GPA and attendance
- Teacher message inbox
- Fee payment status
- Announcement feed
- Absence notifications

---

## 6. AI Agents

All 10 agents operate within **strictly enforced ethical boundaries**. No agent can exceed its defined scope.

### Agent Pipeline (applies to all agents)
```
User input → Memory fetch → RAG retrieval → LLM inference → Memory save → Audit log
```

---

### 6.1 Tutor Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Personalized 1:1 student learning support |
| **Used by** | Students |
| **Access point** | `/dashboard/student/tutor` |
| **Boundary** | **NEVER grades work. NEVER submits assignments on behalf of student.** |
| **Capabilities** | Explain concepts, build study plans, quiz students, review mistakes, suggest examples |
| **Context** | Knows current enrolled courses and subject area |
| **Response types** | Concept explanation, study plan, quiz questions, mistake analysis, coding help |

---

### 6.2 Teacher Assistant Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Reduce teacher administrative workload |
| **Used by** | Teachers |
| **Access point** | `/dashboard/teacher/assistant` |
| **Boundary** | **NEVER makes final grade decisions. All suggestions require teacher confirmation.** |
| **Capabilities** | Generate lesson plans, create rubrics, draft feedback, suggest differentiation strategies |

---

### 6.3 Curriculum Architect Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Generate standards-aligned curriculum content |
| **Used by** | Curriculum Committee, Teachers |
| **Access point** | `/dashboard/curriculum/assistant` |
| **Boundary** | **NEVER personalizes to individual students. Works at course/program level only.** |
| **Capabilities** | Draft course proposals, score proposals for quality, align to learning outcomes |

---

### 6.4 Assessment Builder Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Generate and assist with scoring assessments |
| **Used by** | Teachers |
| **Access point** | `/dashboard/teacher/assessment` |
| **Boundary** | **NEVER determines final grades. All scoring is advisory.** |
| **Capabilities** | Create MCQ banks, write short-answer prompts, build rubrics, suggest difficulty levels |

---

### 6.5 District Analyst Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Executive-level KPI intelligence across institutions |
| **Used by** | District Leaders, Admins |
| **Boundary** | **Read-only. NEVER triggers any action or sends any communication.** |
| **Capabilities** | Analyze retention trends, identify at-risk cohorts, compare school performance, forecast SKORA |

---

### 6.6 GovCon Intel Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Federal RFP tracking and opportunity analysis |
| **Used by** | GovCon role, District Leaders |
| **Boundary** | **NEVER submits proposals or communicates with external agencies autonomously.** |
| **Capabilities** | Scan SAM.gov opportunities, score fit, summarize requirements, flag deadlines |

---

### 6.7 RAG Knowledge Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Institutional memory and context retrieval |
| **Used by** | All agents (internally) |
| **Boundary** | **Retrieval only. NEVER generates original content independently.** |
| **Capabilities** | Retrieve relevant documents from Qdrant vector store, chunk and rank by relevance |
| **Vector DB** | Qdrant with semantic embeddings |

---

### 6.8 Workflow Orchestrator Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Cross-system process orchestration |
| **Used by** | Admins, system automation |
| **Boundary** | **Executes predefined logic only. NEVER decides which workflow to trigger without explicit instruction.** |
| **Capabilities** | Route approval workflows, trigger notifications, coordinate multi-step processes |

---

### 6.9 Reporting Engine Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Auto-generate compliance and analytics reports |
| **Used by** | Admins, District Leaders |
| **Access point** | `/dashboard/admin/reports` |
| **Boundary** | **Summarizes and presents data only. NEVER makes policy recommendations.** |
| **Capabilities** | TCSG compliance reports, SACSCOC accreditation data, custom metric builder, PDF export |

---

### 6.10 Compliance Guard Agent
| Property | Detail |
|----------|--------|
| **Purpose** | Monitor FERPA, CMMC, Section 508 compliance |
| **Used by** | IT/Cyber role, Admins |
| **Access point** | `/dashboard/cyber/compliance` |
| **Boundary** | **Flags violations only. NEVER auto-remediates or modifies data without human approval.** |
| **Capabilities** | Continuous policy monitoring, violation alerting, compliance score calculation, remediation guidance |

---

## 7. Features

### 7.1 Gamification System
| Feature | Description |
|---------|-------------|
| XP Points | Earned for assignments, attendance, badges, AI sessions |
| Levels | 20 levels, each requiring more XP than the last |
| Daily Streak | Consecutive login days, flame indicator in UI |
| Badges | 10 badge types across Academic, Social, Skills, Workforce categories |
| Leaderboard | Opt-in weekly class leaderboard |
| Weekly Challenges | Rotating challenges with bonus XP |
| Digital Credentials | Verifiable Open Badge 3.0 certificates, LinkedIn share |

### 7.2 Assessment Engine
| Feature | Description |
|---------|-------------|
| Question Types | MCQ, short answer, matching, rubric-graded |
| Timed Assessments | Countdown timer with live progress dots, auto-submit at 0 |
| Confirm Submit Modal | Prevents accidental early submission |
| Results Screen | Immediate score display after submission |
| Question Bank | Reusable questions across courses |
| Grade Passback | Sync grades back to Banner SIS |

### 7.3 Calendar System
| View | Description |
|------|-------------|
| Month View | Full month grid, color-coded events, click to expand |
| Week View | 7-column week layout with event blocks |
| Agenda View | Chronological list of next 14 days with events |
| Event Detail Modal | Time, location, category details on click |
| Add Event | Quick event creation form |
| External Sync | Google Calendar + Outlook OAuth integration (Settings → Calendar) |
| Event Categories | Class, Deadline, Exam, Meeting, Office Hours, Personal |

### 7.4 Messaging System
| Feature | Description |
|---------|-------------|
| Conversation Types | Direct (1:1), Class group threads, Advisory |
| Participants | Teacher ↔ Student, Teacher ↔ Parent, Advisor ↔ Student |
| Message Thread | Full conversation view with timestamps |
| Unread Badges | Count shown on Messages nav item |
| Reply | Inline reply within thread |

### 7.5 Notification Center
| Feature | Description |
|---------|-------------|
| Slide-out Drawer | Opens from bell icon in topbar |
| Categories | Assignment, grade, message, system, attendance alerts |
| Mark as Read | Individual or bulk |
| Real-time (planned) | Supabase Realtime subscription |

### 7.6 Command Palette (Cmd+K)
| Feature | Description |
|---------|-------------|
| Trigger | `Cmd+K` (Mac) or `Ctrl+K` (Windows) |
| Search | Students, courses, proposals, pages |
| Navigation | Jump to any page instantly |
| Actions | Quick role switch, launch AI agent |

### 7.7 Reports Module
| Report Type | Description |
|-------------|-------------|
| Compliance Reports | TCSG, SACSCOC, IPEDS, BOR pre-built templates |
| Custom Builder | Select metrics, cohorts, date ranges, demographics |
| Saved Reports | Name, save, and reload report configurations |
| Export | PDF and Excel export on all data tables |

### 7.8 Integrations Hub
| Integration | Category | Status |
|-------------|----------|--------|
| Banner SIS | SIS | Connected |
| Blackboard | LMS | Connected |
| Canvas | LMS | Connected |
| Google Workspace SSO | SSO | Connected |
| Microsoft 365 SSO | SSO | Error |
| Zoom | Communication | Connected |
| Microsoft Teams | Communication | Disconnected |
| SAM.gov | Federal | Connected |
| Google Drive | Productivity | Connected |
| Slack | Communication | Disconnected |
| Webhook Manager | Custom | Active |

### 7.9 Multi-Tenancy
| Feature | Description |
|---------|-------------|
| Tenant Isolation | Supabase Row Level Security — data never crosses institutions |
| Per-Institution Branding | Logo, primary color, subdomain |
| Subdomain Routing | `atc.stem-ed.ai`, `gsu.stem-ed.ai` |
| Super-Admin View | SERA admin sees all tenants, storage, compliance status |
| FERPA Isolation | Enforced at database query level |

### 7.10 Settings
| Settings Page | Features |
|---------------|---------|
| Profile | Name, email, avatar upload, bio, timezone, language, danger zone |
| Notifications | Per-category toggles (email/push/in-app), digest frequency, quiet hours |
| Billing | Plan comparison, usage bars, invoice history, payment method |
| Security | 2FA (TOTP), password change, active sessions, IP allowlist, SAML SSO |
| Dashboard Layout | Drag-to-reorder widgets, enable/disable widgets, density, default view |
| Calendar & Sync | Connect Google/Outlook, sync direction, event categories, display prefs |
| Integrations | Full integrations hub |

### 7.11 Help Center
| Feature | Description |
|---------|-------------|
| Search | Full-text search across all articles |
| Categories | Getting Started, AI Tutor, Students, Teachers, Security, Reports |
| Articles | 24 articles across 6 categories |
| Article Modal | Opens inline without leaving the page |
| Live Chat CTA | Links to support team |
| Ticket Form | Subject, priority, description, email — success confirmation |

### 7.12 PWA (Progressive Web App)
| Feature | Description |
|---------|-------------|
| Installable | Add to home screen on mobile and desktop |
| Manifest | App name, icons, theme color, display mode |
| Service Worker | Offline caching of static assets |
| Mobile Navigation | Bottom tab bar with 5 key destinations |
| Install Prompt | Custom banner with install/dismiss |

### 7.13 Onboarding
| Feature | Description |
|---------|-------------|
| 5-Step Wizard | Role selection → profile → tour → preferences → done |
| Product Tour | Shepherd.js guided walkthrough of key UI elements |
| Changelog Modal | "What's New" popup on first login after update, localStorage-gated |

---

## 8. Pages & Routes

### Public Routes
| Route | Page |
|-------|------|
| `/` | Marketing landing page |
| `/login` | Sign in (email/password + Google SSO) |
| `/signup` | Multi-step signup wizard |
| `/onboarding` | Post-signup onboarding flow |

### Student Routes
| Route | Page |
|-------|------|
| `/dashboard/student` | Student home dashboard |
| `/dashboard/student/courses` | Course list |
| `/dashboard/student/courses/[id]` | Course detail (materials, assessments, overview) |
| `/dashboard/student/tutor` | AI Tutor chat |
| `/dashboard/student/assessment/[id]` | Timed quiz/exam |
| `/dashboard/student/credentials` | Badges and certifications |
| `/dashboard/student/mentors` | NABA mentor matching |
| `/dashboard/student/community` | Discussion boards |

### Teacher Routes
| Route | Page |
|-------|------|
| `/dashboard/teacher` | Teacher home dashboard |
| `/dashboard/teacher/classes` | Class roster management |
| `/dashboard/teacher/gradebook` | Grade entry and management |
| `/dashboard/teacher/attendance` | Attendance tracking |
| `/dashboard/teacher/files` | Course file management |
| `/dashboard/teacher/curriculum` | Curriculum builder |
| `/dashboard/teacher/assistant` | AI teacher assistant |
| `/dashboard/teacher/assessment` | Assessment builder |

### Admin Routes
| Route | Page |
|-------|------|
| `/dashboard/admin` | Admin home |
| `/dashboard/admin/students` | Student directory |
| `/dashboard/admin/faculty` | Faculty management |
| `/dashboard/admin/pd-catalog` | Professional development catalog |
| `/dashboard/admin/reports` | Reports and analytics |
| `/dashboard/admin/tenants` | Multi-tenant super-admin view |

### Other Role Routes
| Route | Role | Page |
|-------|------|------|
| `/dashboard/district` | District Leader | Retention overview |
| `/dashboard/district/retention` | District Leader | SKORA analytics |
| `/dashboard/district/schools` | District Leader | School comparison |
| `/dashboard/curriculum` | Curriculum | Proposals overview |
| `/dashboard/curriculum/proposals` | Curriculum | Proposals list |
| `/dashboard/curriculum/proposals/new` | Curriculum | New proposal wizard |
| `/dashboard/curriculum/proposals/[id]` | Curriculum | Proposal detail |
| `/dashboard/curriculum/catalog` | Curriculum | eCatalog |
| `/dashboard/curriculum/assistant` | Curriculum | AI assistant |
| `/dashboard/cyber` | IT/Cyber | Security overview |
| `/dashboard/cyber/risk` | IT/Cyber | Risk dashboard |
| `/dashboard/cyber/compliance` | IT/Cyber | Compliance status |
| `/dashboard/cyber/audit` | IT/Cyber | Audit log |
| `/dashboard/parent` | Parent | Child overview |
| `/dashboard/govcon` | GovCon | Opportunity pipeline |

### Global Routes (All Roles)
| Route | Page |
|-------|------|
| `/assistant` | Multi-agent AI Workspace |
| `/calendar` | Unified calendar (Month/Week/Agenda) |
| `/messages` | Messaging inbox |
| `/messages/[id]` | Message thread |
| `/announcements` | School-wide announcements |
| `/settings` | Settings hub |
| `/settings/profile` | Profile management |
| `/settings/notifications` | Notification preferences |
| `/settings/billing` | Billing and plan |
| `/settings/security` | Security and access control |
| `/settings/dashboard` | Dashboard layout customization |
| `/settings/calendar` | Calendar sync settings |
| `/settings/integrations` | Integrations hub |
| `/help` | Help center |

### System Routes
| Route | Page |
|-------|------|
| `/not-found` | Custom 404 page |
| `/error` | Global error boundary |

---

## 9. Security & Compliance

### Authentication
| Method | Description |
|--------|-------------|
| Email + Password | Standard credentials with hashed storage |
| Google SSO | OAuth 2.0 via Supabase Auth |
| SAML SSO | Okta, Azure AD, Google Workspace for institutional IdP |
| 2FA / MFA | TOTP (Time-based One-Time Password) via authenticator app |

### Data Security
| Control | Implementation |
|---------|---------------|
| Encryption at rest | AES-256 via Supabase |
| Encryption in transit | TLS 1.3 |
| Row Level Security | Supabase RLS policies per tenant |
| Session management | View and revoke active sessions from Settings → Security |
| IP Allowlisting | CIDR range restrictions for district IT |
| Audit logging | Every agent action, admin operation, and data access logged |

### Compliance Frameworks
| Framework | Status | Notes |
|-----------|--------|-------|
| FERPA | ✅ Enforced | Data isolation via Supabase RLS |
| CMMC | 🔄 In progress | Cyber dashboard tracks controls |
| SOC 2 Type II | 🔄 In progress | Audit log foundation in place |
| Section 508 | 🔄 In progress | Accessibility monitoring in Compliance Guard |
| SACSCOC | ✅ Report-ready | Data exports available |
| TCSG | ✅ Report-ready | Compliance report template included |

### Agent Security Rules (FROZEN — cannot be changed)
1. Every agent action writes to `audit_log` table
2. No agent can access data outside its authorized scope
3. No agent can make final decisions on grades, proposals, or submissions
4. Tutor Agent NEVER submits work on behalf of a student
5. Compliance Guard NEVER auto-remediates — flags only
6. District Analyst is read-only — NEVER triggers actions

---

## 10. Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#FAFAF9` | Main background (warm off-white) |
| `--accent-primary` | `#4F46E5` | Indigo — primary brand, buttons, active states |
| `--accent-secondary` | `#7C3AED` | Purple — AI/agent elements |
| `--text-primary` | `#18181B` | Body text |
| `--text-muted` | `#52525B` | Secondary text |
| `--text-faint` | `#A1A1AA` | Placeholders, metadata |
| `--border` | `#E8E6E1` | Card borders, dividers |
| Success | `#059669` | Connected, healthy, earned |
| Warning | `#D97706` | Warnings, at-risk indicators |
| Danger | `#DC2626` | Errors, critical, delete actions |

### Typography
| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headlines | Outfit | 600–800 | Page titles, hero headline, logo |
| Body | Inter | 400–500 | All UI text, descriptions |
| Monospace | JetBrains Mono | 400 | Numbers, code, IDs, timestamps |

### Component Patterns
| Component | Description |
|-----------|-------------|
| `StatCard` | KPI card with icon, value, label, trend |
| `AppShell` | Sidebar + Topbar + main content wrapper |
| `AnimatedBackground` | 5-layer visual: base, noise, orbs, grid, cursor spotlight |
| `Skeleton` | Shimmer loading placeholder (animate-pulse) |
| `ChangelogModal` | "What's New" modal, shown once per version via localStorage |

### Spacing & Layout
- **Sidebar width:** 240px expanded / 60px collapsed
- **Topbar height:** 56px
- **Card border radius:** `rounded-xl` (12px)
- **Max content width:** 2xl (672px) for settings/forms, full-width for dashboards
- **Mobile breakpoint:** `lg` (1024px) — sidebar hidden, bottom nav shown below

---

## 11. Demo Data

All seed data is in `lib/demo-data.ts`. Key datasets:

| Dataset | Records | Description |
|---------|---------|-------------|
| `INSTITUTIONS` | 3 | ATC, GSU, KSU with retention stats |
| `AT_RISK_STUDENTS` | 5 | Students with SKORA risk scores 61–94 |
| `STUDENTS` | 3 | Full student profiles with XP, GPA, streak |
| `COURSES` | 4 | CS 1010, MATH 2010, ENGR 4850, NURS 2100 |
| `BADGES` | 10 | Academic, Social, Skills, Workforce categories |
| `AGENTS` | 10 | All AI agents with boundaries |
| `PROPOSALS` | 4 | Curriculum proposals at various workflow stages |
| `CALENDAR_EVENTS` | 20 | Classes, deadlines, exams, meetings |
| `CONVERSATIONS` | 6 | Message threads across all participant types |
| `TENANTS` | 3 | Multi-tenant institutions with storage/compliance |
| `INTEGRATIONS` | 10 | SIS, LMS, SSO integrations with statuses |
| `MENTORS` | 6 | NABA mentors with match scores |
| `PD_CATALOG` | 8 | Faculty professional development courses |
| `SAVED_REPORTS` | 3 | Pre-saved compliance and custom reports |

---

## 12. Environment Variables

Copy `.env.example` to `.env.local` and fill in values. **Never commit `.env.local` to git.**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
GROQ_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Vector DB
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# Billing
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 13. Deployment

### Local Development
```bash
git clone https://github.com/peddapudisiva/stem-ed-ai.git
cd stem-ed-ai
npm install
cp .env.example .env.local
# Fill in .env.local values
npm run dev
# Open http://localhost:3000
```

### Production (Vercel)
The project auto-deploys to Vercel on every push to `master` branch.

```bash
# Manual deploy
npx vercel --prod

# Check deployment status
npx vercel inspect
```

**Live URLs:**
- Production: https://stem-ed-ai.vercel.app
- GitHub: https://github.com/peddapudisiva/stem-ed-ai
- Vercel Dashboard: https://vercel.com/peddapulisiva515-4659s-projects/stem-ed-ai

### Build Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npx tsc --noEmit # TypeScript type check (zero errors)
```

---

*STEM-ED-AI · SERA Neural Labs · v1.0.0 · FERPA Compliant · SOC 2 Type II In Progress*  
*Built for Atlanta Technical College and Georgia Southern University*
