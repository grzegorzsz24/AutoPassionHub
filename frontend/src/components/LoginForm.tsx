import FormInput from "../ui/FormInput";
import PrimaryButton from "../ui/PrimaryButton";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-6 max-w-[35rem] w-full ">
      <FormInput
        type="email"
        placeholder="Adres E-mail"
        value="Kacper"
        errorMessage="Adres E-mail jest niepoprawny"
        hasError={false}
        onChange={() => {}}
        onBlur={() => {}}
      />
      <FormInput
        type="password"
        placeholder="Hasło"
        value=""
        errorMessage="Hasło jest niepoprawne"
        hasError={false}
        onChange={() => {}}
        onBlur={() => {}}
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
