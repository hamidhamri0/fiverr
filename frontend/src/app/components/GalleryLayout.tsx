import React from "react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
//DISPLAY 32 PICTURE

function GalleryImage({ image }: { image: string }) {
  const [addedToList, setAddedToList] = useState(false);

  return (
    <div
      key={image}
      className="hover:after:ease hover:after:rounded-inherit group relative max-w-[350.5px] flex-none transition-all hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[120px] hover:after:bg-gradient-to-t hover:after:from-[rgba(0,0,0,0.7)] hover:after:to-transparent hover:after:opacity-0 hover:hover:after:opacity-100 hover:after:transition-opacity hover:after:duration-300 hover:after:content-[''] 2xl:max-w-[400.5px] xl:max-w-[450.5px] lg:max-w-[300px]"
    >
      <img
        src={`/images/${image}`}
        alt={image}
        className="h-auto w-full rounded-lg"
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

export default function GalleryLayout() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="mx-auto mb-12 max-w-[1450px]">
      <h2 className="mb-6 p-4 text-2xl font-bold text-gray-900">
        Get inspired by work done in the Logo Design category
      </h2>
      <div className="flex max-h-[2000px] flex-col flex-wrap content-center gap-4 overflow-y-auto 2xl:max-h-[3000px] xl:max-h-[4500px] sm:max-h-[6000px]">
        {images
          .filter((el) => el !== "search.png" && el !== "logo.png")
          .map((image) => {
            return <GalleryImage key={image} image={image} />;
          })}
      </div>
    </div>
  );
}
// in css , lets say i have a div with flex, and inside it a lot of div ,
