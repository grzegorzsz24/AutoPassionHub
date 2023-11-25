import AuthorizationLayout from "./AuthorizationLayout";
import OutlineButton from "../ui/OutlineButton";
import RegisterForm from "../components/Authorization/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <AuthorizationLayout title="Rejestracja">
      <div className="w-full flex flex-col items-center">
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
