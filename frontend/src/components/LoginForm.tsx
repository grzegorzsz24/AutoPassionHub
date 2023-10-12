import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";

import FormInput from "../ui/FormInput";
import PrimaryButton from "../ui/PrimaryButton";
import Validator from "../utils/Validator";
import { useAppDispatch } from "../store/store";
import useInput from "../hooks/useInput";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const {
    value: email,
    isValid: isEmailValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
  } = useInput(Validator.isEmail);

  const {
    value: password,
    isValid: isPasswordValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    setIsTouched: setPasswordIsTouched,
  } = useInput(Validator.isPassword);

  const formIsValid = isEmailValid && isPasswordValid;

  const setInputsAsTouched = () => {
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addNotification({
        message: "Wpisz poprawne dane",
        type: NotificationStatus.SUCCESS,
      })
    );

    if (!formIsValid) {
      setInputsAsTouched();
      return;
    }
  };

  return (
    <form
      className="flex flex-col gap-6 max-w-[25rem] w-full"
      onSubmit={submitFormHandler}
    >
      <FormInput
        type="email"
        placeholder="Adres E-mail"
        value={email}
        errorMessage="Adres E-mail jest niepoprawny"
        hasError={emailHasError}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
      />
      <FormInput
        type="password"
        placeholder="Hasło"
        value={password}
        errorMessage="Hasło jest niepoprawne"
        hasError={passwordHasError}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
      />
      <div>
        <PrimaryButton onClick={() => {}} size="lg" fullWidth>
          Zaloguj się
        </PrimaryButton>
      </div>
    </form>
  );
};

export default LoginForm;
