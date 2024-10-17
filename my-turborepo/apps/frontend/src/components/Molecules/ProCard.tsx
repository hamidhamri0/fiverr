import { MdVerified } from "react-icons/md";

export default function ProCard() {
  return (
    <div className="flex items-center justify-center gap-1 rounded-lg bg-[#2E25AD] px-2">
      <MdVerified fill="white" size={15} />
      <span className="text-sm font-semibold text-gray-200">Pro</span>
    </div>
  );
}
