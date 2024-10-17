import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import OpenArrowButton from "@/Components/Atoms/OpenArrowButton";
import { useOutsideClick } from "@/Hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import Btn from "@/Components/Atoms/Btn";

interface MenusContextType {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number }) => void;
  setMenuWidth: Dispatch<SetStateAction<number>>;
  menuWidth: number;
}

export const MenusContext = createContext<MenusContextType | undefined>(
  undefined,
);

interface MenusProps {
  children: ReactNode;
  doSomethingWhenClosed?: () => void;
}

function Menus({ children, doSomethingWhenClosed }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [lastClickedLabel, setLastClickedLabel] = useState<string>("");
  const [menuWidth, setMenuWidth] = useState<number>(0);

  const close = () => {
    setOpenId("");
    doSomethingWhenClosed?.();
  };
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
        position,
        setPosition,
        setMenuWidth,
        menuWidth,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

interface ToggleProps {
  id: string;
  children: ReactNode;
  direction?: "left" | "right";
}

function Toggle({ id, children, direction = "right" }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a Menus");
  }

  const { openId, close, open, setPosition, menuWidth } = context;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(menuWidth);
    setPosition({
      x:
        direction == "left"
          ? rect.left + window.scrollX
          : rect.right + window.scrollX - menuWidth,
      y: rect.bottom + window.scrollY + 10,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {children}
    </div>
  );
}

interface ListProps {
  id: string;
  children: ReactNode;
  className?: string;
}

function List({ id, children, className = "" }: ListProps) {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error("List must be used within a Menus");
  }
  const { openId, position, close, setMenuWidth } = context;
  const ref = useOutsideClick(close, false);

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.getBoundingClientRect().width;
      setMenuWidth(width);
    }
  }, [setMenuWidth, ref]);

  if (openId !== id || !position) return null;

  let { x, y } = position;
  className = cn("absolute z-50", className);
  return createPortal(
    <div
      style={{ left: `${Math.floor(x)}px`, top: `${Math.floor(y)}px` }}
      className={className}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {children}
    </div>,
    document.body,
  );
}

type DropDownProps = {
  label: string;
  id: string;
  className?: string;
};

function DropDown({ label, id, className = "" }: DropDownProps) {
  const context = useContext(MenusContext)!;
  if (!context) {
    throw new Error("List must be used within a Menus");
  }
  const { openId } = context;
  className = cn(
    "whitespace-nowrap flex cursor-pointer gap-3 rounded-md px-4 py-2 text-lg text-gray-900 hover:bg-gray-100 hover:bg-opacity-70",
    className,
  );
  return (
    <a className={className}>
      <span className="font-semibold">{label}</span>
      <OpenArrowButton className="!flex" isOpen={openId == id} />
    </a>
  );
}

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
};

function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Button must be used within a Menus");
  }
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <Btn color="white" className="mb-2" onClick={handleClick}>
      {children as string}
    </Btn>
  );
}

function Menu({ children }: { children: ReactNode }) {
  return <>{children} </>;
}

Menus.Menu = Menu;
Menus.DropDown = DropDown;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
