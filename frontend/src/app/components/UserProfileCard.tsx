import React from "react";
import UserCard from "./smallComponents/UserCard";
import Button from "./smallComponents/Button";

type UserStatsProps = {
  From: string;
  MemberSince: string;
  Languages: string[];
  description: string;
};

function UserStats({
  From,
  MemberSince,
  Languages,
  description,
}: UserStatsProps) {
  return (
    <div className="maw-w-[700px] mx-auto rounded-md border border-gray-300 p-4">
      <div className="mb-4 grid grid-cols-2 gap-4 border-b border-gray-400 pb-4 xs:grid-cols-1">
        <div className="flex flex-col gap-1">
          <div>From</div>
          <div className="font-bold">{From}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div>Member Since</div>
          <div className="font-bold">{MemberSince}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div>Languages</div>
          <div className="flex gap-2">
            {Languages.map((lang, i) => (
              <div key={lang} className="font-bold">
                {lang}
                {i !== Languages.length - 1 && ","}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function UserProfileCard() {
  return (
    <div className="mx-auto max-w-[700px] p-2">
      <UserCard
        imageClassName="h-24 w-24"
        Image={<UserCard.Image />}
        Name={<UserCard.Name />}
        RatingBox={<UserCard.Rating />}
        Username={<UserCard.Username />}
        ProTag={<UserCard.ProTag />}
        ProCard={<UserCard.ProCard />}
        OnlineStatus={<UserCard.OnlineStatus />}
        RatingStarsCard={<UserCard.RatingStarsCard />}
        LevelRatingCard={<UserCard.LevelRatingCard />}
      />

      <div className="mb-4 flex gap-4">
        <Button color="white">Contact me</Button>
      </div>
      <UserStats
        From="United States"
        MemberSince="2020"
        Languages={["English", "Arabic"]}
        description="I am a professional graphic designer with 5 years of experience. I have worked with many clients and have a good rating."
      />
    </div>
  );
}
