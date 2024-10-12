import { useTasks } from "@/context/taskContext";
import React from "react";

function Filters() {
  const { priority, setPriority } = useTasks();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const priorities = ["All", "Low", "Med", "High"];

  return (
    <div className="relative py-2 xs:py-1 sm:py-1 md:py-2 lg:py-3 px-2 xs:px-1 sm:px-1 md:px-2 lg:px-4 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">

      <span
        className="absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300"
        style={{
          width: "calc(100% / 4 - 10px)",
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}
      ></span>

      {priorities.map((priority, index) => (
        <button
          key={index}
          className={`relative z-10 font-medium text-xs xs:text-xs sm:text-xs md:text-sm lg:text-base ${
            activeIndex === index ? "text-[#3aafae]" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setPriority(priority.toLowerCase());
          }}
        >
          {priority}
        </button>
      ))}
    </div>
  );
}

export default Filters;
