import { FC, useEffect, useRef, useState } from "react";

import { IoMdCloseCircle } from "react-icons/io";
import UserModel from "../models/UserModel";

interface UserHeaderProps {
  user: UserModel | null;
}

const UserHeader: FC<UserHeaderProps> = ({ user }) => {
  const [isProfilePictureOpen, setIsProfilePictureOpen] = useState(false);
  const modalRef = useRef(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isProfilePictureOpen) {
      switch (event.key) {
        case "Escape":
          setIsProfilePictureOpen(false);
          break;
        default:
          break;
      }
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && event.target === modalRef.current) {
      setIsProfilePictureOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfilePictureOpen]);

  useEffect(() => {
    if (isProfilePictureOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProfilePictureOpen]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 text-blue-50 bg-blue-600 max-w-2xl mx-auto rounded-md">
      {user && (
        <>
          <img
            src={user.imageUrl}
            alt={`${user.nickname} profile picture`}
            className="w-24 h-24 rounded-full shadow-md cursor-pointer"
            onClick={() => setIsProfilePictureOpen(true)}
          />
          <div className="flex flex-col items-center">
            <span className="text-xl">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-sm font-bold">@{user.nickname}</span>
          </div>
          {isProfilePictureOpen && (
            <>
              <div
                ref={modalRef}
                className={`fixed inset-0 z-50 backdrop-blur-sm w-full h-screen bg-black bg-opacity-90 backdrop:blur-sm py-4 px-16  flex items-center justify-center`}
              >
                <img
                  src={user.imageUrl}
                  alt=""
                  className="max-h-[80%] max-w-[90%]"
                />

                <button
                  aria-label="Zamknij galerię"
                  onClick={() => setIsProfilePictureOpen(false)}
                  className="absolute top-8 right-8 text-4xl text-blue-50 hover:text-blue-600 transition-all"
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default UserHeader;
