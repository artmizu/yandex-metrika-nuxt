# Agent Notes

## Build And Verification

- Run `pnpm dev:prepare` after changes under `src/`, module auto-imports, or playground pages. The playground and generated Nuxt imports can be stale otherwise.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test:type`, and `pnpm test` before finalizing changes when feasible.
- `pnpm test:type` is intentionally scoped to `test/types.test-d.ts` with `--typecheck.only` so type tests do not collect browser integration suites.
- Browser tests use Playwright through Nuxt test-utils. CI installs Chromium with `pnpm exec playwright install chromium --with-deps --only-shell` before running tests.
- Keep `pnpm test` focused on `vitest run --no-file-parallelism`; do not add Playwright browser installation to this script. Installing browsers inside both CI and the test script can hang or duplicate setup.

## Local Playwright Notes

- This repo uses Node `24.16.0`, pinned in `.node-version`.
- If local `pnpm exec playwright install chromium --only-shell` hangs after download on macOS, the Playwright cache may be partially extracted.
- Safe local remediation is to remove only the expected revision under `~/Library/Caches/ms-playwright`, rerun the install with a timeout, or manually extract the downloaded archive and add `INSTALLATION_COMPLETE`.
- Do not repeatedly retry long-running Playwright installer commands without a timeout.

## CI Notes

- GitHub Actions use `node-version-file: .node-version` and `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`, matching the companion Nuxt module setup in `artmizu/nuxt-prometheus`.
- If CI appears stuck, inspect whether the `test` job is waiting in browser installation or in `pnpm test`. Avoid running browser installation twice.

## Module Notes

- The module runtime lives under `src/runtime`.
- Public module options are defined in `src/runtime/type.ts`.
- Runtime client dispatch is handled in `src/runtime/plugin.ts`; development logging is handled in `src/runtime/plugin-dev.ts`; server/head injection is handled in `src/runtime/serverPlugin.ts`.
- After adding composables, register them from `src/module.ts` and run `pnpm dev:prepare` before testing playground usage.
