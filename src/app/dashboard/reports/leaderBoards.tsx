import { Avatar } from "@mui/material";
import React from "react";
import { IoMdArrowDropup } from "react-icons/io";

interface UserLeaderboardItem {
  image: string;
  name: string;
  points: number;
  accuracy_percentage: number;
}

interface GroupsLeaderboard {
  group_name: string;
  points_per_user: number;
  accuracy_percentage: number;
}

interface Response {
  user_leaderboard: UserLeaderboardItem[];
  groups_leaderboard: GroupsLeaderboard[];
}

interface ActivitiesProps {
  response: Response;
}

const LeaderBoards: React.FC<ActivitiesProps> = ({ response }) => {
  return (
    <>
      <div className="flex flex-wrap justify-between align-top gap-4 py-3 ">
        <div className="flex-1 p-4 shadow-md border-collapse  rounded-2xl bg-white">
          <h2 className="text-black text-opacity-50 font-medium text-sm">
            User Leaderboard
          </h2>

          {response?.user_leaderboard.length > 0
            ? response?.user_leaderboard.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between py-3">
                    <div className="flex gap-3">
                      <Avatar src={item.image}></Avatar>
                      <div>
                        <p className="text-black font-semibold text-sm">
                          {item.name}
                        </p>
                        <p className="text-black text-opacity-50 font-medium text-xs">
                          {item.points} Points - {item.accuracy_percentage}%
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>{index + 1}</p>
                      <IoMdArrowDropup size={30} style={{ color: "#1FE08F" }} />
                    </div>
                  </div>
                );
              })
            : " No Data"}
        </div>

        <div className="flex-1  p-4 shadow-md border-collapse  rounded-2xl bg-white">
          <h2 className="text-black text-opacity-50 font-medium text-sm">
            Groups Leaderboard
          </h2>

          {response?.groups_leaderboard.length > 0
            ? response?.groups_leaderboard.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between py-3">
                    <div>
                      <p className="text-black font-semibold text-sm">
                        {item.group_name}
                      </p>
                      <p className="text-black text-opacity-50 font-medium text-xs">
                        {item.points_per_user} Points / User -{" "}
                        {item.accuracy_percentage}% Correct
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>{index + 1}</p>
                      <IoMdArrowDropup size={30} style={{ color: "#1FE08F" }} />
                    </div>
                  </div>
                );
              })
            : " No Data"}
        </div>
      </div>
    </>
  );
};

export default LeaderBoards;
