import {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
  useEffect,
} from "react";
import useSlide from "../../Hooks/useSlide";
import { twMerge } from "tailwind-merge";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type GridSliderContextType = {
  isFirstElementVisible: boolean;
  isLastElementVisible: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
  scrollLeftHandler: (e: MouseEvent) => void;
  scrollRightHandler: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  onMouseLeave: (e: MouseEvent) => void;
};

export const GridSliderContext = createContext<
  GridSliderContextType | undefined
>(undefined);

interface GridSliderProps {
  children: ReactNode;
  doSomethingWhenClosed?: () => void;
}

function GridSlider({ children, doSomethingWhenClosed }: GridSliderProps) {
  const {
    isFirstElementVisible,
    isLastElementVisible,
    scrollRef,
    scrollLeftHandler,
    scrollRightHandler,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useSlide();

  return (
    <GridSliderContext.Provider
      value={{
        isFirstElementVisible,
        isLastElementVisible,
        scrollRef,
        scrollLeftHandler,
        scrollRightHandler,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
      }}
    >
      {children}
    </GridSliderContext.Provider>
  );
}

function SlidersNav({
  className = "",
  background = "bg-gray-200",
  color = "white",
}: {
  className?: string;
  background?: string;
  color?: string;
}) {
  const context = useContext(GridSliderContext);
  if (!context) {
    throw new Error("Toggle must be used within a GridSlider");
  }
  const {
    scrollRightHandler,
    isLastElementVisible,
    scrollLeftHandler,
    isFirstElementVisible,
  } = context;
  let colors: {
    [key: string]: string;
  } = {
    gray: "text-gray-500",
    white: "text-white",
  };
  className = twMerge("flex gap-2 sm:hidden", className);
  return (
    <div className={className}>
      <button
        onClick={scrollLeftHandler}
        disabled={isFirstElementVisible}
        className={`z-1000 relative cursor-pointer rounded-full bg-opacity-20 p-4 shadow-md hover:bg-opacity-30 ${background} ${isFirstElementVisible ? "opacity-20" : ""} `}
      >
        <FaChevronLeft
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${colors[color]}`}
        />
      </button>

      <button
        disabled={isLastElementVisible}
        onClick={scrollRightHandler}
        className={`z-1000 relative cursor-pointer rounded-full bg-opacity-20 p-4 shadow-md hover:bg-opacity-30 ${background} ${isLastElementVisible ? "opacity-20" : ""}`}
      >
        <FaChevronRight
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${colors[color]}`}
        />
      </button>
    </div>
  );
}
function SlidersArrows() {
  const context = useContext(GridSliderContext);
  if (!context) {
    throw new Error("Toggle must be used within a GridSlider");
  }
  const {
    scrollRightHandler,
    isLastElementVisible,
    scrollLeftHandler,
    isFirstElementVisible,
  } = context;

  return (
    <>
      {!isFirstElementVisible && (
        <button
          onClick={scrollLeftHandler}
          className={`absolute left-0 top-1/2 z-50 cursor-pointer rounded-full bg-white p-6 shadow-md sm:hidden`}
        >
          <FaChevronLeft
            size={20}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      )}
      {!isLastElementVisible && (
        <button
          onClick={scrollRightHandler}
          className={`absolute right-0 top-1/2 z-50 cursor-pointer rounded-full bg-white p-6 shadow-md sm:hidden`}
        >
          <FaChevronRight
            size={20}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      )}
    </>
  );
}

type ListProps = {
  children: ReactNode;
  className?: string;
};

type ListPropsWithDrag = ListProps & {
  mouseDrag?: boolean;
};

function Container({ children, className = "" }: ListProps) {
  className = twMerge(
    "relative mx-auto max-w-[1450px] overflow-hidden",
    className,
  );
  return <div className={className}>{children}</div>;
}

function Grid({
  children,
  className = "",
  mouseDrag = true,
}: ListPropsWithDrag) {
  const context = useContext(GridSliderContext);
  if (!context) {
    throw new Error("List must be used within a GridSlider");
  }
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { scrollRef, onMouseDown, onMouseLeave, onMouseMove, onMouseUp } =
    context;

  className = twMerge("overflow-hidden cursor-pointer", className);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 680); // Adjust the width as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div
      {...(mouseDrag &&
        isSmallScreen && {
          onMouseDown: onMouseDown,
          onMouseMove: onMouseMove,
          onMouseUp: onMouseUp,
          onMouseLeave: onMouseLeave,
        })}
      className={className}
      ref={scrollRef}
      style={{ userSelect: "none" }}
    >
      {children}
    </div>
  );
}

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}

function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(GridSliderContext);
  if (!context) {
    throw new Error("Button must be used within a GridSlider");
  }
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <div onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </div>
    </li>
  );
}

GridSlider.Container = Container;
GridSlider.Grid = Grid;
GridSlider.SlidersArrows = SlidersArrows;
GridSlider.SlidersNav = SlidersNav;
GridSlider.Button = Button;

export default GridSlider;
