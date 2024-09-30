import { MdVerified } from "react-icons/md";
import ProCard from "../components/ui/ProCard";
import RatingStarsCard from "../components/ui/RatingStarsCard";
import LevelRatingCard from "../components/ui/LevelRatingCard";
import React, { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { LuMessageCircle } from "react-icons/lu";
import { RatingBox } from "../components/Gig";
import { Location } from "../components/UserProfile";

type UserCardContext = {
  username: string;
  name: string;
  image: string;
  bio: string;
  languages: string[];
  location: string;
  isOnline: boolean;
  rating: number;
  count: number;
  level: number;
  pro: boolean;
  reviewsCount: number;
};

const context = createContext<UserCardContext | null>(null);

function OnlineStatus({ isOnline }: { isOnline: boolean }) {
  return (
    <>
      {isOnline && (
        <div className="rounded-full border border-green-400 px-2 text-sm text-green-400">
          Online
        </div>
      )}
    </>
  );
}

const WithContextOnlineStatus = () => {
  return function OnlineStatusContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { isOnline } = ctx;

    return <OnlineStatus isOnline={isOnline} />;
  };
};

function Image() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { image } = ctx;
  return (
    <img
      className="h-full w-full rounded-full object-cover"
      src={image}
      alt={image}
    />
  );
}

function ProTag({ pro }: { pro: boolean }) {
  return (
    pro && (
      <span className="absolute bottom-0 right-0 z-10 rounded-full bg-white">
        <MdVerified size={30} className="text-blue-800" />
      </span>
    )
  );
}

function WithContextProTag() {
  return function ProTagContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { pro } = ctx;

    return <ProTag pro={pro} />;
  };
}

function WithContextProCard() {
  return function ProCardContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { pro } = ctx;

    return <ProCard pro={pro} />;
  };
}

function WithContextRatingBox() {
  return function ProCardContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { rating, reviewsCount } = ctx;

    return (
      <RatingBox className="mb-0" rating={rating} reviewsCount={reviewsCount} />
    );
  };
}

function WithContextLevelRatingCard() {
  return function ProTagContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { level } = ctx;

    return <LevelRatingCard rating={level} />;
  };
}

function withContextRatingStarsCard() {
  return function RatingStarsCardContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { rating } = ctx;

    return <RatingStarsCard rating={rating} />;
  };
}

function Username({ className }: { className?: string }) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { username } = ctx;
  className = twMerge("text-gray-500", className);

  return <p className={className}>@{username}</p>;
}
function Name({ className }: { className?: string }) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { name } = ctx;
  className = twMerge("font-bold text-gray-800", className);

  return <p className={className}>{name}</p>;
}
function Languages({ className }: { className?: string }) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { languages } = ctx;
  className = twMerge("font-bold text-gray-800", className);

  return (
    <div className="flex items-center gap-1 text-gray-900">
      <LuMessageCircle size={20} />
      {languages.map((lang, i) => (
        <div key={lang} className="flex items-center gap-1">
          {lang}
          {i !== languages.length - 1 && ","}
        </div>
      ))}
    </div>
  );
}
function WithContextLocation() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { location } = ctx;

  return <Location location={location} />;
}
function Bio() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { bio } = ctx;
  return <p>{bio} </p>;
}

export default function UserCard({
  Image,
  imageClassName,
  Name,
  Username,
  ProCard,
  ProTag,
  OnlineStatus,
  RatingStarsCard,
  LevelRatingCard,
  RatingBox,
  Languages,
  Location,
}: {
  Image?: JSX.Element;
  imageClassName?: string;
  ProTag?: JSX.Element;
  Name?: JSX.Element;
  Username?: JSX.Element;
  ProCard?: JSX.Element;
  OnlineStatus?: JSX.Element;
  RatingStarsCard?: JSX.Element;
  LevelRatingCard?: JSX.Element;
  RatingBox?: JSX.Element;
  Location?: JSX.Element;
  Languages?: JSX.Element;
}) {
  const data = {
    username: "hamidhamri",
    name: "Charlie Davis",
    image: "/images/yacine.png",
    bio: "I am a professional developer",
    isOnline: true,
    rating: 4.5,
    count: 100,
    level: 3,
    pro: true,
    location: "Germany",
    reviewsCount: 5641,
    languages: ["English", "Arabic"],
  };

  imageClassName = twMerge("relative h-24 w-24 rounded-full", imageClassName);
  return (
    <context.Provider value={data}>
      <div className="mb-6 flex items-center gap-4 sm:flex-col sm:items-start">
        {Image && (
          <div className={imageClassName}>
            {Image}
            {ProTag}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xl">
            {Name}
            {Username}
            {ProCard}
            {OnlineStatus}
          </div>
          <div className="flex items-center gap-4">
            {[RatingBox, RatingStarsCard, LevelRatingCard]
              .filter(Boolean)
              .map((child, index, array) => (
                <React.Fragment key={index}>
                  {child}
                  {index < array.length - 1 && (
                    <span className="h-[25px] w-[0.5px] bg-gray-300"></span>
                  )}
                </React.Fragment>
              ))}
          </div>
          <div className="flex items-center gap-2">
            {Location}
            {Languages}
          </div>
        </div>
      </div>
    </context.Provider>
  );
}

UserCard.Image = Image;
UserCard.Name = Name;
UserCard.Rating = WithContextRatingBox();
UserCard.Username = Username;
UserCard.ProTag = WithContextProTag();
UserCard.ProCard = WithContextProCard();
UserCard.OnlineStatus = WithContextOnlineStatus();
UserCard.RatingStarsCard = withContextRatingStarsCard();
UserCard.LevelRatingCard = WithContextLevelRatingCard();
UserCard.Bio = Bio;
UserCard.Location = WithContextLocation;
UserCard.Languages = Languages;
