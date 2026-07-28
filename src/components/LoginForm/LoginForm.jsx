import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import { loginUser } from "../../store/auth/authOperations.js";
import Icon from "../Icon/Icon.jsx";
import Logo from "../Logo/Logo.jsx";
import * as yup from "yup";
import css from "./LoginForm.module.css";

const loginSchema = yup.object({
  email: yup.string().trim().email("Please enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .max(12, "Password must contain at most 12 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      email: location.state?.registeredEmail ?? "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      setSubmitStatus("Login successful. Redirecting to dashboard...");
      const nextPath = location.state?.from?.pathname ?? ROUTES.DASHBOARD;
      navigate(nextPath, { replace: true });
    } catch (error) {
      setSubmitStatus(error || "Login failed. Please try again.");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css["logo-container"]}>
        <Logo vertical />
      </div>

      <div className={css.fields}>
        <label className={css.field}>
          <Icon name='email' className={css["field-icon"]} width={20} height={20} />
          <input className={css.input} type='email' placeholder='E-mail' autoComplete='email' {...register("email")} />
          {errors.email && (
            <p className={css.status} aria-live='polite'>
              {errors.email.message}
            </p>
          )}
        </label>

        <label className={css.field}>
          <Icon name='lock' className={css["field-icon"]} width={20} height={20} />
          <input
            className={[css.input, css["input--password"]].join(" ")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder='Password'
            autoComplete='current-password'
            {...register("password")}
          />
          <button
            className={css.toggle}
            type='button'
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            <Icon name={isPasswordVisible ? "eye-off" : "eye"} width={20} height={20} />
          </button>
          {errors.password && (
            <p className={css.status} aria-live='polite'>
              {errors.password.message}
            </p>
          )}
        </label>
      </div>

      <div className={css.actions}>
        <button className={css.submit} type='submit' disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Loading..." : "LOG IN"}
        </button>

        <Link className={css.secondary} to={ROUTES.REGISTER}>
          REGISTER
        </Link>
      </div>

      {submitStatus && (
        <p className={css["status-global"]} aria-live='polite'>
          {submitStatus}
        </p>
      )}
    </form>
  );
}
