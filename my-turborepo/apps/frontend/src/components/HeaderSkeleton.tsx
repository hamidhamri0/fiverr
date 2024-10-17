import { Skeleton } from "@/Components/Atoms/skeleton";
import Spinner from "./Atoms/Spinner";

export default function SkeletonHeader() {
  return (
    <div>
      <header className="mx-auto grid max-w-[1450px] grid-cols-12 gap-2 px-4 py-5">
        <div className="col-span-8 flex items-center space-x-4">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 flex-grow" />
        </div>
        <div className="col-span-4 flex items-center gap-2 space-x-4">
          <Skeleton className="h-12 w-[100%]" />
        </div>
      </header>

      <div className="h-screen">
        <Skeleton className="flex h-screen w-screen items-center justify-center">
          <Spinner height={10} width={10} color="fill-green-500" />
        </Skeleton>
      </div>
    </div>
  );
}
