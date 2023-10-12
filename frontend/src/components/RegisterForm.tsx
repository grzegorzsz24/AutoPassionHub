import PrimaryButton from "../ui/PrimaryButton";

const RegiserForm = () => {
  return (
    <form className="flex flex-col gap-6 max-w-[35rem] w-full ">
      <div className="w-full">
        <input
          type="text"
          placeholder="Imię"
          className="py-2 px-4 rounded-md w-full shadow-md"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nazwisko"
          className="py-2 px-4 rounded-md w-full shadow-md"
        />
      </div>
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
        <input
          type="password"
          placeholder="Powtórz hasło"
          className="py-2 px-4 rounded-md w-full shadow-md"
        />
      </div>
      <div>
        <PrimaryButton onClick={() => {}} size="lg" fullWidth>
          Załóż konto
        </PrimaryButton>
      </div>
    </form>
  );
};

export default RegiserForm;
