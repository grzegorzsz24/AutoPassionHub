import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";
import { startLoading, stopLoading } from "../store/features/loadingSlice";

import FormInput from "../ui/FormInput";
import PrimaryButton from "../ui/PrimaryButton";
import Validator from "../utils/Validator";
import { setUser } from "../store/features/userSlice";
import { useAppDispatch } from "../store/store";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      setInputsAsTouched();
      return;
    }

    try {
      dispatch(startLoading());
      console.log(`email: ${email}, password: ${password}`);
      const response = await fetch("http://localhost:8080/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      dispatch(
        setUser({
          userId: data.userId,
          fistsName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          nickname: data.nickname,
          photoUrl: data.photoUrl,
          cookieExpirationDate: data.cookieExpirationDate,
        })
      );
      dispatch(
        addNotification({
          message: "Zalogowano pomyślnie",
          type: NotificationStatus.SUCCESS,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        dispatch(
          addNotification({
            message: error.message,
            type: NotificationStatus.ERROR,
          })
        );
      } else {
        dispatch(
          addNotification({
            message: "Wystąpił błąd podczas logowania",
            type: NotificationStatus.ERROR,
          })
        );
      }
    } finally {
      dispatch(stopLoading());
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
