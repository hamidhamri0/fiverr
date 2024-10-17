import ServiceOverviewCard from "@/Components/Molecules/ServiceOverviewCard";
import React from "react";
import { TbCategoryPlus } from "react-icons/tb";

export default function ServicesOverview() {
  return (
    <div className="mx-auto mb-12 grid max-w-[1450px] grid-cols-[repeat(auto-fill,_minmax(310px,_1fr))] gap-6 p-4">
      <ServiceOverviewCard
        icon={<TbCategoryPlus size={40} />}
        title="Over 700 categories"
        description="Get results from skilled freelancers from all over the world, for every task, at any price point."
      />
      <ServiceOverviewCard
        icon={<TbCategoryPlus size={40} />}
        title="Over 700 categories"
        description="Get results from skilled freelancers from all over the world, for every task, at any price point."
      />
    </div>
  );
}
