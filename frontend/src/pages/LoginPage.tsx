import AuthorizationLayout from "./AuthorizationLayout";
import LoginForm from "../components/LoginForm";
import OutlineButton from "../ui/OutlineButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <AuthorizationLayout title="Logowanie">
      <div className=" w-full flex flex-col gap-12 items-center">
        <LoginForm />
        <hr className="w-[100%]  border-1 border-inherit"></hr>
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
