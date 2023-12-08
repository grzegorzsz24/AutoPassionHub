import { FC, ReactNode } from "react";

interface NoContentProps {
  children: ReactNode;
}

const NoContent: FC<NoContentProps> = ({ children }) => {
  return <p className="text-center sm:text-left sm:text-lg ">{children}</p>;
};

export default NoContent;
