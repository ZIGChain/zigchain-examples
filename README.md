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

| Category     | Example       | Path                              | Description                                                                                                                                                                                               |
| ------------ | ------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | Token Factory | `examples/frontend/token-factory` | Next.js app that provides a full **token factory interface**: create new tokens (denoms) on ZIGChain, set metadata and images (IPFS), mint supply, and list all tokens in a table with wallet connection. |

More examples will be added over time. Check the `examples/` folder for the latest list.

## Repository Structure

```
zigchain-examples/
├── README.md
├── LICENSE
└── examples/
    └── frontend/
        └── token-factory/
```

## Tutorials

For step-by-step guides that use these examples:

- **ZIGChain Docs** – [Tutorial Docs](https://docs.zigchain.com/tutorials)
- **Token Factory tutorial** – See the [Token Factory README](examples/frontend/token-factory/README.md) and the related article on the ZIGChain docs.

We will add direct links here as tutorials are published.

## License

See [LICENSE](LICENSE) in this repository.
