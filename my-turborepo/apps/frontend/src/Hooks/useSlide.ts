import React, { useEffect, useRef, useState } from "react";

export default function useSlide() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [isLastElementVisible, setIsLastElementVisible] = useState(false);
  const [isFirstElementVisible, setIsFirstElementVisible] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    const firstElement = container?.firstElementChild as HTMLElement;
    const lastElement = container?.firstElementChild?.childNodes[
      container?.firstElementChild?.childNodes.length - 1
    ] as HTMLElement;

    if (!container || !firstElement || !lastElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === firstElement) {
            setIsFirstElementVisible(entry.isIntersecting);
          }
          if (entry.target === lastElement) {
            setIsLastElementVisible(entry.isIntersecting);
          }
        });
      },
      {
        root: container,
        rootMargin: "0px",
        threshold: [0.99], // Elements need to be fully visible
      },
    );

    observer.observe(firstElement);
    observer.observe(lastElement);

    // Cleanup observer on component unmount
    return () => {
      observer.unobserve(firstElement);
      observer.unobserve(lastElement);
    };
  }, []);

  const scrollLeftHandler = (e: React.MouseEvent) => {
    if (isFirstElementVisible || isScrolling) return;
    setIsScrolling(true);
    e.stopPropagation();
    let container = scrollRef.current;
    if (container) {
      const firstChild = container.firstElementChild as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const firstChildChildren = Array.from(firstChild.childNodes);

      let scrollByWidth = 0;
      for (let i = firstChildChildren.length - 1; i >= 0; i--) {
        const childRect = (
          firstChildChildren[i] as HTMLElement
        ).getBoundingClientRect();
        if (Math.floor(childRect.left) < Math.floor(containerRect.left)) {
          scrollByWidth = containerRect.left - childRect.left;
          break;
        }
      }

      container.scrollBy({
        left: -scrollByWidth,
        behavior: "smooth",
      });
      setIsLastElementVisible(false);
      setTimeout(() => {
        setIsScrolling(false);
      }, 100);
      // const scrollEnd = function () {
      //   setIsScrolling(false);
      //   container.removeEventListener("scrollend", scrollEnd);
      // };
      // console.log(container, "container");
      // container.addEventListener("scrollend", scrollEnd);
    }
  };

  const scrollRightHandler = (e: React.MouseEvent) => {
    if (isLastElementVisible || isScrolling) return;
    setIsScrolling(true);
    e.stopPropagation();
    let container = scrollRef.current;
    if (container) {
      const firstChild = container.firstElementChild as HTMLElement;

      const containerRect = container.getBoundingClientRect();
      const firstChildChildren = Array.from(firstChild.childNodes);
      let scrollByWidth = 0;
      for (const child of firstChildChildren) {
        const childRect = (child as HTMLElement).getBoundingClientRect();
        if (Math.floor(childRect.right) > Math.floor(containerRect.right)) {
          scrollByWidth = childRect.right - containerRect.right;
          break;
        }
      }

      // const gap = Number(
      //   getComputedStyle(firstChild).gap.replace("px", "") || 0,
      // );

      // setCurrentElement((p) => p + 1);
      // const childWidth =
      //   firstChild?.childNodes?.[currentElement]?.getBoundingClientRect()
      //     ?.width + gap;

      // const remainingScrollWidth =
      //   scrollRef.current.scrollWidth -
      //   scrollRef.current.clientWidth -
      //   scrollRef.current.scrollLeft;

      // const scrollByWidth =
      //   remainingScrollWidth > childWidth ? childWidth : remainingScrollWidth;

      container.scrollBy({
        left: scrollByWidth,
        behavior: "smooth",
      });
      setTimeout(() => {
        setIsScrolling(false);
      }, 100);
      // const scrollEnd = function () {
      //   setIsScrolling(false);
      //   scrollRef.current?.removeEventListener("scrollend", scrollEnd);
      // };
      // container.addEventListener("scrollend", scrollEnd);
    }
  };

  // useEffect(() => {
  //   const container = scrollRef.current;
  //   if (!container) return;

  // }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX; // Adjust scroll speed
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  return {
    isFirstElementVisible,
    isLastElementVisible,
    scrollRef,
    scrollLeftHandler,
    scrollRightHandler,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}
