"use client";

import LevelRatingCard from "@/Components/Molecules/LevelRatingCard";
import RatingBox from "@/Components/Molecules/RatingBox";
import ProCard from "@/Components/Molecules/ProCard";
import RatingStarsCard from "@/Components/Molecules/RatingStarsCard";
import Location from "@/Components/Atoms/Location";
import { cn } from "@/lib/utils";
import { UserCard as UserCardType } from "@/types/user.card.context.interface";
import React, { createContext, useContext } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { MdVerified } from "react-icons/md";

const context = createContext<UserCardType | null>(null);

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

// const WithContextOnlineStatus = () => {
//   return function OnlineStatusContext() {
//     const ctx = useContext(context);
//     if (!ctx) throw new Error("No context found");
//     const { isOnline } = ctx;

//     return <OnlineStatus isOnline={isOnline} />;
//   };
// };

export function UserCardImage() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { picture } = ctx;
  return (
    <img
      className="h-full w-full rounded-full object-cover"
      src={picture}
      alt={picture}
    />
  );
}

function ProTag({ className, size }: { className?: string; size: number }) {
  className = cn(
    "absolute bottom-0 right-0 z-10 rounded-full bg-white",
    className,
  );
  return (
    <span className={className}>
      <MdVerified size={size} className="text-blue-800" />
    </span>
  );
}

function WithContextProTag() {
  return function ProTagContext({
    className,
    size,
  }: {
    className?: string;
    size: number;
  }) {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { pro } = ctx;

    return pro ? <ProTag size={size} className={className} /> : null;
  };
}

function WithContextProCard() {
  return function ProCardContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { pro } = ctx;

    return pro ? <ProCard /> : null;
  };
}

function WithContextRatingBox() {
  return function ProCardContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { userRating, userTotalReviews } = ctx;
    if (userRating == null || userTotalReviews == null) return null;
    return (
      <RatingBox
        className="mb-0"
        rating={userRating}
        totalReviews={userTotalReviews}
      />
    );
  };
}

function WithContextLevelRatingCard() {
  return function ProTagContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { level } = ctx;
    if (level == undefined) return null;

    return <LevelRatingCard userLevel={level} />;
  };
}

function withContextRatingStarsCard() {
  return function RatingStarsCardContext() {
    const ctx = useContext(context);
    if (!ctx) throw new Error("No context found");
    const { userRating } = ctx;
    if (!userRating) return null;
    return <RatingStarsCard rating={userRating} />;
  };
}

function Username({ className }: { className?: string }) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { username } = ctx;
  className = cn("text-gray-500", className);

  return <p className={className}>@{username}</p>;
}
function Name({ className }: { className?: string }) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { name } = ctx;
  className = cn("font-bold text-gray-800", className);

  return <p className={className}>{name}</p>;
}
function Languages({ className }: { className?: string }) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { languages } = ctx;
  if (!languages) return null;
  className = cn("font-bold text-gray-800", className);

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
  const { country } = ctx;
  if (!country) return null;

  return <Location location={country} />;
}
function Bio() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("No context found");
  const { bio } = ctx;
  if (!bio) return null;
  return <p className="text-gray-600">{bio.slice(0, 100)}</p>;
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
  userCardData,
  UserCardBio,
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
  userCardData: UserCardType;
  UserCardBio?: JSX.Element;
}) {
  imageClassName = cn("relative h-24 w-24 rounded-full", imageClassName);
  return (
    <context.Provider value={userCardData}>
      <div className="mb-6 flex items-center gap-4 sm:flex-col sm:items-start">
        {Image && (
          <div className={imageClassName}>
            {Image}
            {ProTag}
          </div>
        )}
        <div className="flex flex-col justify-between gap-1">
          <div className="flex items-center gap-2 text-xl">
            {Name}
            {Username}
            {ProCard}
            {OnlineStatus}
          </div>
          {UserCardBio}
          <div className="flex items-center gap-4">
            {[RatingBox, RatingStarsCard, LevelRatingCard]
              .filter(Boolean)
              .map((child, index, array) => {
                if (
                  !userCardData.userRating &&
                  child?.type &&
                  child?.type.name === "RatingStarsCardContext"
                )
                  return null;
                return (
                  <React.Fragment key={index}>
                    {child}
                    {index < array.length - 1 && (
                      <span className="h-[25px] w-[0.5px] bg-gray-300"></span>
                    )}
                  </React.Fragment>
                );
              })}
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

// export const UserCardOnlineStatus = WithContextOnlineStatus();
export const UserCardProTag = WithContextProTag();
export const UserCardProCard = WithContextProCard();
export const UserCardRatingBox = WithContextRatingBox();
export const UserCardLevelRatingCard = WithContextLevelRatingCard();
export const UserCardRatingStarsCard = withContextRatingStarsCard();
export const UserCardUsername = Username;
export const UserCardName = Name;
export const UserCardLanguages = Languages;
export const UserCardLocation = WithContextLocation;
export const UserCardBio = Bio;
