"use client";
import React from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "@/Components/Organisms/Modal";
import Header from "@/Components/Organisms/Header";
import Categories from "@/Components/Categories";
import LoginCard from "@/Components/Organisms/LoginCard";

const MainHeader: React.FC = () => {
  return (
    <Modal>
      <div className="h-[130px]">
        <div className="sticky top-0 z-[99] w-full">
          <Header />
          <Categories />
        </div>
      </div>
      <Modal.Window name="login">
        <GoogleOAuthProvider clientId="332029646132-gea7ndchld2h8r8kc3jrvqumu2ee1t8j.apps.googleusercontent.com">
          <LoginCard isModal={true} />
        </GoogleOAuthProvider>
      </Modal.Window>
    </Modal>
  );
};

export default MainHeader;
