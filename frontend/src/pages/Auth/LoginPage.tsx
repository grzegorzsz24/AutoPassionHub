import AuthorizationLayout from "./AuthorizationLayout";
import LoginForm from "../../components/Authorization/LoginForm";
import OutlineButton from "../../ui/OutlineButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <AuthorizationLayout title="Logowanie">
      <div className=" flex w-full flex-col items-center gap-12">
        <LoginForm />
        <hr className="border-1  w-[100%] border-inherit"></hr>
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
