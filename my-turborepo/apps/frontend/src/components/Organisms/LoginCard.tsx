import LoginCardLeft from "@/Components/Molecules/LoginCardLeft";
import LoginCardRight from "@/Components/Organisms/LoginCardRight";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type LoginCardProps = {
  onCloseModal?: () => void;
  isModal: boolean;
};

export default function LoginCard({ onCloseModal, isModal }: LoginCardProps) {
  const [triggerAnim, setTriggerAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => setTriggerAnim(true), 10);
  }, []);

  let className = cn(
    "bg-gray-50 lg:bg-white transition-all duration-500 shadow-xl lg:shadow-none lg:outline-none lg:mx-0 lg:w-screen z-10 mx-auto h-[645px] w-[875px] overflow-hidden rounded-lg outline outline-1 outline-gray-100  mb-8",
    isModal &&
      "lg:shadow-xl lg:outline lg:mx-auto lg:w-[400px] min-h-[645px] w-[875px] mb-0 sm:w-screen sm:h-screen sm:translate-y-[100%] sm:opacity-0",
    triggerAnim && "sm:translate-y-0 sm:opacity-100 ",
  );
  return (
    <div className={className}>
      <div className="grid h-full grid-cols-2 lg:grid-cols-1">
        <LoginCardLeft />
        <LoginCardRight isModal={isModal} onCloseModal={onCloseModal} />
      </div>
    </div>
  );
}
