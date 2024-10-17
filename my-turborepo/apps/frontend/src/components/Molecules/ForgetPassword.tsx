import Button from "@/Components/Atoms/Btn";
import { Dispatch, SetStateAction } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function ForgetPassword({
  setLogin,
}: {
  setLogin: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="h-full w-full">
      <button
        onClick={() => setLogin("loginEmail")}
        className="mb-6 flex items-center gap-1"
      >
        <span>
          <FaArrowLeftLong color="gray" />
        </span>
        <span className="font-semibold">back</span>
      </button>
      <h3 className="mb-2 text-2xl font-bold">Reset password</h3>
      <h4 className="mb-6">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </h4>
      <div>
        <label className="mb-2 block font-semibold">Email</label>
        <input
          type="text"
          placeholder="name@email.com"
          className="mb-6 w-full rounded-lg border border-gray-200 p-2 outline-none"
        />
        <Button
          grow={true}
          className="mb-3 border-gray-200 hover:border-gray-200 hover:bg-opacity-80"
          color="black"
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}
