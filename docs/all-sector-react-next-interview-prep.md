# All-Sector React, Next.js, and Frontend Interview Prep Pack

Generated: 2026-07-10

This is a sector-wide interview prep guide for React, Next.js, JavaScript, TypeScript, frontend architecture, security, performance, testing, accessibility, APIs, and system design. Use the earlier banking prep pack as a deep security example; use this file to prepare for scenario questions across many industries.

Important mindset: no one can memorize every possible business domain. Strong interview performance comes from recognizing repeated patterns: identity, permissions, data sensitivity, workflow state, failure handling, performance constraints, auditability, and user trust.

## 1. Universal Scenario Answer Framework

When an interviewer gives any scenario, answer in this order:

1. Clarify the user and goal.
2. Identify critical flows.
3. Identify data sensitivity.
4. Draw the trust boundary: browser, BFF/API, backend, database, third-party services.
5. Decide rendering model: Server Component, Client Component, SSR, CSR, static, streaming, or hybrid.
6. Decide state model: local UI state, URL state, server state cache, global app state, persistent draft.
7. Discuss authorization: server-side enforcement first, UI gating second.
8. Discuss loading, empty, error, offline, timeout, and retry states.
9. Discuss performance: bundle size, caching, virtualization, image/media optimization, Core Web Vitals.
10. Discuss accessibility: semantic HTML, keyboard flow, focus, labels, screen-reader announcements.
11. Discuss testing: unit, integration, E2E, accessibility, security, and edge cases.
12. Mention observability: logs, metrics, tracing, user-event analytics, error monitoring.
13. Close with tradeoffs.

Interview-ready phrase:

"I would first separate what must be enforced on the server from what is only UI behavior. Then I would design the frontend around clear states: loading, success, empty, error, stale, unauthorized, and retry. For the domain-specific risks, I would adapt auth, caching, validation, audit logging, and performance based on the sensitivity of the workflow."

## 2. Cross-Domain Topics You Must Know

Core frontend:

- JavaScript: closures, event loop, promises, async/await, prototypes, modules, browser APIs.
- TypeScript: unions, generics, narrowing, discriminated unions, utility types, API response typing.
- React: rendering, reconciliation, hooks, effects, context, memoization, Suspense, error boundaries.
- Next.js: App Router, Server Components, Client Components, data fetching, caching, Server Actions, route handlers, `proxy.ts`, environment variables, deployment.
- HTML/CSS: semantic HTML, forms, flex/grid, responsive layouts, tables, modals, focus management.
- APIs: REST, GraphQL basics, HTTP status codes, pagination, filtering, sorting, idempotency, retries.
- Security: auth, authorization, sessions, cookies, CSRF, XSS, CSP, CORS, rate limits, audit logs.
- Performance: LCP, INP, CLS, bundle splitting, virtualization, caching, image optimization, streaming.
- Testing: React Testing Library, Playwright, mocks, API contract tests, critical-path E2E tests.
- Accessibility: WCAG, keyboard navigation, ARIA only when needed, screen reader labels, color contrast.
- Deployment: CI/CD, env vars, error monitoring, feature flags, rollbacks, observability.

## 3. Sector Map

Use this table to understand what each sector usually cares about.

| Sector | Common flows | Main frontend risk | Interview focus |
|---|---|---|---|
| FinTech/Banking | login, accounts, transfers, statements | unauthorized actions, stale balances | security, sessions, audit, idempotency |
| E-commerce/Retail | catalog, cart, checkout, orders | overselling, payment failure | inventory, checkout UX, performance |
| Healthcare | appointments, records, prescriptions | sensitive health data exposure | privacy, consent, access control |
| EdTech | courses, quizzes, progress, live classes | cheating, progress sync | offline, video, role flows |
| SaaS/CRM/ERP | dashboards, records, workflows | complex permissions | roles, filters, tables, audit |
| Logistics | tracking, dispatch, warehouse | stale real-time location | real-time, maps, status updates |
| Travel/Hospitality | search, booking, cancellation | price/availability changes | concurrency, caching, forms |
| Media/OTT | browsing, playback, recommendations | video performance | streaming, personalization |
| Social/Chat | feeds, comments, messaging | abuse, real-time consistency | websockets, moderation |
| Enterprise Admin | user management, approvals | destructive admin actions | permissions, confirmations |
| Insurance | quotes, claims, documents | sensitive document handling | uploads, forms, state machines |
| Real Estate | listings, search, maps, leads | inaccurate availability | search, maps, media |
| Food/Q-commerce | menu, cart, tracking | delivery ETA drift | real-time, inventory |
| Mobility/Ride Sharing | booking, driver tracking, payments | location privacy | maps, realtime, safety |
| AI/LLM Apps | prompts, streaming output, files | prompt injection/data leaks | streaming, guardrails, cost |
| Government/Public Services | forms, eligibility, appointments | accessibility/exclusion | accessibility, resilience |
| HR/Recruitment | jobs, candidates, interviews | privacy and bias | workflows, search, permissions |
| Gaming | gameplay, leaderboard, store | latency and cheating | realtime, state sync |
| IoT Dashboards | devices, telemetry, alerts | stale device state | realtime, charts, offline |
| Cybersecurity/SOC | alerts, incidents, investigation | alert overload | dense UX, realtime, audit |
| Developer Tools | logs, traces, config, API keys | secret leakage | DX, search, secure storage |
| News/Publishing | articles, SEO, paywall | SEO/performance | SSR, caching, personalization |

## 4. FinTech and Banking

Common features:

- Secure login, MFA, account overview, transaction history, money transfer, card controls, statements, beneficiary management, alerts, dispute workflow.

Scenario questions:

1. How do you prevent duplicate money transfer when user double-clicks submit?
2. How do you handle session timeout while user is filling a form?
3. How do you show account balance if real-time API is slow?
4. How do you design transaction history with filters and export?
5. How do you protect add-beneficiary flow?
6. How do you sync logout across multiple tabs?
7. How do you handle user opening DevTools?
8. How do you prevent User A seeing User B data due to caching?
9. How do you design "view full card number" safely?
10. How do you handle a transfer API returning pending status?

Strong answer themes:

- Use server-side authorization, HttpOnly secure cookies, CSRF protection, short session lifetime, step-up auth, idempotency keys, audit logs, masked sensitive data, no secrets in client bundle, no sensitive tokens in localStorage.

## 5. E-Commerce and Retail

Common features:

- Home page, product listing, product detail page, search, filters, cart, coupons, checkout, payment, order tracking, returns, reviews, recommendations.

Scenario questions:

1. Product price changes while item is in cart. What should happen?
2. Inventory has only one item left and many users try to buy it. How do you design frontend behavior?
3. Checkout payment succeeds but order API times out. What does UI show?
4. How do you optimize a product listing page with thousands of items?
5. How do you implement filters, sorting, and pagination?
6. How do you design cart persistence for guest and logged-in users?
7. How do you prevent coupon abuse?
8. How do you handle abandoned checkout?
9. How do you implement image optimization for product pages?
10. How do you support multiple currencies and locales?

Strong answer themes:

- Source of truth is backend for price, tax, stock, discounts, and order status. Frontend can optimistic-update cart but must revalidate before payment. Use idempotency keys for checkout, skeletons for listing, URL state for filters, image CDN, SSR/SSG where useful, and E2E tests for checkout.

## 6. Healthcare and HealthTech

Common features:

- Patient portal, appointment booking, lab results, prescriptions, doctor notes, telemedicine, insurance details, consent forms, secure messaging.

Scenario questions:

1. How do you show lab results only after doctor approval?
2. How do you protect sensitive patient records in frontend?
3. How do you design appointment booking when slots change quickly?
4. How do you build secure document upload for medical reports?
5. How do you handle telemedicine video errors?
6. How do you design role-based access for patient, doctor, nurse, admin?
7. How do you prevent screenshots or copy of sensitive data?
8. How do you handle emergency access or break-glass workflows?
9. How do you design accessible medical forms?
10. How do you log access to patient records?

Strong answer themes:

- Treat the browser as untrusted. Enforce access on server, avoid caching sensitive pages publicly, mask where possible, require re-auth for sensitive records, use audit logs, timeouts, secure uploads, consent-aware UI, and accessible forms. Mention HIPAA or regional health privacy only as a domain consideration, not as legal advice.

## 7. EdTech

Common features:

- Course catalog, lessons, video player, quizzes, assignments, progress, certificates, live classes, teacher dashboard, parent dashboard.

Scenario questions:

1. Student loses internet during quiz. How do you design the flow?
2. How do you prevent quiz cheating in frontend?
3. How do you sync video progress across devices?
4. How do you design live class attendance?
5. How do you handle role differences: student, teacher, parent, admin?
6. How do you build an accessible quiz UI?
7. How do you design assignment uploads?
8. How do you show progress when backend sync is delayed?
9. How do you support low-bandwidth users?
10. How do you handle certificate generation?

Strong answer themes:

- Frontend cannot prevent cheating alone. Use server validation, question randomization, time windows, autosave, conflict handling, offline drafts, accessible controls, video adaptive streaming, and clear recovery states.

## 8. SaaS, CRM, and ERP

Common features:

- Dashboards, record lists, advanced filters, detail pages, workflows, approvals, comments, file attachments, permissions, audit logs, integrations.

Scenario questions:

1. How do you design a large CRM table with filters, sorting, bulk actions, and saved views?
2. How do you handle permissions for field-level access?
3. How do you prevent accidental destructive bulk updates?
4. How do you design optimistic updates for record editing?
5. How do you handle concurrent edits by two users?
6. How do you implement audit trail UI?
7. How do you design dashboard widgets with independent failures?
8. How do you support tenant-specific branding?
9. How do you design feature flags for enterprise rollout?
10. How do you scale frontend architecture for many modules?

Strong answer themes:

- Use server-side permissions, URL-backed filters, virtualization, optimistic concurrency, confirmation flows, undo where safe, feature flags, modular boundaries, role-aware UI, and test critical workflows with realistic permissions.

## 9. Logistics and Supply Chain

Common features:

- Shipment tracking, warehouse inventory, route planning, dispatch board, driver app, scanning, delivery proof, exception handling, ETA.

Scenario questions:

1. Tracking location updates every few seconds. How do you keep UI efficient?
2. Driver goes offline during delivery. What happens?
3. Warehouse scanner submits duplicate scans. How do you handle it?
4. How do you show delayed shipments and exceptions?
5. How do you design a dispatch board for many drivers?
6. How do you handle map performance?
7. How do you design proof-of-delivery upload?
8. How do you handle stale ETA?
9. How do you design role permissions for warehouse, driver, manager, customer?
10. How do you handle real-time alerts without overwhelming users?

Strong answer themes:

- Use real-time updates with throttling/batching, stale indicators, offline queues for non-critical events, idempotency, map clustering, status state machines, file upload retry, and clear conflict resolution.

## 10. Travel and Hospitality

Common features:

- Search, filters, calendar, room/flight selection, traveler details, payment, booking confirmation, cancellation, loyalty, support.

Scenario questions:

1. Price changes between search and checkout. What should UI do?
2. Seat or room becomes unavailable after user selects it. How do you handle it?
3. How do you design date-range picker for accessibility?
4. How do you optimize search results with many filters?
5. How do you handle payment pending state?
6. How do you show cancellation policy clearly?
7. How do you support multiple currencies and time zones?
8. How do you design itinerary page offline?
9. How do you handle third-party supplier API failure?
10. How do you build a booking flow that survives refresh?

Strong answer themes:

- Availability and price must be revalidated before booking. Use URL state for search, server-confirmed reservations, clear expiry timers, resilient forms, time-zone-safe date handling, and progressive disclosure for policies.

## 11. Media, OTT, and Streaming

Common features:

- Home feed, search, video player, watchlist, recommendations, subscriptions, downloads, profiles, parental controls.

Scenario questions:

1. Video playback fails on slow network. What do you do?
2. How do you design continue-watching sync?
3. How do you handle multiple profiles in one account?
4. How do you implement watchlist optimistically?
5. How do you optimize image-heavy content rows?
6. How do you design parental controls?
7. How do you handle live-stream delay?
8. How do you support subtitles and accessibility?
9. How do you design offline downloads?
10. How do you handle subscription entitlement checks?

Strong answer themes:

- Use adaptive streaming, lazy loading, virtualized carousels where needed, server-side entitlement checks, profile-scoped caches, accessible media controls, skeleton states, and resilient playback error handling.

## 12. Social, Chat, and Community

Common features:

- Feed, post creation, comments, likes, follows, messages, notifications, search, moderation, blocking/reporting.

Scenario questions:

1. How do you build an infinite feed?
2. How do you handle optimistic likes?
3. How do you design real-time chat?
4. How do you prevent duplicate messages?
5. How do you handle message ordering across devices?
6. How do you design typing indicators and read receipts?
7. How do you handle abuse reporting?
8. How do you moderate comments?
9. How do you design notifications without overwhelming users?
10. How do you handle blocked users in UI and API?

Strong answer themes:

- Use cursor pagination, optimistic UI with rollback, websocket/SSE for realtime, server-generated message IDs, idempotency, moderation queues, privacy controls, rate limits, and clear empty/error states.

## 13. Enterprise Admin and Internal Tools

Common features:

- User management, roles, approvals, configuration, reports, audit logs, import/export, scheduled jobs, operational dashboards.

Scenario questions:

1. How do you design role and permission management?
2. How do you prevent accidental deletion of many users?
3. How do you build a CSV import flow?
4. How do you show validation errors for thousands of imported rows?
5. How do you design admin audit logs?
6. How do you handle long-running report generation?
7. How do you design approval workflows?
8. How do you protect super-admin features?
9. How do you implement feature flags safely?
10. How do you test internal tools with many permission levels?

Strong answer themes:

- Dense but clear UI, server-side permissions, action confirmations, preview-before-commit imports, background jobs, audit trails, granular roles, and E2E tests for destructive workflows.

## 14. Insurance

Common features:

- Quote flow, policy purchase, claims, document upload, adjuster review, payments, renewals, customer support.

Scenario questions:

1. How do you design a multi-step quote form?
2. How do you persist drafts safely?
3. How do you upload claim evidence reliably?
4. How do you show claim status over weeks?
5. How do you handle missing documents?
6. How do you protect sensitive policy data?
7. How do you design renewal reminders?
8. How do you handle agent/customer/admin roles?
9. How do you build a rules-driven form?
10. How do you explain premium changes clearly?

Strong answer themes:

- Use state-machine thinking, draft autosave, secure uploads, status timelines, role-aware access, audit logs, server-side pricing/rules, and form validation that explains user action clearly.

## 15. Real Estate and PropTech

Common features:

- Listings, search, map view, filters, images, virtual tours, lead forms, agent dashboard, saved properties, appointments.

Scenario questions:

1. How do you build listing search with map and filters?
2. How do you optimize many listing images?
3. How do you handle stale listing availability?
4. How do you design saved searches and alerts?
5. How do you protect agent contact forms from spam?
6. How do you handle virtual tour performance?
7. How do you build location-based search?
8. How do you support SEO for listing pages?
9. How do you design lead assignment dashboard?
10. How do you handle mobile-first browsing?

Strong answer themes:

- URL state, SSR for SEO pages, image optimization, map clustering, debounce search, server validation, spam/rate limiting, saved search notifications, and responsive card/list/map layouts.

## 16. Food Delivery and Quick Commerce

Common features:

- Restaurant/store list, menu, cart, checkout, coupons, tracking, substitutions, ratings, support.

Scenario questions:

1. Restaurant closes while user is checking out. What happens?
2. Item becomes unavailable after adding to cart. How do you handle it?
3. How do you design live order tracking?
4. How do you handle substitutions in grocery orders?
5. How do you optimize menu pages?
6. How do you calculate delivery ETA in UI?
7. How do you handle payment success but order creation pending?
8. How do you build cart persistence across sessions?
9. How do you handle address validation?
10. How do you design support/refund flow?

Strong answer themes:

- Backend confirms availability, ETA, fees, tax, and payment state. Frontend should show stale warnings, revalidation before checkout, realtime tracking, resilient payment states, and clear cancellation/refund states.

## 17. Ride Sharing and Mobility

Common features:

- Location permission, pickup/drop selection, fare estimate, driver matching, live tracking, payments, trip history, safety tools.

Scenario questions:

1. User denies location permission. What fallback do you design?
2. Driver location updates rapidly. How do you render efficiently?
3. Fare changes after route update. How do you communicate it?
4. How do you handle driver cancellation?
5. How do you design safety/emergency features?
6. How do you protect location privacy?
7. How do you show trip status across app refresh?
8. How do you handle weak network during trip?
9. How do you design scheduled rides?
10. How do you test map-heavy UI?

Strong answer themes:

- Use permissions gracefully, map throttling, realtime subscriptions, privacy-aware location handling, status machines, clear trip recovery, payment idempotency, and fallback flows for network failures.

## 18. AI and LLM Applications

Common features:

- Prompt input, streaming responses, chat history, file upload, tool calls, citations, model selection, usage limits, workspace data.

Scenario questions:

1. How do you stream an AI response in React?
2. How do you allow user to cancel generation?
3. How do you handle hallucinated output in UX?
4. How do you protect uploaded private files?
5. How do you show citations and confidence?
6. How do you handle token/cost limits?
7. How do you prevent prompt injection from uploaded content?
8. How do you design chat history search?
9. How do you handle slow model responses?
10. How do you test AI features?

Strong answer themes:

- Use streaming UI, cancellation with AbortController, clear pending/error states, server-side file access control, output disclaimers where appropriate, audit and usage tracking, guardrails, rate limits, and human review for high-risk actions.

## 19. Government and Public Services

Common features:

- Eligibility forms, applications, appointments, document upload, status tracking, multilingual support, public information, service dashboards.

Scenario questions:

1. How do you design a long government application form?
2. How do you support users with low digital literacy?
3. How do you make the flow highly accessible?
4. How do you handle document upload from mobile?
5. How do you save partial applications?
6. How do you handle multilingual content?
7. How do you design status tracking?
8. How do you handle high traffic during deadlines?
9. How do you protect personal data?
10. How do you make pages work on old devices?

Strong answer themes:

- Accessibility and resilience first. Use progressive forms, clear language, autosave, printable/downloadable confirmations, mobile upload support, low-bandwidth performance, WCAG-aware design, and privacy-by-design.

## 20. HR and Recruitment

Common features:

- Job listing, application, resume upload, candidate pipeline, interview scheduling, assessments, offer workflow, recruiter dashboard.

Scenario questions:

1. How do you design resume upload and parsing UI?
2. How do you handle candidate privacy?
3. How do you design interview scheduling across time zones?
4. How do you build candidate pipeline drag/drop?
5. How do you avoid exposing salary/private notes?
6. How do you design role-based recruiter permissions?
7. How do you handle duplicate candidate profiles?
8. How do you test assessment flow?
9. How do you support bulk actions safely?
10. How do you reduce bias in UI?

Strong answer themes:

- Protect candidate data, separate internal/private notes, time-zone-safe scheduling, accessible forms, permissions, audit logs, duplicate detection, clear consent, and careful language around automated decisions.

## 21. Gaming

Common features:

- Game UI, lobby, matchmaking, leaderboard, inventory, store, achievements, chat, live events.

Scenario questions:

1. How do you sync game state between client and server?
2. How do you prevent cheating?
3. How do you design leaderboard updates?
4. How do you handle latency?
5. How do you design in-game purchases?
6. How do you handle reconnect after network loss?
7. How do you build matchmaking UI?
8. How do you optimize animations?
9. How do you handle chat moderation?
10. How do you test time-based events?

Strong answer themes:

- Server authoritative state, client prediction where appropriate, anti-cheat server validation, websocket/realtime, graceful reconnect, rate limits, moderation, and performance profiling.

## 22. IoT and Smart Device Dashboards

Common features:

- Device list, telemetry charts, commands, alerts, firmware updates, device groups, health status, remote control.

Scenario questions:

1. How do you show whether device data is stale?
2. How do you design remote command confirmation?
3. How do you handle device offline state?
4. How do you stream telemetry efficiently?
5. How do you show alerts without overwhelming users?
6. How do you design firmware update UI?
7. How do you protect device control permissions?
8. How do you visualize large time-series data?
9. How do you handle command sent but no acknowledgement?
10. How do you test real-time device dashboards?

Strong answer themes:

- Staleness indicators, realtime subscriptions, time-series downsampling, role-based control, command acknowledgement states, confirmations for risky commands, alert grouping, and audit logs.

## 23. Cybersecurity and SOC Dashboards

Common features:

- Alert queue, incident timeline, investigation graph, asset inventory, severity filters, analyst assignment, playbooks, audit logs.

Scenario questions:

1. How do you design an alert dashboard with thousands of alerts?
2. How do you prevent analyst overload?
3. How do you handle real-time severity updates?
4. How do you design incident timeline?
5. How do you handle role-based access to sensitive evidence?
6. How do you build search across logs?
7. How do you design keyboard-heavy workflows?
8. How do you show confidence and false positives?
9. How do you handle audit trail for analyst actions?
10. How do you test dense data UIs?

Strong answer themes:

- Dense scan-friendly UI, virtualization, saved filters, grouping/deduplication, realtime updates with batching, keyboard shortcuts, auditability, permissions, and fast search.

## 24. Developer Tools and Observability

Common features:

- Logs, metrics, traces, dashboards, API keys, webhooks, integrations, project settings, alerts, docs.

Scenario questions:

1. How do you build a log viewer?
2. How do you handle infinite scrolling logs?
3. How do you protect API keys in UI?
4. How do you design copy-to-clipboard securely?
5. How do you show webhook delivery retries?
6. How do you design dashboard widgets?
7. How do you handle huge time-series charts?
8. How do you build query builder UI?
9. How do you design error monitoring page?
10. How do you support power users with keyboard shortcuts?

Strong answer themes:

- Never expose full secrets after creation unless product explicitly requires with re-auth. Use virtualization, query URL state, time-windowed data, chart downsampling, role permissions, redaction, and strong empty/error states.

## 25. News, Publishing, and SEO Sites

Common features:

- Article pages, category pages, search, author pages, comments, paywall, newsletter, ads, CMS preview.

Scenario questions:

1. How do you optimize SEO for article pages?
2. How do you handle breaking news traffic spikes?
3. How do you design paywall access?
4. How do you implement preview mode for editors?
5. How do you handle comments and moderation?
6. How do you optimize ad-heavy pages?
7. How do you support AMP-like fast reading experiences?
8. How do you handle image-heavy stories?
9. How do you design newsletter signup without hurting UX?
10. How do you handle stale cached article content?

Strong answer themes:

- SSR/static generation, CDN caching, cache invalidation, structured metadata, image optimization, accessible content, editor preview auth, moderation, and performance budgets.

## 26. Common System Design Prompts Across Sectors

Practice these:

1. Design an e-commerce checkout.
2. Design a ride booking flow.
3. Design a chat application.
4. Design a notification system.
5. Design a dashboard with widgets.
6. Design a transaction or order history page.
7. Design a file upload and review system.
8. Design a multi-step form with autosave.
9. Design a real-time tracking page.
10. Design a searchable, filterable, sortable data table.
11. Design a calendar booking system.
12. Design a video streaming page.
13. Design an admin permission system.
14. Design an audit log viewer.
15. Design an AI chat app with streaming output.
16. Design a public SEO-heavy marketplace.
17. Design a role-based SaaS dashboard.
18. Design an offline-first mobile web flow.
19. Design a product recommendation feed.
20. Design a support ticketing system.

For each prompt, cover:

- Requirements and non-requirements.
- User roles.
- Data model at a high level.
- API contracts.
- Rendering strategy.
- Component architecture.
- State management.
- Auth and authorization.
- Caching and invalidation.
- Loading/error/empty states.
- Performance.
- Accessibility.
- Testing.
- Observability.

## 27. Cross-Sector Security Questions

1. Why is frontend-only authorization unsafe?
2. Where should tokens be stored in browser apps?
3. How do HttpOnly, Secure, and SameSite cookies help?
4. What is CSRF and when is it relevant?
5. What is XSS and how does React reduce but not eliminate risk?
6. What is CSP?
7. What is CORS and what does it not protect against?
8. How do you protect file uploads?
9. How do you prevent API key leakage?
10. How do you design logout across tabs?
11. How do you handle session expiry?
12. How do you design step-up auth?
13. How do you prevent duplicate payment/order/action submission?
14. How do you avoid sensitive data in logs?
15. How do you handle public source maps?
16. What is clickjacking?
17. What is rate limiting?
18. How do you handle abuse reporting?
19. How do you protect admin pages?
20. How do you explain why DevTools blocking is not real security?

Strong answer pattern:

"Client-side checks improve UX, but the server must enforce identity, authorization, validation, rate limits, and final state transitions."

## 28. Cross-Sector Performance Questions

1. How do you optimize a slow dashboard?
2. How do you optimize a long table?
3. How do you optimize image-heavy pages?
4. How do you reduce bundle size?
5. How do you debug poor INP?
6. How do you improve LCP?
7. How do you prevent CLS?
8. How do you design skeleton loaders?
9. How do you use virtualization?
10. How do you use code splitting?
11. How do you decide what to cache?
12. How do you handle user-specific data caching?
13. How do you stream slow content?
14. How do you profile React re-renders?
15. How do you optimize charts?
16. How do you handle maps with many markers?
17. How do you measure real-user performance?
18. How do you set a performance budget?
19. How do you handle low-end devices?
20. How do you keep performance from regressing?

## 29. Cross-Sector Testing Questions

1. What should be unit tested?
2. What should be integration tested?
3. What should be E2E tested?
4. How do you test forms?
5. How do you test loading/error states?
6. How do you test route protection?
7. How do you test accessibility?
8. How do you test keyboard navigation?
9. How do you mock APIs without hiding real bugs?
10. How do you test file uploads?
11. How do you test duplicate submit prevention?
12. How do you test session expiry?
13. How do you test cross-tab logout?
14. How do you test realtime updates?
15. How do you test optimistic updates?
16. How do you test feature flags?
17. How do you reduce flaky E2E tests?
18. How do you test timezone behavior?
19. How do you test payment or booking pending states?
20. How do you test production-only bugs?

## 30. Machine Coding Tasks Across Sectors

Practice building these in React/Next:

1. Search autocomplete with debounce and cancellation.
2. Paginated, sortable, filterable data table.
3. Multi-step form with validation and autosave.
4. OTP input with paste support and accessibility.
5. File upload with progress, retry, and validation.
6. Toast notification system.
7. Modal with focus trap.
8. Tabs with keyboard support.
9. Infinite feed with cursor pagination.
10. Virtualized list.
11. Chat window with optimistic messages.
12. Checkout cart with price revalidation.
13. Booking calendar with unavailable slots.
14. Dashboard widgets with independent error states.
15. Role-based navigation.
16. Audit log viewer.
17. Timeline component.
18. Image gallery with lazy loading.
19. Video player wrapper with subtitle controls.
20. AI streaming response panel with cancel button.

For each coding task, explain:

- Component structure.
- State shape.
- API contract.
- Error handling.
- Accessibility.
- Tests.
- Performance tradeoffs.

## 31. Domain-Specific Traps Interviewers Look For

FinTech:

- Trusting hidden buttons instead of server authorization.
- Missing idempotency for payments/transfers.
- Storing sensitive tokens in localStorage without discussing risk.

E-commerce:

- Treating frontend cart price as final.
- Forgetting stock and coupon revalidation.
- Not handling payment pending states.

Healthcare:

- Forgetting audit logs for record access.
- Public caching of sensitive pages.
- Treating privacy as only a backend concern.

EdTech:

- Claiming frontend can fully prevent cheating.
- No offline/autosave strategy for quizzes.
- Ignoring low-bandwidth users.

SaaS:

- Overusing global state for all server data.
- Missing tenant isolation.
- No plan for field-level permissions.

Travel:

- Ignoring time zones.
- Treating search result price as guaranteed forever.
- No plan for third-party supplier failure.

Social/chat:

- Missing moderation and abuse handling.
- No message ordering/idempotency strategy.
- Infinite feed without cursor pagination.

AI apps:

- Trusting model output blindly.
- No cancellation/streaming/error states.
- No file access controls or prompt-injection awareness.

Government/public services:

- Ignoring accessibility.
- Complex language that users cannot understand.
- No save-and-resume for long forms.

## 32. Interview Answer Templates

Security scenario:

"I would not solve this only in React. The UI can guide users, but security must be enforced by the backend. I would check identity, permission, input validation, rate limits, idempotency, and audit logging server-side, then mirror the allowed actions in the UI for better UX."

Performance scenario:

"I would first measure before changing code: network waterfall, bundle size, React profiler, Core Web Vitals, and real-user metrics if available. Then I would separate data delay from rendering delay, optimize the biggest bottleneck, and protect it with a regression check."

State management scenario:

"I would separate local UI state, URL state, server state, and persistent draft state. Server data should usually live in a server-state cache or be fetched in Server Components, while local form interactions stay close to the component."

Next.js scenario:

"I would use Server Components for data-heavy, non-interactive rendering and Client Components only where interaction or browser APIs are required. Sensitive data and secrets stay server-side. User-specific caching must be handled carefully to avoid cross-user leakage."

Testing scenario:

"I would test the riskiest behavior first. Unit tests for pure utilities, integration tests for forms and components, E2E tests for critical flows, and accessibility checks for keyboard and screen-reader paths."

Ambiguous requirement:

"I would clarify the business rule first because the UI depends on it. If the answer is unknown, I would design a safe default: no destructive action without confirmation, no sensitive data without server authorization, and clear recovery for failed operations."

## 33. 30-Day Preparation Plan

Days 1-5: JavaScript, TypeScript, React core

- Closures, event loop, promises, array methods.
- TypeScript unions, generics, narrowing.
- React rendering, hooks, effects, forms.
- Build: search autocomplete, form, modal, table.

Days 6-10: Next.js and APIs

- App Router, Server Components, Client Components.
- Data fetching, caching, route handlers, Server Actions.
- Auth flow, cookies, session expiry.
- Build: protected dashboard and server-rendered listing page.

Days 11-15: Security and testing

- OWASP basics, sessions, CSRF, XSS, CSP, CORS.
- Testing Library and Playwright.
- Build: login/session timeout/cross-tab logout demo.

Days 16-20: Performance and accessibility

- Core Web Vitals, profiling, bundle analysis, virtualization.
- WCAG basics, keyboard navigation, forms, modals.
- Build: large data table and accessible multi-step form.

Days 21-25: Sector scenarios

- Practice 3 sectors per day.
- For each sector, answer 5 scenario questions out loud.
- Write one system-design outline per day.

Days 26-30: Mock interviews

- Daily 60-minute mock:
  - 15 minutes JavaScript/React theory.
  - 15 minutes coding task.
  - 20 minutes sector system design.
  - 10 minutes behavioral answer.

## 34. Resources to Read

Official docs and standards:

- React Hooks: https://react.dev/reference/react/hooks
- React `useEffect`: https://react.dev/reference/react/useEffect
- React `useTransition`: https://react.dev/reference/react/useTransition
- Next.js Authentication: https://nextjs.org/docs/app/guides/authentication
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Data Fetching: https://nextjs.org/docs/app/getting-started/fetching-data
- Next.js Caching: https://nextjs.org/docs/app/getting-started/caching
- Next.js `proxy.ts`: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- MDN Web APIs: https://developer.mozilla.org/en-US/docs/Web/API
- MDN Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- MDN Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
- OWASP Top 10 2025: https://owasp.org/Top10/2025/en/
- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- web.dev Core Web Vitals: https://web.dev/explore/learn-core-web-vitals
- web.dev Accessibility: https://web.dev/learn/accessibility
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Testing Library Queries: https://testing-library.com/docs/queries/about/
- React Testing Library API: https://testing-library.com/docs/react-testing-library/api/
- Playwright: https://playwright.dev/

Broad prep resources:

- Roadmap.sh Frontend Roadmap: https://roadmap.sh/frontend
- Roadmap.sh React Roadmap: https://roadmap.sh/react
- Roadmap.sh Next.js Roadmap: https://roadmap.sh/nextjs
- GreatFrontEnd: https://www.greatfrontend.com/
- GreatFrontEnd Frontend System Design Playbook: https://www.greatfrontend.com/front-end-system-design-playbook
- GreatFrontEnd questions: https://www.greatfrontend.com/questions
- Frontend Mentor: https://www.frontendmentor.io/
- Frontend Masters: https://frontendmasters.com/

Domain/security/compliance references to know about:

- PCI Security Standards Council: https://www.pcisecuritystandards.org/
- PCI DSS standards overview: https://www.pcisecuritystandards.org/standards/
- HHS HIPAA Security Rule summary: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html
- NIST Digital Identity Guidelines: https://pages.nist.gov/800-63-4/
- European Commission Data Protection: https://commission.europa.eu/law/law-topic/data-protection_en
- California CCPA: https://oag.ca.gov/privacy/ccpa
- FTC Children's Privacy/COPPA: https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy

## 35. YouTube Resources

React and Next.js:

- React Tutorial Full Course - Beginner to Pro, React 19, 2025: https://www.youtube.com/watch?v=TtPXvEcE11E
- Learn React JS - Full Beginner's Tutorial and Practice Projects: https://www.youtube.com/watch?v=x4rFhThSX04
- React JS 19 Full Course 2025: https://www.youtube.com/watch?v=dCLhUialKPQ
- All React Hooks Explained: https://www.youtube.com/watch?v=xfKYYRE6-TQ
- Next.js 16 Full Stack Course, Auth, Caching: https://www.youtube.com/watch?v=MZbwu3-uz3Y
- Next.js 16 Full Course: https://www.youtube.com/watch?v=I1V9YWqRIeI
- Next.js Tutorial 2026 Updated: https://www.youtube.com/watch?v=jZInNd6djz4
- Next.js Auth: https://www.youtube.com/watch?v=VTQRg8zVuQI

JavaScript, TypeScript, and interviews:

- Most asked JavaScript interview questions: https://www.youtube.com/watch?v=tLhfFseD_QY
- JavaScript Promise interview questions: https://www.youtube.com/watch?v=1OINZhOIh0c
- JavaScript polyfills/interview practice: https://www.youtube.com/watch?v=Th3rZjfKKhI
- Learn TypeScript - Full Tutorial: https://www.youtube.com/watch?v=30LWjhZzg50
- JavaScript, React, and Next.js Real Interview: https://www.youtube.com/watch?v=C6kx64oq5tg

Frontend system design:

- How to prepare your Frontend System Design Interview: https://www.youtube.com/watch?v=JhcW0fuR_ig
- Frontend System Design Essentials - Real-time updates: https://www.youtube.com/watch?v=VtOY_LoFOGY
- Typeahead frontend system design: https://www.youtube.com/watch?v=Sky0Ln0hrZs
- Toast component frontend system design: https://www.youtube.com/watch?v=v50uJDEFnqM
- RoadsideCoder frontend system design playlist: https://www.youtube.com/playlist?list=PLKhlp2qtUcSaSnNnNffRPIU3DRQ2xAdj8

Security and auth:

- Best Practices for React Data Security, Logins, Passwords, JWTs: https://www.youtube.com/watch?v=3QaFEu-KkR8
- React Login Authentication with JWT Access and Refresh Tokens: https://www.youtube.com/watch?v=nI8PYZNFtac
- Refresh Token Rotation and Reuse Detection: https://www.youtube.com/watch?v=s-4k5TcGKHg
- OAuth 2.0 Explained in 10 Minutes: https://www.youtube.com/watch?v=-ZwrHi03MtU
- Essential Web Application Security Risks to Know: https://www.youtube.com/watch?v=hs6O9mSaoRc

Testing:

- Playwright MiniProject - End-to-End Automation: https://www.youtube.com/watch?v=5wSztvWhx14

## 36. Final Practice Checklist

Before any React/Next interview, make sure you can answer these without notes:

1. Explain React rendering and re-rendering.
2. Explain `useEffect` mistakes.
3. Explain Server Components vs Client Components.
4. Explain secure authentication in Next.js.
5. Explain why frontend-only authorization is unsafe.
6. Explain CSRF, XSS, CORS, and CSP.
7. Explain caching risks for user-specific data.
8. Explain idempotency for payments/orders/bookings.
9. Explain optimistic UI and rollback.
10. Explain performance debugging.
11. Explain accessible modals and forms.
12. Explain route protection in modern Next.js.
13. Design a table, chat, checkout, booking, upload, and dashboard.
14. Handle session expiry and cross-tab logout.
15. Give sector-specific tradeoffs for at least 10 industries.

The aim is not to sound like you memorized answers. The aim is to show engineering judgment: you understand the product domain, know which parts are risky, and can design a frontend that stays usable, secure, testable, and fast.

