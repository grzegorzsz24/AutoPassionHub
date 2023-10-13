import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

const MainPageLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Navigation />
      <h1>Main Page Layout</h1>
      <Outlet />
    </div>
  );
};

export default MainPageLayout;
