import AuthorizationLayout from "./AuthorizationLayout";
import OutlineButton from "../../ui/OutlineButton";
import RegisterForm from "../../components/Authorization/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <AuthorizationLayout title="Rejestracja">
      <div className="flex w-full flex-col items-center">
        <RegisterForm />
        <hr className="border-1 my-16 w-[100%] border-inherit"></hr>
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
