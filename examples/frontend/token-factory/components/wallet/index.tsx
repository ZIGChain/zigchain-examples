"use client";

import { useBalances } from "@/lib/hooks/useBalances";
import { useTokenPrices } from "@/lib/hooks/useTokenPrices";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  getTokenDisplayName,
  getTokenDisplaySymbol,
  getTokenIconUrl,
} from "@/lib/utils/tokenDisplay";
import {
  formatHumanAmount,
  getDecimalsFromDenom,
  toHumanAmount,
} from "@/lib/utils/tokenPrices";
import { ZigchainAddressAvatar } from "@/lib/utils/ZigchainAddressAvatar";
import { shortenAddress } from "@/lib/utils/utils";
import { useChain } from "@cosmos-kit/react";
import {
  Button,
  Divider,
  Snippet,
  Spinner,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import clsx from "clsx";
import { Power } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Drawer } from "vaul";

export function WalletView() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { address, disconnect } = useChain("zigchain");

  const [open, setOpen] = useState(false);

  const { balances, isLoading, error, mutate } = useBalances(address ?? "");

  const symbols = (balances ?? []).map((b: any) =>
    b.denom?.symbol
      ? String(b.denom.symbol).toUpperCase()
      : (b.denom?.ticker ?? "").toUpperCase(),
  );
  const prices = useTokenPrices(symbols);

  const totalUsd = (balances ?? []).reduce((sum: number, b: any) => {
    const symbol = b.denom?.symbol
      ? String(b.denom.symbol).toUpperCase()
      : (b.denom?.ticker ?? "").toUpperCase();
    const decimals = getDecimalsFromDenom(b.denom);
    const human = toHumanAmount(b.amount, decimals);
    const price = prices[symbol] ?? 0;
    return sum + human * price;
  }, 0);

  function formatUsd(value: number) {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${Math.max(0, value).toFixed(2)}`;
  }

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch balances");
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (open) {
      mutate();
    }
  }, [open, mutate]);

  return (
    <Drawer.Root
      direction={isDesktop ? "right" : "bottom"}
      open={open}
      onOpenChange={setOpen}
    >
      <Drawer.Trigger asChild>
        <Button
          startContent={
            <ZigchainAddressAvatar
              className="w-5 h-5"
              address={address ?? "0"}
            />
          }
          variant="ghost"
        >
          {shortenAddress(address ?? "Loading..")}
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={clsx(
            "z-[999999] bg-primary-foreground flex flex-col rounded-t-[10px] focus:outline-none",
            isDesktop
              ? "h-full w-[min(400px,90vw)] mt-24 fixed bottom-0 right-0"
              : "h-[96%] mt-24 fixed bottom-0 left-0 right-0",
          )}
        >
          <div className="p-4 bg-primary-foreground flex-1 h-full">
            <div className="max-w-md mx-auto">
              {!isDesktop && (
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              )}
              <Drawer.Title className="font-medium mb-4">
                <div className="w-full flex flex-row items-center gap-3">
                  <ZigchainAddressAvatar
                    className="w-8 h-8 flex-shrink-0"
                    address={address ?? "0"}
                  />
                  <div className="flex-1 min-w-0">
                    <Snippet
                      symbol=""
                      variant="flat"
                      size="sm"
                      codeString={address}
                      disableTooltip
                      classNames={{
                        content: "truncate max-w-full",
                      }}
                    >
                      {shortenAddress(address ?? "Loading..")}
                    </Snippet>
                  </div>
                  <Button
                    className="flex-shrink-0"
                    variant="light"
                    isIconOnly
                    size="sm"
                    onPress={() => {
                      disconnect({});
                    }}
                  >
                    <Power size={20} />
                  </Button>
                </div>
              </Drawer.Title>

              {isLoading && <Spinner color="white" />}

              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="font-semibold text-3xl">
                    {formatUsd(totalUsd)}
                  </h1>
                  <p className="text-muted-foreground text-sm">Total value</p>
                </div>

                <Tabs variant="light" aria-label="Wallet tabs">
                  <Tab key="tokens" title="Tokens" />
                </Tabs>

                <div className="space-y-3">
                  {balances?.map((balance: any) => {
                    const symbol = balance.denom?.symbol
                      ? String(balance.denom.symbol).toUpperCase()
                      : (balance.denom?.ticker ?? "").toUpperCase();
                    const decimals = getDecimalsFromDenom(balance.denom);
                    const human = toHumanAmount(balance.amount, decimals);
                    const price = prices[symbol] ?? 0;
                    const usdValue = human * price;

                    const denomBase =
                      balance.denom?.base ?? balance.denom?.denom;
                    const tickerOrSymbol =
                      balance.denom?.symbol ?? balance.denom?.ticker;
                    const shortName = getTokenDisplayName(
                      denomBase,
                      tickerOrSymbol,
                    );
                    const shortSymbol = getTokenDisplaySymbol(
                      denomBase,
                      tickerOrSymbol,
                    );
                    const displayName =
                      shortName ||
                      balance.denom?.name ||
                      balance.denom?.denom ||
                      "";
                    const displaySymbol =
                      shortSymbol ||
                      tickerOrSymbol ||
                      balance.denom?.denom ||
                      "";

                    return (
                      <div
                        key={
                          balance.denom?.name ??
                          balance.denom?.denom ??
                          balance.denom?.base
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <User
                              name=""
                              description=""
                              avatarProps={{
                                src:
                                  getTokenIconUrl(
                                    balance.denom?.icon,
                                    tickerOrSymbol ?? symbol,
                                  ) || undefined,
                                name: (displaySymbol || symbol)
                                  .toString()
                                  .toUpperCase(),
                                size: "sm",
                              }}
                              classNames={{
                                name: "hidden",
                                description: "hidden",
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {displayName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {displaySymbol}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-sm font-mono">
                              {formatHumanAmount(balance.amount, decimals, 2)}{" "}
                              {displaySymbol}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatUsd(usdValue)}
                            </p>
                          </div>
                        </div>
                        <Divider className="mt-3" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
