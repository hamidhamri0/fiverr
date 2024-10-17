("use client");
import React from "react";
import Button from "@/Components/Atoms/Btn";
import UserCard, {
  UserCardBio,
  UserCardImage,
  UserCardLevelRatingCard,
  UserCardName,
  UserCardProCard,
  UserCardProTag,
  UserCardRatingBox,
  UserCardRatingStarsCard,
  UserCardUsername,
} from "./UserCard";
import { UserCard as UserCardType } from "@/types/user.card.context.interface";
import UserStats from "@/Components/Molecules/UserStats";

export default function UserProfileCard({
  userCardData,
}: {
  userCardData: UserCardType;
}) {
  return (
    <div className="mb-12">
      <UserCard
        userCardData={userCardData}
        imageClassName="h-24 w-24"
        Image={<UserCardImage />}
        Name={<UserCardName />}
        RatingBox={<UserCardRatingBox />}
        Username={<UserCardUsername />}
        ProTag={<UserCardProTag size={30} />}
        ProCard={<UserCardProCard />}
        RatingStarsCard={<UserCardRatingStarsCard />}
        LevelRatingCard={<UserCardLevelRatingCard />}
        UserCardBio={<UserCardBio />}
      />

      <div className="mb-4 flex gap-4">
        <Button color="white">Contact me</Button>
      </div>
      <UserStats
        From="United States"
        memberSince={
          userCardData?.userSince
            ? new Date(userCardData.userSince).getFullYear().toString()
            : "N/A"
        }
        languages={userCardData?.languages}
        description={userCardData?.bio}
      />
    </div>
  );
}
