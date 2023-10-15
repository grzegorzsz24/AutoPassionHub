import Navbar from "../components/Menu/Navbar";
import Navigation from "../components/Menu/Navigation";
import { Outlet } from "react-router-dom";

const MainPageLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div>
        <Navbar />
        <Navigation />
      </div>
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPageLayout;
