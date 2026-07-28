import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";

export default function LoginPage() {
  return (
    <div>
      <AuthLayout variant='login'>
        <LoginForm />
      </AuthLayout>
    </div>
  );
}
