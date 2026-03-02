"use client";

import { useChain } from "@cosmos-kit/react";
import { Button } from "@nextui-org/react";
import { ArrowDownToLine, IterationCw, Wallet } from "lucide-react";
import { WalletView } from "../wallet";

const buttons = {
  Disconnected: {
    icon: Wallet,
    title: "Connect Wallet",
  },
  Connected: {
    icon: Wallet,
    title: "My Wallet",
  },
  Rejected: {
    icon: IterationCw,
    title: "Reconnect",
  },
  Error: {
    icon: IterationCw,
    title: "Change Wallet",
  },
  NotExist: {
    icon: ArrowDownToLine,
    title: "Install Wallet",
  },
};

export const WalletButton = () => {
  const {
    connect,
    openView,
    status,
    username,
    address,
    chain: chainInfo,
    assets,
    logoUrl,
  } = useChain("zigchain");

  const chain = {
    chainName: "zigchain",
    label: chainInfo.pretty_name,
    value: "zigchain",
    icon: logoUrl,
  };

  const buttonData =
    buttons[status as keyof typeof buttons] ?? buttons.Disconnected;

  if (status === "Connected") {
    return <WalletView />;
  }

  return (
    <div>
      <Button
        variant="flat"
        onPress={() => {
          connect();
        }}
        startContent={<buttonData.icon />}
      >
        {buttonData.title}
      </Button>
    </div>
  );
};
