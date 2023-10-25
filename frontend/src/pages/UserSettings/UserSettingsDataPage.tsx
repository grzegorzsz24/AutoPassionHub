import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { updateUserData, updateUserPassword } from "../../services/userService";
import { useAppDispatch, useAppSelector } from "../../store/store";

import FormInput from "../../ui/FormInput";
import Validator from "../../utils/Validator";
import handleError from "../../services/errorHandler";
import { updateUser } from "../../store/features/userSlice";
import useInput from "../../hooks/useInput";

const UserSettingsDataPage = () => {
  const dispatch = useAppDispatch();
  const { firstName, lastName, email, nickname } = useAppSelector(
    (state) => state.user
  );

  const {
    value: newFirstName,
    isValid: isNewFirstNameValid,
    hasError: newFirstNameHasError,
    valueChangeHandler: newFirstNameChangeHandler,
    inputBlurHandler: newFirstNameBlurHandler,
    // setIsTouched: setNewFirstNameIsTouched,
  } = useInput(Validator.isName, firstName);

  const {
    value: newLastName,
    isValid: isNewLastNameValid,
    hasError: newLastNameHasError,
    valueChangeHandler: newLastNameChangeHandler,
    inputBlurHandler: newLastNameBlurHandler,
    // setIsTouched: setNewLastNameIsTouched,
  } = useInput(Validator.isSurname, lastName);

  const {
    value: newEmail,
    isValid: isNewEmailValid,
    hasError: newEmailHasError,
    valueChangeHandler: newEmailChangeHandler,
    inputBlurHandler: newEmailBlurHandler,
    // setIsTouched: setNewEmailIsTouched,
  } = useInput(Validator.isEmail, email);

  const {
    value: newNickname,
    isValid: isNewNicknameValid,
    hasError: newNicknameHasError,
    valueChangeHandler: newNicknameChangeHandler,
    inputBlurHandler: newNicknameBlurHandler,
    // setIsTouched: setNewNicknameIsTouched,
  } = useInput(Validator.isNick, nickname);

  const {
    value: oldPassword,
    isValid: isOldPasswordValid,
    hasError: oldPasswordHasError,
    valueChangeHandler: oldPasswordChangeHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    // setIsTouched: setOldPasswordIsTouched,
    reset: resetOldPassword,
  } = useInput(Validator.isPassword);

  const {
    value: newPassword,
    isValid: isNewPasswordValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    // setIsTouched: setNewPasswordIsTouched,
    reset: resetNewPassword,
  } = useInput(Validator.isPassword);

  const {
    value: confirmNewPassword,
    isValid: isConfirmNewPasswordValid,
    hasError: confirmNewPasswordHasError,
    valueChangeHandler: confirmNewPasswordChangeHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    // setIsTouched: setConfirmNewPasswordIsTouched,
    reset: resetConfirmNewPassword,
  } = useInput(Validator.isPassword);

  const dataIsValid =
    isNewFirstNameValid &&
    isNewLastNameValid &&
    isNewEmailValid &&
    isNewNicknameValid &&
    (newFirstName !== firstName ||
      newLastName !== lastName ||
      newEmail !== email ||
      newNickname !== nickname);

  const passwordIsValid =
    isOldPasswordValid &&
    isNewPasswordValid &&
    isConfirmNewPasswordValid &&
    newPassword === confirmNewPassword &&
    newPassword !== oldPassword;

  const submitChangeDataHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      dispatch(startLoading());
      const response = await updateUserData(
        newFirstName === firstName ? "" : newFirstName,
        newLastName === lastName ? "" : newLastName,
        newNickname === nickname ? "" : newNickname,
        newEmail === email ? "" : newEmail
      );

      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(
        updateUser({
          firstName: newFirstName,
          lastName: newLastName,
          nickname: newNickname,
          email: newEmail,
        })
      );
      dispatch(
        addNotification({
          message: response.message,
          type: NotificationStatus.SUCCESS,
        })
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const submitChangePasswordHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    try {
      dispatch(startLoading());
      const response = await updateUserPassword(oldPassword, newPassword);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }

      dispatch(
        addNotification({
          message: response.message,
          type: NotificationStatus.SUCCESS,
        })
      );
      resetOldPassword();
      resetNewPassword();
      resetConfirmNewPassword();
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="w-full ">
      <div>
        <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
          Edytuj dane osobowe
        </h2>
        <form
          className="flex flex-col gap-4 ml-4 max-w-xl"
          onSubmit={submitChangeDataHandler}
        >
          <FormInput
            placeholder="Imię"
            type="text"
            value={newFirstName}
            onChange={newFirstNameChangeHandler}
            onBlur={newFirstNameBlurHandler}
            hasError={newFirstNameHasError}
            errorMessage="Imię musi składać się z samych liter"
          />
          <FormInput
            placeholder="Nazwisko"
            type="text"
            value={newLastName}
            onChange={newLastNameChangeHandler}
            onBlur={newLastNameBlurHandler}
            hasError={newLastNameHasError}
            errorMessage="Nazwisko musi składać się z samych liter"
          />
          <FormInput
            placeholder="Email"
            type="email"
            value={newEmail}
            onChange={newEmailChangeHandler}
            onBlur={newEmailBlurHandler}
            hasError={newEmailHasError}
            errorMessage="Niepoprawny adres email"
          />
          <FormInput
            placeholder="Nick"
            type="text"
            value={newNickname}
            onChange={newNicknameChangeHandler}
            onBlur={newNicknameBlurHandler}
            hasError={newNicknameHasError}
            errorMessage="Nick musi składać się z samych liter"
          />
          <button
            type="submit"
            disabled={!dataIsValid}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edytuj dane
          </button>
        </form>
      </div>
      <div>
        <h2 className="font-bold text-lg mt-12 mb-6 dark:text-blue-50">
          Edytuj hasło
        </h2>
        <form
          className="flex flex-col gap-4 ml-4 max-w-xl"
          onSubmit={submitChangePasswordHandler}
        >
          <FormInput
            placeholder="Obecne hasło"
            type="password"
            value={oldPassword}
            onChange={oldPasswordChangeHandler}
            onBlur={oldPasswordBlurHandler}
            hasError={oldPasswordHasError}
            errorMessage="Hasło musi składać się z conajmniej 8 znaków"
          />
          <FormInput
            placeholder="Nowe hasło"
            type="password"
            value={newPassword}
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
            hasError={newPasswordHasError}
            errorMessage="Hasło musi składać się z conajmniej 8 znaków i musi być inne od obecnego hasła"
          />
          <FormInput
            placeholder="Powtórz nowe hasło"
            type="password"
            value={confirmNewPassword}
            onChange={confirmNewPasswordChangeHandler}
            onBlur={confirmNewPasswordBlurHandler}
            hasError={confirmNewPasswordHasError}
            errorMessage="Hasła muszą być takie same"
          />
          <button
            type="submit"
            disabled={!passwordIsValid}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edytuj hasło
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsDataPage;
