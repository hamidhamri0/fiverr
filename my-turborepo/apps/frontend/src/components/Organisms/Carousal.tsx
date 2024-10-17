"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: React.ReactNode;
  className?: string;
};

type CarouselContextType = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  itemsCount: number;
  visibleItems: number;
  isLooping: boolean;
  itemRef: React.RefObject<HTMLDivElement>;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
};

const CarouselContext = React.createContext<CarouselContextType | undefined>(
  undefined,
);

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, className }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [itemsCount, setItemsCount] = React.useState(0);
    const [dynamicVisibleItems, setDynamicVisibleItems] = React.useState(5);

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

    const containerRef = React.useRef<HTMLDivElement>(null);
    const itemRef = React.useRef<HTMLDivElement>(null);
    const isLooping = false; // This can be made a prop if needed

    React.useEffect(() => {
      const updateVisibleItems = () => {
        if (containerRef.current && itemRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const itemWidth = itemRef.current.offsetWidth;
          const newVisibleItems = Math.round(containerWidth / itemWidth);
          setDynamicVisibleItems(newVisibleItems);
        }
      };

      updateVisibleItems();
      window.addEventListener("resize", updateVisibleItems);
      return () => window.removeEventListener("resize", updateVisibleItems);
    }, []);

    return (
      <CarouselContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          scrollRef,
          itemsCount,
          visibleItems: dynamicVisibleItems,
          isLooping,
          setItemsCount,
          itemRef,
          onMouseDown,
          onMouseLeave,
          onMouseMove,
          onMouseUp,
        }}
      >
        <div ref={containerRef} className={cn("relative", className)}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const {
    activeIndex,
    setItemsCount,
    visibleItems,
    onMouseDown,
    onMouseLeave,
    onMouseMove,
    onMouseUp,
    scrollRef,
  } = useCarouselContext();
  React.useEffect(() => {
    setItemsCount(React.Children.count(props.children));
  }, [props.children, setItemsCount]);
  return (
    <div ref={scrollRef} className="overflow-hidden">
      <div
        {...{
          onMouseDown: onMouseDown,
          onMouseMove: onMouseMove,
          onMouseUp: onMouseUp,
          onMouseLeave: onMouseLeave,
        }}
        className={cn(
          "flex transition-transform duration-300 ease-in-out",
          className,
        )}
        style={{
          transform: `translateX(-${(activeIndex * 100) / visibleItems}%)`,
        }}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { itemRef } = useCarouselContext();

  return (
    <div
      ref={itemRef}
      className={cn(`flex-shrink-0 px-2`, className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { activeIndex, setActiveIndex, isLooping } = useCarouselContext();

  const canGoToPrevious = isLooping || activeIndex > 0;
  const handlePrevious = () => {
    if (canGoToPrevious) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full",
        { "cursor-not-allowed opacity-50": !canGoToPrevious },
        className,
      )}
      onClick={handlePrevious}
      disabled={!canGoToPrevious}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { activeIndex, setActiveIndex, itemsCount, visibleItems, isLooping } =
    useCarouselContext();

  const canGoToNext = isLooping || activeIndex < itemsCount - visibleItems;
  const handleNext = () => {
    if (canGoToNext) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rounded-full",
        { "cursor-not-allowed opacity-50": !canGoToNext },
        className,
      )}
      onClick={handleNext}
      disabled={!canGoToNext}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

function useCarouselContext() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within a Carousel");
  }
  return context;
}

const CarouselSliders = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { activeIndex, setActiveIndex, itemsCount, visibleItems, isLooping } =
    useCarouselContext();

  const canGoToNext = isLooping || activeIndex < itemsCount - visibleItems;
  const canGoToPrevious = isLooping || activeIndex > 0;

  const handleNext = () => {
    if (canGoToNext) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (canGoToPrevious) {
      setActiveIndex((prev) => prev - 1);
    }
  };
  return (
    <div ref={ref} className={cn("relative flex gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full",
          { "cursor-not-allowed opacity-50": !canGoToPrevious },
          className,
        )}
        onClick={handlePrevious}
        disabled={!canGoToPrevious}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn("h-8 w-8 rounded-full", {
          "cursor-not-allowed opacity-50": !canGoToNext,
        })}
        onClick={handleNext}
        disabled={!canGoToNext}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  );
});
CarouselSliders.displayName = "CarouselSliders";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselSliders,
};
