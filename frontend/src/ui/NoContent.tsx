import { FC, ReactNode } from "react";

interface NoContentProps {
  children: ReactNode;
}

const NoContent: FC<NoContentProps> = ({ children }) => {
  return <p className=" text-xl">{children}</p>;
};

export default NoContent;
