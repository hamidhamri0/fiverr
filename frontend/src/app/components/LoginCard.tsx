import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdCheckmark } from "react-icons/io";
import Button from "./smallComponents/Button";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import useLoginStore from "./stores/loginStore";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

function LoginCardLeft() {
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

// 332029646132-gea7ndchld2h8r8kc3jrvqumu2ee1t8j.apps.googleusercontent.com
// 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

function LoginOptions({
  onCloseModal,
  isModal,
  setLogin,
}: {
  isModal: boolean;
  onCloseModal?: () => void;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  const { loginMode, toggleLoginMode } = useLoginStore((state) => ({
    loginMode: state.loginMode,
    toggleLoginMode: state.toggleLoginMode,
  }));
  const handleGoogleSuccess = (credentialResponse: any) => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.log("Login Failed"),
  });

  return (
    <>
      <div className="lg:hidden">
        <h3 className="mb-2 text-2xl font-bold">Sign in to your account</h3>
        <p className="mb-12">
          <span>Don’t have an account? </span>
          <span
            onClick={() =>
              toggleLoginMode("signin" === loginMode ? "signup" : "signin")
            }
            className="cursor-pointer underline"
          >
            {loginMode == "signup" ? "Join here" : "Sign in"}
          </span>
        </p>
      </div>
      <div>
        <div
          className={`mb-2 hidden items-center justify-between ${isModal ? "lg:flex" : ""}`}
        >
          <div className="w-28">
            <svg
              width="89"
              height="27"
              viewBox="0 0 89 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#404145">
                <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
              </g>
              <g fill="#1dbf73">
                <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
              </g>
            </svg>
          </div>
          <span
            onClick={() => onCloseModal?.()}
            className="cursor-pointer text-2xl"
          >
            x
          </span>
        </div>
        <div
          className={`mb-12 mt-14 hidden lg:block ${!isModal ? "mt-0" : ""}`}
        >
          <h3 className="mb-2 text-4xl font-bold">
            Success <span className="text-pink-500">starts</span> here.
          </h3>
        </div>
      </div>
      <div className="mb-6">
        <Button
          IconLeft={<FcGoogle className="mr-auto" size={20} />}
          grow={true}
          className="mb-3 border-gray-200 hover:border-gray-200 hover:bg-gray-100 hover:bg-opacity-40 hover:text-black"
          color="white"
          onClick={() => router.push("http://localhost:3001/auth/google")}
        >
          Continue with Google
        </Button>

        <Button
          onClick={() => setLogin("loginEmail")}
          IconLeft={<MdOutlineEmail size={20} />}
          grow={true}
          className="mb-2 border-gray-200 hover:border-gray-200 hover:bg-gray-100 hover:bg-opacity-40 hover:text-black"
          color="white"
        >
          {loginMode == "signup"
            ? "Continue with email"
            : " Continue with email/username"}
        </Button>
      </div>
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="w-full text-center text-sm font-bold tracking-tighter text-gray-400">
          OR
        </span>
      </div>
      <div className="mb-6 flex gap-2">
        <Button
          IconLeft={<FaApple size={20} />}
          grow={true}
          className="mb-3 border-gray-200 hover:border-gray-200 hover:bg-gray-100 hover:bg-opacity-40 hover:text-black"
          color="white"
        >
          Apple
        </Button>
        <Button
          IconLeft={<FaFacebookF size={20} />}
          grow={true}
          className="mb-3 border-gray-200 hover:border-gray-200 hover:bg-gray-100 hover:bg-opacity-40 hover:text-black"
          color="white"
        >
          Facebook
        </Button>
      </div>
    </>
  );
}

function EmailLogin({
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

function ForgetPassword({
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

function LoginCardRight({
  onCloseModal,
  isModal,
}: {
  isModal: boolean;
  onCloseModal?: () => void;
}) {
  const [login, setLogin] = useState("loginOptions");
  function render() {
    if (login == "loginEmail") {
      return <EmailLogin setLogin={setLogin} />;
    } else if (login == "forgetPassword") {
      return <ForgetPassword setLogin={setLogin} />;
    } else if (login == "loginOptions") {
      return <LoginOptions {...{ onCloseModal, isModal, setLogin }} />;
    }
  }
  return (
    <div
      className={`flex flex-col px-10 text-gray-900 lg:px-6 lg:py-6 ${login == "loginOptions" ? "py-14" : "py-6"}`}
    >
      {render()}
      <div className="mt-auto text-sm">
        By joining, you agree to the Fiverr{" "}
        <span className="cursor-pointer underline">Terms of Service</span> and
        to occasionally receive emails from us. Please read our Privacy Policy
        to learn how we use your personal data.
      </div>
    </div>
  );
}

type LoginCardProps = {
  onCloseModal?: () => void;
  isModal: boolean;
};

export default function LoginCard({ onCloseModal, isModal }: LoginCardProps) {
  const [triggerAnim, setTriggerAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => setTriggerAnim(true), 10);
  }, []);

  let className = twMerge(
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
