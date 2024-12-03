"use client";
import React, { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import Activities from "./activities";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProgressBars from "./progressBars";
import LeaderBoards from "./leaderBoards";
import { IoCloseSharp } from "react-icons/io5";

interface Metrics {
  active_users: {
    current: number;
    total: number;
  };
  questions_answered: number;
  average_session_length_seconds: number;
  starting_knowledge_percentage: number;
  current_knowledge_percentage: number;
}

interface Activity {
  monthly: {
    month: string;
    value: number;
  }[];
}

interface Topic {
  name: string;
  image: string;
  correct_percentage: number;
}

interface Topics {
  weakest: Topic[];
  strongest: Topic[];
}

interface Leaderboard {
  name: string;
  image: string;
  points: number;
  accuracy_percentage: number;
  previous_accuracy_percentage: number;
}

interface GroupLeaderboard {
  group_name: string;
  points_per_user: number;
  accuracy_percentage: number;
  previous_accuracy_percentage: number;
}

interface ReportData {
  metrics: Metrics;
  activity: Activity;
  topics: Topics;
  user_leaderboard: Leaderboard[];
  groups_leaderboard: GroupLeaderboard[];
  api_secret: string;
}

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReportData | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>("Last 7 Days");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUsers, setSelectedUsers] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        const response = await fetch("/task-data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch the configuration file.");
        }

        const config = await response.json(); 

        if (!config?.api_secret) {
          console.error('The JSON file is missing the "api_secret" key.');
          return;
        }

        setData(config); 
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleDownload = async () => {
    if (!data) {
      console.error("No config data available for download.");
      return;
    }

    setLoading(true);
    try {
      const apiResponse = await fetch(
        "https://testd5-img.azurewebsites.net/api/imgdownload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api: data?.api_secret }),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Failed to fetch data from the API.");
      }

      const result = await apiResponse.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeFrameChange = (option: string) => {
    setTimeFrame(option);
  };

  const groups = [
    { name: "All Users (400)", value: "All Users" },
    { name: "Managers (14)", value: "Managers" },
    { name: "Trainers (4)", value: "Trainers" },
  ];

  const users = ["Adrian Lu", "Evelyn Hamilton"];

  return (
    <>
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 py-3">
        <div>
          <h2 className="text-lg font-semibold">Reports</h2>
        </div>
        <div className="flex items-center gap-2">
          <MdDownload size={22} />
          <button
            className="text-gray-700"
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? "Processing..." : "Download"}
          </button>
        </div>
      </header>

      <div className="flex w-full justify-between gap-3 flex-wrap py-5">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-base font-medium  text-gray-800 text-opacity-70 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-80">
              <p>
                TimeFrame: <span className="text-black">{timeFrame}</span>
              </p>
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {["Last 7 Days", "This Month", "This Year", "Custom"].map(
                (option) => (
                  <MenuItem key={option}>
                    <button
                      onClick={() => handleTimeFrameChange(option)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      {option}
                    </button>
                  </MenuItem>
                )
              )}
            </div>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-96">
                <p>
                  People: <span className="text-black">Multiple Selected</span>
                </p>
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="flex flex-wrap items-center gap-3 p-4">
              {selectedGroup && (
                <div className="bg-gray-100 text-white text-sm flex items-center gap-2 px-3 py-1 rounded-full">
                  <span className="text-black">{selectedGroup}</span>
                  <IoCloseSharp
                    style={{ color: "gray" }}
                    className="cursor-pointer"
                    onClick={() => setSelectedGroup("")}
                  />
                </div>
              )}

              {selectedUsers && (
                <div className="bg-gray-100 text-white text-sm flex items-center gap-2 px-3 py-1 rounded-full">
                  <span className="text-black">{selectedUsers}</span>
                  <IoCloseSharp
                    style={{ color: "gray" }}
                    className="cursor-pointer"
                    onClick={() => setSelectedUsers("")}
                  />
                </div>
              )}
            </div>

            <form className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
              </div>
            </form>

            <div className="py-2 px-4">
              <div className="border-b border-gray-200 pb-2 mb-2">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-1">
                  Groups
                </p>
                {groups &&
                  groups.map((group) => (
                    <div
                      key={group.value}
                      className="flex items-center space-x-2 mb-1"
                    >
                      <input
                        type="radio"
                        id={group.value}
                        name="group"
                        value={group.value}
                        checked={selectedGroup === group.value}
                        onChange={() => setSelectedGroup(group.value)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={group.value}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {group.name}
                      </label>
                    </div>
                  ))}
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase font-semibold mb-1">
                  Users
                </p>
                {users &&
                  users.map((user) => (
                    <div
                      key={user}
                      className="flex items-center space-x-2 mb-1"
                    >
                      <input
                        type="radio"
                        id={user}
                        name="user"
                        value={user}
                        checked={selectedUsers === user}
                        onChange={() => setSelectedUsers(user)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={user}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {user}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-80">
            <p>
                  Topic: <span className="text-black">{timeFrame}</span>
                </p>
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
            {["All", "Last 7 Days", "This Month", "This Year", "Custom"].map(
                (option) => (
                  <MenuItem key={option}>
                    <button
                      onClick={() => handleTimeFrameChange(option)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      {option}
                    </button>
                  </MenuItem>
                )
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>

      {data && <Activities response={data} />}
    {data && <ProgressBars response={data} />}
    {data && <LeaderBoards response={data} />}
    </>
  );
};

export default Reports;
