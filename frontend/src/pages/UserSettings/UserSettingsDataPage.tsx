import ChangePasswordForm from "../../components/Forms/ChangePasswordForm";
import ChangeUserDataForm from "../../components/Forms/ChangeUserDataForm";

const UserSettingsDataPage = () => {
  return (
    <div className="w-full ">
      <div>
        <h2 className="mb-6 text-lg font-bold dark:text-blue-50">
          Edytuj dane osobowe
        </h2>
        <ChangeUserDataForm />
      </div>
      <div>
        <h2 className="mb-6 mt-12 text-lg font-bold dark:text-blue-50">
          Edytuj hasło
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default UserSettingsDataPage;
