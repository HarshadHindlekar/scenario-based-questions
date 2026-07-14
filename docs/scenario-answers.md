# Scenario Answers: React, Next.js, and Frontend Interviews

This is the answer companion for the scenario prompts in the all-sector and banking preparation packs. Try to answer the question out loud first, then open the model answer. Adapt the wording to your actual experience; never claim production experience you do not have.

## 1. How To Answer Any Scenario

Use this order in almost every answer:

1. Clarify the user, business goal, and failure that matters most.
2. Separate browser behavior from server-enforced security and business rules.
3. Choose the right state: local UI state, URL state, server cache, draft state, or realtime state.
4. Describe loading, empty, stale, error, retry, unauthorized, and offline behavior.
5. Cover accessibility, testing, observability, and the tradeoff you are making.

**Reusable opening:** "I would first clarify the business rule and identify the source of truth. The browser can improve the experience, but authorization, pricing, inventory, payment status, and other sensitive decisions must be enforced by the server. Then I would design explicit loading, success, empty, stale, error, and recovery states and test the critical path and failure cases."

## 2. FinTech and Banking

### 1. How do you prevent duplicate money transfer when the user double-clicks submit?

<details><summary>Model answer</summary>

**Model answer:** I would disable the button immediately as a UX guard, but the real protection is a unique idempotency key generated for that transfer intent. The API stores the first result for that key and returns the same result for retries. If the request times out, I would show "processing" and query transfer status instead of blindly submitting again. I would also audit the attempt and test double-click, refresh, timeout, and retry behavior.
</details>

### 2. How do you handle session timeout while the user is filling a form?

<details><summary>Model answer</summary>

**Model answer:** I would show an accessible warning before idle timeout and let the user extend the session with re-authentication. When the server returns `401` or `419`, I would stop submission, preserve only a safe local draft if policy allows, explain that the session expired, and redirect to login. A sensitive transfer should never be resumed automatically without rechecking authorization and showing the user exactly what will be submitted.
</details>

### 3. How do you show account balance if the real-time API is slow?

<details><summary>Model answer</summary>

**Model answer:** I would show the last known balance with a timestamp and a visible "updating" state instead of displaying a misleading zero. The server response remains the source of truth, and a realtime event or polling refresh updates it. During a transfer I would revalidate the balance on the server and make the UI distinguish available, pending, and stale values.
</details>

### 4. How do you design transaction history with filters and export?

<details><summary>Model answer</summary>

**Model answer:** I would keep filters, sort, date range, and pagination in the URL so the view is shareable and survives refresh. Large result sets should be filtered and paginated on the server, with accessible table semantics and clear empty, error, and stale states. Export should be an authorized server-side job that returns a short-lived download URL, records an audit event, and never trusts client-supplied account identifiers.
</details>

### 5. How do you protect the add-beneficiary flow?

<details><summary>Model answer</summary>

**Model answer:** I would require a fresh session or step-up authentication, validate the beneficiary on the server, and use an OTP or approval flow with expiry and rate limits. The frontend should mask sensitive values, show the exact beneficiary being added, prevent duplicate submissions with idempotency, and handle pending or rejected verification. Authorization and audit logging must happen on the server, not only through hidden UI controls.
</details>

### 6. How do you sync logout across multiple tabs?

<details><summary>Model answer</summary>

**Model answer:** Logout must revoke the server session and clear in-memory and cached data. I would broadcast a logout event with `BroadcastChannel`, with a storage-event fallback, so every tab clears its state and redirects. Every API client also handles `401` or `419`, because a tab may miss the broadcast or lose connectivity. I would test logout, session expiry, a closed tab, and requests already in flight.
</details>

### 7. How do you handle a user opening DevTools?

<details><summary>Model answer</summary>

**Model answer:** I would challenge the premise politely: a site cannot securely prevent the owner of a browser from opening DevTools. Client-side detection can be bypassed and is not a security control. The real design uses server-side authorization, secure HttpOnly cookies, CSRF and XSS defenses, short revocable sessions, step-up authentication, masked data, and audit logs. If the business insists on detection, I would treat it only as a best-effort deterrent that calls server logout and revokes the session.
</details>

### 8. How do you prevent User A seeing User B data because of caching?

<details><summary>Model answer</summary>

**Model answer:** I would make user identity part of the server authorization check and never use a shared cache key for user-specific data. Sensitive responses should have appropriate private or no-cache headers, and the client query cache must be cleared on logout or account switch. I would test two users in separate sessions, refresh, back navigation, SSR, and CDN behavior, because a UI-level check cannot repair a leaked response.
</details>

### 9. How do you design "view full card number" safely?

<details><summary>Model answer</summary>

**Model answer:** I would show only a masked number by default and require step-up authentication or recent re-authentication before revealing the minimum data for the shortest time. The full value should not be placed in URLs, analytics, logs, local storage, or a public cache, and the backend should return it only after authorization. I would add auto-hide, audit the event, disable accidental persistence, and confirm that policy allows revealing it at all.
</details>

### 10. How do you handle a transfer API returning pending status?

<details><summary>Model answer</summary>

**Model answer:** I would treat `pending` as a real business state, not an error or success. The UI shows a receipt with the transfer reference, timestamp, and next update expectation, while the server remains the source of truth. I would poll with backoff or subscribe to status events, stop duplicate retry submissions, handle failure or reversal explicitly, and let users safely leave and return to the transfer detail page.
</details>

## 3. E-Commerce and Retail

### 1. Product price changes while an item is in the cart. What should happen?

<details><summary>Model answer</summary>

**Model answer:** The cart can display the previously known price, but checkout must revalidate price, tax, discount, and currency on the server. If the price changed, I would clearly highlight the difference and require the customer to accept it before payment. I would avoid silently charging the new amount and test refresh, multiple tabs, coupon changes, and expired promotions.
</details>

### 2. Inventory has one item left and many users try to buy it. How do you design frontend behavior?

<details><summary>Model answer</summary>

**Model answer:** The frontend may show an approximate stock label, but only the backend can reserve or sell inventory atomically. At checkout I would revalidate stock, show a reservation countdown if the backend supports it, and handle an out-of-stock response with a clear recovery path. I would not trust a client-side quantity limit to prevent overselling.
</details>

### 3. Payment succeeds but the order API times out. What does the UI show?

<details><summary>Model answer</summary>

**Model answer:** I would not tell the user that payment failed or ask them to pay again. I would show "payment received, confirming order" and use the payment or checkout idempotency key to query order status. The backend should reconcile payment and order creation asynchronously, while the UI offers a status page and support reference. This is a classic case where a timeout is not proof of failure.
</details>

### 4. How do you optimize a product listing page with thousands of items?

<details><summary>Model answer</summary>

**Model answer:** I would measure first, then use server-side pagination or cursor loading, URL-backed filters, responsive image sizes, lazy loading below the fold, and list virtualization only if the layout benefits from it. I would split heavy components, cache stable catalog data, reserve image dimensions to avoid layout shift, and verify mobile LCP and INP with real-user data.
</details>

### 5. How do you implement filters, sorting, and pagination?

<details><summary>Model answer</summary>

**Model answer:** I would model the controls as URL state so refresh, back, sharing, and SEO behavior are predictable. The API receives validated filters and returns items plus pagination metadata or a cursor. I would debounce free-text search, preserve selections while loading, cancel obsolete requests, and show the user when a result is stale or no longer available.
</details>

### 6. How do you design cart persistence for guest and logged-in users?

<details><summary>Model answer</summary>

**Model answer:** A guest cart can use a limited client identifier, but the server should validate price, stock, and quantity. After login I would merge guest and account carts through an explicit backend contract, resolve conflicts visibly, and clear stale client data after success. I would avoid storing payment data or sensitive account tokens in local storage.
</details>

### 7. How do you prevent coupon abuse?

<details><summary>Model answer</summary>

**Model answer:** Coupon eligibility, limits, expiry, customer scope, and final discount must be checked server-side. The frontend can provide immediate feedback, but it should not calculate the authoritative discount or expose secret rules. I would rate-limit attempts, return safe error messages, avoid leaking whether a private coupon exists, and test replay, concurrent tabs, and cart changes.
</details>

### 8. How do you handle abandoned checkout?

<details><summary>Model answer</summary>

**Model answer:** I would save only the minimum safe draft needed to resume, with clear consent and an expiry policy. The resume flow must revalidate inventory, price, delivery, and payment state instead of trusting the old draft. I would measure where users abandon, avoid intrusive prompts, and make recovery accessible on mobile and after a refresh.
</details>

### 9. How do you implement image optimization for product pages?

<details><summary>Model answer</summary>

**Model answer:** I would serve responsive sizes from an image CDN, use modern formats where supported, preload only the primary image, lazy-load below-the-fold media, and reserve aspect-ratio space. I would use meaningful alt text for product information, avoid lazy-loading the LCP image, and verify quality, bandwidth, and layout stability across devices.
</details>

### 10. How do you support multiple currencies and locales?

<details><summary>Model answer</summary>

**Model answer:** The server should provide the currency, amount, exchange-rate context, tax rules, and locale policy; the client formats values with `Intl` and never uses floating-point arithmetic as the source of truth for money. I would make currency and locale explicit in URLs or account settings, handle timezone-aware dates, and test rounding, RTL, long translations, and mixed-currency carts.
</details>

## 4. Healthcare and HealthTech

### 1. How do you show lab results only after doctor approval?

<details><summary>Model answer</summary>

**Model answer:** Approval must be represented and enforced by the backend, not inferred from a hidden button. The frontend requests the patient-scoped resource and renders pending, approved, or restricted states from the response. I would avoid putting unapproved results in public caches or preloaded HTML, log access appropriately, and make the release state understandable without exposing sensitive content.
</details>

### 2. How do you protect sensitive patient records in frontend?

<details><summary>Model answer</summary>

**Model answer:** I would treat the browser as untrusted: use server-side authorization, secure session cookies, private cache headers, short idle timeouts, re-authentication for especially sensitive records, and minimal data returned per screen. I would prevent sensitive values from analytics and logs, clear state on logout, and test navigation, back cache, multiple users, and expired sessions.
</details>

### 3. How do you design appointment booking when slots change quickly?

<details><summary>Model answer</summary>

**Model answer:** The UI can show a slot as temporarily selected, but the backend must revalidate and reserve it atomically at confirmation. I would show an expiry or stale indicator, handle conflicts by returning the user to valid alternatives without losing form data, and distinguish payment or booking pending from failure. Time zones and daylight-saving transitions need explicit tests.
</details>

### 4. How do you build secure document upload for medical reports?

<details><summary>Model answer</summary>

**Model answer:** I would validate size and type on both client and server, upload to a controlled service using short-lived signed permissions, scan and quarantine files, and bind access to the patient and authorized role. The UI needs progress, retry, cancellation, and a clear processing state. I would not expose predictable file URLs or trust the file extension.
</details>

### 5. How do you handle telemedicine video errors?

<details><summary>Model answer</summary>

**Model answer:** I would classify permission, device, network, provider, and participant errors and give a specific recovery action for each. The UI should preserve appointment context, provide a retry or audio-only fallback where policy allows, announce status changes accessibly, and record technical diagnostics without recording private content. The server remains authoritative for appointment attendance and billing state.
</details>

### 6. How do you design role-based access for patient, doctor, nurse, and admin?

<details><summary>Model answer</summary>

**Model answer:** I would model permissions as server-enforced capabilities, potentially including relationship, organization, purpose, and record sensitivity. The frontend uses the returned permissions to guide navigation and hide unavailable actions, but every API call repeats authorization. I would test each role against the same URL and API, including direct navigation and stale permission changes.
</details>

### 7. How do you prevent screenshots or copying of sensitive data?

<details><summary>Model answer</summary>

**Model answer:** A web app cannot reliably prevent screenshots, browser extensions, or copying by a user who can see the data. I would avoid pretending otherwise and focus on least-privilege access, masking, watermarking where appropriate, audit logs, timeouts, download controls, and policy-driven disclosure. Any deterrent must never replace server authorization or privacy controls.
</details>

### 8. How do you handle emergency access or a break-glass workflow?

<details><summary>Model answer</summary>

**Model answer:** Break-glass should be an explicit, server-authorized exception with a reason, time limit, elevated audit event, and post-event review. The UI should warn the clinician, require confirmation, show exactly what scope is being opened, and avoid caching the records beyond the active session. I would test denial, expiry, review visibility, and accidental activation.
</details>

### 9. How do you design accessible medical forms?

<details><summary>Model answer</summary>

**Model answer:** I would use semantic labels, grouped controls, clear instructions, input types appropriate to the data, inline errors plus an error summary, keyboard support, and screen-reader announcements. I would preserve entered values after validation, avoid color-only meaning, support zoom and mobile layouts, and test with keyboard navigation, automated checks, and assistive technology where available.
</details>

### 10. How do you log access to patient records?

<details><summary>Model answer</summary>

**Model answer:** The audit event belongs on the server and should include actor, patient record, action, purpose or workflow, timestamp, result, and correlation id without copying the record contents into logs. The frontend can show the user a meaningful access history, but it must not fabricate audit entries. I would protect audit data, define retention, and test denied and successful access paths.
</details>

## 5. EdTech

### 1. A student loses internet during a quiz. How do you design the flow?

<details><summary>Model answer</summary>

**Model answer:** I would autosave answers locally and to the server when possible, show an offline indicator and last sync time, and preserve the question state without claiming submission succeeded. On reconnect, I would reconcile using attempt and question versions, then submit through an idempotent endpoint. Exam rules determine whether the timer continues, pauses, or requires an invigilator decision.
</details>

### 2. How do you prevent quiz cheating in frontend?

<details><summary>Model answer</summary>

**Model answer:** The frontend cannot guarantee that a student will not inspect or modify it. I would keep scoring and correct answers on the server, randomize questions where appropriate, enforce attempt and time rules server-side, detect suspicious patterns, and make privacy and accessibility constraints explicit. Client restrictions can be deterrents, but they are not proof of exam integrity.
</details>

### 3. How do you sync video progress across devices?

<details><summary>Model answer</summary>

**Model answer:** I would send throttled progress checkpoints with course, lesson, and user identifiers and use the server as the canonical record. On resume, the UI should reconcile device progress and handle a newer server checkpoint explicitly. I would avoid writing on every playback event, support offline queueing where safe, and test seeking, multiple tabs, and interrupted uploads.
</details>

### 4. How do you design live class attendance?

<details><summary>Model answer</summary>

**Model answer:** Attendance should be a server-owned event based on authenticated enrollment and meeting state, not a button that students can freely set. The UI shows joined, disconnected, late, and pending-sync states, handles reconnects idempotently, and explains privacy expectations. I would include teacher correction workflows and audit the changes.
</details>

### 5. How do you handle role differences between student, teacher, parent, and admin?

<details><summary>Model answer</summary>

**Model answer:** I would define capabilities and relationships on the server, such as a parent being limited to linked students, then use them to shape navigation and actions. Components should handle unauthorized states rather than assuming a role is permanent. I would test direct URLs, stale sessions, changing enrollment, and the same data viewed by every role.
</details>

### 6. How do you build an accessible quiz UI?

<details><summary>Model answer</summary>

**Model answer:** I would use fieldsets and legends for question groups, explicit labels, logical keyboard order, visible focus, accessible timer announcements, non-color error feedback, and a review summary before submission. I would preserve answers while navigating and test screen-reader output, zoom, mobile touch targets, and timeout recovery.
</details>

### 7. How do you design assignment uploads?

<details><summary>Model answer</summary>

**Model answer:** I would use resumable or retryable uploads when files are large, validate size and type server-side, show progress and processing status, and make the final submission idempotent. The user should be able to replace or remove a draft before the deadline, while after submission the UI clearly locks or versions the attempt according to the assignment rule.
</details>

### 8. How do you show progress when backend sync is delayed?

<details><summary>Model answer</summary>

**Model answer:** I would distinguish local progress from server-confirmed progress and label the last synchronization time. The UI can show a pending sync state and retry safely, but certificates, grades, and completion eligibility must use the backend result. On conflict I would prefer a visible resolution flow over silently overwriting the learner's work.
</details>

### 9. How do you support low-bandwidth users?

<details><summary>Model answer</summary>

**Model answer:** I would prioritize text and essential actions, use responsive media quality, defer non-critical JavaScript, cache safe course shell assets, support downloads where policy allows, and avoid assuming a stable connection. I would show progress and retry controls, preserve drafts, and measure performance on representative low-end devices rather than only a fast laptop.
</details>

### 10. How do you handle certificate generation?

<details><summary>Model answer</summary>

**Model answer:** Completion and eligibility must be calculated server-side, then certificate creation can run as a background job with a pending, ready, or failed state. The frontend should not generate an authoritative certificate from client state. I would provide a secure download, stable verification id, accessible preview, and a recovery path if generation takes time.
</details>

## 6. SaaS, CRM, and ERP

### 1. How do you design a large CRM table with filters, sorting, bulk actions, and saved views?

<details><summary>Model answer</summary>

**Model answer:** I would keep filter, sort, column, and page state in the URL or a saved-view model, query the server for large datasets, and virtualize rows only after measuring. Bulk actions require a permission check, selection scope, preview, confirmation, progress, and partial-failure reporting. I would make table semantics, keyboard navigation, empty states, and export behavior explicit.
</details>

### 2. How do you handle field-level permissions?

<details><summary>Model answer</summary>

**Model answer:** The server should return field capabilities or a redacted shape and enforce them on reads and writes. The UI can hide, disable, or mask fields to reduce confusion, but CSS or omitted buttons are not protection. I would test a user who changes the request manually, permission changes during editing, and exports that could accidentally bypass field rules.
</details>

### 3. How do you prevent accidental destructive bulk updates?

<details><summary>Model answer</summary>

**Model answer:** I would show the exact affected count and sample, require a deliberate confirmation for destructive actions, use a server-side permission check and idempotency key, and provide an undo or recovery workflow where the domain supports it. The UI should handle partial failure and never assume that a successful request means every record changed.
</details>

### 4. How do you design optimistic updates for record editing?

<details><summary>Model answer</summary>

**Model answer:** I would use optimistic updates only for low-risk, reversible changes and keep the previous value for rollback. The mutation carries a version or idempotency key, and the response replaces the optimistic record with server truth. On conflict or validation failure I would show the reason and preserve the user's draft instead of silently losing it.
</details>

### 5. How do you handle concurrent edits by two users?

<details><summary>Model answer</summary>

**Model answer:** I would ask the backend for a version or updated-at value and reject stale writes with a conflict response. The frontend can show who changed what, offer reload, merge, or overwrite only where policy permits, and preserve unsaved input. For highly collaborative fields I would consider a domain-specific merge model rather than pretending last-write-wins is always safe.
</details>

### 6. How do you implement an audit trail UI?

<details><summary>Model answer</summary>

**Model answer:** Audit events should be generated server-side with actor, action, target, timestamp, correlation id, and outcome. The UI should provide filters, pagination, timezone-aware timestamps, and a readable before/after summary without exposing secrets. I would protect audit visibility by role and test that failed, denied, and bulk actions are represented accurately.
</details>

### 7. How do you design dashboard widgets with independent failures?

<details><summary>Model answer</summary>

**Model answer:** Each widget should own its loading, success, empty, stale, and error state so one failed API does not blank the dashboard. I would use parallel requests or a query cache, show retry at widget scope, preserve layout dimensions, and instrument slow or failing widgets. Shared filters should be coordinated intentionally rather than creating hidden request loops.
</details>

### 8. How do you support tenant-specific branding?

<details><summary>Model answer</summary>

**Model answer:** I would load tenant configuration from an authorized server response and constrain it to safe design tokens, assets, and text rather than allowing arbitrary CSS or script injection. The tenant id must be part of authorization and cache keys. I would validate contrast, asset dimensions, fallback branding, and cache invalidation when a tenant changes its settings.
</details>

### 9. How do you design feature flags for enterprise rollout?

<details><summary>Model answer</summary>

**Model answer:** Flags should be evaluated from a trusted configuration service with clear ownership, default-off behavior for risky features, and an expiry plan. The server must enforce capabilities for protected operations, while the frontend uses flags only for presentation and progressive rollout. I would log exposure, test both flag states, and ensure a flag failure has a safe fallback.
</details>

### 10. How do you scale frontend architecture for many modules?

<details><summary>Model answer</summary>

**Model answer:** I would establish domain boundaries, shared design and data contracts, route-level loading and error boundaries, and conventions for permissions, telemetry, testing, and API access. I would avoid one global state store for every concern and keep modules independently understandable. Architecture decisions should be guided by team ownership and change frequency, not only by folder structure.
</details>

## 7. Logistics and Supply Chain

### 1. Tracking location updates every few seconds. How do you keep UI efficient?

<details><summary>Model answer</summary>

**Model answer:** I would throttle or batch updates, keep the latest position in a lightweight store, and update map markers without rerendering the entire page. I would discard obsolete points, pause updates when the view is hidden, and show last-updated time. The server or stream should define ordering and authorization; the client should not invent movement history.
</details>

### 2. A driver goes offline during delivery. What happens?

<details><summary>Model answer</summary>

**Model answer:** I would show offline and last-sync time, keep a bounded local queue for safe events such as delivery notes, and retry with idempotency when connectivity returns. The UI must not claim that a proof or status update was accepted until acknowledged by the server. Critical actions may require a different fallback channel or manual review.
</details>

### 3. A warehouse scanner submits duplicate scans. How do you handle it?

<details><summary>Model answer</summary>

**Model answer:** Each scan event should have a device-generated event id and the backend should make processing idempotent. The UI can debounce accidental repeats and show already-processed status, but it cannot guarantee uniqueness by timing alone. I would handle offline replay, duplicate acknowledgements, and conflict states visibly and audit the operator action.
</details>

### 4. How do you show delayed shipments and exceptions?

<details><summary>Model answer</summary>

**Model answer:** I would model shipment status as a state machine with timestamp, source, confidence, and next expected action. The UI should distinguish late, blocked, unknown, and delivered rather than relying only on color. Filters, alerts, and recovery actions should be role-aware, and stale data should be labeled instead of rendered as current fact.
</details>

### 5. How do you design a dispatch board for many drivers?

<details><summary>Model answer</summary>

**Model answer:** I would use server-side filtering, virtualization or lane-level pagination, stable drag targets, and explicit assignment states. Dragging can be optimistic only if the backend supports conflict detection and rollback. Keyboard alternatives and accessible status announcements matter because a map-only or drag-only workflow excludes users and becomes hard to operate under pressure.
</details>

### 6. How do you handle map performance?

<details><summary>Model answer</summary>

**Model answer:** I would cluster markers, limit the visible data by viewport, debounce map movement, simplify geometry, and avoid rerendering overlays unnecessarily. I would lazy-load the map SDK, provide a list fallback, and measure memory and interaction latency on lower-end devices. API keys, location permissions, and tile usage also need server and product controls.
</details>

### 7. How do you design proof-of-delivery upload?

<details><summary>Model answer</summary>

**Model answer:** I would resize or compress safely on device when policy allows, upload with progress and retry, bind the file to the delivery and authenticated user, and require server-side validation and scanning. The UI should show captured, uploading, processing, accepted, and rejected states, with a clear way to retry without creating duplicate proof records.
</details>

### 8. How do you handle stale ETA?

<details><summary>Model answer</summary>

**Model answer:** I would display the ETA with its last-updated time and a stale or unavailable label when the update window is exceeded. The frontend should not extrapolate a precise promise from old data; it can show a range or "updating" state. The backend stream remains authoritative and should provide status reason and confidence where possible.
</details>

### 9. How do you design role permissions for warehouse, driver, manager, and customer?

<details><summary>Model answer</summary>

**Model answer:** I would define permissions around actions and resource relationships, then enforce them at every API boundary. The UI offers role-appropriate workflows but handles `403` gracefully if permissions change. I would test direct navigation, deep links, exports, mobile driver actions, and mixed users in the same organization.
</details>

### 10. How do you handle real-time alerts without overwhelming users?

<details><summary>Model answer</summary>

**Model answer:** I would classify severity, group repeated events, deduplicate by incident key, and let users tune safe preferences without hiding critical alerts. Realtime events should be batched and acknowledged through a server contract. The UI needs a queue, unread state, sound or visual alternatives, and an audit trail for who acknowledged or escalated an alert.
</details>

## 8. Travel and Hospitality

### 1. Price changes between search and checkout. What should the UI do?

<details><summary>Model answer</summary>

**Model answer:** I would revalidate price and availability before payment, show the new total and reason for change clearly, and ask for confirmation rather than silently charging. The search result is a quote with an expiry, not a permanent promise. I would preserve traveler input and test currency, tax, timeout, and multi-tab behavior.
</details>

### 2. A seat or room becomes unavailable after selection. How do you handle it?

<details><summary>Model answer</summary>

**Model answer:** The backend should reserve the selection for a bounded period or reject it atomically at confirmation. If it is unavailable, I would explain the conflict, retain the rest of the traveler form, and offer nearby alternatives. The UI should not keep showing a selected resource as confirmed until the server returns a reservation reference.
</details>

### 3. How do you design an accessible date-range picker?

<details><summary>Model answer</summary>

**Model answer:** I would use labelled buttons and grid semantics only where necessary, support keyboard movement, announce the focused date and selected range, expose disabled reasons, and provide a text input fallback. Dates need locale and timezone rules that are explicit. I would test screen readers, focus return, mobile touch, min/max dates, and invalid ranges.
</details>

### 4. How do you optimize search results with many filters?

<details><summary>Model answer</summary>

**Model answer:** I would keep the search state in the URL, debounce text input, use server-side filtering and cursor pagination, cancel obsolete requests, and preserve results while fetching a new set. The UI should summarize active filters, support reset, show result count and empty alternatives, and avoid sending sensitive traveler data before it is needed.
</details>

### 5. How do you handle payment pending state?

<details><summary>Model answer</summary>

**Model answer:** Pending is a distinct state with a reference and safe next action. I would disable duplicate payment attempts, query the payment or booking status, and show the user how to return to the booking later. The UI should explain that closing the page is safe if the backend supports reconciliation, and it should handle success, decline, timeout, and manual review.
</details>

### 6. How do you show cancellation policy clearly?

<details><summary>Model answer</summary>

**Model answer:** I would fetch the policy associated with the exact fare or room, show the important deadline and fee near the decision, and provide details without hiding them behind ambiguous copy. The confirmation screen repeats the policy and records acceptance. I would make dates timezone-aware and ensure keyboard and screen-reader users receive the same information.
</details>

### 7. How do you support multiple currencies and time zones?

<details><summary>Model answer</summary>

**Model answer:** I would retain canonical instants and monetary minor units from the server, then format them with the selected locale and currency. The UI should show the timezone for departure, arrival, check-in, or cancellation deadlines and avoid parsing date-only values as local timestamps accidentally. I would test DST boundaries, rounding, RTL, and long locale strings.
</details>

### 8. How do you design an itinerary page offline?

<details><summary>Model answer</summary>

**Model answer:** I would cache only the authenticated user's necessary itinerary data with an explicit expiry and provide a printable or downloadable fallback where appropriate. The page must label stale content and avoid allowing unsafe changes while offline. On reconnect, mutations are revalidated rather than blindly replayed, and logout clears the private cache.
</details>

### 9. How do you handle a third-party supplier API failure?

<details><summary>Model answer</summary>

**Model answer:** I would use a backend adapter so supplier failures do not leak inconsistent contracts into the UI. The frontend shows unavailable, retry, alternative, or pending states based on the business response, with a correlation id for support. I would avoid retry storms, preserve traveler input, and measure supplier-specific error rates and latency.
</details>

### 10. How do you build a booking flow that survives refresh?

<details><summary>Model answer</summary>

**Model answer:** I would model the booking as a server-owned state machine and use a booking reference in the URL rather than trusting a large client-only object. Refresh reloads the current state and resumes only allowed steps. Draft traveler data can be stored carefully, but payment and confirmation always revalidate authorization, expiry, price, and availability.
</details>

## 9. Media, OTT, and Streaming

### 1. Video playback fails on a slow network. What do you do?

<details><summary>Model answer</summary>

**Model answer:** I would use adaptive bitrate streaming, start at a safe quality, show buffering state and recovery actions, and avoid blocking the surrounding page. The player should expose captions and keyboard controls, preserve playback position, and distinguish network, entitlement, and media errors. I would measure startup time, rebuffering, and device-specific failures.
</details>

### 2. How do you design continue-watching sync?

<details><summary>Model answer</summary>

**Model answer:** I would send throttled checkpoints keyed by user, profile, title, and playback version, then reconcile with the server on resume. The UI should show the last synced position and resolve conflicts deliberately when two devices diverge. I would avoid writing every second, protect profile boundaries, and test seeking, offline playback, and multiple tabs.
</details>

### 3. How do you handle multiple profiles in one account?

<details><summary>Model answer</summary>

**Model answer:** Profile identity must be explicit in server authorization, cache keys, recommendations, watch history, and parental controls. Switching profiles should clear or replace profile-scoped client state before rendering the new content. I would test back navigation, deep links, open tabs, restricted profiles, and a session that changes profile permissions.
</details>

### 4. How do you implement watchlist optimistically?

<details><summary>Model answer</summary>

**Model answer:** I would update the item immediately for responsiveness, keep the previous state for rollback, and send an idempotent mutation. If the server rejects it or a concurrent device changed it, I would reconcile with server truth and explain the result. The UI should prevent rapid contradictory mutations from racing without disabling unrelated browsing.
</details>

### 5. How do you optimize image-heavy content rows?

<details><summary>Model answer</summary>

**Model answer:** I would use responsive CDN images, fixed aspect-ratio slots, lazy loading beyond the first viewport, and a sensible number of rendered items. I would not assume a horizontally scrolling row is accessible; provide keyboard controls and useful focus order. I would measure memory, decode cost, LCP, and scrolling performance on mobile.
</details>

### 6. How do you design parental controls?

<details><summary>Model answer</summary>

**Model answer:** Controls should be enforced by the entitlement or content service, with a protected settings flow and clear profile scope. The UI can filter content and explain restrictions, but it must not rely on client-only checks. I would handle cached content, deep links, search results, downloads, and a safe fallback when policy configuration cannot be loaded.
</details>

### 7. How do you handle live-stream delay?

<details><summary>Model answer</summary>

**Model answer:** I would show live status, current playback delay when available, and controls to return to live. The player should handle drift, reconnect, stream changes, and a degraded quality mode. I would avoid promising real-time behavior the transport cannot provide and instrument join time, latency, rebuffering, and disconnect reasons.
</details>

### 8. How do you support subtitles and accessibility?

<details><summary>Model answer</summary>

**Model answer:** I would use accessible native or well-tested player controls, keyboard operation, captions and subtitles with language selection, audio descriptions where available, and visible focus. Preferences should persist at the correct account or profile scope. I would test captions, contrast, screen readers, reduced motion, and controls at zoom.
</details>

### 9. How do you design offline downloads?

<details><summary>Model answer</summary>

**Model answer:** Offline files need an authorized, encrypted or platform-protected delivery path with expiry and entitlement checks; the browser should not receive unrestricted media keys. The UI shows download progress, storage requirements, expiry, and failures, and avoids claiming availability before verification. I would account for device storage, profile scope, logout, and revoked subscriptions.
</details>

### 10. How do you handle subscription entitlement checks?

<details><summary>Model answer</summary>

**Model answer:** Entitlement is a server decision, ideally returned with the content or playback authorization response. The UI can show locked, loading, or entitled states, but it cannot grant access by changing a flag. I would handle renewal delays, cancellation, grace periods, multiple tabs, and safe cache invalidation after a plan change.
</details>

## 10. Social, Chat, and Community

### 1. How do you build an infinite feed?

<details><summary>Model answer</summary>

**Model answer:** I would use cursor pagination, an intersection observer near the end, stable item keys, and a cache that can prepend new content without losing scroll position. I would virtualize only if measurement justifies it, handle duplicate or deleted items, and expose loading, empty, error, and end-of-feed states. Feed ranking remains a server concern.
</details>

### 2. How do you handle optimistic likes?

<details><summary>Model answer</summary>

**Model answer:** I would update the count and user state immediately, send an idempotent mutation, and retain the prior value for rollback. The server response replaces the optimistic result, while rate limits and authorization prevent abuse. I would handle rapid toggles, offline behavior, deleted posts, and a second device changing the same like.
</details>

### 3. How do you design real-time chat?

<details><summary>Model answer</summary>

**Model answer:** I would use a websocket or SSE channel for events, an API for history and mutations, and server-generated message ids with acknowledgements. The client keeps pending, sent, failed, and read states, reconnects with a cursor, and deduplicates replayed events. Permissions, moderation, retention, and notification preferences are server-side concerns.
</details>

### 4. How do you prevent duplicate messages?

<details><summary>Model answer</summary>

**Model answer:** The client creates a temporary id for rendering and sends an idempotency or client message id. The server stores it with the conversation and returns one canonical message. On retry the client reconciles the temporary item instead of appending another. I would test reconnect, double click, offline queue replay, and a response arriving after navigation.
</details>

### 5. How do you handle message ordering across devices?

<details><summary>Model answer</summary>

**Model answer:** I would use server sequence numbers or logical timestamps scoped to the conversation, not local wall-clock time alone. The client buffers briefly when necessary, applies events in sequence, and requests a resync on a gap. Edit, delete, and moderation events must be versioned so an old device cannot overwrite newer state.
</details>

### 6. How do you design typing indicators and read receipts?

<details><summary>Model answer</summary>

**Model answer:** These are ephemeral, lower-priority events, so I would debounce typing, expire indicators automatically, and avoid storing every keystroke. Read state should be scoped to user and conversation and updated idempotently. The UI needs privacy controls, accessible announcements that do not spam screen readers, and a fallback when realtime is unavailable.
</details>

### 7. How do you handle abuse reporting?

<details><summary>Model answer</summary>

**Model answer:** I would send a server-side report with authenticated actor, target, reason, and evidence reference, rate-limit it, and avoid revealing moderation internals. The UI confirms receipt without promising a specific outcome and provides blocking or mute options. I would design for duplicate reports, moderator review, privacy, accessibility, and auditability.
</details>

### 8. How do you moderate comments?

<details><summary>Model answer</summary>

**Model answer:** I would treat moderation as a server workflow with automated signals, human review, appeals, and clear policy states. The frontend renders pending, removed, edited, and restricted comments safely and escapes untrusted content. I would not rely on client filtering, and I would test race conditions where a comment is moderated while a user is viewing or replying.
</details>

### 9. How do you design notifications without overwhelming users?

<details><summary>Model answer</summary>

**Model answer:** I would group related events, prioritize severity and relevance, support preference controls, and use a server cursor for reliable read/unread state. Realtime delivery should be deduplicated and batched, while email or push rules remain explicit. The UI should allow keyboard navigation, clear all only with confirmation where needed, and recover after reconnect.
</details>

### 10. How do you handle blocked users in UI and API?

<details><summary>Model answer</summary>

**Model answer:** Blocking is a server-enforced relationship that affects reads, writes, search, messaging, and notifications. The frontend can hide or annotate content for clarity, but every endpoint must enforce the rule. I would invalidate affected caches, handle an action that becomes forbidden while open, and make unblock behavior explicit and auditable where required.
</details>

## 11. Enterprise Admin and Internal Tools

### 1. How do you design role and permission management?

<details><summary>Model answer</summary>

**Model answer:** I would model permissions as named capabilities with scope, expose only safe metadata to the client, and enforce every action on the server. The UI should show effective permissions, warn about inherited access, and require confirmation for high-impact changes. I would test direct URLs, permission changes in another session, and self-escalation attempts.
</details>

### 2. How do you prevent accidental deletion of many users?

<details><summary>Model answer</summary>

**Model answer:** I would show the selection scope and count, require a deliberate confirmation with a typed phrase for destructive bulk actions, and use a server-side job with authorization and idempotency. The UI should show progress, partial failures, and recovery options. A hidden button or client-side count is not protection.
</details>

### 3. How do you build a CSV import flow?

<details><summary>Model answer</summary>

**Model answer:** I would use a staged flow: upload, validate, preview mapped rows, confirm, process, and report. The backend validates encoding, headers, permissions, duplicates, and business rules; the frontend shows row-level errors and lets users download a safe error report. Large files should process asynchronously with a resumable status page.
</details>

### 4. How do you show validation errors for thousands of imported rows?

<details><summary>Model answer</summary>

**Model answer:** I would return structured row and field errors with stable identifiers, paginate or virtualize the error list, and provide filters for error type. The UI should summarize counts, preserve the original row context, and support a corrected re-upload. I would avoid rendering thousands of DOM nodes and would not expose sensitive input values in logs.
</details>

### 5. How do you design admin audit logs?

<details><summary>Model answer</summary>

**Model answer:** Audit events are created server-side and include actor, target, action, result, timestamp, source, and correlation id. The UI should offer server-side filtering and pagination, timezone-aware dates, and a safe before/after summary. Access to the audit log is itself permissioned, and secrets must be redacted rather than merely hidden in CSS.
</details>

### 6. How do you handle long-running report generation?

<details><summary>Model answer</summary>

**Model answer:** I would submit a job and return a job id, then show queued, running, ready, expired, and failed states. The client can poll with backoff or subscribe to completion events and should allow the user to leave the page. Downloads use short-lived authorization and the job endpoint must prevent duplicate work when the user retries.
</details>

### 7. How do you design approval workflows?

<details><summary>Model answer</summary>

**Model answer:** I would represent approval as a server-owned state machine with allowed transitions, actor permissions, comments, and audit events. The UI should explain the current state and next permitted action, handle stale approvals, and show rejection reasons. A client cannot approve by changing a status field in its request.
</details>

### 8. How do you protect super-admin features?

<details><summary>Model answer</summary>

**Model answer:** I would require strong authentication, least-privilege assignment, step-up auth for dangerous actions, server-side authorization, and complete audit logging. The UI should make the environment and impact obvious, use explicit confirmations, and avoid loading sensitive data until it is needed. I would test API access even when the controls are hidden.
</details>

### 9. How do you implement feature flags safely?

<details><summary>Model answer</summary>

**Model answer:** Flags should have an owner, default, rollout scope, expiry date, and safe failure behavior. The server controls protected capabilities; the frontend uses flags for rendering and gradual exposure. I would test both states, log exposure, avoid flag combinations that create impossible workflows, and remove old flags rather than accumulating permanent branches.
</details>

### 10. How do you test internal tools with many permission levels?

<details><summary>Model answer</summary>

**Model answer:** I would define a permission matrix and use representative fixtures for each role and organization scope. Tests should cover visible actions, direct navigation, API denial, mutation races, bulk operations, and audit events. A small set of critical end-to-end tests should run against realistic permissions, supported by component and contract tests.
</details>

## 12. Insurance

### 1. How do you design a multi-step quote form?

<details><summary>Model answer</summary>

**Model answer:** I would model the form as explicit steps with typed data, server-backed rules, saved progress, and a final review. Each step has loading, validation, error, and recovery states, while the backend remains authoritative for eligibility and premium. I would support back navigation without losing values and make the current step clear to assistive technology.
</details>

### 2. How do you persist drafts safely?

<details><summary>Model answer</summary>

**Model answer:** I would save drafts through an authenticated endpoint with versioning and an explicit retention policy. Only low-risk fields should be kept in local storage, and sensitive data should be encrypted or avoided there according to policy. The UI shows last saved time, pending sync, conflict, and restore options rather than silently overwriting a newer draft.
</details>

### 3. How do you upload claim evidence reliably?

<details><summary>Model answer</summary>

**Model answer:** I would use resumable uploads, client progress, server-side type and size validation, malware scanning, and short-lived upload permissions tied to the claim. The user sees uploaded, processing, accepted, and rejected states and can retry without duplicate records. I would protect file URLs and record who submitted each document.
</details>

### 4. How do you show claim status over weeks?

<details><summary>Model answer</summary>

**Model answer:** I would render a server-owned status timeline with current state, last update, expected next step, required user action, and contact path. Long-lived pages need refresh, polling, or notification support and a stale indicator. The UI should preserve documents and comments while clearly separating submitted, under review, approved, rejected, and paid.
</details>

### 5. How do you handle missing documents?

<details><summary>Model answer</summary>

**Model answer:** The API should return a structured checklist with reason, deadline, accepted formats, and status. The UI highlights the next required action, supports upload retry, and avoids marking a claim complete until the server accepts the document. I would handle a document becoming invalid after submission with a clear explanation and audit trail.
</details>

### 6. How do you protect sensitive policy data?

<details><summary>Model answer</summary>

**Model answer:** I would use server authorization, private caching, secure cookies, minimal responses, masked identifiers, and careful analytics and logging. Sensitive downloads require scoped authorization and expiry. The frontend clears private state on logout, but the backend must also enforce policy for direct API calls and stale bookmarks.
</details>

### 7. How do you design renewal reminders?

<details><summary>Model answer</summary>

**Model answer:** The server owns renewal dates and eligibility, while the UI shows the policy, deadline, price basis, and available action. Reminders should be deduplicated and respect communication preferences. I would handle timezone boundaries, payment pending, expired links, and a policy changing between reminder and confirmation.
</details>

### 8. How do you handle agent, customer, and admin roles?

<details><summary>Model answer</summary>

**Model answer:** I would enforce role and relationship permissions on every resource and return only fields each role may see. The UI adapts workflows but does not trust its own role flag. I would test cross-customer access, delegated agent access, exports, deep links, and permission changes during an open claim.
</details>

### 9. How do you build a rules-driven form?

<details><summary>Model answer</summary>

**Model answer:** I would keep rules versioned and server-owned, expose a typed schema or decision response, and separate rendering from validation logic. The client can provide immediate hints but submits to authoritative validation. I would show why a field is required, preserve answers across rule changes where safe, and test old and new rule versions.
</details>

### 10. How do you explain premium changes clearly?

<details><summary>Model answer</summary>

**Model answer:** I would show the previous and current premium, the effective date, the factors returned by the server, and links to policy explanation without inventing a calculation. Changes should be explicit before confirmation and accessible in text, not only a chart or color. I would log acceptance and test rounding, locale, and mid-flow recalculation.
</details>

## 13. Real Estate and PropTech

### 1. How do you build listing search with map and filters?

<details><summary>Model answer</summary>

**Model answer:** I would keep filters and viewport in URL state, debounce changes, query the server, and synchronize list and map selection without forcing every marker to rerender. A list fallback is essential for accessibility and mobile. I would show stale availability, clear active filters, and use cursor pagination or bounded results.
</details>

### 2. How do you optimize many listing images?

<details><summary>Model answer</summary>

**Model answer:** I would use CDN resizing, responsive `srcset`, fixed aspect-ratio containers, lazy loading below the fold, and a low-quality placeholder only if it does not delay the main content. Alt text should describe meaningful property information. I would measure image decode and memory cost on mobile and avoid loading unseen gallery images.
</details>

### 3. How do you handle stale listing availability?

<details><summary>Model answer</summary>

**Model answer:** Each listing should have a last-updated timestamp and availability state from the backend. Before a lead, appointment, or offer is confirmed, the server revalidates the listing. The UI should say when data may be stale, handle unavailable results gracefully, and invalidate affected caches after changes.
</details>

### 4. How do you design saved searches and alerts?

<details><summary>Model answer</summary>

**Model answer:** I would serialize validated search criteria as a server-owned saved search, with notification preferences, frequency, and a clear edit or pause action. Alerts should be deduplicated and explain why a listing matched. The client can preview results, but the server evaluates matching and protects the user's saved criteria.
</details>

### 5. How do you protect agent contact forms from spam?

<details><summary>Model answer</summary>

**Model answer:** I would rate-limit and validate on the server, add abuse detection or a challenge when risk is high, and avoid exposing direct private contact details. The form should have accessible feedback, a safe error message, and duplicate-submission protection. I would track abuse without logging unnecessary personal data.
</details>

### 6. How do you handle virtual tour performance?

<details><summary>Model answer</summary>

**Model answer:** I would lazy-load the tour only when requested or near the viewport, use a responsive media pipeline, provide a normal image and text alternative, and pause or reduce rendering when hidden. I would measure memory, input latency, and network cost, and make sure the tour cannot block search or contact actions.
</details>

### 7. How do you build location-based search?

<details><summary>Model answer</summary>

**Model answer:** I would request location permission only when it improves the task and provide manual search as a first-class fallback. The server should validate coordinates, scope results, and protect location privacy. I would debounce map movement, cluster results, handle denied or approximate location, and avoid storing precise location longer than needed.
</details>

### 8. How do you support SEO for listing pages?

<details><summary>Model answer</summary>

**Model answer:** Stable listing pages can use server rendering or static generation with canonical metadata, structured data, meaningful headings, and optimized images. Private agent actions remain protected and client-side where appropriate. I would handle availability changes, not index duplicate filter URLs unnecessarily, and verify content, links, and performance with crawlers and real devices.
</details>

### 9. How do you design a lead assignment dashboard?

<details><summary>Model answer</summary>

**Model answer:** I would use server-side permissions, queue state, filters, assignment mutation with idempotency, and conflict handling when another agent takes the lead first. The UI shows pending, assigned, failed, and stale states and supports keyboard actions. Audit events should make ownership changes traceable.
</details>

### 10. How do you handle mobile-first browsing?

<details><summary>Model answer</summary>

**Model answer:** I would prioritize search, key property facts, contact, and save actions, then progressively add map and media. Layouts should work with touch, keyboard, zoom, and slow connections, with stable image slots and readable filters. I would test real devices, not only a resized desktop window.
</details>

## 14. Food Delivery and Quick Commerce

### 1. A restaurant closes while the user is checking out. What happens?

<details><summary>Model answer</summary>

**Model answer:** The backend revalidates restaurant state, menu, fees, and delivery estimate before creating the order. If closed, the UI explains the reason, preserves the cart for safe editing, and offers alternatives without charging. The order endpoint must be idempotent so retrying after a timeout cannot create a duplicate order.
</details>

### 2. An item becomes unavailable after adding it to the cart. How do you handle it?

<details><summary>Model answer</summary>

**Model answer:** I would mark the item stale and revalidate at cart load and checkout. The user should choose removal or an available substitution, with price and allergen information refreshed from the server. I would never silently substitute a sensitive item or proceed with a changed total without clear confirmation.
</details>

### 3. How do you design live order tracking?

<details><summary>Model answer</summary>

**Model answer:** I would use a server-owned order state machine and realtime updates with a polling fallback, showing last update and an approximate ETA. Map details are optional; the status and next action must remain clear without them. Events should be ordered, deduplicated, permissioned to the customer, and resilient to reconnect.
</details>

### 4. How do you handle substitutions in grocery orders?

<details><summary>Model answer</summary>

**Model answer:** I would capture substitution preference per item, enforce allergy or dietary constraints, and make the picker or shopper decision visible before final charge where possible. The backend recalculates totals and records consent. The UI should handle unavailable substitutions, no response, refunds, and partial fulfillment without losing the order timeline.
</details>

### 5. How do you optimize menu pages?

<details><summary>Model answer</summary>

**Model answer:** I would render the initial menu quickly, lazy-load images, use section navigation, reserve media dimensions, and avoid rendering every option for long menus at once. Search and category state can be URL-backed. Accessibility includes real headings, dietary and allergen text, clear quantity controls, and keyboard-friendly cart actions.
</details>

### 6. How do you calculate delivery ETA in UI?

<details><summary>Model answer</summary>

**Model answer:** ETA should come from the delivery service or a clearly defined backend estimate; the frontend should not invent a precise promise from stale location data. I would display a range, last update, and confidence or stale state, then refresh as events arrive. Changes should be explained without alarming users unnecessarily.
</details>

### 7. How do you handle payment success but order creation pending?

<details><summary>Model answer</summary>

**Model answer:** I would show payment received and order confirmation pending, never ask for a second payment, and let the client query the order by idempotency key or payment reference. Backend reconciliation creates or cancels the order safely. The UI provides a status reference and a support route if the state remains pending.
</details>

### 8. How do you build cart persistence across sessions?

<details><summary>Model answer</summary>

**Model answer:** Guest carts can be associated with a limited server or browser identifier, while account carts are server-owned. On login I would merge with explicit conflict rules and revalidate item availability and price. I would expire old carts and never store payment credentials or sensitive session tokens in the cart payload.
</details>

### 9. How do you handle address validation?

<details><summary>Model answer</summary>

**Model answer:** I would provide structured fields and suggestions but allow manual correction when the provider is incomplete. The server validates serviceability, delivery fees, and legal requirements before checkout. The UI should preserve the user's entry, explain ambiguous matches, support keyboard selection, and protect precise addresses in logs and analytics.
</details>

### 10. How do you design support and refund flow?

<details><summary>Model answer</summary>

**Model answer:** I would scope support actions to the authenticated order and show current eligibility, reason, status, and expected timeline. Refund initiation is server-authorized and idempotent; the UI should distinguish requested, approved, processing, and completed. I would preserve evidence and audit trail while minimizing exposure of payment details.
</details>

## 15. Ride Sharing and Mobility

### 1. The user denies location permission. What fallback do you design?

<details><summary>Model answer</summary>

**Model answer:** I would explain why location helps, provide manual pickup and destination search, and let the user retry permission through browser settings instructions. The app should not repeatedly prompt or block unrelated browsing. Location data should be used only for the trip purpose, with clear privacy controls and server validation.
</details>

### 2. Driver location updates rapidly. How do you render efficiently?

<details><summary>Model answer</summary>

**Model answer:** I would keep the latest location in a lightweight store, throttle visual updates, interpolate only for presentation, and avoid rerendering route, pricing, or page chrome. Events need ordering and staleness handling. I would pause work when the page is hidden, use map markers efficiently, and measure battery, memory, and input latency.
</details>

### 3. Fare changes after route update. How do you communicate it?

<details><summary>Model answer</summary>

**Model answer:** The server recalculates the fare from route, pricing rules, and trip state. The UI shows the previous and current estimate, the reason or trigger, and asks for confirmation when policy requires it. It must not charge a client-calculated value, and it should handle a final fare differing from the estimate through a clear receipt.
</details>

### 4. How do you handle driver cancellation?

<details><summary>Model answer</summary>

**Model answer:** I would model cancellation as a realtime trip transition, explain whether the user is rematched or refunded, and preserve pickup details. The mutation is server-authorized and idempotent, while the UI disables contradictory actions during transition. I would test cancellation during payment, weak network, app refresh, and safety escalation.
</details>

### 5. How do you design safety and emergency features?

<details><summary>Model answer</summary>

**Model answer:** Safety actions need a prominent, accessible path that works under stress, confirms the trip context, and connects to the correct emergency or support service. The backend logs the event and shares only necessary location data with authorized responders. I would test keyboard, screen reader, poor network, accidental activation, and post-event follow-up.
</details>

### 6. How do you protect location privacy?

<details><summary>Model answer</summary>

**Model answer:** I would minimize collection, scope access to the active trip, use role-based server authorization, avoid precise coordinates in analytics, and define retention and deletion. The frontend explains permission and visibility, but privacy is enforced in APIs and storage. I would test old trip links, screenshots or exports, and support access.
</details>

### 7. How do you show trip status across app refresh?

<details><summary>Model answer</summary>

**Model answer:** I would persist a safe trip reference and reload the canonical trip state from the server on refresh. The UI renders searching, matched, arriving, active, completed, cancelled, and unknown states, with realtime reconnect. It should never infer that a trip completed just because a local timer ended.
</details>

### 8. How do you handle weak network during a trip?

<details><summary>Model answer</summary>

**Model answer:** I would show connection and last-update status, keep essential trip details available, retry reads with backoff, and make mutations idempotent. Critical safety actions need a fallback path. The UI should avoid stale confident instructions, preserve the current trip reference, and reconcile server state when connectivity returns.
</details>

### 9. How do you design scheduled rides?

<details><summary>Model answer</summary>

**Model answer:** The server owns timezone-aware schedule, eligibility, driver assignment, and cancellation rules. The UI should confirm local time and timezone, show reminders and state transitions, and allow safe edits before the cutoff. I would test DST, device timezone changes, duplicate scheduling, and a scheduled ride becoming unavailable.
</details>

### 10. How do you test map-heavy UI?

<details><summary>Model answer</summary>

**Model answer:** I would separate route and permission logic from the map renderer, mock the provider at unit level, and use a small number of real-browser tests for permission, gestures, marker selection, and fallback list behavior. I would test network loss, stale events, mobile viewport, keyboard access, and visual regressions without making tests depend on live map tiles.
</details>

## 16. AI and LLM Applications

### 1. How do you stream an AI response in React?

<details><summary>Model answer</summary>

**Model answer:** I would consume a server stream, append validated chunks to a message state, and render a distinct generating state with cancellation and error handling. The server owns authorization, model selection, usage, and final message persistence. I would handle reconnect or failed completion without duplicating tokens and make partial output clearly distinguishable from final output.
</details>

### 2. How do you allow the user to cancel generation?

<details><summary>Model answer</summary>

**Model answer:** The client uses `AbortController` to stop reading the stream and sends a server cancellation signal when supported. The UI marks the response stopped rather than failed and preserves the partial content. Server-side limits still apply because a browser abort cannot guarantee that provider work stopped immediately.
</details>

### 3. How do you handle hallucinated output in UX?

<details><summary>Model answer</summary>

**Model answer:** I would avoid presenting generated text as verified fact, show citations or source context where available, and provide a clear way to inspect or correct the result. High-risk decisions need human review and server-side policy. The frontend should make uncertainty and tool failures visible without overwhelming the user with disclaimers.
</details>

### 4. How do you protect uploaded private files?

<details><summary>Model answer</summary>

**Model answer:** Files should be uploaded to a controlled service, scanned, access-checked per workspace and user, and referenced by opaque ids rather than public URLs. Retrieval and model tool access happen server-side with short-lived permissions. The UI shows processing and deletion state and never places file contents in analytics, logs, or an untrusted prompt by accident.
</details>

### 5. How do you show citations and confidence?

<details><summary>Model answer</summary>

**Model answer:** I would render citations from structured server data linked to source spans, not parse arbitrary model prose and call it proof. Confidence should be labeled as a model or retrieval signal, not a guarantee. The UI needs missing-source and retrieval-error states and should let users open the supporting material.
</details>

### 6. How do you handle token and cost limits?

<details><summary>Model answer</summary>

**Model answer:** The backend enforces quotas, maximum input size, model policy, and rate limits; the frontend shows remaining or estimated usage when it is safe to do so. I would truncate or summarize with an explicit rule, handle limit errors without losing the draft, and instrument cost by workspace and feature. Client-side counters are only advisory.
</details>

### 7. How do you prevent prompt injection from uploaded content?

<details><summary>Model answer</summary>

**Model answer:** I would treat retrieved documents and tool output as untrusted data, isolate instructions from content, restrict tool permissions, validate tool arguments server-side, and require confirmation for external or destructive actions. The UI should show when content is being used and support review. No prompt wording can replace authorization boundaries.
</details>

### 8. How do you design chat history search?

<details><summary>Model answer</summary>

**Model answer:** Search should be server-side with workspace and user authorization, pagination, debouncing, and an explicit index freshness state. The client should not download every private conversation. I would highlight matches safely, handle deleted or restricted messages, and clear or switch caches when the workspace changes.
</details>

### 9. How do you handle slow model responses?

<details><summary>Model answer</summary>

**Model answer:** I would show immediate acknowledgement, progress or generating state, a cancel action, and a timeout recovery that preserves the prompt. Streaming improves perceived latency but does not remove server failure handling. I would distinguish queue delay, provider error, rate limit, and partial completion and include a correlation id for support.
</details>

### 10. How do you test AI features?

<details><summary>Model answer</summary>

**Model answer:** I would test deterministic UI behavior with fixture streams, cancellation, malformed chunks, tool errors, permission failures, rate limits, and empty output. Separate evaluation tests cover quality, safety, citations, and regression examples, while end-to-end tests use controlled providers rather than real nondeterministic models. Sensitive prompts and files must use safe test data.
</details>

## 17. Government and Public Services

### 1. How do you design a long government application form?

<details><summary>Model answer</summary>

**Model answer:** I would break it into understandable steps, provide a progress indicator, save drafts, allow review and correction, and explain why each question is needed. The server validates the authoritative application and returns field-level errors without losing input. I would support keyboard, screen readers, print or download, mobile, and low-bandwidth use from the beginning.
</details>

### 2. How do you support users with low digital literacy?

<details><summary>Model answer</summary>

**Model answer:** I would use plain language, one decision at a time, concrete examples, visible help, forgiving validation, and a clear way to get human assistance. I would avoid unexplained abbreviations and make status and next steps prominent. Usability testing with representative users matters more than assuming a technically fluent audience.
</details>

### 3. How do you make the flow highly accessible?

<details><summary>Model answer</summary>

**Model answer:** I would start with semantic HTML, keyboard flow, labels, focus management, error summaries, sufficient contrast, responsive text, and screen-reader announcements. I would avoid inaccessible custom widgets where native controls work. Automated checks are useful, but I would also test keyboard-only, zoom, mobile, and assistive technology workflows.
</details>

### 4. How do you handle document upload from mobile?

<details><summary>Model answer</summary>

**Model answer:** I would support camera and file input, show file requirements before selection, compress only where safe, and provide progress, retry, and processing states. Server-side validation and scanning remain authoritative. The UI should preserve the application if the camera or upload fails and offer a non-digital alternative when policy requires it.
</details>

### 5. How do you save partial applications?

<details><summary>Model answer</summary>

**Model answer:** I would save an authenticated draft with versioning, last-saved time, retention policy, and explicit resume behavior. Local storage should contain only low-risk data if it is used at all. On conflict I would preserve both versions or offer a review, and on logout or account change I would clear private client state.
</details>

### 6. How do you handle multilingual content?

<details><summary>Model answer</summary>

**Model answer:** I would use translation keys and server-provided content policy, support locale-aware dates and numbers, and test text expansion, RTL where required, and fallback strings. Legal or eligibility wording should not be improvised by the frontend. The language choice should persist safely and be available before the user starts the form.
</details>

### 7. How do you design status tracking?

<details><summary>Model answer</summary>

**Model answer:** I would show a plain-language state, last update, next expected action, required documents, and contact route from a server-owned workflow. The UI distinguishes pending, rejected, approved, and unavailable rather than using a vague spinner. Notifications and refresh should be reliable, and stale status must be labeled.
</details>

### 8. How do you handle high traffic during deadlines?

<details><summary>Model answer</summary>

**Model answer:** I would keep public content cacheable, reduce JavaScript and media, use resilient queues for submissions, and show a clear maintenance or waiting state instead of letting requests time out silently. The backend must enforce deduplication and preserve submitted data. Load testing, rate limits, observability, and a deadline extension policy are part of the design.
</details>

### 9. How do you protect personal data?

<details><summary>Model answer</summary>

**Model answer:** I would minimize collection and display, enforce access on the server, use secure session cookies and private caching, redact logs and analytics, and define retention and deletion. The frontend masks data and clears state on logout, but the API must prevent direct access, guessing, export leakage, and stale cache exposure.
</details>

### 10. How do you make pages work on old devices?

<details><summary>Model answer</summary>

**Model answer:** I would define supported browsers, use progressive enhancement, keep the critical path lightweight, avoid unnecessary polyfills, optimize images, and test on real low-end devices and slow networks. Core forms should remain usable if nonessential scripts fail. Error monitoring should distinguish unsupported browser issues from server failures.
</details>

## 18. HR and Recruitment

### 1. How do you design resume upload and parsing UI?

<details><summary>Model answer</summary>

**Model answer:** I would upload securely with progress and scanning, show parsing as a pending job, and let the candidate review and correct extracted fields before submission. The original resume remains available as source, and the server controls retention and access. The UI should never silently submit incorrect parsed data.
</details>

### 2. How do you handle candidate privacy?

<details><summary>Model answer</summary>

**Model answer:** I would apply least privilege, separate candidate-facing and internal data, minimize analytics, secure documents, and show consent and retention information. Every endpoint and export must enforce organization and role scope. The UI should support deletion or correction flows where policy permits and never expose private notes in shared views.
</details>

### 3. How do you design interview scheduling across time zones?

<details><summary>Model answer</summary>

**Model answer:** Store canonical instants and timezone identifiers, then show both the participant's local time and the event timezone when ambiguity matters. The server confirms slot availability and prevents double booking. I would test DST changes, locale formatting, device timezone changes, calendar integrations, and rescheduling after a slot is taken.
</details>

### 4. How do you build a candidate pipeline drag-and-drop UI?

<details><summary>Model answer</summary>

**Model answer:** I would provide a keyboard and menu alternative to drag-and-drop, make stages server-owned, and use an idempotent mutation with conflict handling. Optimistic movement can improve responsiveness but needs rollback and a visible failure state. Permissions, audit events, and notifications should apply to the actual transition, not merely the visual move.
</details>

### 5. How do you avoid exposing salary or private notes?

<details><summary>Model answer</summary>

**Model answer:** Private fields should be omitted or redacted by the authorized API response and protected in exports, search, caches, and analytics. Hiding them with CSS is not enough. I would test direct API calls, copied links, print views, browser back cache, and a user whose role changes during the session.
</details>

### 6. How do you design role-based recruiter permissions?

<details><summary>Model answer</summary>

**Model answer:** I would define capabilities and scope by organization, team, requisition, and candidate relationship, then enforce them server-side. The frontend uses returned permissions to make workflows understandable and handles `403` without leaking details. Tests should cover recruiters, hiring managers, interviewers, candidates, admins, and cross-team access.
</details>

### 7. How do you handle duplicate candidate profiles?

<details><summary>Model answer</summary>

**Model answer:** I would use server-side matching signals with human review rather than merging automatically on a weak match. The UI explains possible duplicates, preserves source records, and requires a permissioned confirmation before merge. Merges need an audit trail, conflict resolution, undo or recovery, and notification of affected workflows.
</details>

### 8. How do you test an assessment flow?

<details><summary>Model answer</summary>

**Model answer:** I would test instructions, timer rules, autosave, reconnect, accessibility, submission idempotency, scoring boundaries, and result visibility with safe fixtures. Browser tests should cover realistic candidate actions, while server contract tests verify that changing client data cannot change authoritative score or deadline rules. Flaky timing should use controlled clocks.
</details>

### 9. How do you support bulk actions safely?

<details><summary>Model answer</summary>

**Model answer:** I would show selection scope, affected count, preview, permission, confirmation, progress, and partial errors. The backend processes by stable ids with idempotency and returns per-item outcomes. The UI should not assume that selecting all visible rows means selecting every row in the database without making that scope explicit.
</details>

### 10. How do you reduce bias in UI?

<details><summary>Model answer</summary>

**Model answer:** I would avoid presenting automated scores as objective truth, expose relevant evidence and human review, and make criteria and overrides auditable. The frontend should not infer sensitive traits or hide appeal paths. I would partner with product and legal teams on policy, test accessibility and language, and monitor outcomes rather than optimizing only click-through.
</details>

## 19. Gaming

### 1. How do you sync game state between client and server?

<details><summary>Model answer</summary>

**Model answer:** The server should be authoritative for inventory, purchases, scores, and competitive state. The client can predict or interpolate presentation, but it reconciles with versioned server updates and handles rejection. I would define snapshots, event ordering, reconnect, and conflict behavior and avoid treating local state as proof of a valid action.
</details>

### 2. How do you prevent cheating?

<details><summary>Model answer</summary>

**Model answer:** I would validate important actions server-side, limit trusted client input, detect abnormal patterns, and protect matchmaking and reward APIs. Client obfuscation may raise effort but is not a security boundary. The UI should handle bans, review, and disconnects clearly and avoid exposing detection details that make abuse easier.
</details>

### 3. How do you design leaderboard updates?

<details><summary>Model answer</summary>

**Model answer:** The server calculates ranking and returns cursor-based or windowed results; the client subscribes to updates with ordering and deduplication. I would show when a score is pending verification and avoid re-rendering an enormous table for every event. Accessibility, pagination, anti-cheat review, and timezone or season boundaries need explicit handling.
</details>

### 4. How do you handle latency?

<details><summary>Model answer</summary>

**Model answer:** I would measure round-trip and render latency, use prediction or interpolation only where safe, batch noncritical updates, and show connection state. Server authority decides the final outcome, and reconciliation corrects prediction without confusing the player. I would test regional latency, packet loss, reconnect, and low-end device performance.
</details>

### 5. How do you design in-game purchases?

<details><summary>Model answer</summary>

**Model answer:** Purchases use a platform or backend-verified transaction and idempotent fulfillment; the client never grants currency based on its own response. The UI shows pending, restored, failed, and completed states and avoids duplicate prompts. I would protect receipts, handle platform cancellation, parental controls, refunds, and inventory reconciliation.
</details>

### 6. How do you handle reconnect after network loss?

<details><summary>Model answer</summary>

**Model answer:** I would show disconnected state, pause or constrain actions, reconnect with backoff, and request a server snapshot or resume cursor. Pending client actions need ids and safe replay rules; not every action is replayable. The user should understand whether progress was saved and never see a locally invented reward.
</details>

### 7. How do you build matchmaking UI?

<details><summary>Model answer</summary>

**Model answer:** The UI represents queued, matched, loading, declined, cancelled, and timeout states from the server and lets the player leave safely. Queue criteria and party permissions are authoritative. I would avoid indefinite spinners, show estimated or bounded wait context when reliable, and test duplicate joins, reconnects, and party changes.
</details>

### 8. How do you optimize animations?

<details><summary>Model answer</summary>

**Model answer:** I would profile first, prefer compositor-friendly properties, reduce unnecessary layout work, pause offscreen animation, and honor reduced-motion preferences. Heavy calculations can move to a worker or a more suitable rendering layer. I would measure frame rate and input latency on target devices rather than optimizing by guesswork.
</details>

### 9. How do you handle chat moderation?

<details><summary>Model answer</summary>

**Model answer:** Messages pass through server-side policy, rate limits, reporting, and human or automated moderation states. The client escapes content, renders removed or pending states safely, and offers block and report actions. I would preserve audit evidence with proper retention while minimizing exposure and testing race conditions around deletes and reports.
</details>

### 10. How do you test time-based events?

<details><summary>Model answer</summary>

**Model answer:** I would inject a clock, use deterministic fixtures, and test before, during, after, timezone, DST, reconnect, and server-correction states. The server remains the authority for event start, end, rewards, and purchases. Browser tests should cover visibility changes and sleeping tabs without relying on real wall-clock delays.
</details>

## 20. IoT and Smart Device Dashboards

### 1. How do you show whether device data is stale?

<details><summary>Model answer</summary>

**Model answer:** Each reading needs a timestamp and freshness threshold from the device or backend. The UI shows current, delayed, offline, and unknown distinctly and never presents old telemetry as current. I would pause or reduce updates when hidden, keep a last-known view, and give users a way to refresh or inspect connection health.
</details>

### 2. How do you design remote command confirmation?

<details><summary>Model answer</summary>

**Model answer:** Risky commands require capability authorization, an explicit confirmation showing device and impact, and an idempotent command id. The UI moves through requested, acknowledged, applied, rejected, and timed-out states and does not claim success when the device has not acknowledged. Audit logs should record actor, command, and result.
</details>

### 3. How do you handle device offline state?

<details><summary>Model answer</summary>

**Model answer:** I would show last seen and whether commands can be queued, rejected, or require manual retry. The backend owns device connectivity and command delivery, while the UI avoids promising execution offline. When the device returns, events are ordered and reconciled, and dangerous queued commands should expire rather than run unexpectedly.
</details>

### 4. How do you stream telemetry efficiently?

<details><summary>Model answer</summary>

**Model answer:** I would downsample or aggregate based on viewport and time range, batch events, and keep chart updates independent from control UI. The server should enforce tenant and device authorization, while the client handles gaps and stale data. I would measure memory, update frequency, chart rendering, and reconnect behavior with realistic device counts.
</details>

### 5. How do you show alerts without overwhelming users?

<details><summary>Model answer</summary>

**Model answer:** I would group repeated alerts, apply severity and deduplication rules, show affected devices and recommended action, and allow safe preferences. Acknowledgement is server-owned and auditable. The UI should support filtering, keyboard use, sound alternatives, and a clear distinction between alert, notification, and resolved state.
</details>

### 6. How do you design firmware update UI?

<details><summary>Model answer</summary>

**Model answer:** The backend verifies device compatibility, package integrity, authorization, rollout, and progress; the frontend shows scheduled, downloading, installing, rebooting, succeeded, and failed states. It must warn about connectivity and avoid duplicate commands. I would provide recovery instructions and never claim success before the device reports the new version.
</details>

### 7. How do you protect device control permissions?

<details><summary>Model answer</summary>

**Model answer:** Commands are authorized server-side by user, tenant, device, role, and action risk. The UI hides unavailable controls for clarity but handles `403` or revoked access. I would require step-up auth for dangerous operations, audit every command, and test direct API calls and a permission change during an open panel.
</details>

### 8. How do you visualize large time-series data?

<details><summary>Model answer</summary>

**Model answer:** I would request an appropriate resolution for the selected range, downsample on the server or worker, and avoid rendering every point. The chart needs accessible summaries or a data table alternative, clear units, gaps, timezone, and stale state. I would measure zoom and pan responsiveness and cap the query window.
</details>

### 9. How do you handle command sent but no acknowledgement?

<details><summary>Model answer</summary>

**Model answer:** I would show pending or timed out rather than success, keep the command reference, and query device status or retry according to a safe policy. The backend should make the command idempotent and report whether execution is unknown. The UI must prevent a user from issuing a dangerous duplicate simply because the network response was lost.
</details>

### 10. How do you test real-time device dashboards?

<details><summary>Model answer</summary>

**Model answer:** I would use deterministic event fixtures for connect, update, gap, stale, command acknowledgement, and reconnect states, then test rendering performance with realistic volumes. Provider and websocket layers can be mocked for component tests, while a small browser suite verifies controls, permissions, and fallback behavior. I would include clock and timezone cases.
</details>

## 21. Cybersecurity and SOC Dashboards

### 1. How do you design an alert dashboard with thousands of alerts?

<details><summary>Model answer</summary>

**Model answer:** I would use server-side filters, cursor pagination, virtualization, stable severity and status fields, and saved views. The UI should preserve analyst context while realtime events arrive, deduplicate updates, and provide keyboard navigation. I would measure search latency, render cost, and the time needed to reach a useful investigation.
</details>

### 2. How do you prevent analyst overload?

<details><summary>Model answer</summary>

**Model answer:** I would group related alerts, suppress known duplicates, prioritize by impact and confidence, and show recommended next action without hiding raw evidence. Analysts need tuning controls, ownership, snooze, and escalation paths. I would monitor false-positive and resolution metrics, not only the number of alerts displayed.
</details>

### 3. How do you handle real-time severity updates?

<details><summary>Model answer</summary>

**Model answer:** Events should be versioned and authorized, and the client should merge them by alert id without losing analyst edits. I would visibly announce important changes, update ordering and filters consistently, and handle a stale or conflicting event by resyncing. Audit logs should show who changed severity and why.
</details>

### 4. How do you design an incident timeline?

<details><summary>Model answer</summary>

**Model answer:** I would use a server-ordered event timeline with source, actor, timestamp, severity, and links to evidence. The UI supports filtering, timezone context, keyboard navigation, and expansion without losing position. Untrusted log content is escaped, and edits or deletions are represented rather than silently rewriting history.
</details>

### 5. How do you handle role-based access to sensitive evidence?

<details><summary>Model answer</summary>

**Model answer:** Evidence access is enforced server-side by incident, tenant, role, and field sensitivity, with short-lived downloads and audit events. The client can mask or hide data for clarity but cannot secure it alone. I would test direct URLs, exports, screenshots policy, cache behavior, and revoked access during investigation.
</details>

### 6. How do you build search across logs?

<details><summary>Model answer</summary>

**Model answer:** I would send a validated query to a backend search service with pagination, time bounds, field permissions, cancellation, and rate limits. The UI preserves the query in URL state, shows syntax or validation errors, and virtualizes results. It should escape log content and make query scope and timezone explicit.
</details>

### 7. How do you design keyboard-heavy workflows?

<details><summary>Model answer</summary>

**Model answer:** I would define a discoverable, non-conflicting shortcut map, preserve visible focus, provide button and menu alternatives, and avoid hijacking browser or assistive-technology commands. Actions should announce selection and state changes, with confirmation for destructive operations. I would test keyboard-only flows at realistic table sizes.
</details>

### 8. How do you show confidence and false positives?

<details><summary>Model answer</summary>

**Model answer:** I would display confidence as a signal with context, source, and limitations, not as an absolute verdict. Analysts should be able to mark false positive, add reason, and see how it affects workflow. The backend stores decisions and evidence, while the frontend avoids color-only or overly precise visual claims.
</details>

### 9. How do you handle audit trail for analyst actions?

<details><summary>Model answer</summary>

**Model answer:** Every assignment, status, severity, comment, export, and evidence access should create a server-side event with actor, target, timestamp, outcome, and correlation id. The UI can show a filtered timeline but must not fabricate history. Audit access is permissioned and sensitive payloads are redacted.
</details>

### 10. How do you test dense data UIs?

<details><summary>Model answer</summary>

**Model answer:** I would test behavior at small and realistic volumes, including virtualization, sorting, filtering, keyboard navigation, realtime updates, stale data, and partial failures. Contract tests protect field shape and permission rules; browser tests cover critical investigation paths. Performance budgets and accessibility checks belong in CI to catch regressions early.
</details>

## 22. Developer Tools and Observability

### 1. How do you build a log viewer?

<details><summary>Model answer</summary>

**Model answer:** I would stream or page logs from a server query, virtualize rows, support time and level filters, and escape untrusted content. The UI should preserve query state, show truncation and stale indicators, and provide a readable detail view without rendering every row at once. Access, redaction, and tenant scope are server responsibilities.
</details>

### 2. How do you handle infinite scrolling logs?

<details><summary>Model answer</summary>

**Model answer:** I would use cursor pagination in both directions where the product needs historical and live views, virtualize rows, and keep the user's position stable when new logs arrive. The UI should pause live-follow when the user scrolls away and offer a return-to-live action. Backpressure and cancellation prevent a fast producer from freezing the browser.
</details>

### 3. How do you protect API keys in UI?

<details><summary>Model answer</summary>

**Model answer:** A browser cannot keep a secret from its user, so I would avoid exposing long-lived secrets and use scoped, revocable credentials or a server proxy where possible. Show a key once with re-authentication, redact it after creation, and never place it in logs, URLs, analytics, or source maps. The backend enforces scopes and rotation.
</details>

### 4. How do you design copy-to-clipboard securely?

<details><summary>Model answer</summary>

**Model answer:** I would copy only the exact value the user requested, provide a clear accessible confirmation, and avoid logging the value or leaving it in long-lived state. Sensitive values should have a short visibility window and require appropriate authorization. Clipboard access needs permission and a fallback for unsupported browsers.
</details>

### 5. How do you show webhook delivery retries?

<details><summary>Model answer</summary>

**Model answer:** The backend should expose delivery id, attempt number, response metadata safe to display, next retry, and final state. The UI distinguishes queued, delivered, retrying, failed, and disabled and supports a permissioned replay with idempotency. I would redact request secrets and show a correlation id for support.
</details>

### 6. How do you design dashboard widgets?

<details><summary>Model answer</summary>

**Model answer:** Each widget should have an independent query, loading, empty, stale, and error state, while shared time range and project scope are explicit. I would persist layout safely, lazy-load expensive widgets, and preserve stable dimensions. The backend and cache must enforce project permissions; the frontend should not use a hidden widget as security.
</details>

### 7. How do you handle huge time-series charts?

<details><summary>Model answer</summary>

**Model answer:** I would request downsampled data for the visible time range, use canvas or a tested chart strategy where appropriate, and move expensive transforms off the main thread. The UI needs units, gaps, timezone, accessible summary, and a table or download alternative. I would cap query size and measure zoom and pan interaction.
</details>

### 8. How do you build a query builder UI?

<details><summary>Model answer</summary>

**Model answer:** I would represent the query as a typed AST or structured model, validate it before sending, and serialize it in a safe, shareable form. The UI should explain field types, operator choices, errors, and scope, with a text mode only if it has clear permissions and escaping. Server parsing and authorization remain authoritative.
</details>

### 9. How do you design an error-monitoring page?

<details><summary>Model answer</summary>

**Model answer:** I would show grouped issue, occurrence trend, affected release, environment, stack context, and safe breadcrumbs, with server-side filtering and pagination. Personal data and secrets must be redacted before storage. The UI should support assignment, status, and links to deploys while keeping raw stack or event access permissioned.
</details>

### 10. How do you support power users with keyboard shortcuts?

<details><summary>Model answer</summary>

**Model answer:** I would make shortcuts optional, discoverable, remappable where useful, and always provide visible controls. Focus, selection, and announcements must remain clear, and shortcuts must not interfere with text inputs or assistive technology. I would test keyboard-only navigation and ensure destructive commands still require appropriate confirmation.
</details>

## 23. News, Publishing, and SEO Sites

### 1. How do you optimize SEO for article pages?

<details><summary>Model answer</summary>

**Model answer:** I would render stable article content on the server or statically, provide canonical URLs, structured metadata, meaningful headings, accessible images, and fast critical CSS. Personalization can be layered after the core content. I would test crawler output, duplicate URLs, sitemap behavior, and Core Web Vitals on mobile.
</details>

### 2. How do you handle breaking-news traffic spikes?

<details><summary>Model answer</summary>

**Model answer:** I would make public article content cacheable at the CDN, keep the page lightweight, use stale-while-revalidate where editorial policy allows, and isolate live updates from the core article. The backend needs capacity planning and graceful degradation. The UI should show last updated time and avoid a failed recommendation widget blanking the article.
</details>

### 3. How do you design paywall access?

<details><summary>Model answer</summary>

**Model answer:** Subscription entitlement must be checked by the server and the protected content should not be shipped to an unauthorized browser merely hidden behind CSS. The UI explains the access state, supports login or purchase, and preserves reading position where policy allows. I would handle expired sessions, grace periods, multiple tabs, and cache isolation.
</details>

### 4. How do you implement preview mode for editors?

<details><summary>Model answer</summary>

**Model answer:** Preview uses a short-lived, authenticated token scoped to the draft and environment, with server validation and no public cache. The UI labels preview clearly and handles unpublished assets or missing fields. I would test token expiry, sharing, logout, canonical metadata, and accidental indexing.
</details>

### 5. How do you handle comments and moderation?

<details><summary>Model answer</summary>

**Model answer:** Comments are untrusted content and go through server validation, rate limits, reporting, moderation states, and safe rendering. The UI shows pending, removed, or restricted states and offers block or report actions. I would protect author privacy, handle realtime moderation changes, and make keyboard and screen-reader behavior clear.
</details>

### 6. How do you optimize ad-heavy pages?

<details><summary>Model answer</summary>

**Model answer:** I would reserve ad slots to avoid layout shift, lazy-load below-the-fold placements, isolate third-party scripts, and define performance budgets. Ads must not block article content or keyboard interaction, and privacy consent must be respected. I would measure real-user LCP, INP, CLS, long tasks, and revenue tradeoffs.
</details>

### 7. How do you support an AMP-like fast reading experience?

<details><summary>Model answer</summary>

**Model answer:** I would keep the critical article path mostly server-rendered, minimize JavaScript, optimize typography and media, and progressively enhance nonessential features. The fallback still needs full semantics, navigation, comments access, and sharing. I would validate content parity and measure actual mobile performance rather than copying a format without its constraints.
</details>

### 8. How do you handle image-heavy stories?

<details><summary>Model answer</summary>

**Model answer:** I would use responsive image sources, correct dimensions and priority for the lead image, lazy loading for later media, captions and alt text, and a CDN with quality controls. I would keep text readable while media loads and provide a fallback for failed images. Testing includes slow connections, zoom, and screen readers.
</details>

### 9. How do you design newsletter signup without hurting UX?

<details><summary>Model answer</summary>

**Model answer:** I would use a clear, labelled form with minimal fields, explicit consent and frequency, inline validation, and a non-blocking success state. The server handles duplicate subscriptions, verification, rate limits, and unsubscribe. I would avoid interrupting the article before the user has context and make the form work without JavaScript.
</details>

### 10. How do you handle stale cached article content?

<details><summary>Model answer</summary>

**Model answer:** I would define editorial freshness rules, use versioned or revalidated cache keys, and expose last updated time. Critical corrections should trigger targeted invalidation or a visible correction notice. The frontend should not silently merge old and new article sections, and preview, paywall, and public caches must remain separate.
</details>

## 24. Common System Design Prompts

### 1. Design an e-commerce checkout.

<details><summary>Model answer</summary>

**Model answer:** I would separate cart, inventory reservation, pricing, payment, and order state. The frontend uses URL or server-backed step state, validates inputs early, and shows explicit pending and failure recovery. The backend revalidates price and stock, uses idempotency for payment and order creation, and exposes a status page so a timeout never causes a second charge.
</details>

### 2. Design a ride booking flow.

<details><summary>Model answer</summary>

**Model answer:** I would model location permission, quote, confirmation, matching, driver arrival, trip, payment, and completion as a state machine. Realtime events are ordered and reconnectable; the backend owns fare, driver, payment, and safety decisions. The UI supports manual location, stale network states, cancellation, accessibility, and clear recovery at every transition.
</details>

### 3. Design a chat application.

<details><summary>Model answer</summary>

**Model answer:** I would use an API for history and mutations plus websocket or SSE events for realtime updates. Server-generated ids, client ids, sequence numbers, cursors, and acknowledgements support deduplication, ordering, reconnect, and pagination. The frontend separates pending, sent, failed, and read states and includes moderation, permissions, notification preferences, and accessible composition.
</details>

### 4. Design a notification system.

<details><summary>Model answer</summary>

**Model answer:** I would define event type, recipient, priority, deduplication key, delivery channel, read state, and retention on the backend. The client consumes a cursor, groups related events, handles reconnect and unread counts, and offers preferences without allowing critical alerts to disappear. Delivery failures and user actions need observability and auditability.
</details>

### 5. Design a dashboard with widgets.

<details><summary>Model answer</summary>

**Model answer:** I would give each widget an independent data query and state boundary, while shared filters and permissions are explicit. The page uses parallel loading, stable skeleton dimensions, retry per widget, lazy loading for expensive content, and URL-backed filters. A failed widget should not blank the page, and telemetry should identify slow or stale widgets.
</details>

### 6. Design a transaction or order history page.

<details><summary>Model answer</summary>

**Model answer:** I would use server-side cursor pagination and filters, URL state, accessible table or list semantics, and a detail view for each record. Sensitive data is scoped by server authorization and private cache policy. Export is an audited background job, and the UI distinguishes pending, reversed, cancelled, failed, and completed records.
</details>

### 7. Design a file upload and review system.

<details><summary>Model answer</summary>

**Model answer:** I would upload to controlled storage with signed, short-lived permissions, validate and scan files, and model uploaded, processing, accepted, rejected, and expired states. Resumable upload and retry need idempotent file and review ids. Reviewers get role-scoped access, and the UI provides progress, errors, comments, audit trail, and safe downloads.
</details>

### 8. Design a multi-step form with autosave.

<details><summary>Model answer</summary>

**Model answer:** I would keep a typed draft model, save through a versioned API, show last-saved and pending-sync state, and preserve values after validation. The server owns rules and final submission; the client can provide immediate feedback. Conflicts, session expiry, offline mode, sensitive fields, accessibility, and resume links are first-class states.
</details>

### 9. Design a real-time tracking page.

<details><summary>Model answer</summary>

**Model answer:** I would define event ordering, cursor reconnect, staleness thresholds, and permission scope before choosing websocket or SSE. The UI keeps a lightweight latest state, batches updates, shows last update and offline status, and offers a list fallback to a map or chart. Observability covers latency, dropped events, and reconnect rate.
</details>

### 10. Design a searchable, filterable, sortable data table.

<details><summary>Model answer</summary>

**Model answer:** I would store validated query state in the URL, use server-side pagination and sorting for large data, and virtualize rows after measuring. The table needs stable columns, keyboard behavior, loading and empty states, error retry, permission-aware actions, and accessible headers. Bulk actions show exact scope and handle partial failures.
</details>

## 25. Core Frontend Scenario Answers

### JavaScript: A search box calls the API on every keystroke. How do you improve it?

<details><summary>Model answer</summary>

**Model answer:** Debounce requests, cancel the previous fetch with `AbortController`, ignore stale responses, and show loading, empty, and error states. Keep the query in state or the URL as appropriate, and use server pagination. I would measure the request rate and input latency rather than choosing a delay blindly.
</details>

### JavaScript: The user clicks Pay twice before the first request completes. How do you prevent duplicate payments?

<details><summary>Model answer</summary>

**Model answer:** Disable the control as immediate feedback and generate one idempotency key per payment intent. The backend stores and replays the first result for that key, while the client treats a timeout as unknown and queries status. Tests cover double click, refresh, retry, and two tabs.
</details>

### JavaScript: Two API responses arrive out of order. How do you avoid showing stale data?

<details><summary>Model answer</summary>

**Model answer:** Cancel obsolete requests where possible and associate each request with a sequence or query key. Only the latest active request may update the relevant state. I would also use a server-state library or cache that understands query identity and test rapid filter changes and slow responses.
</details>

### JavaScript: A long table freezes the browser. What do you check?

<details><summary>Model answer</summary>

**Model answer:** I would profile scripting, layout, painting, memory, row count, cell complexity, and event handlers. Then I would use pagination or virtualization, memoize only measured expensive work, avoid layout thrashing, and reduce DOM and formatting cost. The result should be checked with realistic data and keyboard navigation.
</details>

### JavaScript: An API sometimes fails. How do you implement retry without making things worse?

<details><summary>Model answer</summary>

**Model answer:** Retry only transient, safe failures, use exponential backoff with jitter and a maximum attempt count, and honor cancellation and server retry hints. Mutations need idempotency before replay. The UI shows retrying and final failure states and gives the user a controlled retry instead of creating a request storm.
</details>

### JavaScript: A tab is open for 8 hours. How should the app handle stale session state?

<details><summary>Model answer</summary>

**Model answer:** The server session and expiry remain authoritative. The client can refresh safe data, listen for visibility changes, warn before idle timeout, and handle `401` or `419` centrally. On expiry it preserves only an allowed draft, clears private caches, and requires login or re-authentication for sensitive actions.
</details>

### JavaScript: You need to sync logout across multiple tabs. How?

<details><summary>Model answer</summary>

**Model answer:** Revoke the server session, clear local state, and broadcast a logout event with `BroadcastChannel` plus a storage-event fallback. Each tab also handles unauthorized API responses because events can be missed. I would test closed tabs, offline tabs, in-flight requests, and account switching.
</details>

### JavaScript: A user goes offline during form submission. What UX and technical flow do you design?

<details><summary>Model answer</summary>

**Model answer:** Preserve the draft, show offline and last-saved state, and do not claim submission succeeded. Queue only safe, idempotent operations, then retry after reconnect and reconcile with server validation. For financial or destructive mutations, I would require a fresh confirmation rather than automatically replaying an unknown request.
</details>

### JavaScript: You receive thousands of websocket updates. How do you keep the UI responsive?

<details><summary>Model answer</summary>

**Model answer:** Batch or throttle events, keep only the latest relevant state, virtualize visible rows, and move expensive transforms to a worker when needed. Backpressure, event ordering, disconnect, and resync are part of the protocol. I would pause nonessential updates when hidden and verify memory and INP with realistic volumes.
</details>

### JavaScript: A date appears different for users in different time zones. How do you debug it?

<details><summary>Model answer</summary>

**Model answer:** I would inspect the raw API value, whether it represents an instant or date-only business value, the parsing code, timezone, locale, and DST boundary. Store instants in a canonical form and format at the display boundary; handle date-only values without accidental UTC conversion. Tests should cover representative time zones.
</details>

### TypeScript: An API may return either account data or an error object. How do you model it?

<details><summary>Model answer</summary>

**Model answer:** I would model a discriminated union such as `{ ok: true, data } | { ok: false, error }` and narrow on `ok`. Runtime validation is still needed because TypeScript types disappear at runtime. The API client should normalize transport errors and business errors into one explicit result shape.
</details>

### TypeScript: A prop is required only when another prop has a specific value. How do you type it?

<details><summary>Model answer</summary>

**Model answer:** I would use a discriminated union of prop shapes, for example a `mode` literal with one branch requiring `href` and another forbidding it. This makes invalid combinations fail at compile time and keeps the component API self-documenting. Runtime validation still protects data crossing a boundary.
</details>

### TypeScript: You are migrating a JavaScript React app to TypeScript. What is your approach?

<details><summary>Model answer</summary>

**Model answer:** I would enable strictness gradually, start at boundaries and high-risk modules, type API responses and shared props, replace `any` with `unknown` plus narrowing, and keep tests running throughout. Migration should be incremental with lint and CI gates, not a flag flip that creates thousands of unreviewable errors.
</details>

### TypeScript: Backend added a field but frontend types are stale. How do you prevent bugs?

<details><summary>Model answer</summary>

**Model answer:** I would establish an API contract source, generate or share types where appropriate, validate responses at runtime, and add contract tests in CI. New fields should be additive when possible, while removed or changed fields need versioning and a migration plan. The UI must handle unknown or missing data safely.
</details>

### TypeScript: You need shared types between frontend and backend. What are the options?

<details><summary>Model answer</summary>

**Model answer:** Options include generated types from OpenAPI or GraphQL, a shared package, or schema-first runtime validation. Generated types reduce drift, while a shared package can couple deployments; runtime schemas protect the actual boundary. I would choose based on ownership, versioning, language boundaries, and how independently the services deploy.
</details>

### HTML/CSS: A transaction table breaks on mobile. How do you redesign it?

<details><summary>Model answer</summary>

**Model answer:** I would keep semantic table markup for comparison, prioritize columns, allow horizontal scrolling with a visible cue, or switch to labelled cards when the information hierarchy supports it. I would not hide critical values or rely on color. Test zoom, keyboard, screen reader headers, print, and long account labels.
</details>

### HTML/CSS: A modal cannot be used with keyboard. What needs fixing?

<details><summary>Model answer</summary>

**Model answer:** Use a real dialog pattern, move focus into it, trap focus while open, support Escape, provide an accessible name, restore focus to the trigger, and prevent the background from being interactive. Test nested or failed close behavior, screen readers, zoom, and a non-modal alternative if the task does not require a modal.
</details>

### HTML/CSS: A production page has layout shift after fonts load. How do you fix it?

<details><summary>Model answer</summary>

**Model answer:** I would measure CLS, inspect font loading and fallback metrics, preload only the critical font, use a compatible fallback or metric adjustment, and reserve dimensions for content. I would avoid blocking the whole page on fonts and verify the fix on slow mobile connections with real-user monitoring.
</details>

### HTML/CSS: A form label is visible but screen readers do not announce it. How do you debug?

<details><summary>Model answer</summary>

**Model answer:** I would verify that the `label` `for` matches the input `id`, that the control is not replaced by an inaccessible custom widget, and that error or help text is associated with `aria-describedby` when needed. I would inspect the accessibility tree and test keyboard focus and an actual screen reader.
</details>

### HTML/CSS: A bank statement printout is cutting content. How do you test and fix print CSS?

<details><summary>Model answer</summary>

**Model answer:** I would use print preview and PDF output at supported paper sizes, inspect overflow, page breaks, hidden controls, table headers, and color contrast, then add focused `@media print` rules. Important content should not depend on background colors or hover states. Automated visual or PDF checks can catch regressions.
</details>

### React: Account balance flickers between old and new values. How do you debug?

<details><summary>Model answer</summary>

**Model answer:** I would trace query keys, loading transitions, effects, cache updates, and realtime events to find which source writes each value. Keep the previous value with a refreshing indicator, cancel or sequence requests, and reconcile server events by version. The UI must distinguish stale from zero and never show another user's cache.
</details>

### React: A transfer form submits twice. How do you prevent duplicate submissions?

<details><summary>Model answer</summary>

**Model answer:** Disable the submit control while pending, guard the handler against repeated invocation, and send an idempotency key to the backend. Preserve the form and show pending or completed status after a timeout rather than retrying blindly. Tests should use rapid clicks, keyboard submit, refresh, and a slow response.
</details>

### React: A child component re-renders too often. What do you check?

<details><summary>Model answer</summary>

**Model answer:** I would use the React Profiler to identify the parent and prop that changes, then check recreated objects, callbacks, context value, state placement, and list keys. I would reduce broad subscriptions or split components before adding `memo`, `useMemo`, or `useCallback`, and verify that the optimization improves measured interaction rather than hiding a design issue.
</details>

### React: A custom hook causes an infinite loop. How do you fix it?

<details><summary>Model answer</summary>

**Model answer:** I would inspect the effect dependency list, state updates inside the effect, unstable object or function dependencies, and whether derived state can be computed during render. Make dependencies honest, stabilize values only when justified, or move the effect to the event that causes the side effect. Tests should cover mount, update, and cleanup.
</details>

### React: A dashboard has many widgets calling APIs. How do you coordinate loading and errors?

<details><summary>Model answer</summary>

**Model answer:** Give each widget an independent query and error boundary, share only intentional filters, and use a server-state cache to deduplicate and cancel requests. The shell can show overall readiness while individual widgets show loading, empty, stale, error, and retry states. Instrument widget latency so the design is driven by evidence.
</details>

### React: A user edits profile in one tab and another tab shows stale data. How do you handle it?

<details><summary>Model answer</summary>

**Model answer:** Broadcast an invalidation or update event across tabs, then refetch or reconcile the affected query. Use server versions or timestamps to avoid applying older data and clear caches on account switch. The UI should show a refresh or conflict state if unsaved edits would be overwritten.
</details>

### React: A statement list with 50,000 rows is slow. What do you do?

<details><summary>Model answer</summary>

**Model answer:** First measure render, data, formatting, and memory cost. Prefer server pagination or cursor loading; if the user needs a long local list, virtualize rows, memoize stable row data, and move expensive formatting out of render. Preserve keyboard and screen-reader semantics and keep filtering server-side when possible.
</details>

### React: A form loses user input after validation error. How do you fix it?

<details><summary>Model answer</summary>

**Model answer:** Keep the draft as the source for the form fields, map server errors to stable field names, and preserve values while showing field and summary errors. Avoid remounting the form through changing keys or resetting state on every response. Tests should cover invalid submission, async validation, navigation, and retry.
</details>

### React: A role-based button is hidden in the UI. Is that enough security?

<details><summary>Model answer</summary>

**Model answer:** No. Hiding a button improves UX but does not stop a user from calling the API directly or changing the client. The server must authenticate and authorize the action and return `401` or `403` appropriately. The frontend uses permissions to guide the user, handles denial safely, and tests direct requests.
</details>

### React: A React app shows a blank screen in production. How do you debug?

<details><summary>Model answer</summary>

**Model answer:** Check browser console and network errors, error-monitoring events, source-map configuration, deployment assets, environment variables, routing, hydration, and the first failing component. Add a root error boundary and a useful recovery path, then reproduce with the production build locally. I would use a correlation id and avoid exposing sensitive error details to users.
</details>

### Next.js: User A sees User B account data after caching. What went wrong?

<details><summary>Model answer</summary>

**Model answer:** A user-specific response was probably cached under a shared key or rendered without the correct authorization boundary. I would audit server fetch caching, CDN headers, route segments, query keys, and logout behavior, then make the data private and user-scoped. The fix belongs at the server and cache layer, not only in client state.
</details>

### Next.js: A banking dashboard is slow on first load. How do you optimize?

<details><summary>Model answer</summary>

**Model answer:** Measure server time, data waterfalls, JS and image weight, hydration, and the slowest widget. Keep noninteractive work in Server Components, parallelize independent fetches, stream slow sections with Suspense, cache only safe data, and lazy-load client-heavy features. Authenticated data still needs private caching and fresh authorization.
</details>

### Next.js: A protected route briefly shows private content before redirect. How do you prevent it?

<details><summary>Model answer</summary>

**Model answer:** Authorize before rendering the protected content on the server or at the route boundary and redirect before sending private HTML. Client guards can improve navigation but cannot prevent a flash if the server already sent the content. I would test direct requests, expired cookies, back navigation, and streaming behavior.
</details>

### Next.js: A Server Component fetch uses a secret key. How do you ensure it never reaches the client?

<details><summary>Model answer</summary>

**Model answer:** Keep the secret in server-only environment variables and server modules, call the upstream service from a Server Component, route handler, or BFF, and return only the minimum safe data. Never prefix it as a public environment variable or import the module into a Client Component. Inspect the production bundle and network responses.
</details>

### Next.js: A Server Action performs a transfer. What validations must be server-side?

<details><summary>Model answer</summary>

**Model answer:** Authenticate and authorize the user, validate account ownership and input schema, enforce limits and available balance, verify step-up or OTP, apply CSRF protections as appropriate, and use idempotency and transaction rules. The action must not trust hidden fields, client roles, calculated fees, or a confirmation flag from the browser.
</details>

### Next.js: A session expires while the user fills a transfer form. What flow do you design?

<details><summary>Model answer</summary>

**Model answer:** Warn before expiry, stop sensitive submission after server rejection, preserve only an approved draft, and require login or re-authentication before resuming. Re-fetch account and beneficiary data after authorization is restored and show the user what will be submitted. Broadcast logout or expiry to other tabs and clear private caches.
</details>

### Next.js: A page works locally but fails after deployment because of environment variables. How do you debug?

<details><summary>Model answer</summary>

**Model answer:** Check which values are build-time versus runtime, whether the variable is intentionally public, deployment configuration and naming, server logs, and the generated client bundle. I would add safe presence checks without logging secrets, redeploy after configuration changes, and fail with a useful non-sensitive message rather than an undefined URL.
</details>

### Next.js: A Next.js app has hydration errors only in production. How do you investigate?

<details><summary>Model answer</summary>

**Model answer:** Reproduce with the production build, compare server and client inputs, and inspect time, random values, browser-only APIs, locale formatting, invalid HTML, and conditional rendering. Move client-only behavior behind a client boundary or effect only when appropriate, but do not hide a real mismatch with a blanket suppression. Add an error-monitoring breadcrumb for the route and data shape.
</details>

### Next.js: A page needs real-time transaction updates. How do you integrate websocket or SSE with Next.js?

<details><summary>Model answer</summary>

**Model answer:** Use the server-rendered page for the initial authorized snapshot and a Client Component for the realtime connection. Define event identity, ordering, reconnect cursor, stale state, and cache reconciliation; never let a client event bypass authorization. The UI shows the last update and falls back to polling, while cleanup prevents duplicate connections.
</details>

### Next.js: Route protection uses only client-side checks. What is the risk?

<details><summary>Model answer</summary>

**Model answer:** Private HTML or API data may already be delivered, and a user can bypass the check by calling the route directly. I would enforce authorization in the server route, data layer, and mutation handler, then use client checks only for navigation and usability. Tests should request protected URLs without JavaScript and with changed roles.
</details>

### State: A user logs out but old data flashes on the login screen. How do you fix it?

<details><summary>Model answer</summary>

**Model answer:** Revoke the server session, synchronously clear global and query caches, cancel in-flight requests, reset account-scoped state, and guard late responses from repopulating it. The login screen should not mount behind an old authenticated shell. Test logout during a slow request, refresh, multiple tabs, and account switch.
</details>

### State: A token refresh request fails. What should happen to queued requests?

<details><summary>Model answer</summary>

**Model answer:** Use one refresh promise for concurrent callers, reject or cancel queued requests when refresh fails, clear session state, and redirect to login. Do not replay mutations automatically unless they are idempotent and the user understands the result. Avoid a refresh loop and record a safe diagnostic without logging tokens.
</details>

### State: A transaction appears twice after retry. What contract prevents this?

<details><summary>Model answer</summary>

**Model answer:** The mutation needs a client-generated idempotency key and a backend guarantee that one key maps to one result for the defined scope and retention. The client should query status after unknown outcomes and reconcile by canonical transaction id. A disabled button alone cannot protect against refresh, network retries, or two devices.
</details>

### State: A websocket updates balance while the user submits a transfer. How do you handle consistency?

<details><summary>Model answer</summary>

**Model answer:** Treat the realtime value as a versioned snapshot, show available and pending amounts separately, and let the server revalidate balance and authorization atomically at transfer time. If the mutation conflicts, explain the current state and preserve the form for correction. The client should not calculate a final financial decision from a stale event.
</details>

### State: Search filters, pagination, and sorting must survive refresh. Where do you store state?

<details><summary>Model answer</summary>

**Model answer:** Store serializable query state in the URL with validated defaults, while keeping fetched results in a server-state cache keyed by that query. Local component state can hold transient input before debounce. This makes back, refresh, sharing, and server rendering predictable without putting the whole data set into global state.
</details>

### Performance: A dashboard loads in 8 seconds. What do you check first?

<details><summary>Model answer</summary>

**Model answer:** Measure with the browser performance panel, Lighthouse, React Profiler, server traces, and real-user data. Identify TTFB, data waterfalls, JS parse and hydration, images, fonts, third-party scripts, and the slowest interaction. Then fix the largest measured cause, such as parallel fetches, streaming, code splitting, caching safe data, or reducing client rendering.
</details>

### Performance: LCP is poor on mobile. What are likely causes?

<details><summary>Model answer</summary>

**Model answer:** Check slow TTFB, a late or oversized hero image, render-blocking CSS or fonts, excessive JS, and server waterfalls. Prioritize the actual LCP element, reserve its size, preload only when justified, optimize its image and font, and reduce work before it renders. Verify with field data because desktop lab results can hide mobile problems.
</details>

### Performance: INP is poor when typing into search. What do you optimize?

<details><summary>Model answer</summary>

**Model answer:** Profile the input event and reduce synchronous work: debounce network requests, defer expensive filtering, split or virtualize results, avoid broad state updates, and move computation to a worker if needed. I would not blindly memoize; I would measure the event handler, rendering, layout, and third-party listeners before changing code.
</details>

### Performance: A chart freezes the page. What approaches can help?

<details><summary>Model answer</summary>

**Model answer:** Downsample data, limit the visible time range, use an efficient renderer, batch updates, and move transformations off the main thread. Render a summary or loading state before the full chart and provide an accessible table alternative. I would test zoom, resize, realtime updates, memory, and input latency on target devices.
</details>

### Performance: A bundle grew after adding a date library. How do you investigate?

<details><summary>Model answer</summary>

**Model answer:** Use a bundle analyzer to locate the dependency, inspect import style and locale data, and check whether a smaller native or tree-shakeable option is sufficient. Lazy-load it if the feature is not on the critical path and confirm server and client bundles separately. I would add a budget or CI check so the regression is visible next time.
</details>

### Testing: A bug reached production after a refactor. What tests should have caught it?

<details><summary>Model answer</summary>

**Model answer:** First identify the user-visible contract, then add a focused component or integration test and a critical-path browser test if it crosses routing, API, or permissions. The test should interact through accessible UI rather than implementation details. I would also ask why review, type checks, contract tests, or monitoring failed to catch the regression and improve the smallest missing layer.
</details>

### Testing: E2E tests are flaky in CI. How do you stabilize them?

<details><summary>Model answer</summary>

**Model answer:** Replace arbitrary sleeps with locator and network-state waits, isolate test data, control clocks and third-party dependencies, and collect traces, screenshots, and console logs. Remove shared state and order dependence, then quarantine only while fixing the cause. Retries can provide evidence but must not hide a real race.
</details>

### Testing: A test passes but users still cannot complete a form. What might be wrong?

<details><summary>Model answer</summary>

**Model answer:** The test may use unrealistic data, skip the actual browser or backend contract, miss permissions, keyboard or screen-reader interaction, mobile layout, validation timing, or an environment-specific configuration. I would reproduce the real journey, inspect network and accessibility tree, and add a test at the layer where the failure occurs.
</details>

### Testing: A mock hides an integration bug. How do you improve testing?

<details><summary>Model answer</summary>

**Model answer:** Keep unit tests focused, add contract tests against the real schema, and use a realistic mock server for integration so request shape, status, and error payloads are exercised. Reserve a small number of tests for the deployed service or controlled backend. Mocks should model failure and authorization, not only the happy path.
</details>

### Testing: How do you test that Pay disables while the request is pending?

<details><summary>Model answer</summary>

**Model answer:** Start a controlled pending request, submit through the accessible button or keyboard, assert disabled and pending feedback, attempt a second submit, then resolve success and error paths. Also test a timeout and `401`. The backend idempotency test is still needed because a UI assertion cannot prove payment uniqueness.
</details>

### Accessibility: A blind user cannot complete money transfer. What do you inspect?

<details><summary>Model answer</summary>

**Model answer:** Walk the flow with keyboard and screen reader: labels, field grouping, focus order, error summary, live status, button names, required fields, and confirmation content. Check that masked values and pending transfer state are announced meaningfully. Fix semantic structure first, then test with realistic validation and session timeout behavior.
</details>

### Accessibility: A modal opens but keyboard focus stays behind it. How do you fix it?

<details><summary>Model answer</summary>

**Model answer:** Move focus to the dialog heading or first meaningful control, trap focus within the modal, mark the background inert, support Escape if appropriate, and restore focus to the trigger on close. Give the dialog an accessible name and test nested errors, mobile, screen readers, and a failed submission.
</details>

### Accessibility: A red error border is the only error indicator. What is wrong?

<details><summary>Model answer</summary>

**Model answer:** Color alone is not sufficient and may not be perceived by everyone. Add text explaining the error, associate it with the field, set an appropriate invalid state, and provide a summary that moves focus when needed. The message should say how to recover, not only that something is wrong.
</details>

### Accessibility: An icon-only button has no accessible name. How do you fix it?

<details><summary>Model answer</summary>

**Model answer:** Use a real button with an accessible name from visible text or a precise `aria-label`, keep the icon decorative if the label carries meaning, and provide a tooltip only as supplemental help. Test focus, disabled state, contrast, and whether the name changes as the action changes.
</details>

### Accessibility: A session timeout dialog appears but is not announced. What do you do?

<details><summary>Model answer</summary>

**Model answer:** Use a properly labelled dialog or live region appropriate to the urgency, move focus when it opens, announce remaining time without excessive repetition, and provide extend and sign-out actions with keyboard support. The server still expires the session; the dialog is a warning and must handle a timeout that occurs while it is open.
</details>

### API: The API returns 200 but the business operation failed. How should the frontend handle it?

<details><summary>Model answer</summary>

**Model answer:** The client must inspect the documented business response, not equate HTTP 200 with domain success. I would normalize transport and business errors in the API client, show a useful recovery state, and preserve the user's input. Ideally the backend uses clear status codes and an explicit success discriminator so the contract is difficult to misuse.
</details>

### API: The API returns 202 for a transfer request. What UX do you design?

<details><summary>Model answer</summary>

**Model answer:** Treat it as accepted for processing, not completed. Show the transfer reference, pending state, expected next update, and a safe status page; poll or subscribe with backoff and stop duplicate submission. The backend reconciles the final result and the UI handles success, rejection, reversal, timeout, and support escalation.
</details>

### API: The API returns partial dashboard data. Do you show partial UI?

<details><summary>Model answer</summary>

**Model answer:** Usually yes, if the available widgets are safe and useful. Each widget should show its own data, stale or unavailable state, and retry, while the page explains that the dashboard is partial. Sensitive or dependent actions should remain disabled until their required data is authoritative.
</details>

### API: The API returns too much sensitive data. What do you do?

<details><summary>Model answer</summary>

**Model answer:** Stop displaying or logging it, report the contract issue, and ask the backend to minimize and scope the response. Do not rely on hiding fields in the UI or removing them after they reach the browser. Check caches, analytics, source maps, error reports, and browser history for exposure and add a regression test.
</details>

### API: Backend wants frontend to calculate transfer fee. Is that safe?

<details><summary>Model answer</summary>

**Model answer:** The frontend can show an estimate for responsiveness, but the backend must calculate and validate the authoritative fee at confirmation. The UI should show when the fee is estimated and handle a changed final amount explicitly. I would use a versioned pricing response or quote expiry and never trust a client-submitted fee.
</details>

## 26. Banking Security Extension Scenarios

### 1. How would you design transfer confirmation?

<details><summary>Model answer</summary>

**Model answer:** Show a review containing source, beneficiary, amount, fee, currency, timing, and risk notice, then require the appropriate step-up factor. The server revalidates every value, returns an idempotency-backed result, and records an audit event. The confirmation must be accessible, explicit, and safe to repeat only when status is known.
</details>

### 2. How would you prevent duplicate transfer submission?

<details><summary>Model answer</summary>

**Model answer:** Use a pending UI guard plus one idempotency key per user intent, enforced by the server for the relevant account and operation window. On timeout, query the transfer reference instead of creating a new mutation. Test rapid clicks, keyboard submission, refresh, replay, and two devices.
</details>

### 3. How would you protect the add-beneficiary flow?

<details><summary>Model answer</summary>

**Model answer:** Require recent authentication or step-up verification, validate ownership and beneficiary details server-side, rate-limit OTP, and show the exact details before confirmation. Use idempotency, expiry, audit logging, and clear pending or rejected states. The UI is only a guide; the API must enforce the workflow.
</details>

### 4. How would you design a session timeout warning?

<details><summary>Model answer</summary>

**Model answer:** Use server-provided or conservatively calculated expiry to show an accessible warning, offer a secure re-authentication or extend action, and handle a race where the session expires first. On expiry, stop sensitive mutations, preserve only an approved draft, clear private state, and redirect. Broadcast the outcome to other tabs.
</details>

### 5. How would you handle the user opening the same account in two tabs?

<details><summary>Model answer</summary>

**Model answer:** Treat both tabs as untrusted views of shared server state. Use query invalidation or realtime events for updates, version data for conflicts, and broadcast logout or account changes. A transfer action is revalidated and idempotent on the server, while the UI labels stale balances and does not overwrite unsaved input silently.
</details>

### 6. How would you handle logout from all devices?

<details><summary>Model answer</summary>

**Model answer:** Revoke the session family or refresh tokens server-side, invalidate active sessions, and notify other devices when possible. The current client clears caches and redirects, while every API handles the revocation even if notification is delayed. The user should see device sessions and last activity without exposing tokens.
</details>

### 7. How would you handle a suspicious login from a new location?

<details><summary>Model answer</summary>

**Model answer:** Risk scoring belongs on the server and can require step-up verification, session review, or account lock according to policy. The UI explains the action without revealing detection rules, offers secure recovery, and shows recent devices. Audit and notification events should be generated server-side and avoid exposing precise location unnecessarily.
</details>

### 8. How would you show masked account numbers?

<details><summary>Model answer</summary>

**Model answer:** Return a masked representation by default, label the visible digits clearly, and avoid reconstructing the full value in the client. If the full value is needed, use an authorized, time-limited reveal flow with audit logging. Masked and full values should not appear in analytics, URLs, logs, or public caches.
</details>

### 9. How would you design view-full-card-number securely?

<details><summary>Model answer</summary>

**Model answer:** Require re-authentication or step-up, request the minimum data just in time from the server, auto-hide after a short window, and clear it from component state on close or navigation. The backend checks entitlement and logs the reveal. Client detection or disabled copy is only a deterrent and cannot protect the value once displayed.
</details>

### 10. How would you handle copy and paste restrictions for account fields?

<details><summary>Model answer</summary>

**Model answer:** I would not use blanket restrictions that harm accessibility or users who need password managers. Validate format, provide an explicit copy action for safe values, warn before risky actions, and let the server authorize and confirm the actual transfer. Sensitive clipboard values should not be logged or retained longer than needed.
</details>

### 11. How would you design transaction search without leaking data?

<details><summary>Model answer</summary>

**Model answer:** Send only validated filters over an authenticated connection, scope queries by account on the server, paginate results, and use private cache policy. The UI masks sensitive values and does not put full identifiers in URLs or analytics. Export and search audit events should record the action without copying transaction contents into logs.
</details>

### 12. How would you secure statement download?

<details><summary>Model answer</summary>

**Model answer:** Create the statement through an authorized server job, return a short-lived scoped download URL, and record the access. The frontend shows processing, ready, expired, and failed states and does not embed credentials in the URL. I would test direct URL reuse, account switching, cache headers, print, and redaction.
</details>

### 13. How would you handle browser Back after logout?

<details><summary>Model answer</summary>

**Model answer:** Back navigation may show a browser snapshot, so security cannot rely on the screen disappearing. Revoke the session server-side, use private or no-store headers for sensitive pages, clear client caches, and revalidate authorization on every protected request. A returned page must not allow data fetch or mutation after logout.
</details>

### 14. How would you protect against clickjacking?

<details><summary>Model answer</summary>

**Model answer:** Use response headers such as a restrictive `Content-Security-Policy` `frame-ancestors` policy and compatible frame protections, plus server-side authorization and step-up for sensitive actions. A JavaScript frame-busting snippet is not sufficient. I would verify headers in deployment and test embedded and legitimate integration scenarios.
</details>

### 15. How would you design audit logs for customer-service actions?

<details><summary>Model answer</summary>

**Model answer:** Generate immutable or append-only server events with agent identity, customer scope, action, reason, target, timestamp, result, and correlation id. Redact secrets and avoid logging full account values. The UI supports permissioned search and review, and the system records denied, failed, and successful actions.
</details>

### 16. How would you handle API returning `403` versus `401`?

<details><summary>Model answer</summary>

**Model answer:** `401` normally means the session is missing or invalid, so the client clears state or starts re-authentication; `403` means identity is known but the action is not allowed, so it should show a permission or policy message without looping to login. The backend must use the distinction consistently and the UI must not leak protected details.
</details>

### 17. How would you handle session expiry during payment?

<details><summary>Model answer</summary>

**Model answer:** Stop the payment mutation when authorization fails, preserve only safe form data, and require re-authentication before reloading price, beneficiary, and payment state. Query the server to determine whether payment was accepted before offering retry. Never ask the user to pay again based only on a client timeout or expired screen.
</details>

### 18. How would you design OTP resend with rate limits?

<details><summary>Model answer</summary>

**Model answer:** The server enforces attempt, resend, destination, and expiry limits and returns a retry-after value when appropriate. The UI shows a countdown, masks the destination, disables only the relevant action, and provides recovery for an expired or blocked OTP. Codes are never logged or treated as authorization without server verification.
</details>

### 19. How would you protect high-risk settings changes?

<details><summary>Model answer</summary>

**Model answer:** Require recent authentication or step-up, show before-and-after values, apply a server-side policy and cooldown where needed, and notify the user through a trusted channel. The mutation is idempotent and audited. The UI should distinguish pending verification from applied change and provide a safe recovery path.
</details>

### 20. How would you explain why DevTools blocking is not true security?

<details><summary>Model answer</summary>

**Model answer:** The browser belongs to the user, so they can disable JavaScript, modify the page, use another browser, inspect requests, or call APIs directly. Disabling right-click or detecting DevTools is friction, not a trust boundary. Banking protection must be server-side authorization, secure sessions, step-up auth, CSRF and XSS defenses, least data exposure, and audit logging.
</details>
