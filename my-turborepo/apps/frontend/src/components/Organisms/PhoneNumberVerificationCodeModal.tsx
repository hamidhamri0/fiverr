"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Spinner from "../Atoms/Spinner";
import { post } from "@/lib/utils/customFetch";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function VerificationCode({
  title,
  description,
  phoneNumber,
  setStep,
  setIsOpen,
}: {
  title: string;
  description: string;
  phoneNumber: string;
  setStep: (step: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  title = "Sign up for Fiverr";
  description = "Enter the 6-digit code sent to your phone number ";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      if (
        inputRefs.current[index + 1] !== null &&
        inputRefs.current[index + 1] !== undefined
      ) {
        if (
          inputRefs.current[index + 1] &&
          inputRefs.current[index + 1]?.disabled !== null
        ) {
          inputRefs.current[index + 1].disabled = false;
          inputRefs.current[index + 1].focus();
        }
      }
    }

    if (newCode.every((digit) => digit !== "")) {
      inputRefs.current[index]?.blur();
      verifyCode(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async (fullCode: string) => {
    try {
      await post<{
        phoneNumber: string;
        verificationCode: string;
      }>(`/verify/verifyCode`, {
        verificationCode: fullCode as string,
        phoneNumber,
      });
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const isBoxSelectable = (index: number) => {
    if (index === 0) return true;
    return code.slice(0, index).every((digit) => digit !== "");
    // return true;
  };

  return createPortal(
    <div className="fixed inset-0 z-50 backdrop-blur-[2px] transition-all">
      <div className="fixed left-1/2 top-1/2 mx-auto flex h-[400px] max-w-[550px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-lg border border-gray-100 bg-gray-100 shadow-lg">
        <div className="h-full w-full rounded-lg bg-white p-6 px-20 pb-12 pt-16 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold">{title}</h1>
          <p className="mb-1 text-center text-gray-600">{description}</p>
          <p className="mb-8 text-center text-gray-600">Enter it below.</p>
          <div className="mb-8 flex justify-center">
            {code.map((digit, index) => (
              <div
                key={index}
                className={`relative ${index !== 0 ? "-ml-px" : ""}`}
              >
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className={`relative h-16 w-14 border-2 border-gray-300 text-center text-2xl focus:z-10 focus:border-blue-500 focus:outline-none ${index === 0 ? "rounded-l-md" : ""} ${index === 5 ? "rounded-r-md" : ""} ${isBoxSelectable(index) ? "" : "cursor-not-allowed"} ${focusedIndex === index ? "z-10 border-blue-500" : ""} ${focusedIndex === index - 1 ? "border-l-transparent" : ""} ${focusedIndex === index + 1 ? "border-r-transparent" : ""}`}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  disabled={!isBoxSelectable(index)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            {!isLoading ? (
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-blue-500 transition-colors hover:text-blue-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
            ) : (
              <Spinner width={4} height={4} color="fill-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>,
    document?.body,
  );
}
