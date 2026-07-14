# Core Frontend Interview Questions and Answers

This companion answers the beginner, intermediate, and advanced core questions from the banking preparation pack. Read the question, speak your answer, then compare it with the concise model answer. Expand the explanation with a project example during an interview.

## 1. JavaScript

### Beginner

### 1. What are the primitive data types in JavaScript?

**Answer:** The primitives are `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`. Objects, arrays, and functions are reference values; primitives are immutable values.

### 2. What is the difference between `var`, `let`, and `const`?

**Answer:** `var` is function-scoped and can be redeclared; `let` and `const` are block-scoped and cannot be redeclared in the same scope. `const` prevents reassignment of the binding, but an object or array it references can still be mutated.

### 3. What is hoisting?

**Answer:** JavaScript creates bindings before executing a scope. Function declarations are usable before their line, `var` is initialized as `undefined`, and `let`/`const` are uninitialized in the temporal dead zone until execution reaches their declaration.

### 4. What is the difference between `null` and `undefined`?

**Answer:** `undefined` generally means a value was not provided or has not been assigned; `null` is an intentional empty value. Use explicit checks when the distinction matters, and prefer `===` over loose equality.

### 5. What is the difference between `==` and `===`?

**Answer:** `==` performs type coercion before comparing, while `===` compares type and value without coercion. I normally use `===` because it makes conversions explicit and avoids surprising cases such as `0 == false`.

### 6. What are truthy and falsy values?

**Answer:** Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`; most other values are truthy, including empty arrays and objects. Use explicit checks when an empty value is valid business data.

### 7. What is a function declaration versus a function expression?

**Answer:** A declaration such as `function add() {}` is hoisted as a callable binding. An expression assigns a function to a variable, so its availability follows the variable's declaration rules and it can be passed or replaced as a value.

### 8. What are arrow functions?

**Answer:** Arrow functions provide concise function syntax and capture `this`, `arguments`, and `super` lexically from the surrounding scope. They are useful for callbacks, but they do not have their own `this` and cannot be used as constructors.

### 9. What is the difference between parameters and arguments?

**Answer:** Parameters are the named variables in a function definition; arguments are the actual values supplied when calling it. Default parameters and rest parameters make the accepted input shape explicit.

### 10. What is the spread operator?

**Answer:** Spread expands an iterable or object into another expression, such as `[...items]` or `{...user}`. It creates a shallow copy, so nested objects remain shared references unless copied separately.

### 11. What is destructuring?

**Answer:** Destructuring extracts values from arrays or properties from objects into variables, for example `const { name } = user`. It improves readability, supports defaults, and should be used carefully when a property may be absent.

### 12. What is template literal syntax?

**Answer:** Template literals use backticks and allow interpolation with `${expression}` plus multiline strings. They are useful for readable composition, but untrusted values still need safe handling when inserted into HTML or other interpreters.

### 13. What are arrays and objects?

**Answer:** An array is an ordered, integer-indexed collection; an object is a collection of keyed properties. Both are mutable reference values, so React state updates should create new references rather than mutate existing state in place.

### 14. What is optional chaining?

**Answer:** Optional chaining, such as `user?.address?.city`, stops property access when a value is `null` or `undefined` and returns `undefined`. It prevents repetitive guards, but it should not hide a missing required value that should instead produce an error.

### 15. What is the difference between `map`, `filter`, `reduce`, and `forEach`?

**Answer:** `map` transforms every item and returns a new array, `filter` keeps matching items, `reduce` combines items into one result, and `forEach` performs side effects without returning a transformed collection. Choose the method that expresses the intent and avoid using `reduce` when a clearer method exists.

### Intermediate

### 16. Explain closures with an example.

**Answer:** A closure is a function plus access to variables in its lexical scope, even after the outer function returns. For example, `makeCounter` can keep a private `count` variable that its returned function updates; this is useful for factories and encapsulation.

### 17. What is lexical scope?

**Answer:** Lexical scope means a function's accessible variables are determined by where the function is written, not where it is called. JavaScript resolves a name through the current scope and then outward through its statically defined parent scopes.

### 18. What is the event loop?

**Answer:** JavaScript runs synchronous work on a call stack, then processes queued asynchronous callbacks when the stack is empty. Promise callbacks are microtasks and normally run before the next task such as a timer or user event.

### 19. What are microtasks and macrotasks?

**Answer:** Microtasks include promise reactions and `queueMicrotask`; tasks, often called macrotasks, include timers, network events, and user events. After a task finishes, the runtime drains microtasks before rendering or starting the next task, so a large microtask chain can delay painting.

### 20. What is the output of mixed `setTimeout`, Promise, and synchronous code?

**Answer:** Synchronous statements run first, then queued promise callbacks, then timer callbacks in a later task. The exact order still depends on how the code schedules work, but the reliable rule is synchronous code before microtasks before timers.

### 21. What is a promise?

**Answer:** A promise represents the eventual result of an asynchronous operation and is pending, fulfilled, or rejected. `.then`, `.catch`, and `.finally` compose the result, while `async`/`await` provides a readable syntax over the same model.

### 22. What is the difference between `Promise.all`, `allSettled`, `race`, and `any`?

**Answer:** `all` fulfills when every promise fulfills and rejects on the first rejection; `allSettled` waits for every outcome; `race` settles on the first settled promise; `any` fulfills on the first fulfillment and rejects only when all reject. Choose based on whether partial results or the first success are useful.

### 23. What is async/await?

**Answer:** `await` pauses an async function until a promise settles and returns its value or throws its rejection. Use `try/catch/finally`, avoid accidental sequential waits when work can run in parallel, and cancel work when the UI no longer needs it.

### 24. How do you handle errors in async/await?

**Answer:** Catch errors at the boundary that can recover from them, normalize transport and business errors in the API layer, and show a user-safe message with retry or next steps. Preserve error causes for logging, but never expose secrets, stack traces, or sensitive response data in the UI.

### 25. What is debouncing?

**Answer:** Debouncing delays work until calls stop for a specified interval, so it is useful for search input and resize handlers. It reduces request volume, but the UI should still support cancellation, immediate feedback, and a final request when the user submits.

### 26. What is throttling?

**Answer:** Throttling limits work to at most one invocation per interval, which is useful for scroll, pointer, and telemetry updates. Choose leading or trailing behavior deliberately and cancel timers during component cleanup.

### 27. What is currying?

**Answer:** Currying transforms a function with multiple arguments into a sequence of single-argument functions, such as `multiply(a)(b)`. It can create reusable configured functions, but overusing it can reduce readability in ordinary application code.

### 28. What is memoization?

**Answer:** Memoization caches a function result for a given input so repeated calls avoid recomputation. The cache needs a bounded lifetime or size when inputs are unbounded, and memoization is worthwhile only when measurement shows the computation is expensive.

### 29. What is the prototype chain?

**Answer:** Objects can inherit properties through an internal prototype link. Property lookup checks the object and then walks that chain until it finds a property or reaches `null`; classes are syntax over prototype-based behavior.

### 30. What is the difference between shallow copy and deep copy?

**Answer:** A shallow copy duplicates only the outer object, so nested references are shared. A deep copy recursively duplicates nested values, but the correct strategy depends on types such as dates, maps, functions, cycles, and class instances; `structuredClone` handles many data types but not functions.

### 31. What is event delegation?

**Answer:** Event delegation attaches one handler to a common ancestor and uses bubbling to identify the originating target. It reduces listeners for dynamic lists, but the handler must check target boundaries and account for keyboard and accessibility behavior.

### 32. What is the difference between bubbling and capturing?

**Answer:** Capturing travels from the document toward the target, the target handler runs, and bubbling travels back up. Most UI handlers use bubbling; capturing is useful for observing or intercepting an event early, but should be used carefully.

### 33. What is `this`, and how does it behave in arrow functions?

**Answer:** In ordinary functions, `this` depends on how the function is called; methods receive their object, while `call` and `bind` can set it. Arrow functions capture `this` lexically and cannot be rebound, which makes them useful for callbacks.

### 34. What are modules?

**Answer:** Modules are files with explicit `import` and `export` boundaries. ES modules improve dependency clarity, enable static analysis and tree shaking, and prevent accidental global variables; keep side effects explicit.

### 35. What is tree shaking?

**Answer:** A bundler removes exports that are provably unused from statically analyzable modules. It works best with ES modules and side-effect-aware packages; dynamic imports, CommonJS patterns, and top-level side effects can limit removal.

### Advanced

### 36. How does garbage collection work at a high level?

**Answer:** The runtime identifies objects reachable from roots such as active variables and the global object, then reclaims unreachable memory. Modern collectors use generations and incremental or concurrent work; developers still need to release listeners, timers, subscriptions, and large references.

### 37. What causes memory leaks in browser apps?

**Answer:** Common causes are unremoved event listeners, timers, subscriptions, retained closures, detached DOM nodes, unbounded caches, and references from global objects. Use heap snapshots and allocation timelines to find what remains reachable after navigation or repeated mount and unmount cycles.

### 38. How would you implement a promise from scratch?

**Answer:** I would define pending, fulfilled, and rejected states, store queued handlers, settle only once, and schedule handlers asynchronously. Then I would implement thenable assimilation and chaining rules; in production I would use native promises rather than maintaining a subtly incomplete clone.

### 39. How would you implement debounce and throttle?

**Answer:** Debounce stores a timer, clears it on each call, and invokes the latest arguments after the quiet period; throttle tracks the last execution and schedules at most one trailing call per window. Both should expose cancellation and preserve `this` and arguments when used as utilities.

### 40. How would you implement `deepClone`, and what are its edge cases?

**Answer:** For supported data I would prefer `structuredClone`; otherwise I would define supported types, handle cycles with a `WeakMap`, and copy arrays, objects, dates, maps, and sets deliberately. JSON serialization loses types, ignores `undefined` and functions, and fails on cycles, so it is not a general deep clone.

### 41. How would you build retry with exponential backoff?

**Answer:** Retry only classified transient failures, use delays such as `base * 2^attempt` plus random jitter, cap attempts and total time, honor `Retry-After`, and support cancellation. Mutations require idempotency or a status query before replay.

### 42. How do you cancel a fetch request?

**Answer:** Create an `AbortController`, pass `controller.signal` to `fetch`, and call `controller.abort()` during cleanup or when a newer request supersedes it. Treat an abort as an expected cancellation rather than a user-facing failure and prevent its response from updating state.

### 43. How does `AbortController` work?

**Answer:** It exposes a signal that asynchronous APIs can observe; calling `abort` changes the signal and causes supported operations such as `fetch` to reject with an abort error. One controller can coordinate related work, while independent operations should use separate controllers.

### 44. What is backpressure in client-side data flows?

**Answer:** Backpressure is how a consumer slows, batches, or drops work when a producer emits faster than the UI can process it. Use buffering limits, throttling, sampling, batching, pausing hidden views, and a resync strategy so memory and input latency remain bounded.

### 45. How do Web Workers help performance?

**Answer:** Workers run JavaScript away from the main thread, so parsing, transformation, or computation does not block input and painting. Communication uses messages or transferable objects, so the work must be large enough to justify serialization and coordination overhead.

### 46. What is the difference between localStorage, sessionStorage, IndexedDB, cookies, and memory?

**Answer:** Memory is fastest and disappears on reload; `sessionStorage` is scoped to a tab; `localStorage` persists but is synchronous and readable by JavaScript; IndexedDB is asynchronous and supports larger structured data; cookies are sent with matching requests and can be `HttpOnly`, `Secure`, and `SameSite`. Do not put sensitive tokens or unnecessary personal data in JavaScript-readable storage.

### 47. How do you protect against race conditions in async UI?

**Answer:** Give each request an identity, cancel or ignore obsolete work, update state only if the result still matches the active query, and use server versions for concurrent mutations. Query libraries can encode these rules, but I would still define behavior for loading, cancellation, timeout, and stale data.

### 48. How do you design an API client wrapper?

**Answer:** Centralize base URL, authentication, serialization, timeout, cancellation, status normalization, retries, correlation ids, and safe logging. Keep domain methods typed and small, separate read caching from mutation behavior, and ensure unauthorized responses can clear session state without creating refresh loops.

### 49. What is a polyfill?

**Answer:** A polyfill adds a missing web API implementation so code can run in older environments. It should be feature-detected, scoped to supported browsers, and weighed against bundle size; transpiling syntax alone does not provide missing runtime APIs.

### 50. How does JavaScript handle floating-point precision?

**Answer:** Most numbers use IEEE 754 binary floating point, so decimal values such as `0.1` may not be represented exactly. For money, use integer minor units, a decimal library, or server-side calculations and never rely on a client float as the authoritative financial value.

## 2. TypeScript

### Beginner

### 1. Why use TypeScript?

**Answer:** TypeScript checks relationships and data shapes before runtime, improves editor tooling, and makes refactoring safer. It does not validate network data at runtime, so external inputs still need schemas or defensive parsing.

### 2. What is type inference?

**Answer:** TypeScript derives a type from the value or context when an annotation is not written. Inference keeps code concise, while explicit annotations are useful at public boundaries, for exported APIs, and when the intended type is broader or narrower than the initial value.

### 3. What is the difference between `type` and `interface`?

**Answer:** Both can describe object shapes and be extended or composed. Interfaces support declaration merging and are common for public object contracts; type aliases are more flexible for unions, tuples, primitives, and mapped or conditional types. I choose consistently based on the codebase.

### 4. What are union types?

**Answer:** A union says a value may be one of several types, such as `string | number`. Code must narrow the value before using type-specific operations; discriminated unions make the valid states and transitions particularly clear.

### 5. What are literal types?

**Answer:** Literal types restrict a value to an exact string, number, or boolean, such as `"pending" | "success"`. They are useful for modes, status values, feature flags, and component APIs because invalid options fail at compile time.

### 6. What is an optional property?

**Answer:** `name?: string` means the property may be absent, so reading it produces `string | undefined`. With `exactOptionalPropertyTypes`, absent and explicitly `undefined` can be distinguished, which is useful for patch or configuration APIs.

### 7. What is the difference between `any`, `unknown`, and `never`?

**Answer:** `any` disables type checking, `unknown` accepts any value but requires narrowing before use, and `never` represents impossible values or functions that do not return. Prefer `unknown` at untrusted boundaries and use `never` for exhaustive checks.

### 8. How do you type function parameters and return values?

**Answer:** Annotate parameters and return values when inference is not enough or the function is a public boundary, for example `(id: string): Promise<User>`. Keep domain types meaningful and avoid `any`; let implementation details be inferred where that improves readability.

### 9. How do you type arrays?

**Answer:** Use `User[]` or `Array<User>`; tuples such as `[string, number]` express fixed positions and types. Prefer `readonly User[]` when a function should not mutate the input.

### 10. How do you type React props?

**Answer:** Define a props type with required, optional, literal, and callback fields, then use it in the component signature. For reusable components, prefer discriminated unions or generics over a bag of optional properties that permits invalid combinations.

### Intermediate

### 11. What is type narrowing?

**Answer:** Narrowing uses runtime checks such as `typeof`, `in`, equality, or a custom type predicate to reduce a union to a safe branch. The check should reflect reality at runtime; an unsafe assertion only silences the compiler.

### 12. What are generics?

**Answer:** Generics let a function, type, or component preserve a relationship between input and output types without choosing one concrete type. Constraints such as `<T extends { id: string }>` limit what operations are valid.

### 13. What are `Partial`, `Pick`, `Omit`, `Record`, and `Readonly`?

**Answer:** They are utility types: `Partial<T>` makes properties optional, `Pick` selects keys, `Omit` removes keys, `Record<K,V>` maps keys to a value type, and `Readonly<T>` prevents assignment through that type. They are useful for view models and patch inputs but should not hide meaningful domain differences.

### 14. What is a discriminated union?

**Answer:** It is a union whose members share a literal field such as `status`, allowing a switch to narrow each valid state. It is a strong way to model loading, success, error, and pending API results without nullable fields that can appear in invalid combinations.

### 15. What is type assertion?

**Answer:** An assertion tells the compiler to treat a value as another type, but it does not convert or validate the value. Use it only when a stronger invariant is established elsewhere; prefer narrowing or runtime parsing for data from APIs, storage, or users.

### 16. What is `as const`?

**Answer:** `as const` preserves literal values and makes object properties and arrays readonly, turning `{ mode: "view" }` into a precise literal shape. It is useful for configuration and action maps, but readonly is a compile-time constraint rather than runtime freezing.

### 17. How do you type API responses?

**Answer:** Define the documented success and error shapes, use a typed client, and validate the actual JSON at runtime with a schema library or explicit parser. Keep transport status separate from business status and model nullable, optional, and versioned fields intentionally.

### 18. How do you type component children?

**Answer:** Use `ReactNode` for general renderable content, `ReactElement` when a specific element shape is required, or a render function when the component controls how data is displayed. Do not make `children` optional if the component cannot work without it.

### 19. How do you type event handlers in React?

**Answer:** Use React's event types such as `React.ChangeEvent<HTMLInputElement>` and `React.FormEvent<HTMLFormElement>`, or infer the type from the handler location. Read `event.currentTarget` when you need the element that owns the handler rather than assuming `event.target` has that shape.

### 20. What is the difference between compile-time and runtime validation?

**Answer:** TypeScript checks code during development and compilation; runtime validation checks values that actually arrive from APIs, storage, URL parameters, or users. Production-safe applications need both because a server response can violate a compile-time interface.

### Advanced

### 21. How do conditional types work?

**Answer:** A conditional type selects one type or another based on assignability, written as `T extends U ? X : Y`. They power utilities such as `ReturnType`, but complex conditional types can become hard to read, so name and test them.

### 22. How do mapped types work?

**Answer:** Mapped types iterate over a union of keys to create a new object type, for example `{ [K in keyof T]?: T[K] }`. They are useful for transformations such as readonly or optional views while preserving the original key relationships.

### 23. What are template literal types?

**Answer:** They build string literal unions from other literal types, such as `` `${"get" | "post"}:${Resource}` ``. They can enforce event names or route patterns, but runtime validation is still needed for arbitrary strings.

### 24. How do you create a reusable generic form field type?

**Answer:** Tie the field name to the form model with a generic key, such as `FieldProps<T, K extends keyof T>`, and derive the value type from `T[K]`. Use discriminated props for text, select, and checkbox differences and keep runtime validation separate.

### 25. How do you model success/error API states?

**Answer:** Use a discriminated result such as `{ ok: true; data: T } | { ok: false; error: ApiError }`, plus separate loading and idle states in the UI. This prevents a component from treating an absent data field as success and makes exhaustive rendering straightforward.

### 26. How do you avoid overusing `any` in a legacy project?

**Answer:** Replace it at boundaries first with `unknown`, add narrow types around the most valuable flows, and enable stricter checks gradually. Use targeted suppressions with an explanation and issue owner, then remove them as modules migrate rather than creating a project-wide blocking rewrite.

### 27. How do you safely parse untrusted JSON?

**Answer:** Parse syntax with `JSON.parse`, then validate the resulting unknown value against a runtime schema or type guard. Reject unexpected shapes, constrain sizes and values, and normalize errors; a TypeScript cast alone does not make JSON safe.

### 28. How do you combine TypeScript with Zod or another schema validator?

**Answer:** Define or generate a runtime schema, infer the TypeScript type from it when practical, and parse at the API boundary. Return structured validation errors to the UI and keep server and client schemas versioned so a client does not assume fields the backend no longer provides.

### 29. What are the tradeoffs of strict mode?

**Answer:** Strict mode catches nullability, implicit `any`, unsafe indexing, and function variance issues earlier, improving long-term reliability. Migration costs include more annotations and legacy cleanup, so teams can stage the rollout while keeping a clear deadline for temporary exceptions.

### 30. How do you type polymorphic components?

**Answer:** Use a generic element type and merge its intrinsic props with component-specific props while omitting conflicting keys, often exposing an `as` or `asChild` prop. Keep the API narrow enough to preserve accessible semantics and test the supported element combinations.

## 3. HTML, CSS, and Browser

### Beginner

### 1. What is semantic HTML?

**Answer:** Semantic HTML uses elements according to meaning, such as `nav`, `main`, `button`, `form`, and headings. It gives browsers and assistive technology a useful structure, reduces custom code, and improves keyboard and SEO behavior.

### 2. Why use `button` instead of a clickable `div`?

**Answer:** A button has keyboard activation, focus behavior, semantics, disabled state, and accessibility support by default. A clickable `div` requires recreating those behaviors and often misses keyboard and screen-reader users.

### 3. What are meta tags?

**Answer:** Meta tags provide document metadata such as character encoding, viewport behavior, description, robots instructions, and social previews. They influence parsing, responsive layout, search presentation, and sharing but do not replace meaningful page content.

### 4. What is the difference between block, inline, and inline-block?

**Answer:** Block elements start a new line and can take available width; inline elements flow within text and generally ignore width and height; inline-block flows inline but accepts box dimensions. Modern layout usually uses flexbox or grid for larger relationships.

### 5. What is the CSS box model?

**Answer:** An element consists of content, padding, border, and margin. `box-sizing: border-box` makes declared width include content, padding, and border, which usually makes responsive sizing easier to reason about.

### 6. What are flexbox and grid used for?

**Answer:** Flexbox lays out items along one primary axis and is useful for toolbars, rows, and alignment; grid handles two-dimensional tracks and is useful for page or card layouts. Choose based on the relationship rather than forcing every layout into one system.

### 7. What is specificity?

**Answer:** Specificity determines which competing selector wins, with inline styles and more specific selectors generally outranking classes and element selectors. Keep selectors shallow, avoid `!important`, and use layers or component scoping to keep ownership clear.

### 8. What is responsive design?

**Answer:** Responsive design adapts layout, content, controls, and media to viewport, input method, and device capability. Use fluid constraints, breakpoints based on content, accessible touch targets, and real-device testing rather than designing only for named phone sizes.

### 9. What is the difference between `em`, `rem`, `%`, `vh`, and `px`?

**Answer:** `rem` is relative to the root font size, `em` to the current element's font size, `%` to a property-specific parent dimension, viewport units to the viewport, and `px` to CSS pixels. Use relative units where user scaling and fluid layout matter, and test zoom.

### 10. What is the difference between `display: none` and `visibility: hidden`?

**Answer:** `display: none` removes the element from layout and the accessibility tree; `visibility: hidden` keeps its layout space but hides it visually and from accessibility APIs. For an interactive element, manage focus and semantics deliberately rather than simply hiding it.

### Intermediate

### 11. How does browser rendering work?

**Answer:** The browser parses HTML and CSS into trees, calculates style and layout, paints pixels, and composites layers. JavaScript can trigger parts of this pipeline, so large DOM changes, layout reads after writes, and heavy paint work can hurt interaction and rendering performance.

### 12. What causes layout shift?

**Answer:** Common causes are images or embeds without dimensions, late fonts, injected content, ads, and layout changes after interaction. Reserve space with dimensions or `aspect-ratio`, use stable fallbacks, and avoid inserting content above what the user is reading.

### 13. What is a stacking context?

**Answer:** A stacking context is an isolated z-ordering context created by conditions such as positioned elements with z-index, opacity, transforms, or containment. A child cannot escape its parent's stacking context simply by using a larger z-index.

### 14. How do you center an element horizontally and vertically?

**Answer:** For a parent layout, `display: grid; place-items: center` or flex alignment is usually clearest. The correct method depends on whether the element needs intrinsic sizing, a fixed position, or alignment among siblings; avoid absolute positioning when normal layout expresses the relationship.

### 15. How do you create accessible forms?

**Answer:** Associate visible labels with controls, group related inputs, use correct input types, expose required and invalid state, provide actionable error text, preserve values, and manage focus after submission. Test keyboard navigation, zoom, screen readers, autofill, and mobile input behavior.

### 16. How do you lazy-load images?

**Answer:** Use responsive sources and `loading="lazy"` for noncritical images, reserve dimensions, and avoid lazy-loading the likely LCP image. An image CDN should select appropriate dimensions and format; verify that lazy loading does not delay content the user immediately needs.

### 17. What is CORS?

**Answer:** Cross-Origin Resource Sharing is a browser-enforced policy that lets a server declare which origins may read its responses. Configure exact origins, methods, headers, and credentials on the server; CORS is not authentication and does not protect a backend from direct requests.

### 18. What are cookies?

**Answer:** Cookies are small key-value data sent with matching requests according to domain, path, expiry, and security attributes. `HttpOnly` reduces JavaScript access, `Secure` requires HTTPS, and `SameSite` controls cross-site sending; cookies still require CSRF and session protections.

### 19. What are service workers?

**Answer:** A service worker is a programmable background script that can intercept requests, cache assets, support offline behavior, and handle some notifications. It needs an update and cache-invalidation strategy, careful scope, and a fallback that does not serve stale or private data incorrectly.

### 20. What is a PWA?

**Answer:** A progressive web app is a web application enhanced with installability, offline or resilient behavior, and platform integration. It should remain useful as a normal website and must handle permissions, storage limits, updates, and connectivity changes transparently.

### Advanced

### 21. What causes layout thrashing?

**Answer:** Layout thrashing occurs when code repeatedly writes styles and immediately reads layout measurements, forcing synchronous recalculation in a loop. Batch reads before writes, use transforms where appropriate, reduce DOM work, and profile long tasks rather than applying arbitrary `will-change`.

### 22. How do you optimize the critical rendering path?

**Answer:** Reduce render-blocking CSS and scripts, send useful HTML quickly, prioritize the LCP resource, optimize fonts and images, and defer noncritical work. Measure TTFB, resource discovery, parsing, paint, and hydration separately so the fix targets the bottleneck.

### 23. How do CSS containment and `will-change` affect performance?

**Answer:** Containment limits how far layout, paint, or size changes propagate, which can reduce work when boundaries are correct. `will-change` hints that a property may change, but excessive use consumes memory and can worsen performance; apply it briefly and based on measurement.

### 24. How do you design a scalable CSS architecture?

**Answer:** Define tokens, component ownership, layout primitives, responsive rules, states, and layering conventions. Keep selectors predictable, avoid global leakage, document accessibility states, and let components expose stable variants rather than allowing arbitrary overrides everywhere.

### 25. How do you prevent style leakage across components?

**Answer:** Use CSS Modules, a well-scoped naming convention, CSS-in-JS, or native Shadow DOM according to the project. Keep global styles limited to reset, tokens, and document-level rules, and test composed states so isolation does not prevent intentional theming.

### 26. What is Shadow DOM?

**Answer:** Shadow DOM encapsulates a component's DOM and styles from the document tree, with explicit slots and events for communication. It is useful for reusable web components, but styling, focus, testing, and framework integration require deliberate boundaries.

### 27. How do browser storage quotas affect frontend apps?

**Answer:** Storage is limited by browser, device, origin, and user policy and can be evicted, especially for nonpersistent data. Handle quota errors, keep caches bounded, store only recoverable data, and never assume offline data will remain forever.

### 28. How do you build offline-first behavior?

**Answer:** Identify which reads and mutations are safe offline, cache an app shell and bounded data, show freshness and connection state, queue only idempotent or conflict-safe work, and reconcile on reconnect. Offline is a state with explicit recovery, not just a service worker checkbox.

### 29. How do you handle print styles for statements or receipts?

**Answer:** Add focused `@media print` rules, hide navigation and controls, preserve headings and table headers, control page breaks, include essential text and contrast without relying on backgrounds, and test actual print and PDF output at supported paper sizes.

### 30. How do you handle responsive financial tables on mobile?

**Answer:** Preserve the semantic table where comparison is important, prioritize or collapse secondary columns, provide controlled horizontal scrolling or a labelled card alternative, and keep critical values visible. Test zoom, keyboard, screen-reader headers, long numbers, and print.

## 4. React

### Beginner

### 1. What is React?

**Answer:** React is a library for building user interfaces from composable components and state-driven rendering. A component describes what the UI should look like for current inputs; React schedules updates and applies the necessary DOM changes.

### 2. What is JSX?

**Answer:** JSX is syntax that lets JavaScript describe UI elements and their relationships. It is transformed into React element creation calls, so expressions use JavaScript rules and values still need safe rendering.

### 3. What is a component?

**Answer:** A component is a reusable unit that receives props, may manage state, and returns a UI description. Good components have a clear responsibility and API rather than hiding unrelated data fetching, formatting, and business rules together.

### 4. What are props?

**Answer:** Props are read-only inputs passed from a parent to a child. They configure a component and establish one-way data flow; the child requests changes through callbacks rather than mutating props.

### 5. What is state?

**Answer:** State is data whose changes can cause a component to render again. Keep state at the lowest owner that needs it, derive values instead of duplicating them, and choose server-state tools for data owned by an API.

### 6. What is the virtual DOM?

**Answer:** It is a simplified in-memory description of the UI that React compares between renders. The important benefit is declarative composition and scheduling, not that the virtual DOM makes every update automatically fast.

### 7. What is one-way data flow?

**Answer:** Data flows from parent to child through props, and events flow upward through callbacks. This makes ownership and updates easier to trace; shared state should have one deliberate owner rather than many competing copies.

### 8. What is conditional rendering?

**Answer:** Conditional rendering chooses different elements or returns based on state or props, using `if`, ternaries, or logical expressions. Be careful that `0` and empty strings are valid values and should not accidentally disappear with `&&`.

### 9. Why do lists need keys?

**Answer:** Keys identify an item across renders so React can preserve the correct component state and update efficiently. Use stable domain ids, not array indexes when items can reorder, be inserted, or removed.

### 10. What is controlled versus uncontrolled input?

**Answer:** A controlled input gets its value from React state and reports changes through an event; an uncontrolled input keeps its value in the DOM and is read through a ref or form submission. Controlled inputs ease validation and coordination, while uncontrolled inputs can reduce rerenders for simple forms.

### 11. What is `useState`?

**Answer:** `useState` stores local component state and returns its current value plus a setter. Use functional updates when the next value depends on the previous one, and never mutate an object or array in place before setting a new reference.

### 12. What is `useEffect`?

**Answer:** `useEffect` synchronizes a component with an external system such as a subscription, timer, browser API, or network request. It is not a general place for derived calculations; return cleanup and keep dependencies aligned with values used by the effect.

### 13. What is prop drilling?

**Answer:** Prop drilling is passing data through intermediate components that do not use it so a deeper component can receive it. Fix it by moving ownership, composing children, using context for truly shared values, or using a state/data library when the problem is broader.

### 14. What is lifting state up?

**Answer:** Lifting state up moves shared state to the nearest common owner and passes values and callbacks to consumers. It creates one source of truth, but lifting everything to the app root can make updates broad and ownership unclear.

### 15. What are fragments?

**Answer:** Fragments group multiple elements without adding an extra DOM node, using `<>...</>` or `Fragment`. They are useful for preserving valid HTML structure and avoiding unnecessary wrappers; keyed fragments are needed when mapping multiple sibling elements.

### Intermediate

### 16. When does a component re-render?

**Answer:** It can re-render when its state changes, its parent renders, a subscribed context value changes, or an external store notifies it. A re-render is not automatically a DOM change; React compares output and commits only necessary updates.

### 17. What is reconciliation?

**Answer:** Reconciliation is React comparing the new element tree with the previous one to determine which components and DOM nodes can be preserved or updated. Element type and stable keys strongly influence whether state is retained.

### 18. Why should keys be stable?

**Answer:** Stable keys let React associate an item with its prior state even when the list changes. Index or random keys can move state to the wrong row, remount inputs, and cause lost focus or unnecessary work.

### 19. What are common `useEffect` mistakes?

**Answer:** Common mistakes include omitting dependencies, using effects for derived state, starting duplicate subscriptions, updating state unconditionally, and ignoring cleanup or request cancellation. Model the external system clearly and test mount, update, unmount, and race behavior.

### 20. When should you not use `useEffect`?

**Answer:** Do not use it for values derivable from props or state, event-specific work that belongs in an event handler, or data transformation that can happen during render. Use it when synchronizing with something outside React.

### 21. What is `useMemo`?

**Answer:** `useMemo` caches a calculated value until dependencies change. It is a performance optimization, not a semantic guarantee, so use it for measured expensive work or stable references that prevent meaningful downstream work.

### 22. What is `useCallback`?

**Answer:** `useCallback` caches a function reference until dependencies change. It helps when a memoized child or dependency-sensitive hook needs stable identity, but adding it everywhere can increase complexity without reducing work.

### 23. What is `useRef`?

**Answer:** `useRef` stores a mutable value that persists across renders without causing a render when it changes. It is useful for DOM nodes, timers, previous values, and imperative handles, but it should not replace state needed for visible UI.

### 24. What is Context API?

**Answer:** Context passes a value through a tree without manually threading props. It is good for stable cross-cutting values such as theme or locale; rapidly changing context can rerender many consumers, so split contexts or use a store when needed.

### 25. What are custom hooks?

**Answer:** A custom hook is a function that composes hooks and encapsulates reusable stateful behavior. It should have a clear input/output contract, own cleanup, and avoid hiding surprising side effects from its callers.

### 26. How do you handle forms in React?

**Answer:** Choose controlled or uncontrolled inputs deliberately, model field and submission state, validate both client and server, preserve values on errors, and expose accessible labels and messages. For complex forms, a form library can reduce rerender and validation boilerplate but does not replace server validation.

### 27. How do you handle errors in React?

**Answer:** Use error boundaries for render or lifecycle failures, handle async errors in the promise or data layer, and provide route or widget-level recovery UI. Log a correlation id and safe context, while preserving enough state for retry without exposing internals.

### 28. What is an error boundary?

**Answer:** An error boundary catches errors during rendering, lifecycle methods, and constructors in its descendant tree and renders fallback UI. It does not catch every event handler or async error, so those paths need their own handling.

### 29. What is Suspense?

**Answer:** Suspense lets a subtree show a fallback while a supported resource is not ready, enabling coordinated loading and streaming patterns. The fallback should have stable dimensions and the design should distinguish loading from empty, error, and unauthorized states.

### 30. What is hydration?

**Answer:** Hydration attaches React behavior to HTML that was rendered on the server. The first client render must match the server output; browser-only values, random data, time, and locale differences can cause mismatches.

### 31. What is lazy loading?

**Answer:** Lazy loading defers a component or asset until it is needed, often with `React.lazy` and a dynamic import. Put a useful Suspense fallback around it and do not defer content required for the first meaningful interaction.

### 32. How do you avoid unnecessary re-renders?

**Answer:** Keep state local, split components by update frequency, use stable keys, avoid broad context updates, and derive rather than duplicate state. Profile first, then apply memoization, selector-based stores, virtualization, or transitions where measurement shows value.

### 33. What are portals?

**Answer:** Portals render children into another DOM node while keeping them in the same React tree. They are useful for modals and overlays, but focus, stacking, event bubbling, and cleanup still need deliberate handling.

### 34. What is Strict Mode?

**Answer:** Strict Mode enables development-only checks, including detecting unsafe patterns and re-running some initialization paths to expose missing cleanup. Code should be correct under the repeated setup and cleanup; do not disable it to hide effect bugs.

### 35. What is the difference between client state and server state?

**Answer:** Client state is owned by the UI, such as an open menu or draft; server state is remote, shared, asynchronous, cacheable, and subject to staleness. A query library is usually better for server state than putting every response into a global client store.

### Advanced

### 36. Explain React's rendering model.

**Answer:** An update schedules a render of affected components, React creates a new element description, reconciles it with the previous tree, and commits the necessary DOM or effect changes. Rendering should stay pure; side effects belong in events, effects, or server actions according to their ownership.

### 37. What is concurrent rendering?

**Answer:** Concurrent rendering lets React start, pause, abandon, and resume rendering work so urgent interactions can remain responsive. Components must be pure because a render may run more than once before commit; concurrency is scheduling, not parallel JavaScript execution.

### 38. What is `useTransition`?

**Answer:** `useTransition` marks an update as nonurgent so urgent input can remain responsive while the transition renders. Use it for navigation or expensive result updates, show pending state, and do not use it to hide a slow mutation that still needs clear feedback.

### 39. What is `useDeferredValue`?

**Answer:** `useDeferredValue` lets a noncritical value lag behind an urgent value, such as keeping a text input responsive while a large result list updates. It does not debounce network requests or reduce the underlying work by itself.

### 40. What is optimistic UI?

**Answer:** Optimistic UI updates the interface before the server confirms a low-risk action, retaining prior state for rollback. It needs an idempotent mutation, clear pending and failure states, and a reconciliation path for conflicts; do not use it to claim an irreversible financial success.

### 41. How do you design reusable components without over-abstraction?

**Answer:** Start from repeated behavior and stable design decisions, define a small composable API, and keep domain-specific policy outside generic primitives. Prefer composition and explicit variants over dozens of boolean props, and test accessibility and states as part of the component contract.

### 42. How do you prevent stale closures?

**Answer:** Understand which render a callback captured, include changing values in dependencies, use functional state updates, or store a deliberately mutable latest value in a ref. Avoid suppressing dependency warnings without documenting a proven invariant.

### 43. How do you handle race conditions in effects?

**Answer:** Cancel obsolete requests, track the active request or query key, ignore late results, and clean up subscriptions. For mutations, use server versions or idempotency because a client-side flag cannot resolve concurrent writes.

### 44. How do you profile React performance?

**Answer:** Reproduce the slow interaction, use the React Profiler to find expensive renders and commit time, then correlate with browser performance, network, and memory panels. Fix the largest measured cause and verify interaction latency and correctness after the change.

### 45. What causes hydration mismatch?

**Answer:** Server and client render different values because of time, randomness, locale, browser-only APIs, invalid nesting, data race, or environment-specific configuration. Make the initial output deterministic, move browser-only behavior to a client effect or boundary, and fix the underlying source instead of suppressing warnings broadly.

### 46. How do you design a component library?

**Answer:** Define tokens, semantic components, accessible behavior, states, composition rules, versioning, documentation, visual tests, and ownership. Keep primitives independent from product data and provide escape hatches carefully so consumers do not fork behavior.

### 47. How do you handle authorization-aware UI without trusting the UI?

**Answer:** The server authenticates and authorizes every read and mutation. The frontend consumes capabilities to hide or disable unavailable actions and handles `401` and `403`, but hidden controls are only usability; direct API calls, URLs, and stale permissions must still be safe.

### 48. How do you manage complex forms?

**Answer:** Model the form as typed data and explicit steps or states, separate field validation from server business rules, preserve drafts, and make submission idempotent. Use a form library when it reduces rerender and registration complexity, but keep accessibility, async errors, conflicts, and session expiry visible.

### 49. How do you structure a large React codebase?

**Answer:** Organize around domains and user workflows, with shared UI, data access, and platform layers that have clear ownership. Keep server state separate from local UI state, establish boundaries for permissions and telemetry, and use route-level loading, error, and test conventions.

### 50. How do you test custom hooks?

**Answer:** Test observable behavior through a small harness or consuming component: initial state, updates, async success and failure, cleanup, dependency changes, and cancellation. Mock external boundaries rather than hook internals, and add an integration test when the hook coordinates routing, storage, or APIs.

## 5. Next.js

### Beginner

### 1. What is Next.js?

**Answer:** Next.js is a React framework that provides routing, server rendering, Server Components, data access patterns, optimization, and deployment conventions. It lets an application choose static, server, client, and streaming behavior per route or component.

### 2. What is file-based routing?

**Answer:** Routes are derived from files and folders in the application directory, so a page's location describes its URL. Dynamic segments, route groups, layouts, loading UI, and error boundaries extend the convention without requiring a central router map.

### 3. What is the App Router?

**Answer:** The App Router is Next.js's folder-based routing model built around layouts, Server Components, streaming, loading and error boundaries, and nested routes. It supports persistent shared UI and lets server and client responsibilities be explicit.

### 4. What is the difference between `page.tsx` and `layout.tsx`?

**Answer:** A page defines the UI for a route and a layout wraps its segment and descendants, often preserving navigation or shared state across page changes. Layouts should remain focused on shared structure and should not accidentally cache or expose user-specific data.

### 5. What are dynamic routes?

**Answer:** Dynamic segments such as `[id]` match variable URL values and expose them as route parameters. Validate and authorize those parameters on the server; a route parameter is not proof that the current user may access the resource.

### 6. What are route groups?

**Answer:** Route groups use parenthesized folders to organize routes without adding that folder name to the URL. They are useful for separate layouts or ownership boundaries while keeping public URLs stable.

### 7. What are Server Components?

**Answer:** Server Components render on the server and can access server-only resources without shipping their implementation to the client. They are useful for data-heavy or noninteractive UI; pass only serializable, safe props to Client Components.

### 8. What are Client Components?

**Answer:** Client Components use browser APIs, state, effects, event handlers, and interactive libraries. Marking a file with `"use client"` creates a client boundary, so keep it as low as possible and do not import server-only secrets or modules into it.

### 9. What does `"use client"` mean?

**Answer:** It declares a module boundary whose exports can be used as Client Components. It does not mean every descendant must be in one file, but its props must be serializable and its dependency graph cannot safely include server-only code.

### 10. What are API routes or route handlers?

**Answer:** Route handlers are server endpoints defined in the app route structure that can receive HTTP requests and return responses. They are useful for BFF logic, webhooks, and controlled upstream calls; validate input, authenticate, authorize, and avoid leaking internal errors.

### Intermediate

### 11. When should you use Server Components versus Client Components?

**Answer:** Use Server Components for secure data access, static or streaming content, and work that does not need browser interaction. Use Client Components for state, event handlers, effects, and browser APIs. Keep the boundary close to the interactive leaf to reduce JavaScript and protect server-only code.

### 12. How do you fetch data in Server Components?

**Answer:** Fetch on the server using an authenticated data-access function, define caching and revalidation explicitly, and return only the data the UI needs. Handle loading, errors, authorization, and cache scope; do not assume a server fetch is automatically safe for user-specific content.

### 13. How do you fetch data in Client Components?

**Answer:** Use a query or data-fetching library for cache, loading, error, cancellation, and refetch behavior, or a focused effect for simple cases. Keep credentials and authorization server-side where possible, and invalidate or reconcile cached data after mutations.

### 14. How does caching work in Next.js?

**Answer:** Caching can occur at the fetch/data layer, rendered route or segment layer, browser, CDN, and application query cache. Treat each layer as a separate decision and never use a shared cache for user-specific data without a correct scope and invalidation policy.

### 15. What is revalidation?

**Answer:** Revalidation refreshes cached data after a time window or explicit invalidation. Choose time-based revalidation for data that can be briefly stale and event or mutation-driven invalidation for changes that must become visible promptly.

### 16. What are Server Actions?

**Answer:** Server Actions are server-side functions that can be invoked from supported React or Next.js flows. They are not automatically secure: validate input, authenticate, authorize, protect against replay or CSRF as appropriate, and return safe structured results.

### 17. What is streaming?

**Answer:** Streaming sends ready portions of the UI while slower portions continue rendering, often coordinated with Suspense. It improves time to useful content, but sensitive data must still be authorized before its HTML is sent and fallbacks need stable layout.

### 18. What is Suspense used for in Next.js?

**Answer:** Suspense creates a boundary around work that may not be ready, enabling loading fallbacks and streamed segments. Design separate boundaries for independent widgets and ensure fallback, error, empty, and unauthorized states do not look identical.

### 19. How do you protect routes?

**Answer:** Check authentication and authorization in the server route, data layer, or mutation boundary before returning private content or performing work. Client redirects improve navigation but cannot be the only protection because users can call URLs and APIs directly.

### 20. What is `proxy.ts` used for in modern Next.js docs?

**Answer:** `proxy.ts` is a request-time boundary for matching and shaping navigation behavior such as redirects or rewrites. It can be a useful early gate, but sensitive authorization must still be repeated at the data and mutation boundary.

### 21. How do redirects work?

**Answer:** Redirects can happen on the server before rendering, in route handlers, through navigation APIs, or in a client effect for client-only conditions. Prefer server redirects for authentication and avoid rendering private content first and redirecting afterward.

### 22. How do you handle metadata?

**Answer:** Define route metadata from trusted, safe values and distinguish static metadata from data-dependent metadata. Use canonical URLs, meaningful titles and descriptions, structured data where appropriate, and avoid putting sensitive user information into public metadata.

### 23. How do you optimize images?

**Answer:** Use responsive image sizing and formats, reserve dimensions, prioritize only the likely LCP image, and lazy-load media below the fold. Confirm CDN configuration, alt text, quality, and layout stability on real devices.

### 24. How do you handle environment variables?

**Answer:** Keep secrets in server-only variables and expose only deliberately public values with the framework's public prefix. Validate required variables at startup or build time without logging their values, and understand whether a variable is embedded at build time or read at runtime.

### 25. How do you deploy a Next.js app?

**Answer:** Build in CI, configure environment variables and caching, run type and test checks, publish artifacts to the target runtime, and monitor errors and performance. A deployment plan includes migrations, feature flags, rollback, headers, and verification of server and client bundles.

### Advanced

### 26. What are the tradeoffs of SSR, SSG, ISR, CSR, and RSC?

**Answer:** SSR provides fresh server HTML per request but costs server work; SSG is fast and cacheable for stable content; ISR refreshes static output over time; CSR shifts rendering and data work to the browser; RSC reduces client JavaScript and keeps server access server-side. Choose per data freshness, personalization, SEO, interactivity, latency, and operational cost.

### 27. How do you avoid leaking secrets into client bundles?

**Answer:** Keep secret-bearing modules server-only, avoid public environment prefixes, pass minimal safe data across the boundary, and inspect bundle and network output in CI or a production build. Never assume minification or hidden source maps make a shipped secret safe.

### 28. How do you prevent hydration mismatch?

**Answer:** Make the server and initial client render deterministic, avoid reading browser-only state during render, stabilize time and locale formatting, and fix invalid HTML or data races. Use a client boundary or effect only for genuinely client-only behavior, not as a blanket suppression.

### 29. How do you design data fetching for a banking dashboard?

**Answer:** Fetch the initial authorized snapshot on the server, parallelize independent account data, stream slow widgets, and keep sensitive responses private. A client query layer can refresh or subscribe to updates, but balance and transfer operations must use server truth, versioning, and clear stale states.

### 30. How do you handle authenticated server rendering?

**Answer:** Read the secure session on the server, resolve the user and permissions, authorize the resource, and render or redirect before private content is sent. Do not pass tokens to the client, and repeat authorization in route handlers and mutations.

### 31. How do you handle caching for user-specific financial data?

**Answer:** Use private or no-store response policy where needed, scope application query keys by authenticated identity, clear state on logout and account switch, and avoid shared CDN or route caches for private HTML. Test two users, back navigation, SSR, and stale sessions.

### 32. How do you invalidate cached data after a mutation?

**Answer:** Return canonical mutation data or a version, then invalidate or update affected query keys and server caches deliberately. Do not clear the entire cache unnecessarily; target the account, list, detail, and derived views that the mutation can change.

### 33. How do you design a secure Server Action?

**Answer:** Validate schema, session, capability, ownership, business limits, CSRF or origin assumptions, and idempotency on the server. Treat all arguments as attacker-controlled, return a safe result, log a correlation id, and never trust a hidden field or client role.

### 34. How do you handle partial page failure?

**Answer:** Use route or widget-level error boundaries and independent data states so safe content remains useful. Show retry and support context, preserve layout, and prevent actions whose required data failed. Observability should identify which segment failed and for which deployment or upstream.

### 35. How do you monitor a Next.js production app?

**Answer:** Collect server errors, client errors, traces, request latency, cache behavior, deployment version, Core Web Vitals, and business outcomes for critical flows. Redact sensitive data, connect client and server events with correlation ids, and alert on user impact rather than noise.

### 36. How do Edge runtime limitations affect design?

**Answer:** Edge environments may have limited Node APIs, different cold-start and connection behavior, and data locality tradeoffs. Keep code compatible with the runtime, choose region-aware data access, and avoid moving sensitive or stateful work to the edge without understanding consistency and compliance.

### 37. How do you handle multi-region latency?

**Answer:** Measure user-to-region and data-store latency, place cacheable public content near users, choose a consistency model for personalized data, and keep mutations close to the authoritative store. The UI should show pending or stale state honestly rather than hiding cross-region delay.

### 38. How do you design a BFF with Next.js?

**Answer:** The BFF shapes backend data for the UI, keeps provider credentials server-side, centralizes auth and error normalization, and reduces browser chattiness. It should not become an unbounded business-logic monolith; define ownership, contracts, caching, timeouts, and observability.

### 39. How do you handle feature flags?

**Answer:** Resolve flags from a trusted service with tenant, user, and rollout scope, define safe defaults and an owner, and test both states. The server still enforces capabilities, while the UI uses flags to control presentation and progressive rollout.

### 40. How do you design audit-friendly UI flows?

**Answer:** Make important actions explicit, show before and after values, require confirmation or step-up when needed, attach a correlation id, and let the server record actor, target, reason, and result. The UI should show pending and failure states without claiming an action was completed before the backend confirms it.

## 6. State Management and Data Fetching

### Beginner

### 1. What is local component state?

**Answer:** It is state owned by one component or small subtree for UI concerns such as open panels, input drafts, or selected tabs. Keep it close to the consumer and lift it only when multiple components truly need the same source of truth.

### 2. What is global state?

**Answer:** Global state is shared across distant parts of an application, such as session metadata, theme, or a workflow that spans routes. Global does not mean every server response belongs there; scope and ownership still matter.

### 3. What is server state?

**Answer:** Server state is remote data with loading, error, cache, freshness, synchronization, and mutation concerns. Query libraries model those concerns better than a manually maintained global object for most API data.

### 4. When is Context enough?

**Answer:** Context is enough for relatively stable, cross-cutting values with a manageable consumer tree, such as locale or theme. For high-frequency updates or complex selectors, split contexts or use a store designed to avoid broad rerenders.

### 5. What problem does Redux solve?

**Answer:** Redux provides a predictable centralized state model with explicit actions, reducers, middleware, and tooling. It is useful for complex client workflows or shared state, but it is not automatically the best cache for remote server data.

### 6. What problem does TanStack Query solve?

**Answer:** TanStack Query manages asynchronous server state: caching, deduplication, stale time, retries, refetching, mutations, and invalidation. It reduces custom request state code while leaving domain authorization and API contracts to the application.

### 7. What is cache invalidation?

**Answer:** Cache invalidation marks stored data as no longer trustworthy after time, identity, or a mutation changes it. The difficult part is defining which keys and derived views are affected; a broad clear is simple but can harm responsiveness.

### 8. What is an optimistic update?

**Answer:** It updates the UI before confirmation and rolls back or reconciles if the server rejects the action. Use it for reversible, low-risk changes with idempotent mutations, not as evidence that a financial or irreversible action succeeded.

### 9. What are loading, success, empty, and error states?

**Answer:** They are explicit user-visible states of a data request. Add stale, refreshing, unauthorized, offline, and retry states where relevant so the UI does not confuse no data with failed data or old data with current truth.

### 10. What is pagination?

**Answer:** Pagination limits the amount of data returned and rendered at once. Offset pagination is simple but can shift under concurrent changes; cursor pagination is more stable for feeds and large histories when the API provides a consistent cursor.

### Intermediate

### 11. How do you decide between Context, Redux, Zustand, and TanStack Query?

**Answer:** Start with ownership: Context for stable cross-cutting values, Redux or Zustand for shared client workflows, and TanStack Query for remote server state. Consider update frequency, team conventions, debugging, persistence, and whether adding a library removes more complexity than it creates.

### 12. How do you model authentication state?

**Answer:** Keep the session authoritative on the server, expose a minimal user and capability snapshot to the UI, and model loading, authenticated, unauthenticated, expired, and re-auth states explicitly. Do not treat a client boolean or token in local storage as proof of authorization.

### 13. Should account balance be stored in Redux?

**Answer:** Usually it belongs in a server-state cache or a domain data layer with freshness and versioning, not a permanent client store. Redux can hold a derived display or workflow snapshot if there is a clear reason, but mutations should revalidate against the server.

### 14. How do you avoid stale server state?

**Answer:** Define stale time, refetch triggers, invalidation after mutations, realtime or polling strategy, and a visible stale indicator for important data. Use query keys that include identity and parameters and clear or replace them on logout and account switch.

### 15. How do you handle retries?

**Answer:** Classify errors, retry safe transient reads with backoff and jitter, respect server hints, and limit attempts. Mutations need idempotency or a status lookup, while the UI shows retrying and final failure without creating duplicate work.

### 16. How do you handle polling?

**Answer:** Poll only while the data is relevant, stop when hidden or complete, back off on errors, and avoid overlapping requests. Use server-provided status or retry hints and switch to realtime events when freshness and scale justify it.

### 17. How do you handle websocket updates?

**Answer:** Define event ids, ordering, cursor reconnect, authorization, cleanup, and reconciliation with cached queries. Batch high-volume updates, handle gaps with a resync, and show last update and stale state when the connection is unavailable.

### 18. How do you handle optimistic updates safely?

**Answer:** Keep the previous value, identify the mutation, update only the affected cache, and roll back or replace with canonical server data. Prevent contradictory mutations from racing and never use optimism to hide an unknown payment or transfer outcome.

### 19. How do you avoid duplicate API calls?

**Answer:** Centralize query keys, deduplicate through a server-state library, cancel obsolete requests, and avoid effects that refetch because of unstable dependencies. Measure network behavior and beware of duplicate calls caused by development Strict Mode versus real production behavior.

### 20. How do you normalize API data?

**Answer:** Normalize when many screens share entities and updates to one entity should reflect everywhere, using stable ids and relationship references. Do not normalize blindly; a query cache with server-shaped data may be simpler for isolated screens.

### Advanced

### 21. How do you design a data layer for savings, cards, loans, and investments?

**Answer:** Define shared identity, authorization, error, money, and freshness contracts, then keep product-specific queries and mutations in domain modules. A common API client handles transport concerns while each domain owns validation, cache keys, state transitions, and observability.

### 22. How do you prevent cache pollution between users?

**Answer:** Scope every private cache key and server cache by authenticated identity and tenant, clear it on logout or switch, and do not share user-specific HTML or responses through a public cache. Test sessions in separate browsers, tabs, SSR, and back navigation.

### 23. How do you model idempotency for payment mutations?

**Answer:** Generate a stable key per user intent, send it with the mutation, and require the server to store the first outcome and reject conflicting payloads for the same key. A retry or timeout then queries the same operation rather than creating another payment.

### 24. How do you coordinate server state with local draft state?

**Answer:** Keep the draft separate from the server snapshot, track version and dirty fields, and reconcile on refetch instead of overwriting unsaved input. Show conflicts and last-saved time, and submit the draft with a version so the server can reject stale writes safely.

### 25. How do you handle conflict resolution?

**Answer:** Detect conflicts with server versions, return the conflicting fields and current record, and offer reload, merge, or overwrite only where business policy allows. Preserve the user's draft and audit meaningful resolutions rather than silently choosing last-write-wins.

### 26. How do you implement offline drafts without risking financial inconsistency?

**Answer:** Save a clearly labelled draft locally or on the server, but do not treat it as a submitted financial action. On reconnect, revalidate identity, permissions, balances, beneficiaries, pricing, and expiry before a fresh confirmation and idempotent mutation.

### 27. How do you handle real-time updates with eventual consistency?

**Answer:** Label data as pending or last updated, use event versions and reconciliation, and let the server response to a mutation override older streams. The UI should explain why a related view may lag and should not show a precise value when the source is stale.

### 28. How do you build a resilient API client with auth refresh and request replay?

**Answer:** Serialize one refresh operation, queue only requests that are safe to replay, reject the queue when refresh fails, and prevent infinite retry loops. Mutations need idempotency, all requests need cancellation and correlation ids, and session state must be cleared on terminal auth failure.

### 29. How do you prevent token refresh stampedes?

**Answer:** Store a shared in-flight refresh promise so concurrent requests await one refresh rather than starting many. Clear it on settle, retry the original request only once, and redirect or re-authenticate when the refresh cannot succeed.

### 30. How do you handle logout while requests are in flight?

**Answer:** Revoke the session, cancel or mark requests as obsolete, clear private caches, and ignore late responses that try to repopulate account state. A request that reaches the server after logout must still be rejected by server authorization.

## 7. Security and Banking

### Core concepts

### 1. What is authentication?

**Answer:** Authentication verifies who a user or service is, using credentials or an identity provider. It is separate from authorization, which decides what that authenticated identity may do.

### 2. What is authorization?

**Answer:** Authorization evaluates whether an authenticated actor may access a resource or perform an action in a specific context. It must be enforced at the server for every sensitive read and mutation, not only represented by frontend visibility.

### 3. What is session management?

**Answer:** Session management creates, stores, refreshes, expires, and revokes the authenticated relationship between client and server. Good design includes idle and absolute timeouts, secure cookie attributes, rotation, revocation, and safe logout.

### 4. What is MFA?

**Answer:** Multi-factor authentication combines independent factors such as knowledge, possession, and inherence. It reduces account takeover risk, but the factors, recovery flow, rate limits, and session binding still need secure server implementation.

### 5. What is step-up authentication?

**Answer:** Step-up authentication asks for stronger or fresher proof before a high-risk action, such as a large transfer or settings change. The server should bind the verification to the user, action, scope, and expiry rather than trusting a client flag.

### 6. What is CSRF?

**Answer:** Cross-site request forgery tricks a browser into sending an authenticated request initiated by another site, especially when cookies are used. Defenses include SameSite cookies, anti-CSRF tokens, origin checks, and safe request design.

### 7. What is XSS?

**Answer:** Cross-site scripting executes attacker-controlled script in a trusted page context. Escape output, avoid unsafe HTML injection, sanitize approved rich text, use CSP and dependency hygiene, and keep secrets out of JavaScript-readable storage.

### 8. What is CSP?

**Answer:** Content Security Policy is a response-header policy restricting where scripts, styles, images, frames, and connections may come from. It reduces XSS impact and clickjacking risk, but must be designed and tested with nonces, hashes, reporting, and application requirements.

### 9. What is CORS?

**Answer:** CORS tells a browser which cross-origin responses a page may read. It is a browser access policy, not an API authentication mechanism; direct clients can still call the endpoint, so authorization and validation remain server-side.

### 10. What is clickjacking?

**Answer:** Clickjacking hides or overlays a trusted page so a user clicks an action they did not intend. Use `Content-Security-Policy: frame-ancestors` and compatible frame protections, plus confirmation and step-up for high-risk operations.

### 11. What is rate limiting?

**Answer:** Rate limiting restricts request volume by identity, IP, resource, or action over time. It protects login, OTP, search, and mutation endpoints from abuse, and the UI should honor retry hints without exposing sensitive account-existence information.

### 12. What is idempotency?

**Answer:** An operation is idempotent when repeating the same request has the same intended result as performing it once. Payment and transfer APIs use a unique key to make retries safe and return the original result instead of creating duplicates.

### 13. What is replay attack prevention?

**Answer:** Replay prevention stops an attacker from reusing a previously valid request or proof. Use expiry, nonce or idempotency keys, server-side state, TLS, signed context, and binding to the intended user, action, and device or session where appropriate.

### 14. What is audit logging?

**Answer:** Audit logging records security- or business-relevant actions with actor, target, timestamp, result, and correlation id. Logs should be protected, tamper-evident where required, retained by policy, and redacted so they do not become a second data leak.

### 15. What is least privilege?

**Answer:** Least privilege grants only the access needed for the task, scope, and time. Apply it to users, services, tokens, fields, downloads, and support tools, and make elevated access deliberate, audited, and revocable.

### Frontend auth and security

### 16. Where should auth tokens be stored in a browser app?

**Answer:** Prefer a server-managed session in an `HttpOnly`, `Secure`, appropriately `SameSite` cookie so JavaScript cannot directly read the credential. If a different token architecture is required, document the XSS and refresh risks and avoid treating browser storage as a secure vault.

### 17. Why are HttpOnly cookies useful?

**Answer:** `HttpOnly` prevents normal JavaScript from reading the cookie, which limits token theft through many XSS payloads. It does not stop the browser from sending the cookie or eliminate CSRF, session fixation, or server authorization problems.

### 18. Why is localStorage risky for sensitive tokens?

**Answer:** Any script running in the origin can read local storage, including an XSS payload or compromised dependency. It also persists across sessions and is easy to misuse; prefer secure cookies or a server-side session for sensitive authentication.

### 19. What does the `Secure` cookie attribute do?

**Answer:** It instructs the browser to send the cookie only over HTTPS, reducing exposure over unencrypted transport. It does not make the value secret from JavaScript unless combined with `HttpOnly`, and it does not replace server session controls.

### 20. What does `SameSite` do?

**Answer:** `SameSite` controls whether a cookie is sent in cross-site contexts, with `Strict`, `Lax`, and `None` offering different compatibility and CSRF tradeoffs. `None` requires `Secure`; choose a policy that matches legitimate integrations and add explicit CSRF defenses.

### 21. Why is CSRF still relevant with cookies?

**Answer:** Cookies are attached automatically by the browser, so a malicious site may cause a state-changing request even though it cannot read the response. Use SameSite plus CSRF tokens or origin validation and make state-changing endpoints reject unexpected requests.

### 22. Why does React escaping help against XSS but not solve all XSS?

**Answer:** React escapes text inserted through normal JSX, but unsafe HTML APIs, URL protocols, third-party scripts, DOM manipulation, rich-text rendering, and vulnerable dependencies can still introduce XSS. Keep untrusted data in safe contexts and apply CSP and sanitization where needed.

### 23. When is `dangerouslySetInnerHTML` dangerous?

**Answer:** It is dangerous when the HTML has not been strictly sanitized for the output context and trusted source. Use a maintained sanitizer with an allowlist, avoid scriptable attributes and URLs, and prefer rendering structured content as normal React elements.

### 24. How do you prevent secrets from being bundled into frontend code?

**Answer:** Keep secret keys in server-only code and environment variables, expose only public configuration intentionally, and call protected providers from a server route or BFF. Inspect production bundles and network responses; minification and private source maps do not protect shipped secrets.

### 25. How do you handle logout securely?

**Answer:** Revoke the server session or refresh tokens, expire the cookie, clear client state and caches, cancel private work, and broadcast logout to other tabs. Protected APIs must reject the old session and back navigation must not restore usable private data.

### 26. How do you expire sessions on inactivity?

**Answer:** Track idle expiry server-side and warn the user before it, with a secure extend or re-authentication action. When expired, stop sensitive mutations, preserve only allowed drafts, clear private state, and redirect; client timers are only a UX aid.

### 27. How do you revoke refresh tokens?

**Answer:** Store refresh-token family state server-side, rotate tokens, detect reuse, and revoke the family or session on logout, compromise, or policy event. The client must handle refresh failure once, clear state, and require authentication rather than looping.

### 28. How do you prevent sensitive data from appearing in logs?

**Answer:** Define redaction at the logging boundary, use allowlisted fields, avoid logging request bodies or tokens, and review analytics, error monitoring, URLs, and browser storage as well as server logs. Correlation ids help debugging without copying personal or financial values.

### 29. How do you handle browser autofill safely?

**Answer:** Use correct semantic autocomplete tokens, avoid fighting password managers, and do not rely on autofill settings for authorization. Sensitive values should be masked, cleared according to policy, and never logged; the server still validates every submitted value.

### 30. How do you avoid exposing full account numbers?

**Answer:** Return and display masked identifiers by default, reveal the minimum only after authorization or step-up, and avoid full values in URLs, analytics, logs, caches, and client persistence. A CSS-hidden full value is still exposed to the browser and should not be sent unnecessarily.

### Banking security scenarios

### 31. How would you design transfer confirmation?

**Answer:** Show a complete review, require the appropriate fresh verification, and send an idempotent mutation. The server rechecks ownership, limits, balance, beneficiary, fees, and authorization, then returns pending or completed status with an audit event.

### 32. How would you prevent duplicate transfer submission?

**Answer:** Disable the button for immediate feedback and use a server-enforced idempotency key per intent. After a timeout, query operation status instead of submitting again, and test double-click, refresh, retries, and multiple tabs.

### 33. How would you protect add-beneficiary flow?

**Answer:** Require step-up verification, validate beneficiary details and ownership server-side, rate-limit OTP, show the exact review, and audit the change. The client hides unavailable actions for usability but the endpoint must remain safe when called directly.

### 34. How would you design session timeout warning?

**Answer:** Warn before expiry, allow secure re-authentication, and handle the race where the server expires the session first. Preserve only an approved draft, re-fetch sensitive values after re-auth, clear caches, and synchronize expiry across tabs.

### 35. How would you handle user opening the same account in two tabs?

**Answer:** Treat each tab as a view of versioned server state, use query invalidation or realtime updates, and label stale balances. Mutations are revalidated and idempotent on the server; unsaved form input is preserved or conflict-reviewed rather than silently overwritten.

### 36. How would you handle logout from all devices?

**Answer:** Revoke the session family or all active sessions server-side, clear the current client, and notify other sessions where possible. Every protected request must also fail after revocation, and the user should see device sessions without token values.

### 37. How would you handle suspicious login from a new location?

**Answer:** Use server-side risk evaluation and require step-up, session review, or a recovery process according to policy. Show a safe explanation and recent-device controls without revealing detection rules or unnecessary precise location.

### 38. How would you show masked account numbers?

**Answer:** Return a server-generated masked representation, label it clearly, and do not reconstruct the full value in the browser. A reveal flow needs explicit authorization, minimum exposure, audit logging, and no persistence.

### 39. How would you design view-full-card-number securely?

**Answer:** Require recent re-authentication, request the minimum value just in time, auto-hide it, and clear component state on close. The backend checks entitlement and audits the reveal; client-side DevTools or copy restrictions are not security boundaries.

### 40. How would you handle copy/paste restrictions for account fields?

**Answer:** Avoid blanket restrictions that harm accessibility and password managers. Validate format and destination, provide safe copy affordances, warn before high-risk actions, and keep final authorization and validation server-side.

### 41. How would you design transaction search without leaking data?

**Answer:** Scope and validate filters on the server, paginate results, use private caching, mask values, and keep full identifiers out of URLs and analytics. Export is a separately authorized, audited operation with short-lived access.

### 42. How would you secure statement download?

**Answer:** Generate it through an authorized server job and return a short-lived scoped download permission. The UI shows processing and expiry, while the server prevents URL reuse, cross-account access, and public caching.

### 43. How would you handle browser back after logout?

**Answer:** Revoke the session, clear caches, use private or no-store policy for sensitive pages, and revalidate every protected request. A browser snapshot may remain visible, but it must not fetch or mutate private data after logout.

### 44. How would you protect against clickjacking?

**Answer:** Set a restrictive `Content-Security-Policy` `frame-ancestors` policy and appropriate frame protections, then verify them in deployment. Client frame-busting is not enough; sensitive actions also need authorization and deliberate confirmation.

### 45. How would you design audit logs for customer-service actions?

**Answer:** Record actor, customer scope, action, reason, target, timestamp, result, and correlation id on the server, redacting secrets. Expose a permissioned review view and include denied and failed attempts as well as successful ones.

### 46. How would you handle API returning `403` versus `401`?

**Answer:** Handle `401` as missing or invalid authentication by clearing or re-authenticating, and `403` as an authenticated but disallowed action with a safe permission message. Do not loop to login for `403` or reveal protected resource details.

### 47. How would you handle session expiry during payment?

**Answer:** Stop the mutation, re-authenticate, reload current payment status, and only offer a new submission after confirming whether the original was accepted. Never charge again based solely on a timeout or an expired client screen.

### 48. How would you design OTP resend with rate limits?

**Answer:** Enforce attempt, resend, destination, and expiry limits server-side and return a retry-after value. The UI shows a countdown, masks the destination, and handles expired or blocked codes without revealing whether an account exists.

### 49. How would you protect high-risk settings changes?

**Answer:** Show before and after values, require step-up, apply server policy and cooldown, notify the user, and audit the result. The UI distinguishes pending verification from applied change and supports safe recovery.

### 50. How would you explain why DevTools blocking is not true security?

**Answer:** The user controls the browser and can disable JavaScript, modify the page, use another browser, inspect requests, or call APIs directly. Blocking shortcuts is only friction; real security is server authorization, secure sessions, step-up authentication, CSRF/XSS defense, least privilege, and audit logging.

## 8. Performance

### Beginner

### 1. What is web performance?

**Answer:** Web performance is how quickly and reliably a page loads, becomes usable, responds to input, and remains stable. Evaluate both lab measurements and real-user data across network, device, browser, and application conditions.

### 2. What is lazy loading?

**Answer:** Lazy loading defers resources or components until they are near or needed by the user. It reduces initial work but should not delay critical content or create a poor experience when the user immediately needs the deferred feature.

### 3. What is code splitting?

**Answer:** Code splitting divides JavaScript into chunks that can load on demand, often by route or feature. It reduces initial bundle cost but adds request and loading coordination, so boundaries should match actual user journeys.

### 4. What is image optimization?

**Answer:** Image optimization selects appropriate dimensions, formats, quality, priority, and loading behavior for the device and context. Always reserve dimensions and prioritize the actual LCP image while lazy-loading images below the fold.

### 5. What is caching?

**Answer:** Caching stores reusable data or assets closer to where they are consumed. Define freshness, invalidation, identity scope, and failure behavior; a fast cache that serves the wrong user's data is a severe bug.

### 6. What is a bundle?

**Answer:** A bundle is a group of application modules packaged for delivery to the browser or runtime. Bundle size affects transfer, parse, compile, and execution cost, not only download time.

### 7. What is minification?

**Answer:** Minification removes unnecessary whitespace and shortens safe identifiers to reduce source size. It does not replace compression, code splitting, tree shaking, or runtime performance work.

### 8. What is compression?

**Answer:** Compression encodes content more compactly for transfer, commonly using Brotli or gzip. It reduces network cost, while the server should set correct content types and cache headers and avoid compressing data that is already compressed.

### 9. What are Core Web Vitals?

**Answer:** Core Web Vitals measure user experience around loading, interaction, and visual stability, commonly LCP, INP, and CLS. Track field distributions and segment them by page, device, and release rather than optimizing only a single lab score.

### 10. What is Lighthouse?

**Answer:** Lighthouse is a lab auditing tool that reports performance, accessibility, SEO, and best-practice signals. It is useful for repeatable diagnosis but does not represent every real user, so pair it with field monitoring.

### Intermediate

### 11. What is LCP?

**Answer:** Largest Contentful Paint measures when the largest relevant content element becomes visible in the viewport. Improve the actual element by reducing TTFB, prioritizing its resource, optimizing image or font delivery, and reducing render-blocking work.

### 12. What is INP?

**Answer:** Interaction to Next Paint reflects how quickly the page responds visually across user interactions. Improve it by shortening event handlers, reducing synchronous rendering, splitting work, virtualizing large updates, and isolating third-party scripts.

### 13. What is CLS?

**Answer:** Cumulative Layout Shift measures unexpected movement of visible content. Reserve dimensions for images and embeds, stabilize fonts and injected content, and avoid inserting UI above content the user is reading.

### 14. How do you reduce JavaScript bundle size?

**Answer:** Analyze the bundle, remove unused dependencies, use tree-shakeable imports, split by route or feature, lazy-load heavy libraries, and avoid shipping server-only work to the client. Verify the size and execution budget in CI.

### 15. How do you optimize React rendering?

**Answer:** Profile first, then reduce state scope, split components by update frequency, stabilize keys, avoid broad context changes, virtualize long lists, and use memoization or transitions only where measured. Keep render functions pure and move expensive work out of the main path.

### 16. How do you avoid unnecessary hydration?

**Answer:** Keep static and data-heavy UI in Server Components or server-rendered HTML, move only interactive leaves to the client, and lazy-load noncritical widgets. Hydration is useful for behavior, but shipping a client boundary for static content adds work.

### 17. How do you optimize fonts?

**Answer:** Load only required subsets and weights, use a compatible fallback, avoid blocking all content on a font, and reserve or adjust metrics to reduce layout shift. Measure the LCP element and real-user font behavior rather than preloading every font.

### 18. How do you virtualize long lists?

**Answer:** Render only the visible window plus a small overscan, maintain stable item keys and scroll behavior, and account for row height and accessibility. Virtualization is not a replacement for server pagination when the browser does not need every item.

### 19. How do you optimize charts and dashboards?

**Answer:** Fetch appropriate time resolution, downsample data, batch updates, lazy-load chart libraries, isolate widget failures, and move transforms off the main thread when needed. Provide a text or table alternative and measure zoom, resize, memory, and interaction latency.

### Advanced

### 20. How do you set a performance budget?

**Answer:** Define budgets for JavaScript, images, critical requests, LCP, INP, CLS, and key flow timings based on real product goals. Enforce them in CI and deployment dashboards, allow documented exceptions, and review budgets as features and target devices change.

### 21. How do you monitor real-user performance?

**Answer:** Collect field metrics with route, device, connection, release, and relevant feature context while minimizing personal data. Track distributions and user impact, correlate regressions to deployments, and combine metrics with traces and error events for diagnosis.

### 22. How do you balance security scripts with performance?

**Answer:** Keep security headers and controls server-side when possible, load third-party security or analytics code only when justified, isolate and monitor it, and measure its impact. Never remove a necessary control solely to improve a synthetic score; find a safer implementation boundary.

### 23. How do you optimize an authenticated dashboard where CDN caching is limited?

**Answer:** Optimize server TTFB and parallel data access, cache safe shared metadata, stream independent widgets, reduce client JavaScript, and use per-user query caching with explicit freshness. Keep private responses out of shared caches and show stale or pending data honestly.

### 24. How do you stream slow data without blocking the whole page?

**Answer:** Split the page into independent Suspense or widget boundaries, render the useful shell and fast data first, and stream slower authorized content when ready. Each boundary needs its own loading, error, empty, and retry states with stable layout.

### 25. How do you design skeleton loading without layout shift?

**Answer:** Match the skeleton's dimensions and typography to the eventual content, reserve image and chart space, and avoid skeletons that imply a result shape the server may not return. Use them for meaningful waits, not for instant operations.

### 26. How do you diagnose memory leaks?

**Answer:** Reproduce repeated navigation or interaction, compare heap snapshots, inspect retained DOM and listener references, and use allocation timelines. Look for subscriptions, timers, caches, closures, and worker or chart instances that are not cleaned up.

### 27. How do you handle expensive calculations in React?

**Answer:** Measure the calculation and its frequency, derive it outside render or cache it when inputs are stable, move large work to a worker, or use a transition for nonurgent results. Avoid memoizing cheap work or hiding a data-model problem.

### 28. How do you reduce main-thread blocking?

**Answer:** Split JavaScript, defer noncritical work, break long tasks into chunks, reduce DOM and serialization cost, isolate third-party scripts, and use workers for CPU-heavy transforms. Verify improvement with the Performance panel and INP rather than only bundle size.

### 29. How do you measure performance regressions in CI?

**Answer:** Use a controlled production build with repeatable routes and data, collect bundle and lab metrics, compare against budgets with tolerances, and investigate meaningful regressions rather than noisy single runs. Pair CI with field monitoring because lab and real-user conditions differ.

### Scenario checks

### 30. A dashboard loads in 8 seconds. What do you check first?

**Answer:** Measure TTFB, network waterfalls, server traces, JavaScript parse and hydration, images, fonts, third-party scripts, and the slowest widget. Fix the largest measured bottleneck first, such as parallel fetches, streaming, safe caching, code splitting, or reducing client rendering.

### 31. LCP is poor on mobile. What are likely causes?

**Answer:** Likely causes include slow TTFB, a late or oversized LCP image, render-blocking CSS or fonts, excessive JavaScript, and server waterfalls. Inspect the actual LCP element and verify the fix with field data on low-end devices.

### 32. INP is poor when typing into search. What do you optimize?

**Answer:** Profile the input event, debounce requests, defer expensive filtering, reduce broad state updates, virtualize results, and move large transforms off the main thread. Fix the measured handler or render work rather than adding memoization blindly.

### 33. A chart freezes the page. What approaches can help?

**Answer:** Downsample the visible data, batch updates, use an efficient renderer, move transformation to a worker, and limit the time range. Keep input and navigation responsive and provide an accessible table or summary alternative.

### 34. A bundle grew after adding a date library. How do you investigate?

**Answer:** Use a bundle analyzer, inspect imports and locale data, compare a smaller or native option, and lazy-load the library if it is not critical. Add a bundle budget so the regression is caught in CI.

## 9. Testing

### Beginner

### 1. What is unit testing?

**Answer:** Unit testing checks a small function or component in isolation with focused inputs and outputs. It is fast and precise, but it cannot prove that routing, APIs, permissions, and browser behavior work together.

### 2. What is integration testing?

**Answer:** Integration testing verifies multiple units working together, such as a form, validation, query layer, and response handling. It catches contract and wiring problems while remaining more focused and faster than a full browser journey.

### 3. What is end-to-end testing?

**Answer:** End-to-end testing exercises a real user journey through the browser, application, and controlled backend or environment. Keep the suite focused on critical paths because it is slower and more sensitive to environment conditions.

### 4. What is a test assertion?

**Answer:** An assertion states the behavior the test expects, such as visible text, navigation, API call, or disabled state. Good assertions describe user-observable contracts rather than implementation details like a private state variable.

### 5. What is mocking?

**Answer:** Mocking replaces an external dependency with controlled behavior so a test can isolate a unit or reproduce a failure. Mocks should match real contracts and be complemented by integration tests so they do not hide wiring or schema errors.

### 6. What is test coverage?

**Answer:** Coverage reports which code or branches tests execute, but high coverage does not guarantee meaningful assertions or correct user behavior. Use it to find blind spots, not as the sole quality target.

### 7. What is regression testing?

**Answer:** Regression testing verifies that existing behavior remains correct after a change. Add a focused test for the bug, preserve critical journey coverage, and remove duplication so the suite remains maintainable.

### 8. Why test user behavior instead of implementation details?

**Answer:** User-facing tests survive refactoring and verify the actual contract, such as what a user can see, click, type, and recover from. Implementation tests are useful for pure algorithms but become brittle when they assert component internals.

### 9. What is React Testing Library?

**Answer:** React Testing Library encourages tests through accessible roles, labels, text, and user interactions rather than component internals. It helps verify behavior, but it does not replace browser, API, visual, or accessibility testing.

### 10. What is Playwright?

**Answer:** Playwright is a browser automation and end-to-end testing tool with reliable locators, multiple browser engines, network control, traces, screenshots, and parallel execution. Use it for critical user journeys and controlled integration behavior.

### Intermediate

### 11. How do you test a React form?

**Answer:** Render the form, locate controls by label or role, type realistic values, submit, and assert validation, loading, success, error, focus, and accessible announcements. Mock or control the API boundary and include keyboard and server-error paths.

### 12. How do you test async loading states?

**Answer:** Start with a controlled pending response, assert the loading indicator or disabled action, resolve it, and assert success or empty state. Also test rejection, cancellation, timeout, stale data, and unmount cleanup.

### 13. How do you test error states?

**Answer:** Make the boundary return representative transport, business, authorization, and validation failures, then assert safe messaging and recovery actions. Ensure errors do not leak stack traces or sensitive response data and that retry behavior does not duplicate mutations.

### 14. How do you test custom hooks?

**Answer:** Test the hook through a harness or consuming component and assert observable state, side effects, cleanup, dependency changes, cancellation, and error behavior. Avoid testing hook implementation details that do not matter to consumers.

### 15. How do you mock API calls?

**Answer:** Prefer a request-level mock server for integration so method, URL, body, status, and response shape are exercised. Direct function mocks are useful for small unit tests, but both should cover errors, unauthorized responses, latency, and malformed data.

### 16. What should not be mocked?

**Answer:** Do not mock the behavior you are trying to verify, such as the form library, router contract, or data serializer. Avoid mocking every dependency in an end-to-end journey; use controlled external boundaries and let application wiring run.

### 17. How do you test route protection?

**Answer:** Test unauthenticated navigation, expired session, insufficient permission, authorized content, direct URL access without JavaScript, and API denial. Confirm that private data is not rendered before redirect and that the UI recovers when permissions change.

### 18. How do you test accessibility basics?

**Answer:** Use semantic locators and automated checks as a baseline, then test keyboard navigation, focus, labels, error announcements, contrast, zoom, and screen-reader behavior for critical journeys. Automated tools cannot catch every interaction or language problem.

### 19. How do you test keyboard navigation?

**Answer:** Navigate with Tab, Shift+Tab, Enter, Space, Escape, and relevant arrow keys, asserting visible focus and state changes. Check focus trapping and restoration for dialogs and that every pointer action has a usable keyboard path.

### 20. How do you test logout behavior?

**Answer:** Assert server session revocation, redirect, cache and state clearing, unauthorized API handling, in-flight request cleanup, back navigation, and cross-tab broadcast. Use two contexts or controlled browser sessions where multi-user behavior matters.

### Advanced

### 21. How do you design a test pyramid for a banking frontend?

**Answer:** Put most coverage in fast unit and component tests for formatting, validation, state transitions, and permissions; add integration tests for API contracts and flows; keep a small browser suite for login, transfer, timeout, logout, and statement download. Security and accessibility checks run at appropriate layers.

### 22. What end-to-end flows are critical in banking?

**Answer:** Login and MFA, account visibility, transaction search, transfer confirmation, duplicate prevention, session expiry, logout, beneficiary changes, statement download, and access denial. Include failure, pending, retry, mobile, keyboard, and multiple-tab variants where the risk justifies it.

### 23. How do you test duplicate payment prevention?

**Answer:** Hold the request pending, submit with mouse and keyboard twice, assert one idempotency key or one server mutation, then resolve success, timeout, and failure. Pair the UI test with a backend contract test because a disabled button alone does not guarantee uniqueness.

### 24. How do you test session expiry?

**Answer:** Use a controlled clock or server response to expire the session during viewing and during a sensitive form, assert warning and re-auth flow, clear state after rejection, and verify a stale request cannot succeed. Include another tab and refresh.

### 25. How do you test CSRF behavior?

**Answer:** Verify state-changing requests require the expected token or origin policy, reject missing and invalid values, and keep safe reads functional. Test cookie settings and same-site or cross-site behavior in an environment that reflects deployment.

### 26. How do you avoid flaky end-to-end tests?

**Answer:** Use deterministic data and clocks, wait for observable conditions instead of sleeps, isolate tests, control third parties, capture traces, and remove order dependencies. Retries are diagnostic, not a substitute for fixing races.

### 27. How do you use test data safely?

**Answer:** Use synthetic or sanitized fixtures, isolate accounts and tenants, avoid real tokens and personal information, reset state predictably, and restrict logs and artifacts. Test data should represent edge cases without creating a privacy or financial risk.

### 28. How do you test audit-sensitive actions?

**Answer:** Assert the action result and the server-generated audit event fields, actor scope, outcome, correlation id, and redaction. Test denied and failed actions as well as successful ones, and avoid asserting unstable internal timestamps too precisely.

### 29. How do you test cross-tab logout?

**Answer:** Use two browser contexts or tabs, authenticate both, trigger logout in one, wait for the broadcast or expiry, and assert the second clears private data and redirects. Also test a missed event and a request already in flight.

### 30. How do you test feature flags?

**Answer:** Test enabled, disabled, missing, stale, and failed flag configuration with the same permissions and data. Critical server capabilities need API tests independent of the UI flag, and the suite should prevent an old flag branch from silently becoming untested.

## 10. Accessibility

### Beginner

### 1. What is accessibility?

**Answer:** Accessibility means people with different abilities can perceive, operate, understand, and use the product. Build it into semantics, keyboard flow, focus, content, visual design, media, and testing rather than adding it after the UI is complete.

### 2. What is semantic HTML?

**Answer:** Semantic elements communicate structure and purpose to browsers and assistive technology. Using the correct native control usually gives better keyboard and accessibility behavior than recreating it with generic elements and ARIA.

### 3. What is alt text?

**Answer:** Alt text communicates the purpose or meaningful information of an image; decorative images should have empty alt text. It should be concise and contextual, not a filename or an unnecessary description of every visual detail.

### 4. What are ARIA attributes?

**Answer:** ARIA adds roles, names, states, and relationships when native HTML cannot express the interaction. It does not add keyboard behavior automatically, so prefer native elements and implement every required interaction when ARIA is necessary.

### 5. What is keyboard navigation?

**Answer:** It lets users operate controls and move through content without a mouse using standard keys and visible focus. The order should match the visual and task order, and custom widgets need a documented keyboard model.

### 6. What is focus management?

**Answer:** Focus management places keyboard and assistive-technology users at the correct point after navigation, dialog open, validation, or dynamic content changes. Do not move focus unexpectedly; announce changes and restore focus to a sensible trigger.

### 7. What is color contrast?

**Answer:** Contrast is the difference between foreground and background that makes text and controls perceivable. Meet the applicable WCAG level, but also support non-color cues, focus visibility, disabled state clarity, and user settings such as forced colors.

### 8. What is a screen reader?

**Answer:** A screen reader converts semantic structure, names, states, and live announcements into speech or braille output. Testing needs correct headings, labels, landmarks, focus order, and meaningful status messages rather than only visual appearance.

### 9. Why should forms have labels?

**Answer:** Labels tell users and assistive technology what a control means and enlarge its click target. Associate them programmatically, keep them visible when possible, and connect help and error text with the field.

### 10. What is skip navigation?

**Answer:** A skip link lets keyboard users bypass repeated navigation and reach the main content quickly. It should become visible on focus, target a meaningful landmark, and work consistently across route transitions.

### Intermediate

### 11. When should you use ARIA?

**Answer:** Use ARIA only when native HTML cannot express the intended role, state, or relationship. Follow an established pattern, implement keyboard behavior, test the accessibility tree, and avoid overriding correct native semantics.

### 12. How do you build an accessible modal?

**Answer:** Give it an accessible name, move focus inside, keep focus within it, mark the background unavailable, support Escape when appropriate, and restore focus to the trigger. Handle errors, scroll, mobile, nested dialogs, and screen-reader announcements.

### 13. How do you build accessible tabs?

**Answer:** Use the tablist, tab, and tabpanel pattern only when the interaction is truly tabbed, with selected state, ownership, keyboard arrow behavior, focus rules, and panel association. For simple navigation, normal links are often more accessible and predictable.

### 14. How do you announce form errors?

**Answer:** Associate specific text with each field, expose invalid state, provide an error summary for multi-field forms, and move focus appropriately after submit. The message should explain how to fix the value and must not rely only on color or an icon.

### 15. How do you handle loading states for screen readers?

**Answer:** Use an appropriate live status for meaningful changes, avoid repeatedly announcing every small update, and ensure the final content or error is reachable. Keep loading separate from empty, stale, and unauthorized state so the announcement is accurate.

### 16. How do you make charts accessible?

**Answer:** Provide a textual summary, labelled axes and units, a data table or download alternative, keyboard-accessible controls, and meaningful focus or tooltip behavior. Do not encode the only distinction through color or hover.

### 17. How do you test with keyboard only?

**Answer:** Use Tab and Shift+Tab through every interactive path, Enter and Space for actions, Escape for dismissals, and arrow keys where a widget requires them. Check visible focus, order, focus trap, focus restoration, and that no action is pointer-only.

### 18. How do you manage focus after navigation?

**Answer:** Move focus to the new page heading or main landmark when a client-side route changes, preserve focus for in-place updates, and avoid stealing it for minor notifications. Announce the new context and test back, forward, errors, and slow loads.

### 19. How do you avoid relying only on color?

**Answer:** Pair color with text, icons, patterns, shape, or position and ensure status and focus remain visible in high contrast or forced-color modes. Verify that links, errors, selection, and disabled states are distinguishable without color perception.

### 20. How do you handle accessible tables?

**Answer:** Use real table markup with captions, headers, and correct row or column associations; provide a clear mobile alternative when needed. Virtualized or interactive tables need an accessible reading model, keyboard behavior, and a way to understand sorting and selection.

### Advanced

### 21. How do you make transaction tables accessible at scale?

**Answer:** Keep semantic headers and row context, label sortable controls, preserve focus and selection during pagination or virtualization, and expose a text or detail view for complex rows. Test long values, zoom, keyboard, screen reader announcements, loading, and live updates.

### 22. How do you make OTP input accessible?

**Answer:** Prefer one labelled input with an appropriate autocomplete token or make multiple fields behave as one with clear labels and keyboard support. Support paste and password managers, announce errors, handle expiry, and never rely on visual boxes alone.

### 23. How do you handle session timeout warnings accessibly?

**Answer:** Use a labelled dialog or appropriate live region, announce remaining time without noise, move focus when urgent, and provide extend and sign-out actions. Handle expiry while the dialog is open and make the message understandable without color or visual countdown alone.

### 24. How do you design error summaries for complex forms?

**Answer:** Put a concise summary at the top with links to fields, associate inline messages, focus the summary after submit when appropriate, and preserve entered values. Ensure each link works with keyboard and screen reader and that server errors map to stable field identifiers.

### 25. How do you support zoom up to 200%?

**Answer:** Use responsive reflow, flexible text and containers, sufficient line height, no fixed-height clipping, and controls that remain reachable at high zoom. Test at 200% and narrow widths together, including tables, dialogs, sticky regions, and error messages.

### 26. How do you test accessibility in CI?

**Answer:** Run automated accessibility checks on key pages, enforce semantic locator tests, and add keyboard and visual regression coverage for critical workflows. CI is a baseline; manual screen-reader and representative user testing remains necessary for complex interactions.

### 27. How do you handle accessible masked values?

**Answer:** Give the masked value a meaningful accessible name and clearly label what is hidden, with an authorized reveal action that announces state changes. Do not place the full value in hidden text or attributes, because assistive technology and the browser can still expose it.

### 28. How do you handle language and locale in financial UI?

**Answer:** Localize labels, dates, numbers, currency, direction, and error text while preserving canonical values and timezone rules. Test text expansion, RTL, screen-reader pronunciation, decimal separators, and ambiguous date formats.

### 29. How do you avoid accessibility regressions in a design system?

**Answer:** Make semantic structure and keyboard behavior part of component contracts, test states and variants, run automated checks and visual regression, and document usage constraints. Treat a design-system change as a compatibility change for every consumer.

### 30. How do you balance security restrictions with accessibility?

**Answer:** Do not disable keyboard, copy, zoom, or assistive technology as a pretend security control. Enforce authorization and data minimization on the server, then make the remaining authorized UI operable and understandable for all users.

## 11. API, Backend, and Architecture

### Beginner

### 1. What is REST?

**Answer:** REST is a style of designing network resources and operations around standard HTTP semantics. Good REST APIs use clear resource paths, methods, status codes, representations, caching rules, and authorization rather than treating every action as an opaque endpoint.

### 2. What is HTTP?

**Answer:** HTTP is the request-response protocol used by browsers and services, with methods, headers, status codes, bodies, caching, and connection behavior. Understanding it helps frontend engineers reason about auth, retries, errors, CORS, and performance.

### 3. What are common HTTP methods?

**Answer:** `GET` reads, `POST` creates or triggers a non-idempotent operation, `PUT` replaces, `PATCH` partially updates, and `DELETE` removes or requests removal. The server must still define semantics, validation, authorization, and idempotency explicitly.

### 4. What are common HTTP status codes?

**Answer:** `2xx` indicates success or acceptance, `3xx` redirects or cache behavior, `4xx` client or authorization problems, and `5xx` server or upstream failures. Use specific codes such as `401`, `403`, `404`, `409`, `422`, and `429` when they clarify recovery.

### 5. What is JSON?

**Answer:** JSON is a text format for objects, arrays, strings, numbers, booleans, and null. It has no dates, binary, functions, or type metadata, so APIs need documented schemas and runtime validation for untrusted JSON.

### 6. What is GraphQL?

**Answer:** GraphQL lets a client request a typed graph shape through a schema and resolver system. It can reduce overfetching but adds query complexity, caching and authorization considerations, and does not remove the need for backend validation or performance limits.

### 7. What is pagination?

**Answer:** Pagination bounds response and rendering size. Offset is simple for stable datasets; cursor pagination is more consistent under inserts and deletes for feeds and histories. The UI should preserve query state and handle end, empty, and stale results.

### 8. What is an authentication header?

**Answer:** An authentication header carries a credential or proof, commonly a bearer token or signed value. Treat it as sensitive, send it only over HTTPS to intended origins, and validate it on the server; a header itself is not authorization.

### 9. What is a cookie?

**Answer:** A cookie is browser-managed data sent with matching requests according to scope and attributes. Secure authentication cookies can reduce JavaScript token exposure, but require session, CSRF, expiration, and server authorization controls.

### 10. What is an API contract?

**Answer:** It defines request and response shapes, status codes, errors, auth, idempotency, versioning, and behavior. Shared or generated types help, but runtime validation and contract tests are needed to catch drift.

### Intermediate

### 11. What is idempotency?

**Answer:** Idempotency makes repeating a request safe by ensuring the same intended operation is not applied twice. Use a client-generated key and server storage for payment or transfer mutations, then return the canonical original result.

### 12. Why should payment APIs use idempotency keys?

**Answer:** A network timeout does not reveal whether a payment completed, so users and clients may retry. An idempotency key lets the server replay the original result and prevents duplicate charges while keeping retry behavior reliable.

### 13. What is optimistic concurrency?

**Answer:** Optimistic concurrency lets clients edit a version and rejects a write if the server version has changed. The UI then offers reload, merge, or an explicit overwrite according to business policy.

### 14. What is eventual consistency?

**Answer:** Eventual consistency means related reads may temporarily disagree before updates propagate. The UI should show pending or last-updated state, reconcile by version, and avoid promising a final value before the authoritative source confirms it.

### 15. What is API versioning?

**Answer:** Versioning manages incompatible contract changes through URL, header, schema, or compatibility policy. Prefer additive changes when possible, define deprecation timelines, and coordinate frontend and backend rollout so old clients remain safe.

### 16. What is rate limiting?

**Answer:** Rate limiting caps request volume to protect capacity and abuse-sensitive actions. Return a safe status and retry hint, and make the UI back off rather than repeatedly retrying or revealing sensitive account-existence information.

### 17. What is request cancellation?

**Answer:** Cancellation stops work the user no longer needs, reducing waste and preventing stale updates. Use abort signals or protocol-specific cancellation and distinguish cancellation from a user-visible failure.

### 18. How do you handle partial failure?

**Answer:** Return structured per-resource or per-widget status and let the UI show safe partial content with clear stale or unavailable labels. Do not allow actions that depend on failed data and provide targeted retry and observability.

### 19. How do you handle long-running operations?

**Answer:** Submit a job, return a stable id, expose status and progress, and allow polling, events, or a return-later page. Downloads and mutations need authorization, expiry, idempotency, and clear queued, running, complete, and failed states.

### 20. How do you design error response formats?

**Answer:** Use a stable machine-readable code, safe human message, correlation id, field errors where relevant, retry guidance, and optional details that do not leak internals. Keep transport errors separate from business errors and version the contract.

### Advanced

### 21. How would you design frontend integration for payments?

**Answer:** Use a server-owned payment intent or order, secure provider integration, idempotency, status reconciliation, and step-up authorization. The frontend owns review and state presentation, never card or payment truth, and handles pending, decline, timeout, recovery, and duplicate prevention.

### 22. How would you design transaction search over large data?

**Answer:** Use validated server-side filters, cursor pagination, indexes appropriate to the query, private cache scope, and a detail endpoint for full data. The UI stores query state in the URL, virtualizes or pages results, and treats export as a separate authorized job.

### 23. How would you design real-time fraud alerts?

**Answer:** The backend detects, authorizes, deduplicates, and orders events; the client subscribes with cursor reconnect and a polling fallback. The UI groups alerts, shows severity and confidence, supports acknowledgement and escalation, and logs analyst actions without exposing sensitive evidence.

### 24. How would you design account aggregation?

**Answer:** Use provider adapters, scoped consent, encrypted server-side credentials or tokens, background sync jobs, and clear stale or disconnected states. The frontend shows source, last updated, errors, and reconnect actions while protecting account data and never exposing provider secrets.

### 25. How would you design audit logs?

**Answer:** Record actor, resource, action, timestamp, result, reason, correlation id, and safe before/after summary on the server. Make the log append-only or tamper-evident as required, permission it separately, redact secrets, and provide search and retention policy.

### 26. How do you handle retries safely for mutations?

**Answer:** Classify the operation, use idempotency or a status query, cap retries with backoff and jitter, and surface unknown outcomes instead of guessing. The frontend should preserve input and let the user choose when automatic replay is not safe.

### 27. How do you handle multi-region data delays in UI?

**Answer:** Show last updated and pending states, include region or version metadata where useful, and define which operations require strong consistency. Route reads and writes according to the authoritative store and reconcile stale responses rather than hiding the delay.

### 28. How would you design a BFF for banking frontend?

**Answer:** The BFF keeps credentials server-side, composes and shapes backend data, enforces auth context, normalizes errors, and limits browser round trips. Give it clear ownership, timeout and caching rules, observability, and no unbounded duplication of domain logic.

### 29. How do you model permission checks across UI and API?

**Answer:** Define capability and resource-scope rules centrally on the server, return a minimal permission snapshot for UI guidance, and enforce every endpoint independently. Test hidden and visible actions, direct requests, exports, stale permissions, and cross-tenant access.

### 30. How do you handle backward compatibility during API migration?

**Answer:** Prefer additive fields, support old and new clients during a measured window, version incompatible behavior, and use contract tests and telemetry to track adoption. Remove old behavior only after owners and rollback paths are clear.

## 12. Coding Round Answer Patterns

These are concise implementation explanations. In a coding round, state the input assumptions, complexity, edge cases, and tests before writing code.

### JavaScript utilities

### 1. Implement debounce.

**Answer:** Return a wrapper that clears the previous timer, stores the latest arguments and receiver, and schedules the function after the wait period. Expose `cancel`, and test rapid calls, trailing behavior, context, arguments, and cleanup.

### 2. Implement throttle.

**Answer:** Track the last execution time and optionally one trailing timer; ignore or schedule calls until the interval has elapsed. Define leading and trailing behavior explicitly and test calls at the boundary and cancellation.

### 3. Implement deep clone.

**Answer:** Prefer `structuredClone` for supported data. If implementing manually, use a `WeakMap` for cycles and handle arrays, plain objects, dates, maps, sets, and property semantics deliberately; explain unsupported functions and class instances.

### 4. Implement flatten array.

**Answer:** Walk the array recursively with a depth parameter, append non-arrays, and stop when depth is zero. An iterative stack avoids call-stack limits for very deep input; complexity is O(n) for the visited values.

### 5. Implement `groupBy`.

**Answer:** Reduce items into an object or `Map` keyed by the selected property or callback, creating an array for each new key. Decide how to handle missing keys, symbols, and key coercion; `Map` avoids accidental prototype keys.

### 6. Implement `once`.

**Answer:** Return a wrapper with a `called` flag and cached result; invoke the original only on the first call and return the cached result thereafter. Preserve context and arguments and define whether a thrown first call counts as consumed.

### 7. Implement memoize.

**Answer:** Cache results by a stable key derived from arguments, commonly a `Map` for one argument or a nested/serialized strategy for several. Bound the cache when inputs are unbounded and document equality and mutation assumptions.

### 8. Implement promise retry.

**Answer:** Await the operation, retry only classified transient errors, apply capped exponential backoff with jitter, and stop on abort or maximum attempts. For mutations, require idempotency or query status before retrying.

### 9. Implement a promise pool with a concurrency limit.

**Answer:** Maintain a next index and start at most `limit` workers; each worker takes the next task until the input is exhausted and stores results by original index. Decide fail-fast versus collect-all behavior and reject invalid limits.

### 10. Implement an event emitter.

**Answer:** Store event names mapped to listener sets, implement `on`, `off`, `once`, and `emit`, and snapshot listeners during emission so removal does not skip callbacks. Clean empty sets and define error-event behavior.

### 11. Implement an LRU cache.

**Answer:** Use a `Map` whose iteration order represents recency: delete and reinsert on get, insert on set, and remove the first key when size exceeds capacity. State O(1) expected get and set and define capacity and missing-key behavior.

### 12. Implement custom `map`.

**Answer:** Create an output array with the same length, iterate existing indexes, and call the callback with value, index, and source array. Preserve sparse-array semantics if required and do not mutate the original.

### 13. Implement custom `filter`.

**Answer:** Iterate the source, call the predicate with value, index, and source, and push values whose result is truthy into a new array. The output is dense; define behavior for sparse input consistently with native methods.

### 14. Implement custom `reduce`.

**Answer:** Choose the initial accumulator from the supplied initial value or the first present item, then iterate remaining items and apply the reducer. Throw for an empty array without an initial value, matching native behavior.

### 15. Implement `Promise.all`.

**Answer:** Normalize inputs with `Promise.resolve`, preserve input order in a results array, count fulfillments, and reject immediately on the first rejection. Resolve an empty input immediately and decide how thenables are handled by following native semantics.

### React coding

### 16. Build a searchable list with debounce.

**Answer:** Keep input state immediate, debounce the query used for the request, cancel obsolete requests, and render loading, empty, error, and stale states. Put query state in the URL when sharing or refresh behavior matters and test rapid typing.

### 17. Build a paginated table.

**Answer:** Keep page, sort, and filter state explicit, fetch a bounded page, render semantic headers and row actions, and handle loading, empty, error, and stale states. Use cursor pagination for changing large datasets and preserve focus when the page changes.

### 18. Build a transfer form with validation.

**Answer:** Use typed draft state, field and summary errors, server validation, a review step, pending state, idempotency, and a status page for unknown outcomes. Do not trust client balance or fee calculations and test expiry, retry, and duplicate submit.

### 19. Build an OTP input.

**Answer:** Prefer one accessible input with `inputMode="numeric"` and an appropriate autocomplete token, or make multiple cells behave as one with focus management and paste support. Handle expiry, resend cooldown, errors, screen readers, and password managers.

### 20. Build a modal with focus trap.

**Answer:** Render it through a portal, label it, focus the first meaningful control, keep focus within it, support Escape, make the background inert, and restore focus on close. Test scroll locking, validation errors, nested content, mobile, and keyboard-only use.

### 21. Build tabs.

**Answer:** Use links for navigation tabs or the ARIA tab pattern for in-page panels, with selected state, panel association, keyboard arrow behavior, and focus rules. Do not implement a custom tab widget when simple links express the task.

### 22. Build a toast system.

**Answer:** Create a provider or region that queues notices, assigns stable ids, supports dismissal and timeout, and exposes status or alert semantics appropriate to urgency. Do not use toasts as the only channel for critical errors; provide inline context and a history where needed.

### 23. Build a custom `useDebounce` hook.

**Answer:** Keep a value in state, schedule an update in an effect when the input or delay changes, and clear the timer in cleanup. Handle changing delay and unmount; the hook should not silently debounce a mutation that requires explicit confirmation.

### 24. Build a custom `usePrevious` hook.

**Answer:** Store the current value in a ref and update it in an effect after render, returning the prior ref value. Explain that the initial result is `undefined` and that the hook captures committed values, not every render attempt.

### 25. Build a custom `useAsync` hook.

**Answer:** Model idle, pending, success, and error state, expose execute and cancel behavior, track request identity, and ignore late results. Keep the hook generic over input and output, and make retry and cleanup explicit.

### 26. Build infinite scroll.

**Answer:** Use an intersection observer sentinel, cursor pagination, loading guards, deduplication, and an end-of-list state. Preserve scroll position, expose a manual load-more fallback, cancel on unmount, and virtualize when the accumulated DOM becomes large.

### 27. Build a virtualized list.

**Answer:** Calculate the visible range from scroll position and item dimensions, render a bounded overscan window, and preserve stable keys and semantics. Variable-height rows need measurement and scroll correction; test keyboard navigation and screen-reader access to offscreen content.

### 28. Build a theme switcher.

**Answer:** Store the user preference in a safe, small setting, support system preference and explicit choice, apply a class or data attribute early to avoid flash, and ensure contrast and focus states work in every theme. Do not use color alone to encode status.

### 29. Build a multi-step form.

**Answer:** Model the current step and typed draft, validate at step and final boundaries, autosave safe data, preserve values on back and errors, and handle session expiry or conflict. Use a server-owned state machine for workflows with approvals or payments.

### 30. Build a protected route wrapper and explain its limitation.

**Answer:** A client wrapper can show loading, redirect unauthenticated users, and hide navigation, but it cannot protect HTML or APIs already delivered. The server route, data layer, and mutation handler must authenticate and authorize independently.

### DSA basics

### 31. Two Sum.

**Answer:** Keep a map from value to its index while scanning; for each number, check whether `target - number` was seen. This is O(n) time and O(n) space and handles duplicate values by checking before storing the current index.

### 32. Valid Parentheses.

**Answer:** Push opening brackets on a stack and require each closing bracket to match the latest opening bracket. The string is valid only when no mismatch occurs and the stack is empty at the end; O(n) time and space.

### 33. Merge Intervals.

**Answer:** Sort intervals by start, then merge the current interval into the last output when they overlap; otherwise append it. Sorting costs O(n log n), and the scan is O(n).

### 34. Binary Search.

**Answer:** Keep inclusive or half-open bounds consistently, compare the middle value, and discard the half that cannot contain the target. State behavior for duplicates and not-found values; complexity is O(log n).

### 35. Debounced search with sorted results.

**Answer:** Debounce input, cancel obsolete requests, and let the server return a stable sort or use a comparator that handles case, locale, and missing values. Do not sort a stale response into the current query; associate results with the query key.

### 36. LRU cache.

**Answer:** Use a map for key lookup and recency ordering; get moves a key to the newest position and set evicts the oldest when at capacity. Expected get and set are O(1).

### 37. Sliding window maximum.

**Answer:** Maintain a deque of indexes whose values are decreasing; remove indexes outside the window and smaller values from the back. The front is each maximum, giving O(n) time.

### 38. Longest substring without repeating characters.

**Answer:** Use a sliding window and a map of each character's latest index; when a repeat occurs, move the left boundary past the previous occurrence. Each character is processed a bounded number of times, so time is O(n).

### 39. Merge two sorted arrays.

**Answer:** Use two pointers, append the smaller current value, then append the remaining tail. This is O(n + m) time and O(n + m) output space, or O(1) extra space if modifying a preallocated array from the end.

### 40. Detect a cycle in a linked list.

**Answer:** Use Floyd's slow and fast pointers; if they meet, a cycle exists, otherwise fast reaches null. This is O(n) time and O(1) extra space.

### 41. Tree traversal.

**Answer:** DFS can be recursive or stack-based for preorder, inorder, and postorder; BFS uses a queue level by level. Choose based on the required ordering and depth constraints, and avoid recursion limits for untrusted deep trees.

### 42. Top K frequent elements.

**Answer:** Count frequencies with a map and use a heap of size K or bucket sort when frequency bounds permit. Heap is O(n log k); bucket sort can be O(n) with O(n) space.

### 43. Rate limiter.

**Answer:** Choose a fixed window, sliding window, token bucket, or leaky bucket based on burst and fairness requirements. Define identity, storage consistency, expiry, and response behavior; a distributed limiter needs an appropriate shared store or gateway.

### 44. Task scheduler.

**Answer:** Model tasks with dependencies, priority, retry, and concurrency, then use a queue plus worker pool. Track active, queued, completed, failed, and cancelled states and prevent starvation or unbounded memory.

### 45. Retry queue.

**Answer:** Store a stable job id, attempt count, next-attempt time, error classification, and idempotency key. Process due jobs with exponential backoff and a dead-letter or manual-review path, and make workers safe to restart.

## 13. Behavioral and Communication Answer Templates

Use the pattern: context, problem, options, decision, tradeoff, result, and learning. Replace placeholders with your own truthful experience.

### 1. Tell me about yourself.

**Answer:** "I am a frontend developer focused on React, Next.js, TypeScript, and building reliable user workflows. I have worked on features such as [feature], where I owned [responsibility], collaborated with [teams], and improved [result]. I am now looking for a role where I can contribute to product-quality UI while growing in architecture, performance, and security."

### 2. Explain your React/Next.js project architecture.

**Answer:** "I organize the app by product domain and route, keep reusable UI and tokens in shared modules, isolate server-state data access from local UI state, and use route-level loading and error boundaries. Authentication and authorization are enforced on the server, while Client Components are limited to interactions that need browser state."

### 3. Describe a production bug you fixed.

**Answer:** "A [user-visible problem] occurred when [condition]. I reproduced it with [test or logs], found that [root cause], and fixed it by [change]. I added [regression test or monitoring], measured [result], and learned to check [lesson] earlier in the workflow."

### 4. Describe a performance issue you improved.

**Answer:** "A [page or interaction] was slow for [users]. I measured it with [DevTools, profiler, field data], found [largest cost], then applied [focused changes]. The result was [truthful metric or observable improvement], and I added a budget or monitoring so the regression would be visible."

### 5. Describe a security issue you learned from.

**Answer:** "We identified [issue or risky assumption]. I helped verify the impact, moved enforcement to [server or secure boundary], reduced exposed data, and added tests or review guidance. The lesson was that UI hiding is not authorization and that sensitive flows need explicit threat modeling."

### 6. Describe a time you disagreed with a requirement.

**Answer:** "I first clarified the goal and the constraint behind the request. I explained the risk of the proposed approach with evidence, offered a safer option that preserved the goal, and agreed on a measurable tradeoff. We shipped [decision], and I documented the follow-up so the disagreement became a product decision rather than a personal debate."

### 7. How do you review code?

**Answer:** "I check correctness and user impact first, then security, accessibility, performance, maintainability, and tests. I ask questions with context, distinguish blockers from suggestions, and prefer a small reviewable change. I also verify the code follows existing project conventions before proposing a new abstraction."

### 8. How do you handle unclear requirements?

**Answer:** "I identify the user, business outcome, constraints, edge cases, and source of truth, then write a small acceptance checklist. I clarify risky assumptions with product or backend, choose safe defaults for failure and permissions, and split the work so uncertainty is resolved early rather than hidden in implementation."

### 9. How do you estimate frontend work?

**Answer:** "I break the work into UI states, data contracts, permissions, responsive and accessibility behavior, tests, and rollout. I call out unknowns such as backend changes or third-party integrations, give a range with assumptions, and update the estimate when evidence changes instead of pretending precision."

### 10. How do you mentor juniors?

**Answer:** "I clarify the goal, show the reasoning behind a pattern, and let the person implement a small slice while I give timely review. I use pairing, examples, and questions rather than taking over, and I encourage them to document the lesson so the team benefits beyond one task."

### 11. How do you keep up with React and Next.js changes?

**Answer:** "I follow official release notes and documentation, test important changes in a small sandbox, and evaluate them against our app's constraints before adopting them. I look for migration notes, runtime behavior, performance, security, and ecosystem support rather than upgrading because a feature is fashionable."

### 12. How do you balance speed and quality?

**Answer:** "I protect the risky parts first: authorization, money or sensitive data, data integrity, accessibility, and the critical user path. I can simplify polish or defer noncritical scope, but I keep tests and observability around the core flow and make any debt explicit with an owner and follow-up."

### 13. What would you improve in your last project?

**Answer:** "I would choose a real improvement such as earlier API contract testing, better loading and error states, stronger performance measurement, or clearer component boundaries. I would explain the evidence, the tradeoff, and the smallest change I would make rather than criticizing the team without context."

### 14. How do you handle production incidents?

**Answer:** "I first protect users and stabilize the system, then establish a clear incident owner, communicate facts and impact, and use logs, metrics, and traces to narrow the cause. After recovery, I document the timeline, add a regression test or alert, and focus the review on system improvements rather than blame."

### 15. Why should we hire you?

**Answer:** "I bring [truthful experience] building React and frontend features, but my strongest value is how I reason about the whole workflow: user experience, server contracts, security, accessibility, performance, and failure recovery. I communicate clearly with product and engineering partners and turn ambiguous requirements into testable, maintainable delivery."
