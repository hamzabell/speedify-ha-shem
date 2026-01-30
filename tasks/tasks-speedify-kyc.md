# Task List: Speedify KYC (Nigerian Market) - Frontend Focus

## Relevant Files

- `src/app/globals.css` - Global theme variables.
- `src/components/ui/` - Reusable UI components (Button, Input, Card).
- `src/app/(dashboard)/layout.tsx` - Layout for the admin dashboard.
- `src/app/kyc/page.tsx` - Main entry for the KYC wizard.
- `src/app/api/mock/` - Mock API routes.
- `src/lib/mock/data.ts` - Static data generators.
- `src/lib/store/config-context.tsx` - React Context for managing demo configuration (toggles).

### Notes

- Focus is entirely on Frontend and UX/UI.
- All "backend" logic should be simulated using Next.js API Routes returning static/randomized JSON, or client-side `setTimeout`.
- Use `localStorage` to persist "Dashboard Configuration" so the KYC Wizard behaves differently based on Admin settings during the demo.
- Theme matches `globals.css` (Speedify Green/Lime).

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:

- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this feature (`git checkout -b feature/speedify-kyc-frontend`)
- [ ] 1.0 Design System & Core Components
  - [ ] 1.1 Verify and extend `globals.css` variables if needed for specific component states (hover/active).
  - [ ] 1.2 Create `Button` component (variants: primary/secondary/ghost) using Speedify theme.
  - [ ] 1.3 Create `Input`, `Select`, and `FileUpload` components with focus states.
  - [ ] 1.4 Create `Card` and `Badge` components for the dashboard.
  - [ ] 1.5 Create `Logo` component (SVG).
- [ ] 2.0 Mock Data & State Management
  - [ ] 2.1 Create `src/lib/mock/data.ts` with generators for:
    - User Profiles (Name, Email, Phone).
    - Verification Stats (Daily/Weekly success rates).
    - Recent Activity Logs.
  - [ ] 2.2 Create `ConfigContext` to manage global demo settings (e.g., "Require Liveness", "Enable BVN Check").
  - [ ] 2.3 Implement standard API route wrappers in `src/lib/api.ts` that return mock promises with delays to simulate network latency.
- [ ] 3.0 KYC Wizard (End-User Flow)
  - [ ] 3.1 Create Wizard Layout (`src/app/kyc/layout.tsx`) with Progress Bar and clean header.
  - [ ] 3.2 Implement **Step 1: Identity Selection** (Grid of cards: BVN, NIN, Driver's License).
  - [ ] 3.3 Implement **Step 2: Data Entry** (Dynamic forms based on selection).
  - [ ] 3.4 Implement **Step 3: Document Capture** (Mock camera interface/File upload with preview).
  - [ ] 3.5 Implement **Step 4: Liveness Check** (Simulated scanning animation using CSS/Canvas).
  - [ ] 3.6 Implement **Step 5: Processing & Result** (Spinner -> Success/Failure Card).
- [ ] 4.0 Admin Dashboard (Client-Facing)
  - [ ] 4.1 Create Dashboard Shell (Sidebar + Topbar).
  - [ ] 4.2 Implement **Overview Tab**:
    - "Verification Rate" Chart (using mock data).
    - "Recent Verifications" Table.
  - [ ] 4.3 Implement **Configuration Tab**:
    - Toggles for enabling/disabling KYC checks (connected to `ConfigContext`).
    - "Customize Theme" section (preview only).
  - [ ] 4.4 Implement **Developers Tab**:
    - Display "API Keys" (masked) and "Webhook URL" inputs.
- [ ] 5.0 Chat Interface Integration (Demo)
  - [ ] 5.1 Create a generic "Chat App" container (simulating WhatsApp/Telegram).
  - [ ] 5.2 Implement the "Bot Conversation" flow (bubbles).
  - [ ] 5.3 Implement the "In-Chat Webview" logic (launching the KYC Wizard in a mobile-sized modal/iframe).
- [ ] 6.0 Integration & Polish
  - [ ] 6.1 Update Landing Page (`src/app/page.tsx`) to link to "Demo Wizard" and "Dashboard".
  - [ ] 6.2 Ensure all responsive styles work on Mobile vs Desktop.
  - [ ] 6.3 Add micro-interactions (framer-motion or CSS transitions) for smooth step transitions.
