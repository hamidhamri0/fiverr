import { Skeleton } from "@/Components/Atoms/skeleton";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function GalleryImage({ image }: { image: string }) {
  const [addedToList, setAddedToList] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="group relative break-inside-avoid py-2 transition-all hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[120px] hover:after:bg-gradient-to-t hover:after:from-[rgba(0,0,0,0.7)] hover:after:to-transparent hover:after:opacity-0 hover:hover:after:opacity-100 hover:after:transition-opacity hover:after:duration-300 hover:after:content-['']">
      {!imageLoaded && (
        <Skeleton className="absolute inset-0 mb-4 rounded-lg" />
      )}
      <Image
        src={`/images/${image}`}
        alt={image}
        width={320}
        height={400}
        className={`w-full rounded-lg object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setImageLoaded(true)}
      />
      <span
        onClick={() => setAddedToList((p) => !p)}
        className="absolute right-3 top-3 rounded-full bg-gray-100 p-3 opacity-0 group-hover:opacity-100"
      >
        {addedToList ? (
          <FaHeart size={25} color="black" fill="red" />
        ) : (
          <FaHeart size={25} color="black" fill="#a09d9dc0" />
        )}
      </span>
      <div className="absolute bottom-4 left-4 z-50 text-white opacity-0 group-hover:opacity-100">
        <p>
          Featured In: <strong>Logo Design</strong>
        </p>
        <a>
          by: <strong className="cursor-pointer underline">jack Kun</strong>
        </a>
      </div>
    </div>
  );
}
