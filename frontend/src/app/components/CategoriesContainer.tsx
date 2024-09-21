import React, { ReactNode, useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaVideo } from "react-icons/fa";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoIosMusicalNotes, IoMdBusiness } from "react-icons/io";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { MdGTranslate } from "react-icons/md";
import useSlide from "../../Hooks/useSlide";

function CategoryBox({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex h-full cursor-pointer flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white px-2 py-6 font-semibold text-gray-900 shadow-md hover:bg-green-400 hover:bg-opacity-20">
      <div>{icon}</div>
      <p>{title}</p>
    </div>
  );
}

export default function CategoriesContainer() {
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

  const [showMore, setShowMore] = useState(false);
  const [rows, setRows] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateRows = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.scrollHeight;
        const itemHeight = containerRef.current.firstChild?.clientHeight || 0;
        setRows(Math.ceil(containerHeight / itemHeight));
      }
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  return (
    <div className="relative mx-auto max-w-[1450px] px-4">
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        ref={scrollRef}
        className="overflow-hidden"
      >
        <div
          ref={containerRef}
          className={`mb-16 grid auto-cols-[123px] grid-flow-col auto-rows-[140px] gap-4 p-2 lg:grid-flow-row lg:grid-cols-[repeat(auto-fill,_minmax(123px,_1fr))] ${
            showMore ? "" : "max-h-[calc((2*140px)+24px)] overflow-hidden"
          }`}
        >
          <CategoryBox
            icon={<HiOutlineComputerDesktop size={30} />}
            title="Programming & Tech"
          />
          <CategoryBox
            icon={<LiaDigitalTachographSolid size={30} />}
            title="Digital Marketing"
          />
          <CategoryBox icon={<FaVideo size={30} />} title="Video & Animation" />
          <CategoryBox
            icon={<MdGTranslate size={30} />}
            title="Writing & Translation"
          />
          <CategoryBox
            icon={<IoIosMusicalNotes size={30} />}
            title="Music & Audio"
          />
          <CategoryBox icon={<IoMdBusiness size={30} />} title="Business" />
          <CategoryBox
            icon={<HiOutlineComputerDesktop size={30} />}
            title="Consulting"
          />
          <CategoryBox
            icon={<HiOutlineComputerDesktop size={30} />}
            title="Dev"
          />
          <CategoryBox
            icon={<HiOutlineComputerDesktop size={30} />}
            title="JavaScript"
          />
          <CategoryBox icon={<IoMdBusiness size={30} />} title="Business" />
        </div>
        {!isFirstElementVisible && (
          <button
            onClick={scrollLeftHandler}
            className={`absolute left-0 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-6 shadow-md xs:hidden`}
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
            className={`absolute right-0 top-1/2 z-50 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white p-6 shadow-md xs:hidden`}
          >
            <FaChevronRight
              size={20}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        )}
      </div>
      {rows > 2 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mx-auto mt-4 block rounded bg-blue-500 px-4 py-2 text-white"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
