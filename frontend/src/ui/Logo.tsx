import DarkLogo from "../assets/logo-dark.svg";
import LightLogo from "../assets/logo-light.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
    },
  };

  return (
    <motion.div
      className="logo text-xl cursor-pointer"
      onClick={handleLogoClick}
      whileHover="hover"
      variants={logoVariants}
      transition={{ type: "spring", stiffness: 300 }}
    >
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
    </motion.div>
  );
};

export default Logo;
