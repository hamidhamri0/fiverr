import { IoMdCheckmark } from "react-icons/io";

export default function LoginCardLeft() {
  return (
    <div className="relative lg:hidden">
      <div className="absolute left-0 top-0 h-full w-full">
        <img src="/bigImages/login.png" alt="login" />
      </div>
      <div className="relative z-10 p-14 text-gray-100">
        <h2 className="mb-4 text-3xl font-bold">Success starts here</h2>
        <ul>
          <li className="mb-4 flex items-center gap-2 text-xl">
            <span>
              <IoMdCheckmark size={16} />
            </span>
            <span>Over 700 categories</span>
          </li>
          <li className="mb-4 flex items-center gap-2 text-xl">
            <span>
              <IoMdCheckmark size={16} />
            </span>
            <span>Quality work done faster</span>
          </li>{" "}
          <li className="flex items-center gap-2 text-xl">
            <span className="mt-2 self-start">
              <IoMdCheckmark size={16} />
            </span>
            <span>Access to talent and businesses across the globe</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
