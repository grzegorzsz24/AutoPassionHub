import FormInput from "../ui/FormInput";
import PrimaryButton from "../ui/PrimaryButton";

const RegiserForm = () => {
  return (
    <form className="flex flex-col gap-6 max-w-[35rem] w-full text-primaryDark">
      <FormInput
        type="text"
        placeholder="Imię"
        value=""
        errorMessage="Imię jest niepoprawne"
        hasError={false}
        onChange={() => {}}
        onBlur={() => {}}
      />
      <FormInput
        type="text"
        placeholder="Nazwisko"
        value=""
        errorMessage="Nazwisko jest niepoprawne"
        hasError={false}
        onChange={() => {}}
        onBlur={() => {}}
      />
      <FormInput
        type="email"
        placeholder="Adres E-mail"
        value=""
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

      <FormInput
        type="password"
        placeholder="Powtórz hasło"
        value=""
        errorMessage="Hasło jest niepoprawne"
        hasError={false}
        onChange={() => {}}
        onBlur={() => {}}
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
