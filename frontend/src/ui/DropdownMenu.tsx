import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useState } from "react";

interface DropdownMenuProps {
  triggerElement: ReactNode;
  children: ReactNode;
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const DropdownMenu: FC<DropdownMenuProps> = ({ triggerElement, children }) => {
  const [menuIsShown, setMenuIsShown] = useState(false);

  const onMouseOverHandler = () => setMenuIsShown(true);
  const onMouseLeaveHandler = () => setMenuIsShown(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {triggerElement}
      <AnimatePresence>
        {menuIsShown && (
          <motion.div
            className={`absolute z-40 right-0 bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-50 w-44 py-4 px-2 sm:px-8 flex flex-col gap-2 text-md rounded-md shadow-md`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
