import { Outlet } from "react-router-dom";

const OutletLayout = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default OutletLayout;
