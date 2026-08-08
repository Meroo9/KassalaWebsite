# Plan 002: Enhance Services Page Navigation and Search

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ff60db6..HEAD -- src/app/services/page.js src/app/services/services.module.css`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-homepage-quick-services.md
- **Category**: direction
- **Planned at**: commit `ff60db6`, 2026-07-18

## Why this matters

To simulate the smooth navigation and portal filtering on Al-Neelain University's portal, the Services page needs to handle deep links and quick categories smoothly. Adding automatic query parameter handling (`?tab=students`, etc.) will enable quick links on the homepage to open the services page directly scrolled and filtered to the selected group.

## Current state

- Relevant files:
  - `src/app/services/page.js` — services page logic and client-side tab state
  - `src/app/services/services.module.css` — styling for services layout

- Code conventions:
  - Keep standard Next.js `useSearchParams` or state synchronization.
  - Follow the existing Green & White theme color variables.

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Build     | `npm run build`  | exit 0, no errors   |

## Scope

**In scope**:
- `src/app/services/page.js`

**Out of scope**:
- Changing CMS admin page code or backend API routes.

## Steps

### Step 1: Add Search Parameter Synchronization for Tab Filters
Synchronize the page tab filter with the URL query parameters so users can share direct links to filtered student, faculty, or employee services.

1. Edit [src/app/services/page.js](file:///d:/KassalaWebsite/src/app/services/page.js).
2. Import `useSearchParams` from `next/navigation`.
3. Wrap component or use `useEffect` to detect `tab` search parameter changes and update the active tab state accordingly:
```javascript
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if (tabParam && ['students', 'faculty', 'employees', 'visitors'].includes(tabParam)) {
    setActiveTab(tabParam);
  }
}, []);
```

**Verify**: Run `npm run build` to verify compilation.

## Test plan

- Open `http://localhost:3000/services?tab=faculty` and verify that the "Faculty" services tab is selected by default on page load.
- Ensure that switching tabs still allows manual filtering and search query inputs to function.

## Done criteria

- [ ] `npm run build` exits 0
- [ ] `plans/README.md` status updated to DONE

## STOP conditions

- If Next.js throws dynamic-rendering errors due to missing `<Suspense>` wrapper when using `useSearchParams` in static page generation. Always ensure standard parameter read hooks are wrapped or read from `window.location`.
