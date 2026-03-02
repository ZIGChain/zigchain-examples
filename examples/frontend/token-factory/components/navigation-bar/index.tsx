"use client";

import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import { ENV_VARS } from "@/lib/env";
import { ModeToggle } from "../mode-toggle";
import { NetworkSwitch } from "../network-switch";
import { WalletButton } from "../wallet-button";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: any[] = [];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      classNames={{
        item: ["data-[active=true]:bg-secondary"],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src="/logo.png"
            alt={ENV_VARS.SITE_TITLE}
            width={50}
            height={50}
          />
          <p
            id="logo-text"
            className="ml-4 font-bold font-ps2p text-lg tracking-wider"
          >
            {ENV_VARS.SITE_TITLE.toUpperCase()}
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link className="text-xl" color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <NetworkSwitch />
        </NavbarItem>
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
        <NavbarItem>
          <WalletButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"primary"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
