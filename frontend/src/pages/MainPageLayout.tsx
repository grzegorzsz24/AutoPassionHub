import Navbar from "../components/Menu/Navbar";
import Navigation from "../components/Menu/Navigation";
import { Outlet } from "react-router-dom";

const MainPageLayout = () => {
  return (
    <div className="flex h-full flex-col ">
      <div>
        <Navbar />
        <Navigation />
      </div>
      <div className="h-full overflow-hidden ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPageLayout;
