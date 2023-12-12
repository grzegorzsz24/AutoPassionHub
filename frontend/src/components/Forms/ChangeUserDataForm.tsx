import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import FormInput from "../../ui/FormInput";
import Validator from "../../utils/Validator";
import { updateUser } from "../../store/features/userSlice";
import { updateUserData } from "../../services/userService";
import useInput from "../../hooks/useInput";
import { useNotification } from "../../hooks/useNotification";

const ChangeUserDataForm = () => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const { firstName, lastName, email, nickname } = useAppSelector(
    (state) => state.user,
  );

  const {
    value: newFirstName,
    isValid: isNewFirstNameValid,
    hasError: newFirstNameHasError,
    valueChangeHandler: newFirstNameChangeHandler,
    inputBlurHandler: newFirstNameBlurHandler,
  } = useInput(Validator.isName, firstName);

  const {
    value: newLastName,
    isValid: isNewLastNameValid,
    hasError: newLastNameHasError,
    valueChangeHandler: newLastNameChangeHandler,
    inputBlurHandler: newLastNameBlurHandler,
  } = useInput(Validator.isSurname, lastName);

  const {
    value: newEmail,
    isValid: isNewEmailValid,
    hasError: newEmailHasError,
    valueChangeHandler: newEmailChangeHandler,
    inputBlurHandler: newEmailBlurHandler,
  } = useInput(Validator.isEmail, email);

  const {
    value: newNickname,
    isValid: isNewNicknameValid,
    hasError: newNicknameHasError,
    valueChangeHandler: newNicknameChangeHandler,
    inputBlurHandler: newNicknameBlurHandler,
  } = useInput(Validator.isNick, nickname);

  const dataIsValid =
    isNewFirstNameValid &&
    isNewLastNameValid &&
    isNewEmailValid &&
    isNewNicknameValid &&
    (newFirstName !== firstName ||
      newLastName !== lastName ||
      newEmail !== email ||
      newNickname !== nickname);

  const submitChangeDataHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      dispatch(startLoading());
      const response = await updateUserData(
        newFirstName === firstName ? "" : newFirstName,
        newLastName === lastName ? "" : newLastName,
        newNickname === nickname ? "" : newNickname,
        newEmail === email ? "" : newEmail,
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
        }),
      );
      showSuccessNotification(response.message);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <form
      className="ml-4 flex max-w-xl flex-col gap-4"
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
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Edytuj dane
      </button>
    </form>
  );
};

export default ChangeUserDataForm;
