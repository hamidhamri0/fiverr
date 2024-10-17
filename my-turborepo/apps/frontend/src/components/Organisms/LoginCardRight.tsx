import EmailLogin from "@/Components/Molecules/EmailLogin";
import ForgetPassword from "@/Components/Molecules/ForgetPassword";
import LoginOptions from "@/Components/Molecules/LoginOptions";
import { useState } from "react";

export default function LoginCardRight({
  onCloseModal,
  isModal,
}: {
  isModal: boolean;
  onCloseModal?: () => void;
}) {
  const [login, setLogin] = useState("loginOptions");

  function loginCardSwitcher() {
    if (login == "loginEmail") {
      return <EmailLogin setLogin={setLogin} />;
    } else if (login == "forgetPassword") {
      return <ForgetPassword setLogin={setLogin} />;
    } else if (login == "loginOptions") {
      return (
        <LoginOptions
          {...{
            onCloseModal,
            isModal,
            setLogin,
          }}
        />
      );
    }
  }

  return (
    <div
      className={`flex flex-col px-10 text-gray-900 lg:px-6 lg:py-6 ${login == "loginOptions" ? "py-14" : "py-6"}`}
    >
      {loginCardSwitcher()}
      <div className="mt-auto text-sm">
        By joining, you agree to the Fiverr{" "}
        <span className="cursor-pointer underline">Terms of Service</span> and
        to occasionally receive emails from us. Please read our Privacy Policy
        to learn how we use your personal data.
      </div>
    </div>
  );
}
