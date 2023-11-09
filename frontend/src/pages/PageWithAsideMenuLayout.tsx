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
    <div className=" px-6 py-12  flex items-start gap-8 xl:gap-32 h-full overflow-y-auto  text-primaryDark2 dark:text-blue-50">
      {menu}
      <div className="flex-grow h-min p-1">{content}</div>
    </div>
  );
};

export default PageWithAsideMenuLayout;
