import { BiArrowToRight } from "react-icons/bi";
export default function CategoryCarouselCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-white p-3 shadow-md">
      <div className="h-10 w-10">
        <img className="h-full w-full" src={image} />
      </div>
      <h2 className="font-semibold">{title}</h2>
      <BiArrowToRight size={20} />
    </div>
  );
}
