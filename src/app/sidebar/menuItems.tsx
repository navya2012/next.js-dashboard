import { MdTurnSlightRight } from "react-icons/md";
import { BsLightningFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";
import { IoBulb } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";


interface ISidebarItem {
    name: string;
    path?: string;
    icon?: React.ReactNode;
  }

export const menuItems: ISidebarItem[] = [
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: <MdTurnSlightRight />,
    },
    {
      name: "Library",
      path: "/dashboard/library",
      icon: <BsLightningFill />,
    },
    {
      name: "People",
      path: "/dashboard/people",
      icon: <BsFillPeopleFill />,
    },
    {
      name: "Activities",
      path: "/dashboard/activities",
      icon: <MdAssignmentAdd />,
    },
    {
        name: "Support"
      },
    {
      name: "Get Started",
      path: "/dashboard/getStarted",
      icon: <IoBulb />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <IoSettings />,
    },
  ];