---
name: "Capacitor App Icon Plugin"
description: "Use when changing this Capacitor plugin, its TypeScript bridge, iOS Swift implementation, Android implementation, tests, generated documentation, or example app."
---
# Capacitor App Icon Plugin

- Treat the TypeScript definitions and native implementations as one public API. Keep behavior and naming aligned across web, iOS, and Android.
- Preserve compatibility with the supported Capacitor APIs and existing package exports unless the task explicitly requires a breaking change.
- Keep platform-specific code in `src/`, `ios/Sources/AppIconPlugin/`, and `android/src/main/`; add or update focused tests in the corresponding test directories.
- Do not edit generated output under `dist/`, `android/build/`, or other build directories.
- When public TypeScript API documentation changes, update the source JSDoc and run `npm run docgen` rather than editing generated README sections directly.
- Run the narrowest relevant check while iterating. Before completing a cross-platform change, `npm run verify` must pass; `npm run lint` must pass when formatting or lint-sensitive files changed.
- Keep example-app changes limited to demonstrating or manually exercising the plugin, not as a substitute for plugin tests.
