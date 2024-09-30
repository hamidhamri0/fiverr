import React, { useState } from "react";
import PhoneNumber from "./PhoneNumber";
import VerificationCode from "./VerificationCode";
import { countriesWithPhoneCode } from "@/lib/utils/countriesWithPhoneCode";

type Country = (typeof countriesWithPhoneCode)[0];

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
        <PhoneNumber
          setStep={setStep}
          setCode={setCode}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          setIsOpenModal={setIsOpen}
        />
      ) : (
        <VerificationCode
          setStep={setStep}
          title=""
          description=""
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
}
