"use client";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";

export default function SpinnerCenterWithBlur() {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Spinner />
    </div>,
    document.body,
  );
}
