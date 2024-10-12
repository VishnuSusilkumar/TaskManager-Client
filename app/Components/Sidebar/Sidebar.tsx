import React, { useState } from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";
import { bars, arrowRight } from "@/utils/Icons";

function Sidebar() {
  const { logoutUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 text-gray-500 px-2 py-1 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <span className="text-lg md:text-xl">{arrowRight}</span>
        ) : (
          <span className="text-lg md:text-xl">{bars}</span>
        )}
      </button>
      <div
        className={`sidebar fixed right-0 top-0 md:top-[4rem] w-[20rem] h-[100vh] md:h-[calc(100%-4rem)] bg-white md:bg-[#f9f9f9] flex flex-col transition-transform duration-300 ease-in-out z-40 overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        <div className="md:mt-0 mt-16">
          {" "}
          <Profile />
        </div>
        <div className="mx-6">
          <RadialChart />
        </div>

        <button
          className="mt-2 mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
          onClick={logoutUser}
        >
          Sign Out
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
