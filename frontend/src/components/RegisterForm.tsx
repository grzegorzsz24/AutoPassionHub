import FormInput from "../ui/FormInput";
import PrimaryButton from "../ui/PrimaryButton";
import Validator from "../utils/Validator";
import useInput from "../hooks/useInput";

const RegiserForm = () => {
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
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) {
      setInputsAsTouched();
      return;
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

      <div>
        <PrimaryButton onClick={() => {}} size="lg" fullWidth>
          Załóż konto
        </PrimaryButton>
      </div>
    </form>
  );
};

export default RegiserForm;
