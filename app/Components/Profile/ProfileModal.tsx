"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import { badge, check, mail } from "@/utils/Icons";
import Image from "next/image";
import React from "react";

function ProfileModal() {
  const ref = React.useRef(null);
  const { closeModal } = useTasks();
  const { user, emailVerification } = useUserContext();

  useDetectOutside({
    ref,
    callback: () => {
      closeModal();
    },
  });

  const { name, email, photo, isVerified } = user;

  const handleEmailVerification = () => {
    if (!isVerified) {
      emailVerification();
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <div
        ref={ref}
        className="py-5 px-6 max-w-[90%] md:max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white"
      >
        <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md"></div>

        <div className="mt-4 relative flex justify-between">
          <div className="relative inline-block">
            <Image
              src={photo}
              alt="profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-1 shadow-sm">
              <span className="text-lg text-blue-400">{badge}</span>
              <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                {check}
              </span>
            </div>
          </div>
          <div className="self-end flex items-center gap-2">
            <button
              className={`flex items-center gap-2 border-2 rounded-md py-1 px-3 text-xs font-medium ${
                isVerified
                  ? "text-[#32CD32] border-[#32CD32]"
                  : "text-[#EB4E31] border-[#EB4E31]"
              }`}
              onClick={handleEmailVerification}
            >
              {check} {isVerified ? "Verified" : "Verify Email"}
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold">{name}</h1>
          <p className="text-sm md:text-base text-gray-500">{email}</p>
        </div>

        <form className="mt-4 pt-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10">
          <div className="pt-2 grid grid-cols-[1fr] md:grid-cols-[120px_1fr] gap-2">
            <label htmlFor="name" className="text-sm md:text-base font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              readOnly
              className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
            />
          </div>

          <div className="pt-4 grid grid-cols-[1fr] md:grid-cols-[120px_1fr] gap-2 border-t-2 border-t-[#323232]/10">
            <label htmlFor="email" className="text-sm md:text-base font-medium">
              Email Address
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                readOnly
                className="w-full py-[0.4rem] pl-9 pr-2 font-medium rounded-lg border-2 border-[#323232]/10"
              />
              <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 text-[#323232]/50">
                {mail}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
