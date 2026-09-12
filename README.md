<div align="center">

  # 🛡️ DevGuard AI
  ### Next-Generation Cloud Security & AI Telemetry Platform

  [![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

  **DevGuard AI** empowers engineering teams to detect cloud security vulnerabilities, analyze telemetry metrics, and fix code security flaws in real-time using context-aware AI diagnostics.

</div>

---

## 🎯 Key Value Proposition

Security reviews often slow down rapid deployment cycles. **DevGuard AI** bridges the gap between DevOps speed and DevSecOps compliance by providing:

* **Instant Threat Identification:** Scans active environments and categorizes issues by severity (`Critical`, `High`, `Medium`, `Low`).
* **Automated Architecture Scoring:** Generates real-time cloud health indices based on live telemetry feeds.
* **In-IDE Diagnostics:** Analyzes security code flaws directly within an embedded browser workspace with AI-driven remediation suggestions.

---

## ✨ Core Features

* **⚡ Real-time Cloud Telemetry Dashboard:** Live monitoring of build status, architecture security scores, and deployment pipeline metrics.
* **🛡️ Security & Vulnerability Analysis:** Color-coded threat categorizations with detailed issue breakdowns and recommended fixes.
* **💻 Interactive Code Workspace:** Native code editor interface with real-time syntax inspection and AI diagnostic overlays.
* **⌨️ Keyboard-First UX:** Global command palette (`⌘K` / `Ctrl+K`) for fast context switching and workspace control.
* **🎨 Modern Developer-First Interface:** Glassmorphism UI built with custom Tailwind CSS v4 styling, optimized specifically for low-eyestrain dark environments.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    DevGuard AI UI                       │
│      (React 18 + Vite + Tailwind CSS v4 Engine)         │
└────────────┬──────────────────────────────┬─────────────┘
             │                              │
             ▼                              ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  AI Security Engine      │  │ Telemetry & Metrics      │
│  • AST Code Analysis     │  |  • Architecture Scoring  │
│  • Severity Profiling    │  |  • Pipeline Status       │
└──────────────────────────┘  └──────────────────────────┘