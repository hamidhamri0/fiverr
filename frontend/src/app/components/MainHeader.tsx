import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import Modal from "./Modal";
import LoginCard from "./LoginCard";

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
        <LoginCard isModal={true} />
      </Modal.Window>
    </Modal>
  );
};

export default MainHeader;
