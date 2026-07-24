# pass-gen-app

Standalone password generator, and a remote in the `microfrontend-lab` micro
frontend POC. Runs fully on its own; the portal is optional.

See [`CLAUDE.md`](./CLAUDE.md) for the architecture docs this app must
conform to.

## Run standalone

Requires Node 24 (`.nvmrc`).

```bash
pnpm install
pnpm dev
```

Open http://localhost:3003 — fully styled, no other repo running.

## What it does

Generates a random password from a configurable character length (4–32) and
character set (uppercase, lowercase, numbers, symbols), shows a strength
meter (weak / medium / strong), and copies the result to the clipboard.
Generation and scoring are pure client-side logic — there's no backend, mock
or otherwise (see `CLAUDE.md` for why this app skips the usual
`services/`/`resources/` layer).

## Exposed module

| | |
|---|---|
| MF container name | `passGenApp` |
| Exposed module | `./PassGenWidget` |
| `remoteEntry.js` | `http://localhost:3003/remoteEntry.js` (dev) |
| Props | `WidgetProps` — `basename`, `user`, `theme` (all optional; see `src/types/widget.ts`) |

## Routes

| Path | Page |
|---|---|
| `/` | Password generator |

Embedded under the portal's `/apps/passgen` prefix, this becomes
`/apps/passgen`.

## Registry entry

```json
{
  "name": "passGenApp",
  "url": "https://storage.googleapis.com/mf-pass-gen-app/remoteEntry.js",
  "module": "./PassGenWidget",
  "route": "/apps/passgen",
  "title": "Password Generator",
  "icon": "key-round",
  "enabled": true
}
```

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server on :3003 |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `lint:fix` | ESLint |
| `pnpm stylelint` | Stylelint on `*.module.css` |
| `pnpm test` | Vitest |

## Deploy

`.github/workflows/deploy.yml` builds and syncs `dist/` to
`gs://mf-pass-gen-app` on push to `main`, via Workload Identity Federation.
`remoteEntry.js` and `index.html` are uploaded with `Cache-Control: no-cache`;
hashed chunks get a one-year immutable cache. See `infra/README.md` for the
bucket Terraform.
