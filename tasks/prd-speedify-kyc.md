# Product Requirements Document: Speedify KYC (Nigerian Market)

## 1. Introduction & Overview

**Speedify KYC** is a B2B SaaS product designed to streamline the Know Your Customer (KYC) compliance process for Nigerian companies, with an initial focus on Banks and Fintechs.

The platform offers a high-compliance identity verification suite (NIN, BVN, Liveness, OCR) provided via flexible SDKs (Web/Mobile). Unique to this offering is its "Data Sovereignty" architecture: clients operate on a Hybrid SaaS model (where they control the data storage) while utilizing our high-availability cloud verification engine.

## 2. Goals

1.  **Market Penetration:** Deliver a solution compliant enough for Tier-1 Nigerian Banks (requires BVN/NIN + Liveness + Address Verification).
2.  **Developer Velocity:** Provide "drop-in" SDKs (React, React Native, Android, iOS) that handle 90% of the UI/UX for capturing IDs, Liveness, and Utility Bills.
3.  **Data Privacy:** Enable "Bring Your Own Storage" (BYOS) so sensitive user PII never rests on our servers in the SaaS model.
4.  **Flexible Configuration:** Allow compliance officers to define dynamic KYC flows (e.g., Tier 1 vs Tier 3 accounts) without code changes.
5.  **Omnichannel Delivery:** Support verification via standard Web/Mobile Wizards OR conversational Chat Interfaces (WhatsApp/Telegram), configurable by the business.
6.  **Full White-Labeling:** Ensure the entire experience (Wizard UI and Chat Bot persona) allows for deep customization to reflect the client's brand identity.

## 3. User Stories

### For Developers (Bank/Fintech)

- **As a Developer**, I want to install a single SDK package so that I can embed a full KYC flow into my app in under 30 minutes.
- **As a Developer**, I want to configure an S3 bucket in the dashboard so that all ID images uploaded by my users go directly to my cloud storage.
- **As a DevOps Engineer**, I want a robust, secure Public API with restricted API Key management so I can safely integrate the service into our banking infrastructure.

### For Compliance Officers

- **As a Compliance Officer**, I want to configure rules like "If user selects Driver's License, require 2 other forms of ID" without asking developers to deploy new code.
- **As a Compliance Manager**, I want to see real-time analytics on verification success rates, fraud attempts, and AML hits.

### For End Users (Bank Customers)

- **As a Customer**, I want to scan my face and ID document easily using my phone camera with real-time feedback so I don't get rejected for blurry photos.
- **As a Customer**, I want to complete my KYC directly within WhatsApp because I don't want to install a new app.
- **As a Customer**, I want an AI Assistant to help me if I get stuck or don't know which document to upload.

## 4. Functional Requirements

### 4.1. Core Verification Engine (Nigerian Context)

1.  **Gov Database Verification:** Direct integration with NIBSS (for BVN), NIMC (for NIN), and FRSC (Driver's License) to validate facial data and details.
2.  **Liveness Detection:** ISO 30107-3 compliant active/passive liveness check to prevent spoofing.
3.  **Document OCR:** Auto-extraction of text from Nigerian Passports, Drivers Licenses, Voters Cards, and NIN Slips.
4.  **Address Verification:** Capability to upload and OCR Utility Bills (NEPA/PHCN, Waste Bills) to verify address against user input.
5.  **Multi-Channel Contact Verification:** Integrated OTP handling for both Email and Phone/SMS to verify ownership.
6.  **Sanctions Screening:** API to check names against global AML watchlists and PEP (Politically Exposed Persons) lists.

### 4.2. Workflows & Configuration

7.  **Linear Configuration:** Dashboard toggles for enabling/disabling specific checks (e.g., "Toggle Liveness: ON/OFF").
8.  **Conditional Logic Engine:** Ability to define rules (e.g., `IF document_type == 'NIN_SLIP' THEN require_secondary_id = TRUE`).
9.  **Dynamic SDK Adaptation:** The mobile/web SDK must query the configuration on initialization and adapt the UI flow accordingly (e.g., hiding the Passport upload screen if disabled).
10. **Interface Mode:** Configurable setting to present the KYC flow as a structured **Step Wizard** (Progress bar, Forms) OR an **In-App Chat Interface** (Conversational bot style rendered by the SDK).

### 4.3. Interface Channels & White Labeling

11. **Chat Integrations:** Native connectors for **WhatsApp Business API** and **Telegram Bots**, allowing users to upload IDs and perform liveness checks (via web-view redirect) within the chat app.
12. **Deep White Labeling:**
    - **Wizard:** Custom CSS/Theme for colors, fonts, logos, and button shapes.
    - **Chat:** Customizable bot persona (Name, Tone, Greeting message) and visual branding in the web-view overlay.
    - **Domain:** Option for CNAME mapping (e.g., `verify.mybank.com`) for the hosted SaaS pages.

### 4.4. Data & Architecture

13. **Hybrid SaaS Storage (BYOS):** System allows clients to valid AWS S3 / Azure Blob credentials. The backend generates pre-signed URLs, allowing the SDK to upload images directly to the client's bucket.
14. **Security & Access:** Access to the verification engine is strictly via Public API with rotated API Keys, IP Whitelisting, and Banking-grade TLS encryption.
15. **Telemetry:** The SDK must report detailed metrics (success rates, fraud attempts, compliance reports) to a central analytics dashboard.

### 4.5. SDKs

16. **Cross-Platform Support:** Native (Kotlin/Swift), Cross-Platform (React Native/Flutter), and Web (React/JS).
17. **Dual-Mode Rendering:** SDKs must be capable of rendering the flow as either a standard Multi-Step Form or a Conversational Chat Timeline based on config.
18. **AI Assistant:** Built-in chat interface in the SDK to answer user questions about document types and requirements during the flow.

## 5. Non-Goals (Out of Scope for MVP)

- **Visual Workflow Builder:** No drag-and-drop canvas for designing flows; configuration will be form/JSON-based initially.
- **Biometric Auth (Login):** This is strictly for _Identity Verification_ (Onboarding), not ongoing Biometric Authentication (Login).
- **Physical Integration:** No reliance on specialized fingerprint hardware; purely camera-based.

## 6. Success Metrics

- **Performance:** Liveness check < 2 seconds latency.
- **Adoption:** 3 pilot banks integrated within Q1.
- **Reliability:** 99.9% uptime for the SaaS orchestration layer.
- **Data Privacy:** 0% of PII permanently stored on Speedify servers for Hybrid clients.

## 7. Open Questions

1.  **Bureau Pricing:** Who pays the per-call fee for NIBSS/NIMC checks? (Pass-through to client vs. Bundled credit model). _Assumption: Contact Sales for enterprise pricing._
2.  **Legacy Banking Ports:** Do we need to support SOAP for older bank cores, or is REST/gRPC sufficient? _Assumption: REST is acceptable for the integration layer._

## 8. Visual Guidelines & Branding

To match the "Clause" aesthetic (Clean, Modern, Trustworthy):

- **Primary Color:** Deep Forest Green (Trust, Security).
- **Accent Color:** Lime Green / Chartreuse (Speed, Modernity) - used for CTAs and highlights.
- **Backgrounds:** Clean White (#FFFFFF) and Light Beige/Grey for content blocks; Dark Green for feature highlights/footers.
- **Typography:** Modern Sans-Serif (e.g., Inter, Roboto). Bold headings, clean body text.
- **Buttons:** "Get Demo" (Primary CTA) in Deep Green or Lime Green depending on background contrast.
- **Logo:** Minimalist, geometric, utilizing the Green/Lime palette.

## 9. Call to Action (CTA) Strategy

- **Primary Goal:** Drive users to "Get Demo" or "Contact Sales".
- **Pricing Page:** displayed as "Contact Sales" with no explicit tiers listed publicly.
- **Navbar/Hero:** Prominent "Get Demo" button.
