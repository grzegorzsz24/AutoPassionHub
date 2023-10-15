import DarkLogo from "../assets/logo-dark.svg";
import LightLogo from "../assets/logo-light.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="logo text-xl cursor-pointer" onClick={handleLogoClick}>
      <img
        src={DarkLogo}
        alt="logo"
        className="w-28 md:w-36 lg:w-44 2xl:w-56 dark:hidden"
      />
      <img
        src={LightLogo}
        alt="logo"
        className="w-28 md:w-36 lg:w-44 2xl:w-56 hidden dark:block"
      />
    </div>
  );
};

export default Logo;
