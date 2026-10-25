# NEXORA React Upgrade

This is a React/Vite upgrade scaffold that demonstrates the missing syllabus topics while preserving the dark enterprise-dashboard style.

## Included
- HTML/CSS/JavaScript fundamentals in a React app
- React components and props
- React Router routes: Dashboard, Components, Portfolio, Shop/Cart, Forms
- Context API for global theme state
- Zustand for shared shopping-cart state (add/remove/change quantity/total)
- Async loading, success and retryable error UI for dashboard data (currently mocked)
- Reusable `FormField` component and client-side validation
- Responsive CSS

## Run it
1. Install Node.js (LTS) if not already installed.
2. Extract the ZIP and open the `nexora-react-upgrade` folder in VS Code.
3. Open Terminal in that folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL printed by Vite in your terminal.

To create a production build:
```bash
npm run build
```

## Important notes
- The dashboard API is mocked with a Promise and timeout so loading state can be demonstrated without a backend.
- The form validates in the browser but does not send information to a server.
- The cart is in-memory state; refreshing the page resets it.
- The project uses Zustand as the required Redux Toolkit-or-Zustand option. You do not need to install Redux Toolkit too.
- This is a clean React implementation scaffold, not an automatic conversion of every original NEXORA HTML section. You can migrate remaining sections into `src/pages/` using the same component pattern.


## Restored original sections
The sidebar now includes the original NEXORA sections (Tokens, Playground, Applications, Architecture, Deployments, Accessibility, Packages, Changelog, Team, Activity) plus the PE-I routes (Portfolio, Shop/Cart, Form Validation). These are React Router routes; deployment, audit and team interactions are demo-only.
