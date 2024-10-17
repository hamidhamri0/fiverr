import Button from "@/Components/Atoms/Btn";
import useLoginStore from "@/stores/loginStore";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function LoginOptions({
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
    router.push("http://localhost:3001/auth/google"); // window.location.href = "http://localhost:3001/auth/google";
  };

  useGoogleLogin({
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
          IconLeft={<FaGoogle className="mr-auto" size={20} />}
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
