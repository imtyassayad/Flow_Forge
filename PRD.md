Here's a **professional, detailed PRD (Product Requirements Document)** tailored for your exact vision:  
**A self-hosted n8n replica** built with **Django + Python + LangGraph + MySQL**, featuring multi-tenancy, roles, real-time canvas, projects, workflows, subscriptions, and a beautiful landing page.

Save this as `PRD.md` and feed it directly to **Antigravity AI Coder IDE** — it will generate the full codebase.

```markdown
# Product Requirements Document (PRD)  
## Project Codename: FlowForge (Open-source n8n Replica)

### 1. Vision & Goals
Build a **100% self-hosted, multi-tenant, visually programmable automation platform** like n8n but with:
- Company/workspace isolation
- Role-based access control (RBAC)
- Subscription plans & Stripe billing
- Real-time collaborative canvas (like Retool + n8n + LangGraph)
- Powered by **Django (backend + auth + API)** + **LangGraph (workflow execution engine)** + **MySQL**
- Beautiful marketing website with signup/login

### 2. Tech Stack (Non-negotiable)
| Layer               | Technology                                      |
|---------------------|-------------------------------------------------|
| Backend Framework   | Django 5.1 + Django REST Framework             |
| Workflow Engine     | LangGraph (from LangChain) + LangGraph JSON    |
| Database            | MySQL 8.0                                       |
| Real-time Canvas    | React + TypeScript + React Flow + Yjs + WebSocket (Django Channels) |
| Authentication      | Django Allauth + JWT + Social (Google/GitHub)   |
| Payments            | Stripe Subscription + Checkout + Webhooks       |
| Frontend (Marketing)| Next.js 15 (App Router) or Django + HTMX + Tailwind (your choice) |
| Deployment          | Docker + Docker Compose                         |

### 3. User Roles & Permissions

| Role          | Permissions                                                                 |
|---------------|-----------------------------------------------------------------------------|
| Superadmin    | Full access to everything, manage plans, view all companies                |
| Developer     | Can create/edit workflows in any project they are invited to               |
| Company Admin | Manage users, projects, billing in their company                            |
| User          | Can only run/view workflows they have access to                             |
| Guest         | Only see public landing page                                                |

### 4. Core Features

#### 4.1 Marketing Website (Public)
- Modern landing page with:
- Hero section ("The open-source n8n alternative you can self-host")
- Features, pricing table (Free, Pro, Enterprise)
- Signup / Login buttons
- Demo video/embed
- Footer with links

#### 4.2 Authentication & Onboarding
- Email/password + Social login (Google, GitHub)
- After signup → Create or join a Company (workspace)
- Company has unique subdomain (optional) or slug: `acme.flowforge.io`

#### 4.3 Multi-Tenancy Model
```
Company → Projects → Workflows → Executions
```
- One user can belong to multiple companies
- Data isolation via company_id in every major table

#### 4.4 Dashboard (After Login)
Sidebar:
- Company switcher
- Projects list
- Workflows
- Executions / Logs
- Team members
- Billing (for admins)

#### 4.5 Real-time Workflow Canvas (Core Feature)
Built with **React Flow + Yjs CRDT + Django Channels**
- Drag & drop nodes
- Connect with edges (bezier)
- Real-time collaboration (multiple users editing same workflow)
- Node types: Trigger, Action, Logic, Custom (Python/JS)
- Node settings panel (right sidebar)
- Zoom, pan, mini-map, undo/redo
- Auto-save every 3 seconds
- Manual Save + Version history

#### 4.6 Workflow Execution via LangGraph
Every workflow saved as **LangGraph JSON checkpoint**
- Django saves: `workflow.langgraph_json`
- Execution engine loads JSON → builds LangGraph StateGraph → runs
- Support async execution, streaming logs
- Execution history with input/output/debug

#### 4.7 Projects & Workflow Management
- User creates Project inside Company
- Inside Project → multiple Workflows
- Switch between workflows instantly
- Rename, duplicate, delete, export/import (JSON)

#### 4.8 Subscription & Billing (Stripe)
Plans:
| Plan       | Price   | Limits                          |
|------------|---------|---------------------------------|
| Free       | $0      | 1 project, 3 workflows, 100 executions/mo |
| Pro        | $29/mo  | Unlimited, webhooks, custom nodes |
| Enterprise | Custom  | SSO, on-prem, priority support  |

Features:
- Stripe Checkout integration
- Webhook handling
- Proration, upgrade/downgrade
- Invoice history

### 5. Database Schema (MySQL) - Key Tables

```sql
-- Core
companies (id, name, slug, created_at, stripe_customer_id)
users (Django default + company_id foreignkey → through CompanyMember)
company_members (user_id, company_id, role ENUM('admin','member'))

-- Billing
plans (id, name, stripe_price_id, max_projects, max_executions)
company_subscriptions (company_id, plan_id, status, current_period_end)

-- Projects & Workflows
projects (id, company_id, name, created_at)
workflows (
  id, 
  project_id, 
  name, 
  description,
  langgraph_json LONGTEXT,     -- Full LangGraph checkpoint
  reactflow_json LONGTEXT,     -- Nodes/edges positions
  is_active BOOLEAN,
  created_at, updated_at
)

-- Executions
workflow_executions (
  id, workflow_id, status, input_json, output_json, error, started_at, finished_at
)

-- Invitations, API keys, etc.
```

### 6. API Endpoints (Django REST Framework)

```
/api/auth/                     # login, register, social
/api/companies/                # list, create, switch
/api/projects/                 # CRUD
/api/workflows/                # CRUD + /:id/canvas (React Flow data)
/api/workflows/:id/execute      # trigger run
/api/executions/               # list + logs streaming
/api/nodes/templates           # available node types
/api/billing/plans
/api/billing/checkout-session
/api/billing/webhook           # Stripe
```

### 7. Real-time Requirements (Django Channels + Redis)
- WebSocket connection per workflow canvas
- Broadcast node/edge changes using Yjs document
- Presence (who is online editing)

### 8. Development Milestones (For Antigravity AI Coder)

**Phase 1** – Foundation (Week 1–2)
- Django + MySQL + Allauth + JWT
- Company + RBAC models
- Marketing site (Next.js or Django templates)

**Phase 2** – Projects & Workflows CRUD (Week 3)
- Project/Workflow models + API
- Simple list view

**Phase 3** – Real-time Canvas (Week 4–6)
- React + React Flow + Yjs + Django Channels
- Auto-save workflow.langgraph_json & reactflow_json

**Phase 4** – LangGraph Execution Engine (Week 7–8)
- Execute saved LangGraph JSON
- Streaming logs via WebSocket

**Phase 5** – Billing & Stripe (Week 9)
- Plans, checkout, webhooks, limits enforcement

**Phase 6** – Polish & Deploy
- Docker Compose (django + mysql + redis + nextjs)
- Nginx + HTTPS template
- Admin panel customization

### 9. Deliverables Expected from Antigravity AI Coder
Full monorepo with:
```
flowforge/
├── backend/              # Django project
│   ├── core/             # models (Company, Project, Workflow...)
│   ├── users/
│   ├── billing/
│   ├── workflows/        # LangGraph execution + API
│   └── channels/         # WebSocket consumers
├── frontend/             # React + TypeScript + React Flow + Yjs (or Next.js app router)
├── landing/              # Marketing site
├── docker-compose.yml
├── README.md
└── requirements.txt
```

### 10. Success Criteria
User can:
1. Sign up → create company → create project → build workflow on real-time canvas → save → run → see logs
2. Invite team member → collaborate in real-time
3. Upgrade to Pro via Stripe → limits lifted

This is ready to paste into Antigravity AI Coder IDE with prompt:

> "Build the complete project from this PRD.md using Django 5, LangGraph, React Flow, Yjs, razorpay, and MySQL. Use Django Channels for real-time. Make it production-ready with Docker."

