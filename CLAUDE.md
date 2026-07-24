# pass-gen-app

Remote application in the `microfrontend-lab` micro frontend POC.

## Required reading

Before generating or modifying code, read:
- `../mf-registry/ARCHITECTURE.md` — system architecture, federation config, shared deps
- `../mf-registry/SCAFFOLD.md` — folder structure, CSS Modules rules, services layer

Source: https://github.com/microfrontend-lab/mf-registry

## This app

- Exposed module: `./PassGenWidget`
- Dev port: 3003
- Routes: `/` (password generator)
- Bucket: `gs://mf-pass-gen-app`

## Divergence from SCAFFOLD.md

This app has no backend communication of any kind — password generation and
strength scoring are pure client-side computation, not data fetched from
anywhere. It therefore has **no `services/` or `resources/` folders** and no
`API_MODE` / `API_BASE_URL` env vars; `hooks/usePasswordGenerator.ts` calls
`utils/generatePassword.ts` directly. Every other convention in
`SCAFFOLD.md` (CSS Modules, design tokens, dual-mode entry, routing,
TypeScript rules) applies unchanged.
