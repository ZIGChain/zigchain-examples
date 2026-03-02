"use client";

import { WalletContextProvider } from "@/context/ChainContext";
import { NetworkContextProvider } from "@/context/NetworkContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <NetworkContextProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </NetworkContextProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
