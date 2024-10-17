import {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactNode,
  RefObject,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/Hooks/useOutsideClick";
import { cn } from "@/lib/utils";

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: ReactNode;
  opens: string;
  onClick?: () => void;
};

function Open({ children, opens: opensWindowName, onClick }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Open must be used within a Modal");
  }
  const { open } = context;

  let onClickFunc = useCallback(() => {
    open(opensWindowName);
    onClick?.();
  }, [opensWindowName]);

  return cloneElement(children as React.ReactElement, {
    onClick: onClickFunc,
  });
}

type WindowProps = {
  children: ReactNode;
  name: string;
  className?: string;
};

function Window({ children, name, className = "" }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Window must be used within a Modal");
  }
  const [triggerAnim, setTriggerAnim] = useState(true);

  const { openName, close } = context;
  const ref = useOutsideClick(() => {
    close();
    setTriggerAnim(false);
  }) as RefObject<HTMLDivElement>;

  useEffect(() => {
    if (openName === name) {
      setTriggerAnim(true);
    }
  }, [openName]);

  if (name !== openName) return null;

  className = cn(
    "fixed @/lib/utils z-50 backdrop-blur-[2px] sm opacity-0 transition-all duration-500",
    className,
    triggerAnim && "opacity-100",
  );
  return createPortal(
    <div className={className}>
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg shadow-lg"
      >
        <div>
          {cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
