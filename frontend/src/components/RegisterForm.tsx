import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./RegisterForm.css";

import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";
import { startLoading, stopLoading } from "../store/features/loadingSlice";

import DatePicker from "react-date-picker";
import FormInput from "../ui/FormInput";
import PrimaryButton from "../ui/PrimaryButton";
import Validator from "../utils/Validator";
import handleError from "../services/errorHandler";
import { registerUser } from "../services/userService";
import { useAppDispatch } from "../store/store";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type DatePiece = Date | null;

type DateValue = DatePiece | [DatePiece, DatePiece];

const RegiserForm = () => {
  const currentDate = new Date();
  const defaultDate = new Date(
    currentDate.getFullYear() - 16,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const [date, setDate] = useState<DateValue>(defaultDate);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const minDate = new Date(
    currentDate.getFullYear() - 100,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const maxDate = defaultDate;

  const {
    value: firstName,
    isValid: isFirstNameValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    setIsTouched: setFirstNameIsTouched,
  } = useInput(Validator.isName);

  const {
    value: lastName,
    // isValid: isLastNameValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    setIsTouched: setLastNameIsTouched,
  } = useInput(Validator.isSurname);

  const {
    value: email,
    // isValid: isEmailValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
  } = useInput(Validator.isEmail);

  const {
    value: nickname,
    // isValid: isNicknameValid,
    hasError: nicknameHasError,
    valueChangeHandler: nicknameChangeHandler,
    inputBlurHandler: nicknameBlurHandler,
    setIsTouched: setNicknameIsTouched,
  } = useInput(Validator.isNick);

  const {
    value: password,
    isValid: isPasswordValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    setIsTouched: setPasswordIsTouched,
  } = useInput(Validator.isPassword);

  const {
    value: confirmPassword,
    isValid: isConfirmPasswordValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    setIsTouched: setConfirmPasswordIsTouched,
  } = useInput(Validator.isPassword);

  const formIsValid =
    isFirstNameValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    password === confirmPassword;

  const setInputsAsTouched = () => {
    setFirstNameIsTouched(true);
    setLastNameIsTouched(true);
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    setConfirmPasswordIsTouched(true);
    setNicknameIsTouched(true);
  };

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    if (!formIsValid) {
      setInputsAsTouched();
      dispatch(
        addNotification({
          message: "Uzupełnij poprawnie wszystkie dane",
          type: NotificationStatus.ERROR,
        })
      );
      return;
    }

    try {
      dispatch(startLoading());
      const response = await registerUser({
        firstName,
        lastName,
        nickname,
        email,
        dateOfBirth: date,
        password,
      });
      console.log(response);
      if (response.status === "ok") {
        dispatch(
          addNotification({
            message: response.message,
            type: NotificationStatus.SUCCESS,
          })
        );
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
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
    <form
      className="flex flex-col gap-6 max-w-[25rem] w-full text-primaryDark"
      onSubmit={submitFormHandler}
    >
      <FormInput
        type="text"
        placeholder="Imię"
        value={firstName}
        errorMessage="Imię jest niepoprawne"
        hasError={firstNameHasError}
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler}
      />
      <FormInput
        type="text"
        placeholder="Nazwisko"
        value={lastName}
        errorMessage="Nazwisko jest niepoprawne"
        hasError={lastNameHasError}
        onChange={lastNameChangeHandler}
        onBlur={lastNameBlurHandler}
      />
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
        type="text"
        placeholder="Nick"
        value={nickname}
        errorMessage="Nick jest niepoprawny"
        hasError={nicknameHasError}
        onChange={nicknameChangeHandler}
        onBlur={nicknameBlurHandler}
      />

      <FormInput
        type="password"
        placeholder="Hasło"
        value={password}
        errorMessage="Hasło musi zawierać co najmniej 8 znaków"
        hasError={passwordHasError}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
      />

      <FormInput
        type="password"
        placeholder="Powtórz hasło"
        value={confirmPassword}
        errorMessage="Hasła muszą być takie same"
        hasError={confirmPasswordHasError || password !== confirmPassword}
        onChange={confirmPasswordChangeHandler}
        onBlur={confirmPasswordBlurHandler}
      />
      <DatePicker
        className={"bg-white border-none px-2 outline-none py-1 rounded-md"}
        value={date}
        onChange={setDate}
        clearIcon={null}
        minDate={minDate}
        maxDate={maxDate}
        dayAriaLabel={"Dzień urodzenia"}
        monthAriaLabel={"Miesiąc urodzenia"}
        yearAriaLabel={"Rok urodzenia"}
      />
      <div>
        <PrimaryButton onClick={() => {}} size="lg" fullWidth>
          Załóż konto
        </PrimaryButton>
      </div>
    </form>
  );
};

export default RegiserForm;
