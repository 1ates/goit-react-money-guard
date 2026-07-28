import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ROUTES } from "../../constants/routes.js";
import { registerUser } from "../../store/auth/authOperations.js";
import Icon from "../Icon/Icon.jsx";
import Logo from "../Logo/Logo.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import css from "./RegistrationForm.module.css";

const registrationSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().trim().email("Please enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .max(12, "Password must contain at most 12 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(registrationSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const progressValue =
    password && confirmPassword && password === confirmPassword ? 100 : confirmPassword ? 60 : password ? 30 : 0;

  const onSubmit = async (values) => {
    try {
      const payload = {
        username: values.name,
        email: values.email,
        password: values.password,
      };

      await dispatch(registerUser(payload)).unwrap();
      setSubmitStatus(`Registration complete for ${values.email}. Redirecting to dashboard...`);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      setSubmitStatus(error || "Registration failed. Please try again.");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css["logo-container"]}>
        <Logo />
      </div>

      <div className={css.fields}>
        <label className={css.field}>
          <Icon name='user' className={css["field-icon"]} width={20} height={20} />
          <input className={css.input} type='text' placeholder='Name' autoComplete='name' {...register("name")} />
          {errors.name && (
            <p className={css.error} aria-live='polite'>
              {errors.name.message}
            </p>
          )}
        </label>

        <label className={css.field}>
          <Icon name='email' className={css["field-icon"]} width={20} height={20} />
          <input className={css.input} type='email' placeholder='E-mail' autoComplete='email' {...register("email")} />
          {errors.email && (
            <p className={css.error} aria-live='polite'>
              {errors.email.message}
            </p>
          )}
        </label>

        <label className={css.field}>
          <Icon name='lock' className={css["field-icon"]} width={20} height={20} />
          <input
            className={[css.input, css.password].join(" ")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder='Password'
            autoComplete='new-password'
            {...register("password")}
          />
          <button
            className={css.toggle}
            type='button'
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((v) => !v)}
          >
            <Icon name={isPasswordVisible ? "eye-off" : "eye"} width={20} height={20} />
          </button>
          {errors.password && (
            <p className={css.error} aria-live='polite'>
              {errors.password.message}
            </p>
          )}
        </label>

        <label className={css.field}>
          <Icon name='lock' className={css["field-icon"]} width={20} height={20} />
          <input
            className={[css.input, css.password].join(" ")}
            type={isConfirmVisible ? "text" : "password"}
            placeholder='Confirm password'
            autoComplete='new-password'
            {...register("confirmPassword")}
          />
          <button
            className={css.toggle}
            type='button'
            aria-label={isConfirmVisible ? "Hide confirm password" : "Show confirm password"}
            onClick={() => setIsConfirmVisible((v) => !v)}
          >
            <Icon name={isConfirmVisible ? "eye-off" : "eye"} width={20} height={20} />
          </button>
          {errors.confirmPassword && (
            <p className={css.error} aria-live='polite'>
              {errors.confirmPassword.message}
            </p>
          )}
        </label>
      </div>

      <div className={css.progress}>
        <ProgressBar value={progressValue} />
      </div>

      <div className={css.actions}>
        <button className={css.submit} type='submit' disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Loading..." : "REGISTER"}
        </button>

        <Link className={css.secondary} to={ROUTES.LOGIN}>
          LOG IN
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
