"use client";

import { HotkeysProvider } from "react-hotkeys-hook";
import { SpeedDial } from "./speed-dial";

export function HotkeysWrapper() {
  return (
    <HotkeysProvider>
      <SpeedDial />
    </HotkeysProvider>
  );
}