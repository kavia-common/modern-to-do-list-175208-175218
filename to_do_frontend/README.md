# Ocean Professional To‑Do Frontend

A modern, responsive React UI for task management with basic auth stubs and a graceful mock API fallback.

## Highlights
- Task CRUD: add, edit (inline), toggle complete, delete
- Filters: all, active, completed
- Responsive UI with subtle gradients, shadows, and rounded corners
- Ocean Professional theme (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827)
- API client abstraction reading `REACT_APP_API_BASE_URL` or falling back to a localStorage-backed mock
- Basic auth UI (login/signup) wired to API stubs

## Getting Started

Install deps and start:
- npm install
- npm start

App will be available at http://localhost:3000

## Environment

Copy `.env.example` to `.env` and set:
- REACT_APP_API_BASE_URL=http://localhost:8000

If `REACT_APP_API_BASE_URL` is not set, the app uses a mock API that persists tasks to localStorage so you can fully preview the UI.

## Structure
- src/styles/theme.css — Theme variables and shared styles
- src/api/client.js — API client with mock fallback
- src/api/tasks.js — Tasks API helper
- src/api/auth.js — Auth API helper (stubs)
- src/components/* — Header, TaskInput, Filters, TaskItem
- src/pages/TasksPage.js — Main tasks page
- src/pages/Auth/LoginPage.js, SignupPage.js — Auth pages
- src/App.js — Root, simple view switching without a router

## Notes
- Replace the endpoints in `src/api/client.js` and helpers when backend routes are available.
- The UI avoids external UI frameworks to stay lightweight.
