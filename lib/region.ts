"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Region = "AU" | "MY";
export type Market = "Australia" | "Malaysia";

export const MARKET: Record<Region, Market> = { AU: "Australia", MY: "Malaysia" };

const STORAGE_KEY = "thinkrisk-region";

type RegionContextValue = { region: Region; setRegion: (r: Region) => void };

const RegionContext = createContext<RegionContextValue>({ region: "AU", setRegion: () => {} });

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>("AU");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "AU" || saved === "MY") setRegionState(saved);
    } catch {
      /* storage unavailable: keep the default */
    }
  }, []);

  const setRegion = useCallback((r: Region) => {
    setRegionState(r);
    try {
      window.localStorage.setItem(STORAGE_KEY, r);
    } catch {
      /* ignore */
    }
  }, []);

  return createElement(RegionContext.Provider, { value: { region, setRegion } }, children);
}

export function useRegion() {
  return useContext(RegionContext);
}

/**
 * Formats a price for the active region. Malaysian prices are not yet supplied, so when
 * the MYR value is null the AUD price is shown instead.
 */
export function formatPrice(region: Region, aud: number, myr: number | null) {
  if (region === "MY" && myr != null) return `MYR ${myr.toLocaleString("en-MY")}`;
  return `AUD $${aud.toLocaleString("en-AU")}`;
}
