import React from "react";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { ProfileIcon } from "@features/ui/component/ProfileIcon";

type Props = {
  userId: string;
};

export const Profile: React.FC<Props> = (props: Props) => {
  const { userId } = props;
  const userInfo = useFetchUserInfo({ userId }).data;

  return (
    <>
      <ProfileIcon avatarUrl={userInfo?.avatar} />
      <div>{userInfo?.handle}</div>
      <div>Rank: {userInfo?.rank}</div>
      <div>Rating: {userInfo?.rating}</div>
      <div>Contribution: {userInfo?.contribution}</div>
      <div>friends: {userInfo?.friendOfCount} users</div>
      <div>Max Rank: {userInfo?.maxRank}</div>
      <div>Max Rating: {userInfo?.maxRating}</div>
      <div>Organization: {userInfo?.organization}</div>
    </>
  );
};
