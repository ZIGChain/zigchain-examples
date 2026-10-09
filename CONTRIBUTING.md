# Contributing

## Welcome

This repository holds the ZIGChain example projects that the public tutorials point to. Useful contributions are fixes that keep an example working against the current chain, corrections to a tutorial's steps, and new self-contained examples. Read [ARCHITECTURE.md](ARCHITECTURE.md) first: it describes each example, how it is built and the rules every example follows.

## Quick Start

The repository has no root build. Clone it, then set up only the example you are changing.

```sh
git clone https://github.com/ZIGChain/zigchain-examples.git
cd zigchain-examples
```

**Token Factory** (`examples/frontend/token-factory/`). Prerequisites: Node.js 20 (pinned in `.nvmrc`; Next.js 15 needs at least 18.18) and pnpm 9 (pinned as `packageManager` in `package.json`; `corepack enable` provides it). The committed lockfile is `pnpm-lock.yaml`.

```sh
cd examples/frontend/token-factory
nvm use                          # optional, reads .nvmrc
pnpm install --frozen-lockfile
cp .env.example .env.local       # add your own Pinata values; never commit this file
pnpm dev                         # http://localhost:3000
pnpm build && pnpm start         # production build, served locally
```

The example's [README](examples/frontend/token-factory/README.md#5-environment-configuration) explains every variable. You need a Cosmos wallet such as Keplr in the browser to sign transactions; use the testnet while developing.

**IBC callbacks contract** (`examples/integrations/callbacks-module/contract/`). Prerequisites: `rustup` (it installs the pinned Rust 1.86.0 toolchain and the `wasm32-unknown-unknown` target from `rust-toolchain.toml` on first use) and Docker for the optimized build.

```sh
cd examples/integrations/callbacks-module/contract
cargo wasm        # alias in .cargo/config.toml: cargo build --release --target wasm32-unknown-unknown --lib
```

Running the full tutorial (storing the contract, opening an IBC channel, sending the transfer) needs `zigchaind`, `osmosisd`, `hermes`, `jq` and funded testnet accounts; the [tutorial](examples/integrations/callbacks-module/README.md#0-prerequisites) lists them.

## Making Changes

1. Create a branch from `main`, for example `git switch -c fix/token-factory-pagination`. Direct pushes to `main` are disabled.
2. Keep the change inside one example where you can. Each example must stay self-contained (see [ARCHITECTURE.md](ARCHITECTURE.md#architectural-invariants)).
3. Update the example's own README in the same change when you change a command, a variable, a version or a step. The tutorials on the ZIGChain docs site link to these READMEs.
4. Never commit `.env` or `.env.local` files, keys, mnemonics or wallet addresses. Put placeholders in `.env.example` and in tutorial snippets.
5. If you change the callbacks contract source, rebuild it with the optimizer command from the tutorial (run from `examples/integrations/callbacks-module/`) and commit the new `contract/artifacts/counter.wasm` and `checksums.txt` with it.
6. Don't edit `ts-client/` by hand; it is generated code.
7. Use [Conventional Commits](https://www.conventionalcommits.org/) (for example `fix: ...`, `docs: ...`, `ci: ...`). Older commits do not follow it, and no hook enforces it.

To add a new example, create `examples/<category>/<name>/` with its own manifest, lockfile, toolchain pin, README (with the disclaimer the other READMEs start with) and license, then add a row to the examples table in the root [README.md](README.md#table-of-available-examples).

## Testing

Neither example has automated tests: there are no `*.test.ts` files and no Rust `#[test]` functions. Check a change with the local commands below and by running the example.

**Token Factory**, from `examples/frontend/token-factory/` after `pnpm install --frozen-lockfile`:

```sh
pnpm lint              # next lint (ESLint, next/core-web-vitals; ts-client/ is ignored)
pnpm exec tsc --noEmit  # type check; not a package script
pnpm build             # next build
```

`next build` downloads the Inter and Press Start 2P fonts from Google Fonts (`app/layout.tsx`), so it needs network access. `next.config.mjs` sets `ignoreBuildErrors` and `ignoreDuringBuilds`, so `pnpm build` does not fail on type or lint errors: run lint and the type check yourself. The type check reports errors in the generated `ts-client/`, which are known; the app code itself should have none, so don't add new errors or warnings. Then run `pnpm dev` and try the flow you changed against the testnet.

**IBC callbacks contract**, from `examples/integrations/callbacks-module/contract/`:

```sh
cargo wasm          # release build for wasm32-unknown-unknown
cargo unit-test     # cargo test --lib
cargo clippy
cargo fmt --check
```

Run `cargo fmt` on any file you change. To add tests, add `cw-multi-test` as a dev dependency. The end-to-end check is the tutorial itself, run against the public testnets.

## Pull Request Process

1. Fork the repository, create a branch from `main` and open a pull request.
2. Describe what you changed and how you checked it (see [Testing](#testing)). For Token Factory, use pnpm, never `npm install`, and commit the updated `pnpm-lock.yaml` with any dependency change.
3. A maintainer reviews it. This repository is published from ZIGChain's internal copy, so an accepted change is applied there and arrives here with the next sync; your pull request is then closed with a link to that sync.

## Getting Help

Open an issue on GitHub. For chain behaviour, see the [ZIGChain docs](https://docs.zigchain.com) and the tutorials linked from the root [README.md](README.md#tutorials).
