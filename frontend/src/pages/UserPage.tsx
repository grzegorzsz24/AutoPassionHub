import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";
import { startLoading, stopLoading } from "../store/features/loadingSlice";
import { useEffect, useState } from "react";

import UserHeader from "./User/UserHeader";
import UserModel from "../models/UserModel";
import { getUserByNickname } from "../services/userService";
import handleError from "../services/errorHandler";
import { useAppDispatch } from "../store/store";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { nickname } = useParams();
  const [user, setUser] = useState<UserModel | null>(null);

  const getUserData = async () => {
    try {
      dispatch(startLoading());
      const data = await getUserByNickname(nickname!);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
      console.log(data.user);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (nickname) {
      getUserData();
    }
  }, [nickname]);

  return (
    <div className=" px-6 py-8">
      <UserHeader user={user} />
    </div>
  );
};

export default UserPage;
