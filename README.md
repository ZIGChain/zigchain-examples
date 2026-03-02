# Zigchain Examples

A collection of example projects for [Zigchain](https://zigchain.com)—frontend apps, smart contracts, and integrations you can clone and run.

## Purpose

This repository is the official source for **Zigchain example code**. Use it to:

- **Learn** how to build on Zigchain (wallets, token factory, RPC, contracts).
- **Start quickly** by cloning a single example instead of the whole repo.
- **Follow tutorials** that reference these examples step-by-step.

Each example is self-contained so you can copy only what you need.

## How to Download a Single Example

We recommend [degit](https://github.com/Rich-Harris/degit) to download one example without git history:

```bash
npx degit ZIGChain/zigchain-examples/examples/frontend/token-factory zigchain-token-factory
cd zigchain-token-factory
npm i
npm run dev
```

Replace the path with the example you want (see table below). The last argument is the folder name on your machine.

**Using git instead:**

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/ZIGChain/zigchain-examples.git zigchain-examples
cd zigchain-examples
git sparse-checkout set examples/frontend/token-factory
```

Then copy the contents of `examples/frontend/token-factory` into your project folder.

## Table of Available Examples

| Category            | Example       | Path                                    | Description                         |
| ------------------- | ------------- | --------------------------------------- | ----------------------------------- |
| **Frontend**        | Token Factory | `examples/frontend/token-factory`       | Next.js token factory UI            |

More examples will be added over time. Check the `examples/` folder for the latest list.

## Repository Structure

```
zigchain-examples/
├── README.md
├── LICENSE
└── examples/
    ├── frontend/
    │   └── token-factory/
```

## Tutorials

For step-by-step guides that use these examples:

- **Zigchain Docs** – [docs.zigchain.com](https://docs.zigchain.com/tutorials)
- **Token Factory tutorial** – See the [Token Factory README](examples/frontend/token-factory/README.md) and the related article on the Zigchain blog/docs.

We will add direct links here as tutorials are published.

## License

See [LICENSE](LICENSE) in this repository.
