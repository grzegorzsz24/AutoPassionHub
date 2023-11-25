import io, { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { useEffect, useRef } from "react";

const useSocket = (
  url: string,
  options?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket => {
  const { current: socket } = useRef(io(url, options));

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
