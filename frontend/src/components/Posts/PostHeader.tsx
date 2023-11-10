import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import OutlineButton from "../../ui/OutlineButton";
import UserProfile from "../../ui/UserProfile";
import { useAppSelector } from "../../store/store";

interface PostHeaderProps {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string;
  createdAt: string;
  deletePostHandler: (id: number) => void;
  setEditMode: (value: boolean) => void;
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

const PostHeader: FC<PostHeaderProps> = ({
  id,
  firstName,
  lastName,
  nickname,
  avatar,
  createdAt,
  deletePostHandler,
  setEditMode,
}) => {
  const { nickname: userNickname } = useAppSelector((state) => state.user);
  const [optionsAreShown, setOptionsAreShown] = useState(false);

  const onMouseOverHandler = () => {
    setOptionsAreShown(true);
  };

  const onMouseLeaveHandler = () => {
    setOptionsAreShown(false);
  };

  return (
    <div className=" py-4 px-4 flex items-center justify-between">
      <UserProfile
        size="medium"
        imageUrl={avatar}
        firstName={firstName}
        lastName={lastName}
        nickname={nickname}
        createdAt={createdAt}
      />
      <div
        className="relative cursor-pointer"
        onMouseOver={onMouseOverHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <p className="text-primaryDark dark:text-blue-100">
          <BiDotsHorizontalRounded className="text-2xl" />
        </p>
        <AnimatePresence>
          {optionsAreShown && (
            <motion.div
              className="absolute z-40 right-0 bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-50  py-4 px-8 flex flex-col gap-2 text-md rounded-md shadow-md"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
            >
              {nickname === userNickname && (
                <>
                  <OutlineButton
                    size="sm"
                    fullWidth={true}
                    onClick={() => setEditMode(true)}
                  >
                    Edytuj post
                  </OutlineButton>
                  <OutlineButton
                    size="sm"
                    color="red"
                    fullWidth={true}
                    onClick={() => {
                      deletePostHandler(id);
                    }}
                  >
                    Usuń post
                  </OutlineButton>
                </>
              )}

              <OutlineButton size="sm" fullWidth={true} onClick={() => {}}>
                Dodaj do ulubionych
              </OutlineButton>
              <OutlineButton size="sm" fullWidth={true} onClick={() => {}}>
                Zgłoś post
              </OutlineButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PostHeader;
