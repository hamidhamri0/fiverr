import React, { useState } from "react";
import PhoneNumberModal from "./PhoneNumberModal";
import VerificationCode from "./PhoneNumberVerificationCodeModal";
import { countriesWithPhoneCode } from "@/lib/utils/countriesWithPhoneCode";

export default function VerificationPhoneNumber({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState(
    "+" + countriesWithPhoneCode[0].code,
  );
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  return (
    <>
      {step == 1 ? (
        <PhoneNumberModal
          setStep={setStep}
          setCode={setCode}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          setIsOpenModal={setIsOpen}
        />
      ) : (
        <VerificationCode
          setStep={setStep}
          setIsOpen={setIsOpen}
          title=""
          description=""
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
}
