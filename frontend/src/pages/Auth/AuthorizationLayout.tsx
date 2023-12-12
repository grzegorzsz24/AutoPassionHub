import { FC, ReactNode } from "react";

import Footer from "../../components/Footer";
import Logo from "../../ui/Logo";
import SwitchThemeButton from "../../ui/SwitchThemeButton";

interface AuthorizationLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthorizationLayout: FC<AuthorizationLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex h-screen min-h-screen justify-between dark:text-blue-50">
      <div className="hidden grow bg-futuristic-car bg-cover bg-center sm:block"></div>
      <div className="flex w-full flex-col justify-between gap-24 overflow-y-auto px-4 py-4 sm:w-auto sm:px-8 2xl:w-1/2">
        <div className="flex items-center justify-between">
          <Logo />
          <SwitchThemeButton />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-16">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="mx-auto w-full">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthorizationLayout;
