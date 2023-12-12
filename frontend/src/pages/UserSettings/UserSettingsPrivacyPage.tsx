import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import PrimaryButton from "../../ui/PrimaryButton";
import { updateUserPrivacy } from "../../store/features/userSlice";
import { updateUserPrivacy as updateUserPrivacyService } from "../../services/userService";
import { useNotification } from "../../hooks/useNotification";
import { useState } from "react";

const UserSettingsPrivacyPage = () => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const { publicProfile } = useAppSelector((state) => state.user);
  const [newPrivacy, setNewPrivacy] = useState(
    publicProfile ? "true" : "false",
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
      showSuccessNotification(response.message);
    } catch {
      showErrorNotification("Nie udało się zmienić ustawień prywatności");
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="mb-6 text-lg font-bold dark:text-blue-50">
        Kto zobaczy twoje treści?
      </h2>
      <div className="ml-4">
        <select
          className="mb-6 w-full cursor-pointer rounded-md bg-white px-8 py-2 leading-tight text-grayDark focus:outline-none focus:ring-2 focus:ring-blue-600"
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
