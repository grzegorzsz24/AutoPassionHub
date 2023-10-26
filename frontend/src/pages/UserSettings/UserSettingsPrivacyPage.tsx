import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import PrimaryButton from "../../ui/PrimaryButton";
import { updateUserPrivacy } from "../../store/features/userSlice";
import { updateUserPrivacy as updateUserPrivacyService } from "../../services/userService";
import { useState } from "react";

const UserSettingsPrivacyPage = () => {
  const dispatch = useAppDispatch();
  const { publicProfile } = useAppSelector((state) => state.user);
  const [newPrivacy, setNewPrivacy] = useState(
    publicProfile ? "true" : "false"
  );

  const userHasChangedPrivacy = newPrivacy !== publicProfile.toString();

  const changePrivacy = (newPrivacyValue: string) => {
    setNewPrivacy(newPrivacyValue);
  };

  const savePrivacy = async () => {
    try {
      dispatch(startLoading());
      const response = await updateUserPrivacyService(newPrivacy === "true");
      if (response.status !== "ok") throw new Error(response.message);
      dispatch(updateUserPrivacy(newPrivacy === "true"));
      dispatch(
        addNotification({
          message: response.message,
          type: NotificationStatus.SUCCESS,
        })
      );
    } catch {
      dispatch(
        addNotification({
          message: "Nie udało się zmienić ustawień prywatności",
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
        Kto zobaczy twoje treści?
      </h2>
      <div className="ml-4">
        <select
          className="bg-white text-grayDark rounded-md py-2 px-8 mb-6  leading-tight  focus:outline-none  focus:ring-2 focus:ring-blue-600 cursor-pointer w-full"
          value={newPrivacy.toString()}
          onChange={(event) => changePrivacy(event.target.value)}
        >
          <option value="true">Wszyscy</option>
          <option value="false">Tylko znajomi</option>
        </select>
        <PrimaryButton
          size="md"
          fullWidth={true}
          disabled={!userHasChangedPrivacy}
          onClick={savePrivacy}
        >
          Zatwierdź
        </PrimaryButton>
      </div>
    </div>
  );
};

export default UserSettingsPrivacyPage;
