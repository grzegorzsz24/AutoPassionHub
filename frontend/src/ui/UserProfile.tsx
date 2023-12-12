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
          className={`cursor-pointer rounded-full ${
            size === "small"
              ? "h-8 w-8"
              : size === "medium"
                ? "h-8 w-8 sm:h-12 sm:w-12"
                : "h-10 w-10 sm:h-14 sm:w-14"
          }`}
          onClick={navigateToUserPage}
        />
        <div
          className="flex flex-col gap-1"
          onClick={() => {
            navigate(`/user/${nickname}`);
          }}
        >
          <div className="flex cursor-pointer items-center gap-2">
            <p
              className={`font-bold ${
                size === "small"
                  ? "text-sm"
                  : size === "medium"
                    ? "sm:text-md text-sm"
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
                    : "sm:text-md text-sm"
              }`}
            >
              @{nickname}
            </p>
          </div>
          <div className="flex items-center gap-2" onClick={navigateToUserPage}>
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
      className={`flex w-max items-center ${
        size === "small" ? "gap-2" : size === "medium" ? "gap-4" : "gap-6"
      } group cursor-pointer`}
      onClick={navigateToUserPage}
    >
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName} komentarz`}
        className={`rounded-full ${
          size === "small"
            ? "h-8 w-8"
            : size === "medium"
              ? "h-12 w-12"
              : "h-10 w-10 sm:h-14 sm:w-14"
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
          className={`text-blue-600  transition-all group-hover:font-bold ${
            size === "small"
              ? "text-xs"
              : size === "medium"
                ? "text-sm"
                : "sm:text-md text-sm"
          }`}
        >
          {nickname}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
