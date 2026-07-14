# React, Next.js, and Banking Frontend Interview Prep Pack

Generated: 2026-07-10

This pack is focused on frontend, React, Next.js, browser security, banking-app scenarios, and the supporting topics interviewers usually connect to them: JavaScript, TypeScript, HTML/CSS, APIs, testing, performance, accessibility, and system design.

## 1. The Banking DevTools Question

Interview question:

"We are creating a banking application. How do you prevent the user from accessing browser DevTools, and if they open DevTools how do you forcefully log them out?"

Strong answer:

You cannot securely prevent a user from opening DevTools in their own browser. The browser is controlled by the user, so any client-side DevTools detection can be bypassed by disabling JavaScript, using another browser, modifying the script, using extensions, using a proxy, using mobile debugging, or calling APIs directly. I would not treat DevTools blocking as a security control.

For a banking application, I would design the system assuming the client is untrusted:

- Keep authorization on the server, never only in React or Next.js route guards.
- Store sessions in secure server-managed cookies using `HttpOnly`, `Secure`, and appropriate `SameSite`.
- Use short-lived access sessions, idle timeout, absolute timeout, and server-side session revocation.
- Require step-up authentication for sensitive actions like adding a beneficiary, changing contact details, large transfers, or viewing full account numbers.
- Use CSRF protection if cookies are used, and strong XSS prevention with escaping, CSP, dependency hygiene, and no dangerous HTML injection.
- Do not store secrets, full PII, account numbers, or sensitive authorization flags in localStorage/sessionStorage.
- Disable public production source maps or publish hidden source maps only to error monitoring.
- Log suspicious behavior server-side and use risk-based controls, but do not depend on DevTools detection for security.

If the company still requires a "logout when DevTools opens" behavior as a deterrent or compliance request:

- Add client-side detection only as a best-effort signal.
- When triggered, call a server logout endpoint that revokes the session server-side.
- Clear local in-memory state and redirect to login.
- Broadcast logout to other tabs using `BroadcastChannel` or a storage event.
- Make all API calls handle `401` or `419` by clearing UI state and redirecting.
- Clearly document that this is UX/friction, not true security.

Interview-ready script:

"I would challenge the premise politely. We cannot truly block DevTools because the user owns the browser. We can add a best-effort detector and log out as a deterrent, but banking security must not rely on that. The real protection is server-side authorization, secure HttpOnly cookies, short-lived and revocable sessions, CSRF and XSS protection, step-up auth for risky actions, no sensitive data in browser storage, and audit logging. If DevTools detection is mandatory, I would implement it as a non-security signal that calls a server logout endpoint and revokes the session."

## 2. Study Roadmap

Use this order if you want interview readiness fast:

1. JavaScript core: closures, scope, async, event loop, prototypes, modules, browser APIs.
2. TypeScript: types, generics, unions, narrowing, utility types, React props typing.
3. React: rendering, state, hooks, effects, memoization, forms, errors, Suspense, concurrent features.
4. Next.js: App Router, Server Components, Client Components, data fetching, caching, Server Actions, route protection, deployment.
5. Security/auth: sessions, cookies, JWT tradeoffs, CSRF, XSS, CSP, OAuth/OIDC basics, banking workflows.
6. Performance: bundle size, rendering cost, Core Web Vitals, images, caching, hydration.
7. Testing: unit, integration, e2e, accessibility tests, security test thinking.
8. System design: dashboards, payments, transaction history, notifications, audit trails, feature flags.
9. Practice: answer scenario questions out loud with tradeoffs.

## 3. JavaScript Questions

Beginner:

1. What are the primitive data types in JavaScript?
2. What is the difference between `var`, `let`, and `const`?
3. What is hoisting?
4. What is the difference between `null` and `undefined`?
5. What is the difference between `==` and `===`?
6. What are truthy and falsy values?
7. What is a function declaration vs function expression?
8. What are arrow functions?
9. What is the difference between parameters and arguments?
10. What is the spread operator?
11. What is destructuring?
12. What is template literal syntax?
13. What are arrays and objects?
14. What is optional chaining?
15. What is the difference between `map`, `filter`, `reduce`, and `forEach`?

Intermediate:

1. Explain closures with an example.
2. What is lexical scope?
3. What is the event loop?
4. What are microtasks and macrotasks?
5. What is the output of mixed `setTimeout`, `Promise`, and synchronous code?
6. What is a promise?
7. What is the difference between `Promise.all`, `Promise.allSettled`, `Promise.race`, and `Promise.any`?
8. What is async/await?
9. How do you handle errors in async/await?
10. What is debouncing?
11. What is throttling?
12. What is currying?
13. What is memoization?
14. What is the prototype chain?
15. What is the difference between shallow copy and deep copy?
16. What is event delegation?
17. What is the difference between bubbling and capturing?
18. What is `this`, and how does it behave in arrow functions?
19. What are modules?
20. What is tree shaking?

Advanced:

1. How does garbage collection work at a high level?
2. What causes memory leaks in browser apps?
3. How would you implement a promise from scratch?
4. How would you implement `debounce` and `throttle`?
5. How would you implement `deepClone`, and what are its edge cases?
6. How would you build a retry utility with exponential backoff?
7. How do you cancel a fetch request?
8. How does `AbortController` work?
9. What is backpressure in client-side data flows?
10. How do Web Workers help performance?
11. What is the difference between localStorage, sessionStorage, IndexedDB, cookies, and memory?
12. How do you protect against race conditions in async UI?
13. How do you design an API client wrapper?
14. What is a polyfill?
15. How does JavaScript handle floating-point precision?

Scenario-based:

1. A search box calls the API on every keystroke. How do you improve it?
2. User clicks "Pay" twice before the first request completes. How do you prevent duplicate payments?
3. Two API responses arrive out of order. How do you avoid showing stale data?
4. A long table freezes the browser. What do you check?
5. An API sometimes fails. How do you implement retry without making things worse?
6. A tab is open for 8 hours. How should the app handle stale session state?
7. You need to sync logout across multiple tabs. How?
8. A user goes offline during form submission. What UX and technical flow would you design?
9. You receive thousands of websocket updates. How do you keep the UI responsive?
10. A date appears different for users in different time zones. How do you debug it?

## 4. TypeScript Questions

Beginner:

1. Why use TypeScript?
2. What is type inference?
3. What is the difference between `type` and `interface`?
4. What are union types?
5. What are literal types?
6. What is an optional property?
7. What is the difference between `any`, `unknown`, and `never`?
8. How do you type function parameters and return values?
9. How do you type arrays?
10. How do you type React props?

Intermediate:

1. What is type narrowing?
2. What are generics?
3. What are utility types like `Partial`, `Pick`, `Omit`, `Record`, and `Readonly`?
4. What is a discriminated union?
5. What is type assertion?
6. What is `as const`?
7. How do you type API responses?
8. How do you type component children?
9. How do you type event handlers in React?
10. What is the difference between compile-time and runtime validation?

Advanced:

1. How do conditional types work?
2. How do mapped types work?
3. What are template literal types?
4. How do you create a reusable generic form field type?
5. How do you model success/error API states?
6. How do you avoid overusing `any` in a legacy project?
7. How do you safely parse untrusted JSON?
8. How do you combine TypeScript with Zod or another schema validator?
9. What are the tradeoffs of strict mode?
10. How do you type polymorphic components?

Scenario-based:

1. An API may return either account data or an error object. How do you model it?
2. A prop is required only when another prop has a specific value. How do you type it?
3. You are migrating a JavaScript React app to TypeScript. What is your approach?
4. Backend added a field but frontend types are stale. How do you prevent bugs?
5. You need shared types between frontend and backend. What are the options and tradeoffs?

## 5. HTML, CSS, and Browser Questions

Beginner:

1. What is semantic HTML?
2. Why use `button` instead of clickable `div`?
3. What are meta tags?
4. What is the difference between block, inline, and inline-block?
5. What is the CSS box model?
6. What are flexbox and grid used for?
7. What is specificity?
8. What is responsive design?
9. What is the difference between `em`, `rem`, `%`, `vh`, and `px`?
10. What is the difference between `display: none` and `visibility: hidden`?

Intermediate:

1. How does browser rendering work?
2. What causes layout shift?
3. What is a stacking context?
4. How do you center an element horizontally and vertically?
5. How do you create accessible forms?
6. How do you lazy-load images?
7. What is CORS?
8. What are cookies?
9. What are service workers?
10. What is a PWA?

Advanced:

1. What causes layout thrashing?
2. How do you optimize critical rendering path?
3. How do CSS containment and `will-change` affect performance?
4. How do you design a scalable CSS architecture?
5. How do you prevent style leakage across components?
6. What is Shadow DOM?
7. How do browser storage quotas affect frontend apps?
8. How do you build offline-first behavior?
9. How do you handle print styles for statements or receipts?
10. How do you handle responsive financial tables on mobile?

Scenario-based:

1. A table with transaction history breaks on mobile. How do you redesign it?
2. A modal cannot be used with keyboard. What needs fixing?
3. A production page has layout shift after fonts load. How do you fix it?
4. A form label is visible but screen readers do not announce it. How do you debug?
5. A bank statement printout is cutting content. How do you test and fix print CSS?

## 6. React Questions

Beginner:

1. What is React?
2. What is JSX?
3. What is a component?
4. What are props?
5. What is state?
6. What is the virtual DOM?
7. What is one-way data flow?
8. What is conditional rendering?
9. Why do lists need keys?
10. What is controlled vs uncontrolled input?
11. What is `useState`?
12. What is `useEffect`?
13. What is prop drilling?
14. What is lifting state up?
15. What are fragments?

Intermediate:

1. When does a component re-render?
2. What is reconciliation?
3. Why should keys be stable?
4. What are common `useEffect` mistakes?
5. When should you not use `useEffect`?
6. What is `useMemo`?
7. What is `useCallback`?
8. What is `useRef`?
9. What is Context API?
10. What are custom hooks?
11. How do you handle forms in React?
12. How do you handle errors in React?
13. What is an error boundary?
14. What is Suspense?
15. What is hydration?
16. What is lazy loading?
17. How do you avoid unnecessary re-renders?
18. What are portals?
19. What is Strict Mode?
20. What is the difference between client state and server state?

Advanced:

1. Explain React's rendering model.
2. What is concurrent rendering?
3. What is `useTransition`?
4. What is `useDeferredValue`?
5. What is optimistic UI?
6. How do you design reusable components without over-abstraction?
7. How do you prevent stale closures?
8. How do you handle race conditions in effects?
9. How do you profile React performance?
10. What causes hydration mismatch?
11. How do you design a component library?
12. How do you handle authorization-aware UI without trusting the UI?
13. How do you manage complex forms?
14. How do you structure a large React codebase?
15. How do you test custom hooks?

Scenario-based:

1. Account balance flickers between old and new values. How do you debug?
2. A transfer form submits twice. How do you prevent duplicate submissions?
3. A child component re-renders too often. What do you check?
4. A custom hook causes an infinite loop. How do you fix it?
5. A dashboard has many widgets calling APIs. How do you coordinate loading and error states?
6. A user edits profile in one tab and another tab shows stale data. How do you handle it?
7. A statement list with 50,000 rows is slow. What do you do?
8. A form loses user input after validation error. How do you fix it?
9. A role-based button is hidden in UI. Is that enough security? Why not?
10. A React app shows a blank screen in production. How do you debug?

## 7. Next.js Questions

Beginner:

1. What is Next.js?
2. What is file-based routing?
3. What is the App Router?
4. What is the difference between `page.tsx` and `layout.tsx`?
5. What are dynamic routes?
6. What are route groups?
7. What are Server Components?
8. What are Client Components?
9. What does `"use client"` mean?
10. What are API routes or route handlers?

Intermediate:

1. When should you use Server Components vs Client Components?
2. How do you fetch data in Server Components?
3. How do you fetch data in Client Components?
4. How does caching work in Next.js?
5. What is revalidation?
6. What are Server Actions?
7. What is streaming?
8. What is Suspense used for in Next.js?
9. How do you protect routes?
10. What is `proxy.ts` used for in modern Next.js docs?
11. How do redirects work?
12. How do you handle metadata?
13. How do you optimize images?
14. How do you handle environment variables?
15. How do you deploy a Next.js app?

Advanced:

1. What are the tradeoffs of SSR, SSG, ISR, CSR, and RSC?
2. How do you avoid leaking secrets into client bundles?
3. How do you prevent hydration mismatch?
4. How do you design data fetching for a banking dashboard?
5. How do you handle authenticated server rendering?
6. How do you handle caching for user-specific financial data?
7. How do you invalidate cached data after a mutation?
8. How do you design a secure Server Action?
9. How do you handle partial page failure?
10. How do you monitor a Next.js production app?
11. How do Edge runtime limitations affect design?
12. How do you handle multi-region latency?
13. How do you design a BFF with Next.js?
14. How do you handle feature flags?
15. How do you design audit-friendly UI flows?

Scenario-based:

1. User A sees User B's account data after caching. What went wrong?
2. A banking dashboard page is slow on first load. How do you optimize?
3. A protected route briefly shows private content before redirect. How do you prevent it?
4. A Server Component fetch uses a secret key. How do you ensure it never reaches the client?
5. A Server Action performs a transfer. What validations must be server-side?
6. A session expires while user is filling a transfer form. What flow do you design?
7. A page works locally but fails after deployment because of environment variables. How do you debug?
8. A Next.js app has hydration errors only in production. How do you investigate?
9. A page needs real-time transaction updates. How do you integrate websocket/SSE with Next.js?
10. A route protection implementation uses only client-side checks. What is the risk?

## 8. State Management and Data Fetching Questions

Beginner:

1. What is local component state?
2. What is global state?
3. What is server state?
4. When is Context enough?
5. What problem does Redux solve?
6. What problem does TanStack Query solve?
7. What is cache invalidation?
8. What is optimistic update?
9. What are loading, success, empty, and error states?
10. What is pagination?

Intermediate:

1. How do you decide between Context, Redux, Zustand, and TanStack Query?
2. How do you model authentication state?
3. Should account balance be stored in Redux? Why or why not?
4. How do you avoid stale server state?
5. How do you handle retries?
6. How do you handle polling?
7. How do you handle websocket updates?
8. How do you handle optimistic updates safely?
9. How do you avoid duplicate API calls?
10. How do you normalize API data?

Advanced:

1. How do you design a data layer for multiple products: savings, cards, loans, investments?
2. How do you prevent cache pollution between users?
3. How do you model idempotency for payment mutations?
4. How do you coordinate server state with local draft state?
5. How do you handle conflict resolution?
6. How do you implement offline drafts without risking financial inconsistency?
7. How do you handle real-time updates with eventual consistency?
8. How do you build a resilient API client with auth refresh and request replay?
9. How do you prevent token refresh stampedes?
10. How do you handle logout while requests are in flight?

Scenario-based:

1. A user logs out but old data flashes on the login screen. How do you fix it?
2. A token refresh request fails. What should happen to queued requests?
3. A transaction appears twice after retry. What backend/frontend contract prevents this?
4. A websocket event updates account balance while user is submitting a transfer. How do you handle consistency?
5. Search filters, pagination, and sorting must survive refresh. Where do you store state?

## 9. Security and Banking Questions

Core concepts:

1. What is authentication?
2. What is authorization?
3. What is session management?
4. What is MFA?
5. What is step-up authentication?
6. What is CSRF?
7. What is XSS?
8. What is CSP?
9. What is CORS?
10. What is clickjacking?
11. What is rate limiting?
12. What is idempotency?
13. What is replay attack prevention?
14. What is audit logging?
15. What is least privilege?

Frontend auth/security:

1. Where should auth tokens be stored in a browser app?
2. Why are HttpOnly cookies useful?
3. Why is localStorage risky for sensitive tokens?
4. What does `Secure` cookie attribute do?
5. What does `SameSite` cookie attribute do?
6. Why is CSRF still relevant with cookies?
7. Why does React's escaping help against XSS but not solve all XSS?
8. When is `dangerouslySetInnerHTML` dangerous?
9. How do you prevent secrets from being bundled into frontend code?
10. How do you handle logout securely?
11. How do you expire sessions on inactivity?
12. How do you revoke refresh tokens?
13. How do you prevent sensitive data from appearing in logs?
14. How do you handle browser autofill safely?
15. How do you avoid exposing full account numbers?

Banking scenarios:

1. How would you design transfer confirmation?
2. How would you prevent duplicate transfer submission?
3. How would you protect add-beneficiary flow?
4. How would you design session timeout warning?
5. How would you handle user opening the same account in two tabs?
6. How would you handle logout from all devices?
7. How would you handle suspicious login from new location?
8. How would you show masked account numbers?
9. How would you design "view full card number" securely?
10. How would you handle copy/paste restrictions for account fields?
11. How would you design transaction search without leaking data?
12. How would you secure statement download?
13. How would you handle user pressing browser back after logout?
14. How would you protect against clickjacking?
15. How would you design audit logs for customer-service actions?
16. How would you handle API returning `403` vs `401`?
17. How would you handle session expiry during payment?
18. How would you design OTP resend with rate limits?
19. How would you protect high-risk settings changes?
20. How would you explain why DevTools blocking is not true security?

Red flags in interview answers:

- Saying "I will disable right-click and F12, so DevTools is blocked."
- Saying "I will hide admin buttons, so the user cannot access admin APIs."
- Storing banking tokens in localStorage without discussing XSS risk.
- Trusting client-side role checks.
- Returning full sensitive data and just hiding it in CSS.
- Forgetting CSRF when cookies are used.
- Forgetting server-side session revocation on logout.

## 10. Performance Questions

Beginner:

1. What is web performance?
2. What is lazy loading?
3. What is code splitting?
4. What is image optimization?
5. What is caching?
6. What is a bundle?
7. What is minification?
8. What is compression?
9. What are Core Web Vitals?
10. What is Lighthouse?

Intermediate:

1. What is LCP?
2. What is INP?
3. What is CLS?
4. How do you reduce JavaScript bundle size?
5. How do you optimize React rendering?
6. How do you profile a slow page?
7. How do you avoid unnecessary hydration?
8. How do you optimize fonts?
9. How do you virtualize long lists?
10. How do you optimize charts and dashboards?

Advanced:

1. How do you set a performance budget?
2. How do you monitor real-user performance?
3. How do you balance security scripts with performance?
4. How do you optimize an authenticated dashboard where CDN caching is limited?
5. How do you stream slow data without blocking the whole page?
6. How do you design skeleton loading without causing layout shift?
7. How do you diagnose memory leaks?
8. How do you handle expensive calculations in React?
9. How do you reduce main-thread blocking?
10. How do you measure performance regressions in CI?

Scenario-based:

1. Dashboard loads in 8 seconds. What do you check first?
2. LCP is poor on mobile. What are likely causes?
3. INP is poor when typing into search. What do you optimize?
4. A chart freezes the page. What approaches can help?
5. Bundle grew after adding a date library. How do you investigate?

## 11. Testing Questions

Beginner:

1. What is unit testing?
2. What is integration testing?
3. What is end-to-end testing?
4. What is a test assertion?
5. What is mocking?
6. What is test coverage?
7. What is regression testing?
8. Why test user behavior instead of implementation details?
9. What is React Testing Library?
10. What is Playwright?

Intermediate:

1. How do you test a React form?
2. How do you test async loading states?
3. How do you test error states?
4. How do you test custom hooks?
5. How do you mock API calls?
6. What should not be mocked?
7. How do you test route protection?
8. How do you test accessibility basics?
9. How do you test keyboard navigation?
10. How do you test logout behavior?

Advanced:

1. How do you design a test pyramid for a banking frontend?
2. What e2e flows are critical in banking?
3. How do you test duplicate payment prevention?
4. How do you test session expiry?
5. How do you test CSRF behavior?
6. How do you avoid flaky e2e tests?
7. How do you use test data safely?
8. How do you test audit-sensitive actions?
9. How do you test cross-tab logout?
10. How do you test feature flags?

Scenario-based:

1. A bug reached production after a refactor. What tests should have caught it?
2. E2E tests are flaky in CI. How do you stabilize them?
3. A test passes but users still cannot complete a form. What might be wrong?
4. A mock hides an integration bug. How do you improve testing?
5. How do you test "Pay" button disables while request is pending?

## 12. Accessibility Questions

Beginner:

1. What is accessibility?
2. What is semantic HTML?
3. What is alt text?
4. What are ARIA attributes?
5. What is keyboard navigation?
6. What is focus management?
7. What is color contrast?
8. What is a screen reader?
9. Why should forms have labels?
10. What is skip navigation?

Intermediate:

1. When should you use ARIA?
2. How do you build an accessible modal?
3. How do you build accessible tabs?
4. How do you announce form errors?
5. How do you handle loading states for screen readers?
6. How do you make charts accessible?
7. How do you test with keyboard only?
8. How do you manage focus after navigation?
9. How do you avoid relying only on color?
10. How do you handle accessible tables?

Advanced:

1. How do you make transaction tables accessible at scale?
2. How do you make OTP input accessible?
3. How do you handle session timeout warnings accessibly?
4. How do you design error summaries for complex forms?
5. How do you support zoom up to 200%?
6. How do you test accessibility in CI?
7. How do you handle accessible masked values?
8. How do you handle language and locale in financial UI?
9. How do you avoid accessibility regressions in a design system?
10. How do you balance security restrictions with accessibility?

Scenario-based:

1. A blind user cannot complete money transfer. What do you inspect?
2. A modal opens but keyboard focus stays behind it. How do you fix?
3. A red error border is the only error indicator. What is wrong?
4. An icon-only button has no accessible name. How do you fix?
5. A session timeout dialog appears but is not announced. What do you do?

## 13. API, Backend, and Architecture Questions for Frontend Interviews

Beginner:

1. What is REST?
2. What is HTTP?
3. What are common HTTP methods?
4. What are common HTTP status codes?
5. What is JSON?
6. What is GraphQL?
7. What is pagination?
8. What is authentication header?
9. What is a cookie?
10. What is an API contract?

Intermediate:

1. What is idempotency?
2. Why should payment APIs use idempotency keys?
3. What is optimistic concurrency?
4. What is eventual consistency?
5. What is API versioning?
6. What is rate limiting?
7. What is request cancellation?
8. How do you handle partial failure?
9. How do you handle long-running operations?
10. How do you design error response formats?

Advanced:

1. How would you design frontend integration for payments?
2. How would you design transaction search over large data?
3. How would you design real-time fraud alerts?
4. How would you design account aggregation?
5. How would you design audit logs?
6. How would you handle retries safely for mutations?
7. How would you handle multi-region data delays in UI?
8. How would you design a BFF for banking frontend?
9. How would you model permission checks across UI and API?
10. How would you handle backward compatibility during API migration?

Scenario-based:

1. API returns 200 but business operation failed. How should frontend handle it?
2. API returns 202 for transfer request. What UX do you design?
3. API returns partial dashboard data. Do you show partial UI?
4. API returns too much sensitive data. What do you do?
5. Backend wants frontend to calculate transfer fee. Is that safe?

## 14. System Design Scenarios

Practice these out loud:

1. Design a banking dashboard in React/Next.js.
2. Design transaction history with filters, pagination, export, and mobile support.
3. Design a money transfer flow.
4. Design add-beneficiary flow with OTP and cooldown.
5. Design session timeout and logout across tabs.
6. Design notification center for transactions and alerts.
7. Design statement download and print preview.
8. Design a credit-card management page.
9. Design role-based internal banking portal.
10. Design fraud alert review UI.
11. Design feature flags for gradual rollout.
12. Design an error-handling system for frontend.
13. Design API client architecture for a large app.
14. Design frontend logging and observability.
15. Design secure file upload for KYC documents.
16. Design accessibility strategy for a financial app.
17. Design performance strategy for slow mobile networks.
18. Design offline-friendly read-only account snapshot.
19. Design a multi-language banking app.
20. Design migration from CRA/Vite React app to Next.js.

System design answer structure:

1. Clarify requirements and users.
2. Identify security and compliance constraints.
3. Define routes/pages/components.
4. Define data model and API contracts.
5. Discuss auth/session/authorization.
6. Discuss state management and caching.
7. Discuss loading, empty, error, and retry states.
8. Discuss performance and accessibility.
9. Discuss testing and monitoring.
10. Call out tradeoffs.

## 15. Coding Round Topics

JavaScript utilities:

1. Implement debounce.
2. Implement throttle.
3. Implement deep clone.
4. Implement flatten array.
5. Implement groupBy.
6. Implement once.
7. Implement memoize.
8. Implement promise retry.
9. Implement promise pool with concurrency limit.
10. Implement event emitter.
11. Implement LRU cache.
12. Implement custom `map`.
13. Implement custom `filter`.
14. Implement custom `reduce`.
15. Implement `Promise.all`.

React coding:

1. Build searchable list with debounce.
2. Build paginated table.
3. Build transfer form with validation.
4. Build OTP input.
5. Build modal with focus trap.
6. Build tabs.
7. Build toast system.
8. Build custom `useDebounce` hook.
9. Build custom `usePrevious` hook.
10. Build custom `useAsync` hook.
11. Build infinite scroll.
12. Build virtualized list.
13. Build theme switcher.
14. Build multi-step form.
15. Build protected route wrapper, then explain why server-side protection is still required.

DSA basics:

1. Two sum.
2. Valid parentheses.
3. Merge intervals.
4. Binary search.
5. Debounced search with sorted results.
6. LRU cache.
7. Sliding window maximum.
8. Longest substring without repeating characters.
9. Merge two sorted arrays.
10. Detect cycle in linked list.
11. Tree traversal.
12. Top K frequent elements.
13. Rate limiter.
14. Task scheduler.
15. Retry queue.

## 16. Behavioral and Communication Questions

1. Tell me about yourself.
2. Explain your React/Next.js project architecture.
3. Describe a production bug you fixed.
4. Describe a performance issue you improved.
5. Describe a security issue you learned from.
6. Describe a time you disagreed with a requirement.
7. How do you review code?
8. How do you handle unclear requirements?
9. How do you estimate frontend work?
10. How do you mentor juniors?
11. How do you keep up with React/Next.js changes?
12. How do you balance speed and quality?
13. What would you improve in your last project?
14. How do you handle production incidents?
15. Why should we hire you?

Good answer formula:

1. Context.
2. Problem.
3. Options considered.
4. Decision and tradeoff.
5. Result.
6. What you learned.

## 17. Resources to Read

Official and high-signal documentation:

- React Hooks reference: https://react.dev/reference/react/hooks
- React `useEffect`: https://react.dev/reference/react/useEffect
- React `useTransition`: https://react.dev/reference/react/useTransition
- React 19 overview: https://react.dev/blog/2024/12/05/react-19
- Next.js authentication guide: https://nextjs.org/docs/app/guides/authentication
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js data fetching: https://nextjs.org/docs/app/getting-started/fetching-data
- Next.js caching: https://nextjs.org/docs/app/getting-started/caching
- Next.js `proxy.ts`: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- MDN Web APIs: https://developer.mozilla.org/en-US/docs/Web/API
- MDN Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- MDN Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
- web.dev Core Web Vitals: https://web.dev/explore/learn-core-web-vitals
- web.dev Accessibility: https://web.dev/learn/accessibility
- Testing Library Queries: https://testing-library.com/docs/queries/about/
- React Testing Library API: https://testing-library.com/docs/react-testing-library/api/
- Playwright docs: https://playwright.dev/
- OWASP Top 10 2025: https://owasp.org/Top10/2025/en/
- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- IETF OAuth 2.0 for Browser-Based Apps draft: https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps
- web.dev SameSite cookies: https://web.dev/articles/samesite-cookies-explained

## 18. YouTube Resources

Use videos for overview, then docs for accuracy.

React:

- React Tutorial Full Course - Beginner to Pro, React 19, 2025: https://www.youtube.com/watch?v=TtPXvEcE11E
- Learn React JS - Full Beginner's Tutorial and Practice Projects: https://www.youtube.com/watch?v=x4rFhThSX04
- React JS 19 Full Course 2025, JavaScript Mastery: https://www.youtube.com/watch?v=dCLhUialKPQ
- All React Hooks Explained: https://www.youtube.com/watch?v=xfKYYRE6-TQ

Next.js:

- Next.js Full Tutorial - Beginner to Advanced, Codevolution: https://www.youtube.com/watch?v=k7o9R6eaSes
- Next.js 16 Full Stack Course, Auth, Caching, App Router: https://www.youtube.com/watch?v=MZbwu3-uz3Y
- Next.js 16 Full Course, Build and Deploy a Production App: https://www.youtube.com/watch?v=I1V9YWqRIeI
- The Right Way to do Auth with the Next.js App Router: https://www.youtube.com/watch?v=v6UvgfSIjQ0

JavaScript and TypeScript:

- Most asked JavaScript interview questions: https://www.youtube.com/watch?v=tLhfFseD_QY
- JavaScript Promise interview questions in 10 mins: https://www.youtube.com/watch?v=1OINZhOIh0c
- JavaScript polyfills/interview practice, RoadsideCoder: https://www.youtube.com/watch?v=Th3rZjfKKhI
- Learn TypeScript - Full Tutorial: https://www.youtube.com/watch?v=30LWjhZzg50

Security and auth:

- Best Practices for React Data Security, Logins, Passwords, JWTs: https://www.youtube.com/watch?v=3QaFEu-KkR8
- React Login Authentication with JWT Access and Refresh Tokens: https://www.youtube.com/watch?v=nI8PYZNFtac
- Refresh Token Rotation and Reuse Detection: https://www.youtube.com/watch?v=s-4k5TcGKHg
- OAuth 2.0 Explained in 10 Minutes: https://www.youtube.com/watch?v=-ZwrHi03MtU
- Essential Web Application Security Risks to Know: https://www.youtube.com/watch?v=hs6O9mSaoRc

Testing:

- Playwright MiniProject - End-to-End Automation: https://www.youtube.com/watch?v=5wSztvWhx14

## 19. Mock Interview Drill

Daily drill:

1. Pick 5 core questions.
2. Pick 2 scenario questions.
3. Answer each out loud in 2 minutes.
4. For every answer, include at least one tradeoff.
5. For security answers, always say what must be enforced server-side.

Weekly drill:

1. Build one small React feature.
2. Add TypeScript types.
3. Add loading, empty, error, and success states.
4. Add one unit/integration test.
5. Explain how you would secure, test, and optimize it.

High-value mock questions:

1. Explain React rendering and why a component re-renders.
2. Explain `useEffect` and common mistakes.
3. Explain Server Components vs Client Components.
4. Explain how you would protect a banking route in Next.js.
5. Explain why DevTools blocking is not a valid security boundary.
6. Design a money transfer flow.
7. Prevent duplicate payment submission.
8. Handle session timeout during a form.
9. Optimize a slow banking dashboard.
10. Test a transfer form end to end.

