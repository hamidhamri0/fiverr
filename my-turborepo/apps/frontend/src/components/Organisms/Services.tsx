"use client";
import React from "react";
import ServiceCard from "@/Components/Molecules/ServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSliders,
} from "@/Components/Organisms/Carousal";

const services = [
  {
    title: "Website Development",
    image: "/smallImages/website-development.webp",
    color: "bg-green-700",
  },
  {
    title: "Logo Design",
    image: "/smallImages/logo-design.webp",
    color: "bg-orange-500",
  },
  {
    title: "SEO",
    image: "/smallImages/seo.webp",
    color: "bg-green-900",
  },
  {
    title: "Architecture & Interior Design",
    image: "/smallImages/architecture-design.webp",
    color: "bg-fuchsia-900",
  },
  {
    title: "Social Media Marketing",
    image: "/smallImages/social-media-marketing.webp",
    color: "bg-pink-700",
  },
  {
    title: "Voice Over",
    image: "/smallImages/voice-over.webp",
    color: "bg-purple-700",
  },
  {
    title: "Software Development",
    image: "/smallImages/software-development.webp",
    color: "bg-indigo-700",
  },
  {
    title: "Data Science & ML",
    image: "/smallImages/data-science.webp",
    color: "bg-blue-700",
  },
  {
    title: "Product Photography",
    image: "/smallImages/product-photography.webp",
    color: "bg-green-700",
  },
  {
    title: "E-Commerce Marketing",
    image: "/smallImages/e-commerce.webp",
    color: "bg-yellow-700",
  },
  {
    title: "Video Editing",
    image: "/smallImages/video-editing.webp",
    color: "bg-red-700",
  },
];

export default function Services() {
  return (
    <Carousel>
      <div className="flex items-center">
        <h2 className="mb-6 text-5xl text-gray-700 sm:text-4xl">
          Popular Services
        </h2>
      </div>
      <CarouselSliders className="mb-4 ml-auto" />
      <CarouselContent>
        {/* <div className="grid auto-cols-[200px] grid-flow-col gap-4 p-2 lg:auto-cols-[180px] xs:auto-cols-[160px]"> */}
        {services.map((service) => (
          <CarouselItem key={service.title} className="basis-1/6">
            <ServiceCard
              title={service.title}
              image={service.image}
              color={service.color}
            />
          </CarouselItem>
        ))}
        {/* </div> */}
      </CarouselContent>
    </Carousel>
  );
}
