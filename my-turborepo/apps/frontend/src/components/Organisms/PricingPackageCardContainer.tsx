import { Button } from "@/Components/ui/button";
import { Gig } from "@fiverr/shared";
import { Heart, MoreHorizontal, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import PricingPackageCard from "@/Components/Organisms/PricingPackageCard";

export function PricingPackageCardContainer({
  packages,
  className,
}: {
  packages: Gig["packages"];
  className?: string;
}): React.JSX.Element {
  className = cn("sticky top-0 col-span-4 min-w-[300px] self-start", className);
  return (
    <div className={className}>
      <div className="flex items-center justify-end gap-2 border-b border-gray-200 bg-white p-2">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Heart className="mr-1 h-5 w-5" />
          <span className="font-medium">4,980</span>
          <span className="sr-only">Likes</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <MoreHorizontal className="h-6 w-6" />
          <span className="sr-only">More options</span>
        </Button>
      </div>
      <PricingPackageCard packages={packages} />
    </div>
  );
}
