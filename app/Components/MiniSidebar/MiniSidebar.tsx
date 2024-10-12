"use client";
import { useUserContext } from "@/context/userContext";
import IconCheck from "@/public/icons/IconCheck";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MiniSidebar() {
  const { user } = useUserContext();
  const pathname = usePathname();
  const userId = user._id;

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];
  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem]">
        <Image src="/logo.png" width={28} height={28} alt="logo" />
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        {userId && (
          <ul className="flex flex-col gap-10 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <Link href={item.link}>{item.icon}</Link>
                <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MiniSidebar;
