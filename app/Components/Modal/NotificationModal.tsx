"use client";
import React, { useRef } from "react";
import useDetectOutside from "@/hooks/useDetectOutside";

interface Notification {
  message: string;
  status: string;
}

interface NotificationModalProps {
  notifications: Notification[];
  openModal: boolean;
  markAsRead: (index: number) => void;
  markAllAsRead: () => void;
  closeModal: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  openModal,
  markAsRead,
  markAllAsRead,
  closeModal,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useDetectOutside({
    ref,
    callback: closeModal,
  });

  if (!openModal) return null;

  return (
    <div
      className="absolute top-[50px] right-0 z-[9999] w-[300px] sm:w-[350px] max-h-[400px] bg-white shadow-lg rounded-lg overflow-y-auto"
      ref={ref}
    >
      <div className="flex justify-between items-center p-4">
        <h5 className="text-lg sm:text-xl md:text-2xl font-medium">Notifications</h5>
        <button
          className="text-xs sm:text-sm text-blue-600 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            markAllAsRead();
          }}
        >
          Mark all as read
        </button>
      </div>
      <div className="p-2">
        {notifications.length === 0 ? (
          <p className="text-center text-xs sm:text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded ${
                notification.status === "unread" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm md:text-base">{notification.message}</p>
              <button
                className="text-xs text-blue-500 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead(index);
                }}
              >
                Mark as read
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
