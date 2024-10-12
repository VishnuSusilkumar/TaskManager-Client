"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { bell } from "@/utils/Icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/utils/socket";
import NotificationModal from "../Modal/NotificationModal";

function Header() {
  const { user } = useUserContext();

  const socket = useSocket();
  const { openModalForAdd, activeTasks } = useTasks();

  const router = useRouter();
  const { name } = user;
  const userId = user._id;

  const [notifications, setNotifications] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!socket) {
      console.error("Socket connection is null or not initialized!");
      return;
    }
    console.log("Socket connection established");

    socket.on("taskCreated", (newTask) => {
      setNotifications((prev) => [
        ...prev,
        {
          message: `New task added: ${newTask.title}`,
          task: newTask,
          status: "unread",
        },
      ]);
      console.log("Task Created ", newTask);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setNotifications((prev) => [
        ...prev,
        {
          message: `Task updated: ${updatedTask.title}`,
          task: updatedTask,
          status: "unread",
        },
      ]);
      console.log("Task Updated", updatedTask);
    });

    socket.on("taskDeleted", (taskId, task) => {
      setNotifications((prev) => [
        ...prev,
        { message: `Task deleted: ${task.title}`, taskId, status: "unread" },
      ]);
      console.log("Task Deleted:", taskId);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const markAsRead = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const markAllAsRead = () => {
    setNotifications([]);
  };

  return (
    <header className="px-4 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <h1 className="text-sm md:text-lg font-medium">
          {userId ? `Welcome, ${name}!` : "Welcome to TaskManager"}
        </h1>
        <p className="text-xs md:text-sm md:ml-4">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4 mr-10">
        <button
          className="px-2 py-2 text-xs md:text-sm bg-[#3aafae] text-white rounded-[50px] hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out md:px-8 md:py-3"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        {userId && (
          <div className="relative">
            <div
              className="relative cursor-pointer text-gray-500 text-lg md:text-xl"
              onClick={() => setOpenModal(!openModal)}
            >
              {bell}
              {notifications.filter((n) => n.status === "unread").length >
                0 && (
                <span className="absolute -right-2 -top-2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#3ccba0] text-xs text-white">
                  {notifications.filter((n) => n.status === "unread").length}
                </span>
              )}
            </div>

            <NotificationModal
              notifications={notifications}
              openModal={openModal}
              markAsRead={markAsRead}
              markAllAsRead={markAllAsRead}
              closeModal={() => setOpenModal(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
