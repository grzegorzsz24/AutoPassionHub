import AuthorizationLayout from "./AuthorizationLayout";
import OutlineButton from "../ui/OutlineButton";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <AuthorizationLayout>
      <div className="  flex flex-col items-center mb-16">
        <h1 className="text-5xl font-semibold mb-8 mt-16">Rejestracja</h1>

        <RegisterForm />
        <hr className="w-[100%] my-16 border-1 border-inherit"></hr>

        <OutlineButton
          onClick={() => {
            navigate("/login");
          }}
          size="lg"
        >
          Zaloguj się
        </OutlineButton>
      </div>
    </AuthorizationLayout>
  );
};

export default RegisterPage;
