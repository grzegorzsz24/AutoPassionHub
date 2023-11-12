import Navbar from "../components/Menu/Navbar";
import Navigation from "../components/Menu/Navigation";
import { Outlet } from "react-router-dom";

const MainPageLayout = () => {
  return (
    <div className="h-full flex flex-col ">
      <div>
        <Navbar />
        <Navigation />
      </div>
      <div className="overflow-hidden h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPageLayout;
