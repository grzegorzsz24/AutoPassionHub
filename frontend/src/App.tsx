import Notification from "./ui/Notification";
import { RouterProvider } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import router from "./router/routerConfig";
import { setConnected } from "./store/features/socketSlice";
import { useAppDispatch } from "./store/store";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;

function App() {
  const dispatch = useAppDispatch();
  return (
    <>
      <StompSessionProvider
        url={SOCKET_URL}
        onConnect={() => {
          dispatch(setConnected(true));
          console.log("🟢 Połączono z socketem");
        }}
        onDisconnect={() => {
          dispatch(setConnected(false));
          console.log("🔴 Rozłączono z socketem");
        }}
      >
        <RouterProvider router={router}></RouterProvider>
        <Notification />
      </StompSessionProvider>
    </>
  );
}

export default App;
