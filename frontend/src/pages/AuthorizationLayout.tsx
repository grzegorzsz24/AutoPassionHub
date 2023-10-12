import { FC, ReactNode } from "react";

import Footer from "../components/Footer";
import Logo from "../ui/Logo";
import SwitchThemeButton from "../ui/SwitchThemeButton";

interface AuthorizationLayoutProps {
  children: ReactNode;
}

const AuthorizationLayout: FC<AuthorizationLayoutProps> = ({ children }) => {
  return (
    <div className=" min-h-screen  flex justify-between dark:text-blue-50 ">
      <div className="bg-futuristic-car bg-cover bg-center grow  hidden sm:block"></div>
      <div className="px-4 sm:px-8 py-4 w-full sm:w-auto   flex flex-col justify-between 2xl:w-1/2">
        <div className="flex items-center justify-between">
          <Logo />
          <SwitchThemeButton />
        </div>
        <div className="mx-auto w-full h-full ">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthorizationLayout;
