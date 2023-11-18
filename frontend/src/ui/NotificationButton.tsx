import { AnimatePresence, motion } from "framer-motion";

import CommentNotification from "../components/Notifications/CommentNotification";
import InvitationNotification from "../components/Notifications/InvitationNotification";
import { IoNotifications } from "react-icons/io5";
import LikeNotification from "../components/Notifications/LikeNotification";
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

const NotificationButton = () => {
  const { notifications } = useAppSelector((state) => state.socket);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    if (notifications && notifications.length > 0) {
      setIsHovering(true);
    }
  };

  const notificationsNotRead = notifications?.filter(
    (notification) => !notification.read
  );

  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className="relative group"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="text-2xl xl:text-3xl text-blue-950 dark:text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md relative">
        <IoNotifications className="group-hover:scale-125 transition-all" />
        {notifications && notificationsNotRead.length > 0 && (
          <div className="bg-green-500 absolute  left-4 bottom-4 text-sm w-4 h-4 xl:w-6 xl:h-6 rounded-full flex items-center justify-center text-blue-50 dark:text-blue-900 font-bold group-hover:ring-4 group-hover:ring-green-300 transition-all animate-bounce">
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
            className="absolute top-full max-h-96 w-96 overflow-y-auto right-0  bg-grayLight dark:bg-grayDark text-grayDark dark:text-blue-50 rounded-md px-4 py-4 flex flex-col gap-2  shadow-md items-center z-10"
          >
            {notifications.map((notification) => {
              switch (notification.type) {
                case "POST_LIKE":
                  return (
                    <LikeNotification
                      key={notification.createdAt}
                      notification={notification}
                      typeOfContent="POST"
                    />
                  );
                case "POST_COMMENT":
                  return (
                    <CommentNotification
                      key={notification.createdAt}
                      notification={notification}
                      typeOfContent="POST"
                    />
                  );
                case "ARTICLE_LIKE":
                  return (
                    <LikeNotification
                      key={notification.createdAt}
                      notification={notification}
                      typeOfContent="ARTICLE"
                    />
                  );
                case "FORUM_COMMENT":
                  return (
                    <CommentNotification
                      key={notification.createdAt}
                      notification={notification}
                      typeOfContent="FORUM"
                    />
                  );
                case "INVITATION_SENT":
                  return (
                    <InvitationNotification
                      key={notification.createdAt}
                      notification={notification}
                      typeOfContent="SENT"
                    />
                  );
                case "INVITATION_ACCEPTED":
                  return (
                    <InvitationNotification
                      key={notification.createdAt}
                      notification={notification}
                      typeOfContent="ACCEPTED"
                    />
                  );
                default:
                  return null;
              }
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationButton;
