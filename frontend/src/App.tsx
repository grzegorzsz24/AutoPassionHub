import Notification from "./ui/Notification";
import { RouterProvider } from "react-router-dom";
import router from "./router/routerConfig";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Notification />
    </>
  );
}

export default App;
