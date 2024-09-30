"use client";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";

export default function SpinnerCenterWithBlur() {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Spinner width={12} height={12} color="fill-green-500" />
    </div>,
    document.body,
  );
}
