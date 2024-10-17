"use client";
import { set } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

export default function useSlide() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [isLastElementVisible, setIsLastElementVisible] = useState(false);
  const [isFirstElementVisible, setIsFirstElementVisible] = useState(true);

  // useEffect(() => {
  //   const container = scrollRef.current;
  //   const firstElement = container?.firstElementChild
  //     ?.firstElementChild as HTMLElement;
  //   const lastElement = container?.firstElementChild
  //     ?.lastElementChild as HTMLElement;

  //   if (!container || !firstElement || !lastElement) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.target === firstElement) {
  //           setIsFirstElementVisible(entry.isIntersecting);
  //         }
  //         if (entry.target === lastElement) {
  //           setIsLastElementVisible(entry.isIntersecting);
  //         }
  //       });
  //     },
  //     {
  //       root: container,
  //       rootMargin: "0px",
  //       threshold: [0.99], // Elements need to be fully visible
  //     },
  //   );

  //   observer.observe(firstElement);
  //   observer.observe(lastElement);

  //   // Cleanup observer on component unmount
  //   return () => {
  //     observer.unobserve(firstElement);
  //     observer.unobserve(lastElement);
  //   };
  // }, []);

  useEffect(() => {
    let container = scrollRef.current;
    if (container) {
      const firstChild = container.firstElementChild as HTMLElement;
      const first = firstChild.firstElementChild as HTMLElement;
      const last = firstChild.lastElementChild as HTMLElement;
      if (first == last) {
        setIsFirstElementVisible(true);
        setIsLastElementVisible(true);
      }
    }
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
          if (firstChildChildren[i] == firstChildChildren[0]) {
            setIsFirstElementVisible(true);
          }
          break;
        }
      }

      setIsLastElementVisible(false);

      container.scrollBy({
        left: -scrollByWidth,
        behavior: "smooth",
      });
      setIsLastElementVisible(false);
      setTimeout(() => {
        setIsScrolling(false);
      }, 100);
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
      const lastChild = firstChildChildren[
        firstChildChildren.length - 1
      ] as HTMLElement;
      let scrollByWidth = 0;
      for (const child of firstChildChildren) {
        const childRect = (child as HTMLElement).getBoundingClientRect();
        if (Math.floor(childRect.right) > Math.floor(containerRect.right)) {
          scrollByWidth = childRect.right - containerRect.right + 1;
          if (child === lastChild) {
            setIsLastElementVisible(true);
          }
          break;
        }
      }
      setIsFirstElementVisible(false);

      container.scrollBy({
        left: scrollByWidth,
        behavior: "smooth",
      });
      setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    }
  };

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
