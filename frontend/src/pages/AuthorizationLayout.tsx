import { FC, ReactNode } from "react";

import Footer from "../components/Footer";
import Logo from "../ui/Logo";
import SwitchThemeButton from "../ui/SwitchThemeButton";

interface AuthorizationLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthorizationLayout: FC<AuthorizationLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <div className=" min-h-screen  flex justify-between dark:text-blue-50 h-screen">
      <div className="bg-futuristic-car bg-cover bg-center grow  hidden sm:block"></div>
      <div className="px-4 sm:px-8 py-4 w-full sm:w-auto   flex flex-col justify-between 2xl:w-1/2 gap-24 overflow-y-auto">
        <div className="flex items-center justify-between">
          <Logo />
          <SwitchThemeButton />
        </div>
        <div className="flex flex-col items-center justify-center gap-16 h-full">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="mx-auto w-full">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthorizationLayout;
