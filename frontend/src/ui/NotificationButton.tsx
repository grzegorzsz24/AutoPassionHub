import { AnimatePresence, motion } from "framer-motion";

import ArticleNotification from "../components/Notifications/ArticleNotification";
import CommentNotification from "../components/Notifications/CommentNotification";
import InvitationNotification from "../components/Notifications/InvitationNotification";
import { IoNotifications } from "react-icons/io5";
import LikeNotification from "../components/Notifications/LikeNotification";
import ReportNotification from "../components/Notifications/ReportNotification";
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
    (notification) => !notification.read,
  );

  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className="group relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="relative rounded-md text-2xl text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-blue-50 xl:text-3xl">
        <IoNotifications className="transition-all group-hover:scale-125" />
        {notifications && notificationsNotRead.length > 0 && (
          <div className="absolute bottom-4  left-4 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-blue-50 transition-all group-hover:ring-4 group-hover:ring-green-300 dark:text-blue-900 xl:h-6 xl:w-6">
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
            className="absolute right-[-10px] top-full z-10 flex max-h-96 w-[80vw] flex-col items-center gap-2 overflow-y-auto rounded-md bg-grayLight px-4 py-4 text-grayDark shadow-md  dark:bg-grayDark dark:text-blue-50 sm:w-96"
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
                case "POST_REPORT":
                case "FORUM_REPORT":
                case "EVENT_REPORT":
                  return (
                    <ReportNotification
                      key={notification.createdAt}
                      notification={notification}
                    />
                  );
                case "ARTICLE_APPROVED":
                case "ARTICLE_DELETED":
                  return (
                    <ArticleNotification
                      key={notification.createdAt}
                      notification={notification}
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
