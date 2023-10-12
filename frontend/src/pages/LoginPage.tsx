import AuthorizationLayout from "./AuthorizationLayout";
import LoginForm from "../components/LoginForm";
import OutlineButton from "../ui/OutlineButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <AuthorizationLayout>
      <div className="  flex flex-col items-center mb-16">
        <h1 className="text-5xl font-semibold mb-8 mt-16">Logowanie</h1>

        <LoginForm />
        <hr className="w-[100%] my-16 border-1 border-inherit"></hr>

        <OutlineButton
          onClick={() => {
            navigate("/register");
          }}
          size="lg"
        >
          Załóż konto
        </OutlineButton>
      </div>
    </AuthorizationLayout>
  );
};

export default LoginPage;
