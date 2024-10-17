import { Skeleton } from "@/Components/Atoms/skeleton";

interface GigListProps {
  numberOfGigs?: number;
}

export default function GigList({ numberOfGigs = 4 }: GigListProps) {
  const gigs = Array(numberOfGigs).fill(null);
  const getGridClass = () => {
    switch (numberOfGigs) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "min-w-[calc(100%/5)] xl:min-w-[calc(100%/4)] lg:min-w-[calc(100%/3)] md:min-w-[calc(100%/2)] xs:min-w-full";
      case 5:
        return "min-w-[calc((100%-4*1.25rem)/5)] xl:min-w-[calc((100%-3*1.25rem)/4)] lg:min-w-[calc((100%-2*1.25rem)/3)] md:min-w-[calc((100%-1*1.25rem)/2)] xs:min-w-full";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6";
    }
  };

  return (
    <div className="mb-12 px-4">
      <h2 className="mb-6 text-2xl font-bold">Gig for you</h2>
      <div className="flex w-full gap-5 overflow-hidden">
        {gigs.map((_, index) => (
          <div key={index} className={`w-full ${getGridClass()} space-y-4`}>
            <div className="relative w-full pt-[56.25%]">
              <Skeleton className="absolute left-0 top-0 h-full w-full rounded-lg" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
