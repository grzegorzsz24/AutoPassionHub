import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import FormInput from "../../ui/FormInput";
import Validator from "../../utils/Validator";
import { updateUserPassword } from "../../services/userService";
import { useAppDispatch } from "../../store/store";
import useInput from "../../hooks/useInput";
import { useNotification } from "../../hooks/useNotification";

const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const {
    value: oldPassword,
    isValid: isOldPasswordValid,
    hasError: oldPasswordHasError,
    valueChangeHandler: oldPasswordChangeHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    reset: resetOldPassword,
  } = useInput(Validator.isPassword);

  const {
    value: newPassword,
    isValid: isNewPasswordValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput(Validator.isPassword);

  const {
    value: confirmNewPassword,
    isValid: isConfirmNewPasswordValid,
    hasError: confirmNewPasswordHasError,
    valueChangeHandler: confirmNewPasswordChangeHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    reset: resetConfirmNewPassword,
  } = useInput(Validator.isPassword);

  const passwordIsValid =
    isOldPasswordValid &&
    isNewPasswordValid &&
    isConfirmNewPasswordValid &&
    newPassword === confirmNewPassword &&
    newPassword !== oldPassword;

  const submitChangePasswordHandler = async (
    event: React.FormEvent<HTMLFormElement>,
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
      showSuccessNotification(response.message);
      resetOldPassword();
      resetNewPassword();
      resetConfirmNewPassword();
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <form
      className="ml-4 flex max-w-xl flex-col gap-4"
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
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Edytuj hasło
      </button>
    </form>
  );
};

export default ChangePasswordForm;
