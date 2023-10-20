import PrimaryButton from "../ui/PrimaryButton";
import { useState } from "react";

const UserSettingsPrivacyPage = () => {
  const [newPrivacy, setNewPrivacy] = useState("public");

  const currentUserPrivacy = "public";

  const userHasChangedPrivacy = newPrivacy !== currentUserPrivacy;

  const changePrivacy = (newPrivacyValue: string) => {
    setNewPrivacy(newPrivacyValue);
  };

  return (
    <div className="w-96">
      <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
        Kto zobaczy twoje treści?
      </h2>
      <div className="ml-4">
        <select
          className="bg-white text-grayDark rounded-md py-2 px-8 mb-6  leading-tight  focus:outline-none  focus:ring-2 focus:ring-blue-600 cursor-pointer w-full"
          value={newPrivacy}
          onChange={(event) => changePrivacy(event.target.value)}
        >
          <option value="public">Wszyscy</option>
          <option value="private">Tylko znajomi</option>
        </select>
        <PrimaryButton
          size="md"
          fullWidth={true}
          disabled={userHasChangedPrivacy}
          onClick={() => {}}
        >
          Zatwierdź
        </PrimaryButton>
      </div>
    </div>
  );
};

export default UserSettingsPrivacyPage;
