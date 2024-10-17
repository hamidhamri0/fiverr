import Button from "@/Components/Atoms/Btn";
import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function EmailLogin({
  setLogin,
}: {
  setLogin: Dispatch<SetStateAction<string>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch("http://localhost:3001/auth/login");
    console.log(email, password);
  }

  return (
    <div>
      <button
        onClick={() => setLogin("loginOptions")}
        className="mb-6 flex items-center gap-1"
      >
        <span>
          <FaArrowLeftLong color="gray" />
        </span>
        <span className="font-semibold">back</span>
      </button>
      <h3 className="mb-6 text-2xl font-bold">
        Continue with your email or username
      </h3>
      <div>
        <label className="mb-2 block font-semibold">Email or username</label>
        <input
          onChange={(e) => {
            setEmail(() => e.target.value);
          }}
          type="text"
          className="mb-4 w-full rounded-lg border border-gray-200 p-2 outline-none"
        />
        <label className="mb-2 block font-semibold">Password</label>
        <input
          onChange={(e) => {
            setPassword(() => e.target.value);
          }}
          type="password"
          className="mb-4 w-full rounded-lg border border-gray-200 p-2 outline-none"
        />
        <div
          onClick={() => setLogin("forgetPassword")}
          className="mb-4 flex justify-end"
        >
          <a className="cursor-pointer text-sm underline">Forgot password?</a>
        </div>
        <Button
          grow={true}
          className="mb-3 border-gray-200 hover:border-gray-200 hover:bg-gray-100 hover:bg-opacity-40 hover:text-black"
          color="white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
