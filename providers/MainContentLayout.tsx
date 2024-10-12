"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const userId = useUserContext().user._id;

  return (
    <main
      className={`pb-[1.5rem] flex h-full ${
        userId ? "pr-4 md:pr-[20rem]" : "pr-4"
      }`}
    >
      {children}
    </main>
  );
}

export default MainContentLayout;
