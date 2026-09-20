---
agent: agent
description: "Guide a Capacitor major-version upgrade across this plugin and its example app using the official Capacitor updating guides."
---
# Capacitor version upgrade

Use this prompt to upgrade the plugin (root) and the `example/` app to a new Capacitor major version, driven by the official Capacitor docs rather than hardcoded version numbers.

## 1. Confirm the target version
If the user hasn't stated a target major version (e.g. `9.0`), ask for it before doing anything else. Do not assume a version.

## 2. Fetch the official guides for that version
Fetch both of these for the confirmed version and read them in full before editing anything:
- `https://capacitorjs.com/docs/updating/{version}` — core/app upgrade guide (breaking changes, Android/iOS project settings, gradle/SDK/Xcode requirements)
- `https://capacitorjs.com/docs/updating/plugins/{version}` — plugin-specific upgrade guide (dependency ranges, Android plugin variables, iOS deployment target, SPM/podspec changes)

Do not rely on memorized version numbers from prior upgrades — always take the versions/values from the freshly fetched pages, since defaults change between releases.

## 3. Update the root plugin
- `package.json`: bump `@capacitor/cli`, `@capacitor/core`, `@capacitor/android`, `@capacitor/ios` in devDependencies, and the `@capacitor/core` peerDependencies range, to the values from the plugin guide.
- `android/build.gradle`: update the `ext { ... }` versions actually used by this plugin (currently `androidxAppCompatVersion`, `androidxJunitVersion`, `androidxEspressoCoreVersion`, `junitVersion`), `compileSdkVersion`/`minSdkVersion`/`targetSdkVersion` defaults, the `com.android.tools.build:gradle` classpath version, Java `sourceCompatibility`/`targetCompatibility`, and Kotlin version/`compilerOptions` if the plugin guide calls for changes — only touch variables this plugin actually declares.
- `android/gradle/wrapper/gradle-wrapper.properties`: update the Gradle `distributionUrl` version if the guide specifies a new one.
- `Package.swift`: update `platforms: [.iOS(.vNN)]` and the `capacitor-swift-pm` dependency version.
- `CapacitorCommunityAppIcon.podspec`: update `s.ios.deployment_target` to match.
- Regenerate `Package.resolved` (e.g. via `xcodebuild -resolvePackageDependencies` or `swift package resolve`) after the SPM dependency bump.

## 4. Update the example app
Mirror the same categories of changes under `example/`, matching whatever files exist there: `example/package.json` (Capacitor deps), `example/android/variables.gradle`, `example/android/build.gradle`, `example/android/gradle/wrapper/gradle-wrapper.properties`, `example/ios/App/Podfile` (`platform :ios`), and `example/android/app/src/main/AndroidManifest.xml` if the app guide calls out manifest/`configChanges` changes.

## 5. Check for plugin-API breaking changes
Read the "Plugins" section of the fetched plugin guide for anything that affects this plugin's own API surface (not just version bumps) — e.g. removed/renamed native APIs, changed lifecycle notifications. If anything applies to `src/definitions.ts`, `ios/Sources/AppIconPlugin/AppIconPlugin.swift`, or the Android bridge, call it out separately from the routine version bumps and confirm with the user before changing plugin behavior.

## 6. Verify
Follow the commands in [.github/copilot-instructions.md](../copilot-instructions.md) and the conventions in [.github/instructions/app-icon.instructions.md](../instructions/app-icon.instructions.md):
- Run the narrowest relevant check while iterating (`npm run verify:android`, `npm run verify:ios`).
- Before considering the upgrade done, `npm run verify` must pass, and `npm run lint` must pass if any lint-sensitive files changed.
- If public TypeScript API docs changed, run `npm run docgen` instead of hand-editing the generated README section.

## 7. Summarize
Produce a short summary of every version/file changed (grouped by root plugin vs. example app) for the user to add to `CHANGELOG.md` themselves. Do not edit `CHANGELOG.md` automatically.
