![Zigchain Token Factory](public/logo.png)

# Zigchain Token Factory

**Category:** Frontend

---

## 2. What This Example Demonstrates

- Create and list tokens on Zigchain via the Token Factory module.
- Connect a wallet (Cosmos Kit) and broadcast create-denom / mint messages.
- Upload token metadata and images to IPFS (Pinata) and display tokens in a table.
- **ZigChain concept:** Token Factory (native denom creation, metadata).
- **Target level:** Beginner / Intermediate.

---

## 3. Prerequisites

- **Node.js** 18+ (see [Toolchain](#toolchain-pinning) for pinned version).
- **npm** (or yarn / pnpm / bun).
- **Wallet** — a Cosmos-compatible wallet (e.g. Keplr, Leap) for signing transactions.
- **ZigChain testnet account** — recommended for testing (no mainnet funds required).
- **Pinata account** — for IPFS (token images); see [Environment Configuration](#5-environment-configuration).

---

## 4. Quick Start

```bash
npx degit ZIGChain/zigchain-examples/examples/frontend/token-factory zigchain-token-factory
cd zigchain-token-factory
npm i
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Set `PINATA_JWT` and `NEXT_PUBLIC_GATEWAY_URL` in `.env.local` for token image uploads (see [Environment Configuration](#5-environment-configuration)).

---

## 5. Environment Configuration

- Copy `.env.example` to `.env.local` and fill in the values.
- **Default network:** ZigChain Testnet (`NEXT_PUBLIC_DEFAULT_NETWORK=testnet`).
- **Switch network:** Set `NEXT_PUBLIC_DEFAULT_NETWORK` to `mainnet` or `testnet`; the app uses the corresponding `*_API_URL`, `*_RPC_URL`, and `*_CHAIN_ID` from the same file. For a local node, point those URLs to your local LCD/RPC.
- **Required for token images:** `PINATA_JWT` and `NEXT_PUBLIC_GATEWAY_URL` (get from [Pinata](https://docs.pinata.cloud/quickstart)). No private keys in env — wallet signing is done via the connected wallet.

---

## 6. Project Structure

- `app/` — Next.js App Router pages, layout, API routes (e.g. CoinGecko proxy).
- `components/` — UI (wallet, token creation form, tokens table).
- `lib/` — env parsing, hooks (e.g. `useTx`), token display/pricing helpers.
- `ts-client/` — Generated Cosmos/Zigchain client (LCD, Tx, Token Factory, etc.).
- `public/` — Static assets (logo, favicon).

---

## 7. How It Works

- The app uses **Cosmos Kit** for wallet connection and **CosmJS** (Stargate/LCD) under the hood. Generated **ts-client** code talks to Zigchain LCD for queries and builds messages for the **Token Factory** module (create denom, set metadata, mint).
- **Transactions** are built and broadcast via the connected wallet; create-denom and mint messages are sent to the chain using the configured RPC/API URLs.
- **Token list** is read from chain (Token Factory + bank module); metadata and images are resolved from IPFS via the Pinata gateway when available.

---

## 8. Running on Different Networks

- **Testnet (default):** Uses `NEXT_PUBLIC_TESTNET_*` URLs and `zig-test-2`. Safe for trying token creation.
- **Mainnet:** Set `NEXT_PUBLIC_DEFAULT_NETWORK=mainnet`; uses `NEXT_PUBLIC_MAINNET_*` and `zigchain-1`.
- **Local node:** Set `NEXT_PUBLIC_*_API_URL` and `NEXT_PUBLIC_*_RPC_URL` to your local LCD/RPC and the matching chain ID.

---

## 9. Build / Production

```bash
npm run build
npm run start
```

Deploy the output (e.g. Vercel): connect the repo, set the same env vars in the dashboard, and deploy. Use `NEXT_PUBLIC_*` for any client-visible URLs and chain IDs.

---

## 10. Related Resources

- [Zigchain Examples](https://github.com/ZIGChain/zigchain-examples) — this repo.
- ZigChain docs — Token Factory and chain endpoints (add your docs link when available).
- [Pinata Quickstart](https://docs.pinata.cloud/quickstart) — IPFS and gateway setup.

---

## Screenshots

### Tokens Table

![Tokens Table](assets/screenshot-1.png)

### Create New Token

![Create New Token](assets/screenshot-2.png)

---

## Toolchain Pinning

This project uses **Node.js 20**. If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root (see `.nvmrc`).
