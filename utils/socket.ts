import { useUserContext } from "@/context/userContext";
import socketIO from "socket.io-client";

const EndPoint = "http://localhost:8000";

export const useSocket = () => {
  const userId = useUserContext().user._id;

  const socket = socketIO(EndPoint, {
    query: { userId },
    transports: ["websocket"],
    path: "/socket.io",
  });

  return socket;
};
