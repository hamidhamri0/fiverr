"use client";
import SelectedFilter from "@/Components/Molecules/SelectedFilter";
import React from "react";

export default function SelectedFilters() {
  return (
    <div className="mx-auto mb-6 flex max-w-[1450px] flex-wrap items-center gap-4 px-2">
      <SelectedFilter />
      <SelectedFilter />
    </div>
  );
}
