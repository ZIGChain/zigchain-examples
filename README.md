> **Disclaimer**
> This tutorial demonstrates an example flow and sample contract behavior. Validate chain settings, gas values, permissions, and contract logic for your own environment before any production use.

# ZIGChain Examples

A collection of example projects for [ZIGChain](https://zigchain.com)—frontend apps, smart contracts, and integrations you can clone and run.

## Purpose

This repository is the official source for **ZIGChain example code**. Use it to:

- **Learn** how to build on ZIGChain (wallets, token factory, RPC, contracts).
- **Start quickly** by cloning a single example instead of the whole repo.
- **Follow tutorials** that reference these examples step-by-step.

Each example is self-contained so you can copy only what you need.

## How to Download a Single Example

Use git sparse checkout to download only the example you need:

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/ZIGChain/zigchain-examples.git zigchain-examples
cd zigchain-examples
git sparse-checkout set examples/frontend/token-factory
```

Then copy the contents of `examples/frontend/token-factory` into your project folder (or work from that directory). Replace `examples/frontend/token-factory` with the path of the example you want (see table below).

## Table of Available Examples

| Category        | Example              | Path                                     | Description                                                                                                                                                                                               |
| --------------- | -------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**    | Token Factory        | `examples/frontend/token-factory`        | Next.js app that provides a full **token factory interface**: create new tokens (denoms) on ZIGChain, set metadata and images (IPFS), mint supply, and list all tokens in a table with wallet connection. |
| **Integration** | ibc-callbacks-module | `examples/integrations/callbacks-module` | End-to-end IBC callbacks tutorial showing how an ICS-20 transfer memo (`dest_callback`) on Osmosis can trigger a CosmWasm contract callback on ZIGChain.                                                  |

More examples will be added over time. Check the `examples/` folder for the latest list.

## Repository Structure

```
zigchain-examples/
├── README.md
├── LICENSE
└── examples/
    ├── frontend/
    │   └── token-factory/
    └── integrations/
        └── callbacks-module/
```

## Tutorials

For step-by-step guides that use these examples:

- **ZIGChain Docs** – [Tutorial Docs](https://docs.zigchain.com/tutorials)
- **Token Factory tutorial** – See the [Token Factory README](examples/frontend/token-factory/README.md) and the [Build a Token Factory in 15 Minutes](https://docs.zigchain.com/tutorials/build-a-factory-in-15-mins) article on the ZIGChain docs.
- **ibc-callbacks-module** – See the [Callbacks Module README](examples/integrations/callbacks-module/README.md) and the [ibc-callbacks-module](https://docs.zigchain.com/tutorials/ibc-callbacks-module) article on the ZIGChain docs.

## License

See [LICENSE](LICENSE) in this repository.
