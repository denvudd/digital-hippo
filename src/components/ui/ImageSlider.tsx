"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type SwiperType from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  urls: string[];
}

interface SlideConfig {
  isBeginning: boolean;
  isEnd: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ urls }) => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [slideConfig, setSlideConfig] = React.useState<SlideConfig>({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  React.useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const onClickNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    swiper?.slideNext();
  };

  const onClickPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    swiper?.slidePrev();
  };

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const disabledStyles = "hidden text-gray-400";

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition-all">
        <button
          className={cn(activeStyles, "right-3 transition-all", {
            [disabledStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          onClick={onClickNext}
        >
          <ChevronRight
            aria-label="next icon"
            className="h-4 w-4 text-zinc-700"
          />
        </button>
        <button
          className={cn(activeStyles, "left-3 transition-all", {
            [disabledStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          onClick={onClickPrev}
        >
          <ChevronLeft
            aria-label="previous icon"
            className="h-4 w-4 text-zinc-700"
          />
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition-all ${className}"></span>`;
          },
        }}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
              src={url}
              alt="Product Image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
