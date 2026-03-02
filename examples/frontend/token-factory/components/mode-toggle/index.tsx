"use client";

import { Button } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      {
        <Button
          isIconOnly
          variant="light"
          aria-label="Light mode"
          onPress={onChange}
        >
          {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
        </Button>
      }
    </div>
  );
}
