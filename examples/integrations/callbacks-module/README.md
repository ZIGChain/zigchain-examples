> **Disclaimer**
> This tutorial demonstrates an example flow and sample contract behavior. Validate chain settings, gas values, permissions, and contract logic for your own environment before any production use.

# IBC Callbacks on ZIGChain — End-to-End Tutorial

Trigger a CosmWasm contract on **ZIGChain** from a user sitting on **Osmosis**, by
attaching a `dest_callback` memo to a normal ICS-20 transfer. The call is placed
on Osmosis; settlement (and the contract call) happens on ZIGChain.

```
 User on Osmosis                        ZIGChain transfer stack
 ────────────                           ──────────────────────────────
 osmosisd tx ibc-transfer    ───▶   ┌── ICS-20 transfer app ──┐
   transfer <channel> <zig1…>       │  ↑ callbacks middleware │
   100uosmo                         │  │ reads memo           │
   --memo '{"dest_callback":{…}}'   │  ▼ wasm.Sudo()          │
                                    └── counter contract ─────┘
                                                │
                                                ▼
                                           COUNT += 1
```

**What you'll run**

1. Build a tiny counter contract with an `ibc_destination_callback` entry
   point that handles `IbcDestinationCallbackMsg`.
2. Store & instantiate it on ZIGChain testnet.
3. Send an ICS-20 transfer from Osmosis testnet carrying a `dest_callback` memo.
4. Watch the counter increment once the packet is relayed.

---

## 0. Prerequisites

| Tool                         | Why                                           |
| ---------------------------- | --------------------------------------------- |
| `zigchaind` v5.x           | Query/tx against ZIGChain testnet             |
| `osmosisd` (Osmosis testnet) | Send the ICS-20 transfer with memo            |
| `hermes` v1.10+              | Open + operate the transfer channel (§4)      |
| `rustup` + `wasm32` target   | Compile the contract                          |
| Docker                       | Run `cosmwasm/optimizer` (deterministic wasm) |
| `jq`                         | Parse RPC/LCD JSON output                     |

Install the wasm target once:

```sh
rustup target add wasm32-unknown-unknown
```

Get binaries:

- `zigchaind`: follow <https://docs.zigchain.com/build/quick-start>
- `osmosisd`: follow <https://docs.osmosis.zone/osmosis-core/osmosisd/>
- `hermes`: prebuilt binary from
  <https://github.com/informalsystems/hermes/releases>, or
  `cargo install ibc-relayer-cli --bin hermes --locked`

Testnet tokens:

- ZIG testnet faucet: <https://faucet.zigchain.com/>
- Osmosis testnet faucet: <https://faucet.testnet.osmosis.zone/>

---

## 1. Environment

Copy this block into a `.env` (or source it directly). Fill in the two key names.

```sh
# --- ZIGChain testnet ---
export ZIG_CHAIN_ID="zig-test-2"
export ZIG_NODE="https://testnet-rpc.zigchain.com:443"
export ZIG_LCD="https://testnet-api.zigchain.com"
export ZIG_DENOM="azig"
export ZIG_GAS_PRICES="2500000000${ZIG_DENOM}"
export ZIG_KEY="my-key"                                     # name in zigchaind keyring

# --- Osmosis testnet ---
export OSMO_CHAIN_ID="osmo-test-5"
export OSMO_NODE="https://rpc.testnet.osmosis.zone:443"
export OSMO_DENOM="uosmo"
export OSMO_GAS_PRICES="0.1${OSMO_DENOM}"
export OSMO_KEY="my-key"                                   # name in osmosisd keyring

# --- filled in later ---
export CODE_ID=""                # after `zigchaind tx wasm store`
export CONTRACT=""               # after `zigchaind tx wasm instantiate`
export OSMO_CHANNEL=""           # e.g. channel-10234  (Osmosis → ZIGChain transfer channel)
export ZIG_CHANNEL=""            # e.g. channel-9      (the counterparty channel-id on ZIGChain)
export ZIG_RECEIVER=""           # any zig1… address to receive the tokens (can be your own)
```

Create keys (skip if you already have them):

```sh
zigchaind  keys add  "$ZIG_KEY"
osmosisd   keys add  "$OSMO_KEY"
```

Fund them from the faucets above, then verify:

```sh
zigchaind q bank balances  "$(zigchaind keys show "$ZIG_KEY" -a)"   --node "$ZIG_NODE"
osmosisd  q bank balances  "$(osmosisd  keys show "$OSMO_KEY" -a)"  --node "$OSMO_NODE"
```

---

## 2. Build the counter contract

The source lives in [`contract/`](./contract). It exposes:

- `instantiate` — zeroes the counter
- `execute { reset {} }` — resets counter + last transfer (owner-agnostic; this is a
  demo contract)
- `query { count {} }` / `query { last_transfer {} }`
- **`ibc_destination_callback(IbcDestinationCallbackMsg)`** — a dedicated
  wasm export that the callbacks middleware invokes on the destination chain

The destination callback is **its own entry point** in cosmwasm-std 2.x — not
a `sudo` variant. `#[entry_point]` emits a wasm export literally named
`ibc_destination_callback`, and the ibc-callbacks middleware looks it up by
that symbol. If the export is missing, the packet fails with
`Missing export ibc_destination_callback`. The handler is ~20 lines of Rust
(see [`contract/src/contract.rs`](./contract/src/contract.rs)):

```rust
#[entry_point]
pub fn ibc_destination_callback(
    deps: DepsMut,
    _env: Env,
    cb: IbcDestinationCallbackMsg,
) -> Result<IbcBasicResponse, ContractError> {
    // ack first — only bump the counter when the transfer succeeded
    let ack: Ics20Ack = from_json(&cb.ack.data)?;
    if ack.result.is_none() || ack.error.is_some() {
        return Err(ContractError::NotATransfer);
    }
    let pkt: FungibleTokenPacketData = from_json(&cb.packet.data)?;
    // ...parse amount/denom, bump_by from memo, save LastTransfer...
    Ok(IbcBasicResponse::new().add_attribute("action", "ibc_destination_callback"))
}
```

On cosmwasm-std **2.x** the `IbcDestinationCallbackMsg` is just
`{ packet, ack }` — no `.transfer` convenience field (that was added in 3.0).
So the handler parses the ICS-20 `FungibleTokenPacketData` out of
`cb.packet.data` itself: `{ denom, amount, sender, receiver, memo }`.

### Carrying contract-specific payload in the memo

`IbcDestinationCallbackMsg` has no `calldata` field — it's just
`{ packet, ack }`. To transport **contract-specific** data, we abuse
the fact that the callbacks middleware only parses its own keys
(`src_callback`, `dest_callback`) out of the ICS-20 memo and leaves sibling
keys untouched:

```json
{
  "dest_callback": { "address": "zig1…", "gas_limit": "500000" },
  "counter": { "bump_by": 5 }
}
```

Inside the callback we read the memo off the packet we parsed and extract
our own `counter.bump_by`, falling back to `+1` if missing or malformed:

```rust
let bump_by = extract_bump_by(&pkt.memo).unwrap_or(1);
COUNT.update(deps.storage, |c| -> StdResult<_> { Ok(c + bump_by) })?;
```

This is the same trick used by packet-forward-middleware, IBC-hooks, etc. —
the memo is the de-facto calldata channel for anything that rides ICS-20.

### Optimized build (what you ship on-chain)

From the repo root:

```sh
docker run --rm -v "$(pwd)/contract":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/optimizer:0.16.1
```

(Apple Silicon: use `cosmwasm/optimizer-arm64:0.16.1` and append `-aarch64` to the
wasm filename.)

Output:

```
contract/artifacts/counter.wasm        # ← this is what gets stored
contract/artifacts/checksums.txt
```

---

## 3. Store & instantiate on ZIGChain

### 3.1 Store

```sh
TX=$(zigchaind tx wasm store contract/artifacts/counter.wasm \
  --from "$ZIG_KEY" \
  --chain-id "$ZIG_CHAIN_ID" --node "$ZIG_NODE" \
  --gas auto --gas-adjustment 1.4 --gas-prices "$ZIG_GAS_PRICES" \
  --output json --yes | jq -r '.txhash')
```

Wait a block, then pull the code id out of the tx events

```sh
export CODE_ID=$(zigchaind q tx "$TX" --node "$ZIG_NODE" --output json \
  | jq -r '.events[] | select(.type=="store_code") | .attributes[] | select(.key=="code_id") | .value')
echo "code_id=$CODE_ID"
```

### 3.2 Instantiate

```sh
ADMIN=$(zigchaind keys show "$ZIG_KEY" -a)

zigchaind tx wasm instantiate "$CODE_ID" '{}' \
  --label "counter-callback-demo" \
  --admin "$ADMIN" \
  --from "$ZIG_KEY" \
  --chain-id "$ZIG_CHAIN_ID" --node "$ZIG_NODE" \
  --gas auto --gas-adjustment 1.4 --gas-prices "$ZIG_GAS_PRICES" \
  --output json --yes
```

then extract the contract address:

```sh
export CONTRACT=$(zigchaind q wasm list-contract-by-code "$CODE_ID" \
  --node "$ZIG_NODE" --output json | jq -r '.contracts[-1]')
echo "contract=$CONTRACT"
```

### 3.3 Smoke-test the query path

```sh
zigchaind q wasm contract-state smart "$CONTRACT" '{"count":{}}' --node "$ZIG_NODE"
# → {"data":{"count":0}}
```

---

## 4. Open a `transfer` channel between the testnets

There's no long-lived public relayer between `osmo-test-5` and `zig-test-2`, so
you'll almost always need to stand up a channel yourself with
[Hermes](https://hermes.informal.systems/). Budget ~5 minutes plus a little
testnet ZIG + OSMO for the relayer's gas account.

> **If you already know of an open `transfer` channel between the two
> testnets**, skip to §5 and just look it up.

### 4.0 Install Hermes

Grab the prebuilt binary from the Hermes releases page. The latest known-good
version is **v1.13.3**.

```sh
HERMES_VERSION=v1.13.3
curl -LO "https://github.com/informalsystems/hermes/releases/download/${HERMES_VERSION}/hermes-${HERMES_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
tar -xzf "hermes-${HERMES_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
sudo mv hermes /usr/local/bin/
hermes version    # → hermes 1.13.3
```

> **On macOS?** Replace the asset in the `curl` URL with
> `hermes-${HERMES_VERSION}-aarch64-apple-darwin.tar.gz` (Apple Silicon) or
> `hermes-${HERMES_VERSION}-x86_64-apple-darwin.tar.gz` (Intel).

If you'd rather build from source (slow):

```sh
cargo install ibc-relayer-cli --bin hermes --locked
```

Full asset list and checksums: <https://github.com/informalsystems/hermes/releases>.

### 4.1 Write the Hermes config

```sh
mkdir -p ~/.hermes
cat > ~/.hermes/config.toml <<'EOF'
[global]
log_level = 'info'

[mode.clients]
enabled = true
refresh = true
misbehaviour = true

[mode.connections]
enabled = true

[mode.channels]
enabled = true

[mode.packets]
enabled = true
clear_interval = 100
clear_on_start = true
tx_confirmation = true

[[chains]]
id = 'zig-test-2'
type = 'CosmosSdk'
rpc_addr = 'https://testnet-rpc.zigchain.com:443'
grpc_addr = 'https://grpc-t.zigchain.nodestake.org:443'
event_source = { mode = 'push', url = 'wss://testnet-rpc.zigchain.com:443/websocket', batch_delay = '500ms' }
rpc_timeout = '15s'
account_prefix = 'zig'
key_name = 'zig-relayer'
store_prefix = 'ibc'
gas_price = { price = 2500000000, denom = 'azig' }
gas_multiplier = 1.4
max_gas = 4000000
clock_drift = '30s'
trusting_period = '6days'
trust_threshold = { numerator = '1', denominator = '3' }

[[chains]]
id = 'osmo-test-5'
type = 'CosmosSdk'
rpc_addr = 'https://rpc.testnet.osmosis.zone:443'
grpc_addr = 'https://grpc.osmotest5.osmosis.zone:443'
event_source = { mode = 'push', url = 'wss://rpc.testnet.osmosis.zone:443/websocket', batch_delay = '500ms' }
rpc_timeout = '15s'
account_prefix = 'osmo'
key_name = 'osmo-relayer'
store_prefix = 'ibc'
gas_price = { price = 0.1, denom = 'uosmo' }
gas_multiplier = 1.4
max_gas = 4000000
clock_drift = '30s'
trusting_period = '4days'
trust_threshold = { numerator = '1', denominator = '3' }
EOF
```

Validate:

```sh
hermes config validate
hermes health-check
```

Both chains should report `chain is healthy`.

### 4.2 Fund the relayer keys

Generate (or reuse) a 24-word mnemonic for each side and drop each into a
file — e.g. `zig.mnemonic`, `osmo.mnemonic`. Import:

```sh
echo "<your-seed-phrase>" > mnemonic.file || true
hermes keys add --chain zig-test-2   --mnemonic-file ./mnemonic.file || true
hermes keys add --chain osmo-test-5  --mnemonic-file ./mnemonic.file || true
shred mnemonic.file && rm mnemonic.file
```

Hermes prints the derived addresses. Fund each from the testnet faucets (§0).
10 ZIG / 10 OSMO is plenty for channel setup plus a handful of relayed
packets. Confirm:

```sh
hermes keys list --chain zig-test-2
hermes keys list --chain osmo-test-5
```

### 4.3 Create client, connection, and channel

One command creates a fresh light client on each side, a new connection on top
of them, and the `transfer ↔ transfer` channel:

```sh
hermes create channel \
  --a-chain osmo-test-5 --b-chain zig-test-2 \
  --a-port  transfer    --b-port  transfer  \
  --new-client-connection --yes
```

On success the tail of the output prints both channel IDs:

```text
a_side: ... channel_id: channel-XXXX ...   # Osmosis side
b_side: ... channel_id: channel-YYYY ...   # ZIGChain side
```

Record the Osmosis-side id — it's what `osmosisd tx ibc-transfer` will take:

```sh
export OSMO_CHANNEL="channel-XXXX"
```

## 5. Verify the Osmosis ↔ ZIGChain transfer channel

If you ran §4, you already know `$OSMO_CHANNEL` — this section is just a
sanity check, or the entry point for builders reusing an existing channel.

You need the `transfer` channel on the **Osmosis** side that points at ZIGChain.
The cheap way — enumerate Osmosis transfer channels that are open, then find the
one whose counterparty is on `zig-test-2`:

```sh
# list all open transfer channels on Osmosis testnet
osmosisd q ibc channel channels \
  --node "$OSMO_NODE" --output json --limit 5000 \
| jq -r '.channels[] | select(.port_id=="transfer" and .state=="STATE_OPEN")
        | [.channel_id, .counterparty.channel_id, .connection_hops[0]] | @tsv'
```

For each candidate, check its client-state to see which chain is on the other end:

```sh
CAND="channel-XXXX"          # from the list above
osmosisd q ibc channel client-state transfer "$CAND" \
  --node "$OSMO_NODE" --output json | jq -r '.client_state.chain_id'
# → should print "zig-test-2" for the one you want
```

Set:

```sh
export OSMO_CHANNEL="channel-XXXX"                     # the matching Osmosis-side channel-id
export ZIG_CHANNEL="channel-YYYY"                      # from counterparty.channel_id for OSMO_CHANNEL
export ZIG_RECEIVER="$(zigchaind keys show "$ZIG_KEY" -a)"   # where the tokens land on ZIGChain
```

---

## 6. Send the transfer with `dest_callback` memo

This is the whole point of the tutorial: a plain ICS-20 transfer from Osmosis,
with a memo that the callbacks middleware on ZIGChain will parse and use to
invoke our contract.

### 5.1 Minimal — counter bumps by 1

```sh
MEMO=$(jq -nc --arg addr "$CONTRACT" \
  '{dest_callback: {address: $addr, gas_limit: "5000000"}}')

osmosisd tx ibc-transfer transfer \
  transfer "$OSMO_CHANNEL" "$ZIG_RECEIVER" \
  "1000${OSMO_DENOM}" \
  --memo "$MEMO" \
  --from "$OSMO_KEY" \
  --chain-id "$OSMO_CHAIN_ID" --node "$OSMO_NODE" \
  --gas auto --gas-adjustment 1.4 --gas-prices "$OSMO_GAS_PRICES" \
  --packet-timeout-timestamp $(( $(date +%s%N) + 600000000000 )) \
  --yes
```

Memo shape the callbacks middleware is looking for:

```json
{
  "dest_callback": {
    "address": "<counter_contract_address_on_zigchain>",
    "gas_limit": "500000"
  }
}
```

- `address` — the contract whose `ibc_destination_callback` export the middleware invokes.
- `gas_limit` — optional cap (string, wei-of-gas); if missing or over the chain
  cap, the chain cap is used.
- The token transfer still happens normally — `ZIG_RECEIVER` gets the `ibc/…`
  voucher for `uosmo`. The callback is on top, not instead of.

### 5.2 With custom payload — counter bumps by `N`

Same transfer, but we also stash a sibling `counter` key in the memo. The
middleware ignores it; our contract reads it out of the packet memo and bumps
by that amount:

```sh
MEMO=$(jq -nc \
  --arg addr "$CONTRACT" \
  --argjson bump 5 \
  '{dest_callback: {address: $addr, gas_limit: "500000"},
    counter:       {bump_by: $bump}}')

osmosisd tx ibc-transfer transfer \
  transfer "$OSMO_CHANNEL" "$ZIG_RECEIVER" \
  "1000${OSMO_DENOM}" \
  --memo "$MEMO" \
  --from "$OSMO_KEY" \
  --chain-id "$OSMO_CHAIN_ID" --node "$OSMO_NODE" \
  --gas auto --gas-adjustment 1.4 --gas-prices "$OSMO_GAS_PRICES" \
  --packet-timeout-timestamp $(( $(date +%s%N) + 600000000000 )) \
  --yes
```

Same shape, now carrying your own payload:

```json
{
  "dest_callback": { "address": "zig1…", "gas_limit": "500000" },
  "counter": { "bump_by": 5 }
}
```

---

## 6.5 Relay the packet

There's no long-lived public relayer between `osmo-test-5` and `zig-test-2`, so
you need to deliver the packet yourself. One-shot clear is enough for a demo —
no need to keep `hermes start` running in the background.

```sh
hermes clear packets \
  --chain osmo-test-5 \
  --port transfer \
  --channel "$OSMO_CHANNEL"
```

Hermes will scan for pending packets on the given channel and submit
`MsgRecvPacket` / `MsgAcknowledgePacket` on the counterparty until the channel
is drained. Watch for `Success: RecvPacket` lines in the output.

## 7. Verify

Once `hermes clear packets` returns, query ZIGChain:

```sh
# after 5.1 (no custom payload): count = 1
# after 5.2 with bump_by=5:      count = 6
zigchaind q wasm contract-state smart "$CONTRACT" '{"count":{}}' \
  --node "$ZIG_NODE"
# → {"data":{"count":6}}

# last observed transfer metadata
zigchaind q wasm contract-state smart "$CONTRACT" '{"last_transfer":{}}' \
  --node "$ZIG_NODE" --output json | jq
# → {"data":{"last_transfer":{"sender":"osmo1…","receiver":"zig1…","funds":[{"denom":"ibc/…","amount":"1000"}]}}}
```

The callback emits a `bump_by` attribute on its tx events, so you can also
verify directly from the packet-receive tx on ZIGChain:

```sh
zigchaind q txs --query "recv_packet.packet_dst_channel='${ZIG_CHANNEL}'" \
  --node "$ZIG_NODE" --output json --limit 1 \
  | jq '.txs[0].events[] | select(.type=="wasm") | .attributes'
```

---

## 8. Troubleshooting

**Counter stays at 0 after the transfer confirms on Osmosis.**

1. Packet not relayed yet — re-run `hermes clear packets` (§6.5) and watch its
   output for `Success: RecvPacket` tied to your `$OSMO_CHANNEL`.
2. Callbacks middleware isn't wired into ZIGChain's ICS-20 stack. On v3.0.0
   testnet it is, but if you're targeting a custom build, confirm with the ZIGChain
   team.
3. `gas_limit` too low — bump it in the memo and retry.
4. Memo JSON malformed — the middleware falls back to a plain transfer (tokens
   arrive, callback doesn't). Re-emit with `jq -nc` as shown above rather than
   hand-crafting.

**`Missing export ibc_destination_callback` in the RecvPacket events.**
The contract was compiled without a top-level `#[entry_point] fn ibc_destination_callback(...)`.
On cosmwasm-std 2.x this is a dedicated wasm export, **not** a `sudo` variant.
Rebuild with the entry point shown in §2 and re-store — the old code id is
now unusable for callbacks.

**`Wasm contract requires unavailable capabilities: {"cosmwasm_3_0"}`.**
ZIGChain v3.0.0 runs wasmvm v2.2.x. Pin `cosmwasm-std = "2.2"` with features
`["cosmwasm_2_2", "stargate"]` and parse the ICS-20 packet from
`cb.packet.data` yourself — the `.transfer` convenience field only exists on
3.0.

**`insufficient fees`.**
Bump `--gas-adjustment` to `1.5` and/or set a higher `--gas-prices`.

**Receiver address rejected.**
Make sure `$ZIG_RECEIVER` is the bech32 form on ZIGChain (`zig1…`), not the
Osmosis address.

---

## Repo layout

```
.
├── README.md
└── contract/
    ├── Cargo.toml
    ├── rust-toolchain.toml
    ├── .cargo/config.toml
    └── src/
        ├── lib.rs        # module wiring
        ├── contract.rs   # instantiate/execute/query + ibc_destination_callback entry point
        ├── msg.rs        # InstantiateMsg / ExecuteMsg / QueryMsg
        ├── state.rs      # COUNT + LAST_TRANSFER storage items
        └── error.rs      # ContractError
```

## References

- ZIGChain docs: <https://docs.zigchain.com/>
- ZIGChain networks (chain-id, endpoints, genesis): <https://github.com/ZIGChain/networks>
- IBC callbacks middleware overview:
  <https://ibc.cosmos.network/main/middleware/callbacks/overview/>
- CosmWasm destination callback types:
  <https://docs.rs/cosmwasm-std/latest/cosmwasm_std/struct.IbcDestinationCallbackMsg.html>
