import { FC, ReactNode } from "react";

interface PageWithAsideMenuLayoutProps {
  menu: ReactNode;
  content: ReactNode;
}

const PageWithAsideMenuLayout: FC<PageWithAsideMenuLayoutProps> = ({
  menu,
  content,
}) => {
  return (
    <div className="flex h-full flex-col items-stretch gap-8 overflow-y-auto py-4 text-primaryDark2 dark:text-blue-50 sm:flex-row sm:items-start sm:py-12 md:px-4 xl:gap-32 xl:px-6">
      {menu}
      <div className="h-min flex-grow sm:p-1">{content}</div>
    </div>
  );
};

export default PageWithAsideMenuLayout;
