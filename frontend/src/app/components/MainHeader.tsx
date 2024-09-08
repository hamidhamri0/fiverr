"use client";
import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import Modal from "./Modal";
import LoginCard from "./LoginCard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MainHeader: React.FC = () => {
  return (
    <Modal>
      <div className="mb-12 h-[130px]">
        <div className="fixed left-0 top-0 z-50 w-full">
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
