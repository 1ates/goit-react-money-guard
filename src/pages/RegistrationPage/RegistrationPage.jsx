import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <div className={css.registration}>
      <AuthLayout variant='register'>
        <RegistrationForm />
      </AuthLayout>
    </div>
  );
}
