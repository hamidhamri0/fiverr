import { IoLocationOutline } from "react-icons/io5";

export default function Location({ location }: { location: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-900">
      <span>
        <IoLocationOutline size={20} />
      </span>
      <span>{location}</span>
    </div>
  );
}
