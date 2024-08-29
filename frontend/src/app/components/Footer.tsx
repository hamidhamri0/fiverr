import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import IconButton from "./smallComponents/IconButton";
import { RiTwitterXFill } from "react-icons/ri";
import { IoArrowDownSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
const categories = [
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Consulting",
  "Dev",
  "JavaScript",
  "React",
  "Cpp and Assembly",
  "Cpp and Assembly as",
  "Cpp and Assembly asz",
];
const about = [
  "Careers",
  "Press & News",
  "Partnerships",
  " Privacy Policy",
  "Terms of Service",
  "Intellectual Property Claims",
  " Investor Relations",
];
const support = [
  "Help & Support",
  "Trust & Safety",
  "Quality Guide",
  "Selling on Fiverr",
  "Buying on Fiverr",
  "Fiverr Guides",
  "Learn",
  "Online Courses",
];
const community = [
  "Customer Success Stories",
  "Community Hub",
  "Forum",
  "Events",
  "Blog",
  "Creators",
  "Affiliates",
  "Podcast",
  "Invite a Friend",
  "Become a Seller",
  "Community Standards",
];
const Business = [
  "About Business Solutions",
  "Fiverr Pro",
  "Fiverr Certified",
  "Become an Agency",
  "Fiverr Enterprise",
  "ClearVoice",
  "Content Marketing",
  "Working Not Working",
  "Contact Sales",
];

export function OpenArrow({
  isOpen,
  className = "",
  onClick,
}: {
  isOpen: boolean;
  className?: string;
  onClick?: () => void;
}) {
  className = twMerge(
    `ml-auto cursor-pointer hidden origin-center items-center justify-center font-bold transition-transform duration-300 sm:flex ${isOpen ? "rotate-[270deg]" : "rotate-90"}`,
    className,
  );
  return (
    <span onClick={onClick} className={className}>
      <svg
        width="8"
        height="16"
        viewBox="0 0 8 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path>
      </svg>
    </span>
  );
}

function ContentSection({
  title,
  content,
}: {
  title: string;
  content: string[];
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-4 sm:max-w-full">
      <div onClick={() => setOpen((p) => !p)} className="flex">
        <h2 className="font-bold">{title}</h2>
        <OpenArrow isOpen={isOpen} />
      </div>
      <div
        className={`flex flex-col gap-4 ${isOpen ? "sm:flex" : "sm:hidden"}`}
      >
        {content.map((el) => {
          return (
            <a
              className="cursor-pointer text-gray-500 hover:underline"
              key={el}
            >
              {el}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="border-t border-gray-200 p-4 py-8">
      <div className="mx-auto mb-6 flex max-w-[1450px] flex-wrap gap-4 border-b border-gray-300 pb-8 text-gray-900 sm:flex-col sm:flex-nowrap sm:justify-start">
        <ContentSection title="Categories" content={categories} />
        <ContentSection title="About" content={about} />
        <ContentSection title="Support and Education" content={support} />
        <ContentSection title="community" content={community} />
        <ContentSection title="Business Solutions" content={Business} />
      </div>
      <div>
        <div className="mx-auto flex max-w-[1450px] sm:flex-col sm:items-center sm:justify-center sm:gap-2">
          <div className="text-md flex items-center gap-8 text-gray-400 sm:flex-col sm:items-center sm:justify-center sm:gap-2">
            <svg
              width="91"
              height="27"
              viewBox="0 0 91 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#7A7D85">
                <path d="m82.9 13.1h-3.2c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-13.4h-2.6c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-18.4h6.1v2.8c1-2.2 2.4-2.8 4.4-2.8h7.4v2.8c1-2.2 2.4-2.8 4.4-2.8h2v5zm-25.6 5.6h-12.6c.3 2.1 1.6 3.2 3.8 3.2 1.6 0 2.8-.7 3.1-1.8l5.4 1.5c-1.3 3.2-4.6 5.1-8.5 5.1-6.6 0-9.6-5.1-9.6-9.5 0-4.3 2.6-9.4 9.2-9.4 7 0 9.3 5.2 9.3 9.1 0 .9 0 1.4-.1 1.8zm-5.9-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3.1.8-3.4 3zm-23.1 11.3h5.3l6.7-18.3h-6.1l-3.2 10.7-3.4-10.8h-6.1zm-24.9 0h6v-13.4h5.7v13.4h6v-18.4h-11.6v-1.1c0-1.2.9-2 2.3-2h3.5v-5h-4.4c-4.5 0-7.5 2.7-7.5 6.6v1.5h-3.4v5h3.4z"></path>
              </g>
              <g fill="#7A7D85">
                <path d="m90.4 23.3c0 2.1-1.6 3.7-3.8 3.7s-3.8-1.6-3.8-3.7 1.6-3.7 3.8-3.7c2.2-.1 3.8 1.5 3.8 3.7zm-.7 0c0-1.8-1.3-3.1-3.1-3.1s-3.1 1.3-3.1 3.1 1.3 3.1 3.1 3.1 3.1-1.4 3.1-3.1zm-1.7.8.1.9h-.7l-.1-.9c0-.3-.2-.5-.5-.5h-.8v1.4h-.7v-3.5h1.4c.7 0 1.2.4 1.2 1.1 0 .4-.2.6-.5.8.4.1.5.3.6.7zm-1.9-1h.7c.4 0 .5-.3.5-.5 0-.3-.2-.5-.5-.5h-.7z"></path>
              </g>
            </svg>
            <span>© Fiverr International Ltd. 2024</span>
          </div>
          <ul className="ml-auto flex gap-4 sm:ml-0">
            <IconButton>
              <FaTiktok size={20} />
            </IconButton>
            <IconButton>
              <FaInstagram size={20} />
            </IconButton>
            <IconButton>
              <FaLinkedin size={20} />
            </IconButton>
            <IconButton>
              <FaFacebook size={20} />
            </IconButton>

            <IconButton>
              <RiTwitterXFill size={20} />
            </IconButton>
          </ul>
        </div>
      </div>
    </div>
  );
}
