import { MdVerified } from "react-icons/md";

type ProCardProps = {
  pro: boolean;
};

export default function ProCard({ pro }: ProCardProps) {
  return (
    <>
      {pro && (
        <div className="ml-auto flex items-center justify-center gap-1 rounded-lg bg-[#2E25AD] px-2">
          <MdVerified fill="white" size={15} />
          <span className="text-sm font-semibold text-gray-200">Pro</span>
        </div>
      )}
    </>
  );
}
