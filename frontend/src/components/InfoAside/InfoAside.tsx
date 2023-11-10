import Events from "./Events";
import Friends from "./Friends";
import { motion } from "framer-motion";

const infoAsideVariants = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const InfoAside = () => {
  return (
    <motion.aside
      className="max-w-md bg-white dark:bg-primaryDark2 dark:text-blue-50 my-4 rounded-md flex flex-col gap-4"
      initial="hidden"
      animate="visible"
      variants={infoAsideVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Events />
      <Friends />
    </motion.aside>
  );
};

export default InfoAside;
