"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();
  return (
    <div className="m-4 sm:m-5 md:m-6">
      <div
        className="px-2 py-3 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-3 bg-[#E6E6E6]/20 rounded-[0.6rem] sm:rounded-[0.7rem] md:rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        onClick={openProfileModal}
      >
        <div>
          <Image
            src={user?.photo}
            alt="avatar"
            width={50}
            height={50}
            className="sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-full"
          />
        </div>
        <div>
          <h1 className="flex flex-col text-lg sm:text-xl md:text-2xl">
            <span className="font-medium text-sm sm:text-base md:text-lg">
              Hello,
            </span>
            <span className="font-bold">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col gap-6 sm:gap-7 md:gap-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <div className="text-gray-400">
            <p className="text-sm sm:text-base md:text-lg">Total Tasks:</p>
            <p className="pl-3 sm:pl-3.5 md:pl-4 relative flex gap-1 sm:gap-2">
              <span className="absolute h-[60%] sm:h-[65%] md:h-[70%] w-[0.15rem] sm:w-[0.18rem] md:w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-3xl sm:text-4xl text-[#333]">
                {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-sm sm:text-base md:text-lg">In Progress:</p>
            <p className="pl-3 sm:pl-3.5 md:pl-4 relative flex gap-1 sm:gap-2">
              <span className="absolute h-[60%] sm:h-[65%] md:h-[70%] w-[0.15rem] sm:w-[0.18rem] md:w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-3xl sm:text-4xl text-[#333]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-sm sm:text-base md:text-lg">Open Tasks:</p>
            <p className="pl-3 sm:pl-3.5 md:pl-4 relative flex gap-1 sm:gap-2">
              <span className="absolute h-[60%] sm:h-[65%] md:h-[70%] w-[0.15rem] sm:w-[0.18rem] md:w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-3xl sm:text-4xl text-[#333]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-sm sm:text-base md:text-lg">Completed:</p>
            <p className="pl-3 sm:pl-3.5 md:pl-4 relative flex gap-1 sm:gap-2">
              <span className="absolute h-[60%] sm:h-[65%] md:h-[70%] w-[0.15rem] sm:w-[0.18rem] md:w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-3xl sm:text-4xl text-[#333]">
                {completedTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-6 sm:mt-7 md:mt-8 font-medium text-sm sm:text-base md:text-lg">
        Activity
      </h3>
    </div>
  );
}

export default Profile;
