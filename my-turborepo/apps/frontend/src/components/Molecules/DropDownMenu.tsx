import { ReactNode } from "react";

type Notification = {
  id: number;
  message: string;
};

type Message = {
  name: string;
  username: string;
  message: string;
};

type Item = Notification | Message;

export default function DropDownMenu({
  label,
  Icon,
  render,
  items,
}: {
  label: string;
  Icon: ReactNode;
  items: Item[];
  render: (el: Item, index: number) => ReactNode;
}) {
  return (
    <div className="flex h-[485px] w-[400px] flex-col border border-gray-100 bg-gray-50 shadow-md">
      <div className="flex items-center gap-1 border-b border-gray-100 bg-white p-3 font-semibold tracking-tighter">
        {Icon}
        <span>{label} (1)</span>
      </div>
      <div className="flex-grow overflow-y-scroll">{items.map(render)}</div>
    </div>
  );
}
