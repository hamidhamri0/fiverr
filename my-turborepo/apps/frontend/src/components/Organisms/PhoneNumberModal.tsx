"use client";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import Link from "next/link";
import Spinner from "../Atoms/Spinner";
import { countriesWithPhoneCode } from "@/lib/utils/countriesWithPhoneCode";
import { post } from "@/lib/utils/customFetch";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";

type Country = (typeof countriesWithPhoneCode)[0];

export default function PhoneNumberModal({
  setStep,
  setCode,
  setPhoneNumber,
  phoneNumber,
  setIsOpenModal: setIsOpenModal,
}: {
  setStep: (step: number) => void;
  setCode: (step: string) => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setIsOpenModal: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesWithPhoneCode[0],
  );
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [loading, setLoading] = useState(false);

  const userId = useUserInfoStore((state) => state.user?.id);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith("+" + selectedCountry.code)) {
      setPhoneNumber(value);
    }
  };

  async function sendCode() {
    try {
      const code = await post<
        {
          userId: string;
          phoneNumber: string;
        },
        {
          verificationCode: string;
        }
      >(`/verify/sendVerificationCode`, {
        userId: userId as string,
        phoneNumber,
      });
      return code.verificationCode;
    } catch (err) {
      throw err;
    }
  }

  async function sendCodeVerification() {
    if (isValidPhoneNumber(phoneNumber, selectedCountry.iso as CountryCode)) {
      try {
        setLoading(true);
        setIsValidNumber(true);
        const code = await sendCode();
        setCode(code);
        setStep(2);
      } catch (err) {
        toast.error(
          (err as Error).message || "Failed to send verification code",
        );
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setIsValidNumber(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(res) => {
        setIsOpen(res);
        setIsOpenModal(res);
      }}
    >
      <DialogContent className="left-1/2 top-1/2 max-w-[425px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg">
        <DialogHeader>
          <DialogTitle>Verify Phone Number</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-500">
            Thank you for taking a moment to verify your phone number.
            <Link href="#" className="ml-1 text-blue-600 hover:underline">
              Learn more
            </Link>
          </p>
          <div className="grid gap-2">
            <Label htmlFor="country">Select Country</Label>
            <select
              onChange={(e) => {
                const country =
                  countriesWithPhoneCode.find(
                    (c) => c.country === e.target.value,
                  ) || countriesWithPhoneCode[0];
                setPhoneNumber("+" + country.code);
                setSelectedCountry(country);
              }}
              defaultValue={selectedCountry.country}
              className="rounded-md border-2 border-gray-100 p-2"
            >
              {countriesWithPhoneCode.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country} ({country.code})
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Enter your Phone Number</Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          <Button
            onClick={sendCodeVerification}
            className="bg-green-500 text-white hover:bg-opacity-50"
          >
            {!loading ? (
              "Verify by SMS"
            ) : (
              <Spinner width={4} height={4} color="fill-gree-500" />
            )}
          </Button>{" "}
          {!isValidNumber && (
            <p className="text-sm text-red-500">Invalid phone number</p>
          )}
          <p className="text-center text-xs text-gray-400">
            Your phone number will remain private and will not be shared or used
            for marketing purposes.
            <Link href="#" className="ml-1 text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
