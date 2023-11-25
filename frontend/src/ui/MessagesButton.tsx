import { AnimatePresence, motion } from "framer-motion";

import { BiSolidMessageDetail } from "react-icons/bi";
import MessageNotification from "../components/Notifications/MessageNotification";
import { useAppSelector } from "../store/store";
import { useState } from "react";

const menuVariants = {
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

const MessagesButton = () => {
  const { messageNotifications } = useAppSelector((state) => state.socket);
  const [isHovering, setIsHovering] = useState(false);

  const notificationsNotRead = messageNotifications?.filter(
    (notification) => !notification.read
  );

  const handleMouseOver = () => {
    if (messageNotifications && messageNotifications.length > 0) {
      setIsHovering(true);
    }
  };

  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className="relative group"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="text-2xl xl:text-3xl text-blue-950 dark:text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md relative">
        {" "}
        <BiSolidMessageDetail className="group-hover:scale-125 transition-all" />
        {messageNotifications && notificationsNotRead.length > 0 && (
          <div className="bg-green-500 absolute  left-4 bottom-4 text-sm w-4 h-4 xl:w-6 xl:h-6 rounded-full flex items-center justify-center text-blue-50 dark:text-blue-900 font-bold group-hover:ring-4 group-hover:ring-green-300 transition-all">
            {notificationsNotRead.length}
          </div>
        )}
      </button>
      <AnimatePresence>
        {isHovering && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute top-full max-h-96 w-[80vw] sm:w-96 overflow-y-auto right-[-20px]  bg-grayLight dark:bg-grayDark text-grayDark dark:text-blue-50 rounded-md px-4 py-4 flex flex-col gap-2  shadow-md items-center z-10"
          >
            {messageNotifications &&
              messageNotifications.map((notification) => {
                return (
                  <MessageNotification
                    key={notification.channelId}
                    notification={notification}
                  />
                );
              })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesButton;
