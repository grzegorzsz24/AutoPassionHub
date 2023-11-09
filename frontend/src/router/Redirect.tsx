import { FC, useEffect } from "react";

import { useNavigate } from "react-router-dom";

interface RedirectProps {
  to: string;
}

const Redirect: FC<RedirectProps> = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return <></>;
};

export default Redirect;
