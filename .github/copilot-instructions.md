# Copilot Instructions

## Build, test, and lint commands

- `npm run build` builds the plugin for publishing. It runs `clean`, `docgen`, `tsc`, and Rollup. Because `docgen` writes back into `README.md` and `dist/docs.json`, rerun this after changing the public TypeScript API or its JSDoc.
- `npm run lint` runs the repo's full lint pass: ESLint for TypeScript, Prettier in check mode, and SwiftLint.
- `npm run fmt` applies the matching auto-fixes for ESLint, Prettier, and SwiftLint.
- `npm run verify` is the closest thing to a full CI-style check. It runs:
  - `npm run verify:web` → `npm run build`
  - `npm run verify:android` → `cd android && ./gradlew clean build test`
  - `npm run verify:ios` → `xcodebuild -scheme CapacitorCommunityAppIcon -destination generic/platform=iOS`
- There is no top-level JavaScript test runner for the plugin itself. The checked-in native test files are mostly scaffold/template coverage, so native changes are usually validated through the existing verify commands plus targeted Gradle runs.
- Single-test command that exists today: `cd android && ./gradlew testDebugUnitTest --tests com.getcapacitor.ExampleUnitTest`
- If you are working on the demo app rather than the published plugin, its commands live under `example/` (`npm run build`, `npm test`, `npm run start`).

## High-level architecture

- This repository is a Capacitor plugin with a thin TypeScript entry layer in `src/` and native implementations in `ios/` and `android/`.
- `src/index.ts` registers the plugin as `AppIcon` and lazy-loads the web implementation. `src/definitions.ts` is the source of truth for the public API shape and for the generated API docs in `README.md`.
- `src/web.ts` is only a stub: every method throws `unimplemented`. Real behavior lives in the native platforms.
- The iOS implementation is in `ios/Sources/AppIconPlugin/AppIconPlugin.swift`. It resolves Capacitor calls on the main thread and uses `UIApplication.supportsAlternateIcons`, `alternateIconName`, and `setAlternateIconName`. `reset()` is implemented as `setIcon(nil)`.
- The Android implementation is split between a thin Capacitor bridge (`android/src/main/java/com/mycompany/plugins/example/AppIconPlugin.java`) and the platform logic in `AppIconBase.java`. Android does not swap image assets directly; it enables one launcher component and disables the others with `PackageManager`.
- Because of that Android design, the consuming app must predeclare every alternate icon as an `<activity-alias>` in its own manifest. The plugin only toggles those aliases.
- `example/` is a separate Stencil/Capacitor demo app that shows how callers are expected to provide icon names and exercise the plugin.

## Key conventions

- Keep the plugin name aligned across all layers: `registerPlugin('AppIcon')` in TypeScript, `@CapacitorPlugin(name = "AppIcon")` on Android, and `jsName = "AppIcon"` on iOS. If you rename or add methods, update every platform bridge to match.
- Treat `src/definitions.ts` as the authoritative public contract. Its JSDoc feeds the generated README API section, so API comment changes are documentation changes.
- On Android, `disable` is effectively required for both `change()` and `reset()`, even though the TypeScript types mark it optional. Android callers are expected to pass the full list of alternate icons that should be disabled when one icon becomes active or when resetting.
- Android alias names are user-facing API values. `getName()` strips the leading `.` from the enabled component name, and `.MainActivity` is treated as the default icon. Keep manifest alias names consistent with the strings used from JavaScript.
- `suppressNotification` is still present in the TypeScript API for compatibility, but it is deprecated and intentionally ignored by current native behavior. Do not build new logic that depends on suppressing the iOS system notification.
- Product constraints from the README matter when changing behavior or docs: the plugin changes only the home screen icon, and iOS allows changing the icon only while the app is in the foreground.
