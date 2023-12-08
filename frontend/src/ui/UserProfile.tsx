import DateFormatter from "../utils/DateFormatter";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  size: "small" | "medium" | "large";
  imageUrl: string;
  firstName: string;
  lastName: string;
  nickname: string;
  createdAt?: string;
}

const UserProfile: FC<UserProfileProps> = ({
  size,
  imageUrl,
  firstName,
  lastName,
  nickname,
  createdAt,
}) => {
  const navigate = useNavigate();

  const navigateToUserPage = () => {
    navigate(`/user/${nickname}`);
  };

  if (createdAt) {
    return (
      <div
        className={`flex  ${
          size === "small" ? "gap-2" : size === "medium" ? "gap-4" : "gap-6"
        }`}
      >
        <img
          src={imageUrl}
          alt={`${firstName} ${lastName} picture`}
          className={`rounded-full cursor-pointer ${
            size === "small"
              ? "w-8 h-8"
              : size === "medium"
              ? "w-8 h-8 sm:w-12 sm:h-12"
              : "w-10 h-10 sm:w-14 sm:h-14"
          }`}
          onClick={navigateToUserPage}
        />
        <div
          className="flex flex-col gap-1"
          onClick={() => {
            navigate(`/user/${nickname}`);
          }}
        >
          <div className="flex gap-2 items-center cursor-pointer">
            <p
              className={`font-bold ${
                size === "small"
                  ? "text-sm"
                  : size === "medium"
                  ? "text-sm sm:text-md"
                  : "text-lg sm:text-xl"
              }`}
              onClick={navigateToUserPage}
            >
              {firstName} {lastName}
            </p>
            <p
              className={`text-sm text-blue-600 ${
                size === "small"
                  ? "text-xs"
                  : size === "medium"
                  ? "text-xs sm:text-sm"
                  : "text-sm sm:text-md"
              }`}
            >
              @{nickname}
            </p>
          </div>
          <div className="flex gap-2 items-center" onClick={navigateToUserPage}>
            <p
              className={` ${
                size === "small"
                  ? "text-[0.5rem]"
                  : size === "medium"
                  ? "text-[0.5rem] sm:text-[0.6rem]"
                  : "text-[0.8rem]"
              }`}
            >
              {DateFormatter.formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center w-max ${
        size === "small" ? "gap-2" : size === "medium" ? "gap-4" : "gap-6"
      } cursor-pointer group`}
      onClick={navigateToUserPage}
    >
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName} komentarz`}
        className={`rounded-full ${
          size === "small"
            ? "w-8 h-8"
            : size === "medium"
            ? "w-12 h-12"
            : "w-10 h-10 sm:w-14 sm:h-14"
        }`}
      />
      <div className="flex flex-col text-sm">
        <div
          className={`flex font-bold ${
            size === "small"
              ? "text-sm"
              : size === "medium"
              ? "text-md"
              : "text-lg sm:text-xl"
          }`}
        >
          <p>
            {firstName} {lastName}
          </p>
        </div>
        <p
          className={`text-blue-600  group-hover:font-bold transition-all ${
            size === "small"
              ? "text-xs"
              : size === "medium"
              ? "text-sm"
              : "text-sm sm:text-md"
          }`}
        >
          {nickname}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
