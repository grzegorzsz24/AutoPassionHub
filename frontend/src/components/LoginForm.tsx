import PrimaryButton from "../ui/PrimaryButton";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-6 max-w-[35rem] w-full ">
      <div>
        <input
          type="email"
          placeholder="Adres E-mail"
          className="py-2 px-4 rounded-md w-full shadow-md"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Hasło"
          className="py-2 px-4 rounded-md w-full shadow-md"
        />
      </div>

      <div>
        <PrimaryButton onClick={() => {}} size="lg" fullWidth>
          Zaloguj się
        </PrimaryButton>
      </div>
    </form>
  );
};

export default LoginForm;
