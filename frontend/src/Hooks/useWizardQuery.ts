"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useWizardQuery(currentStep?: number) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const wizard =
    searchParams.get("wizard") !== null
      ? Number(searchParams.get("wizard"))
      : currentStep;
  const updateQuery = useCallback(
    (cb: (wizard: number) => number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("wizard", String(cb(wizard || 0)));
      router.refresh();
      router.push(pathname + "?" + params.toString());
      return;
    },
    [searchParams],
  );
  return {
    wizard: wizard,
    updateQuery,
  };
}
