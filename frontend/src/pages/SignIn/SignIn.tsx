import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Assuming the schema is in TypeScript
import styles from "./SignIn.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../services/shift";

export interface SignInFormInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    register,
    setError,
    reset,
  } = useForm<SignInFormInputs>({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const res = await logIn(data);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className={styles.signUpPage}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="emailInput">Your email</label>
          <input
            id="emailInput"
            type="email"
            {...register("email")}
            placeholder="name@company.com"
          />
          <small className={styles.error_text}>
            {errors?.email?.message ?? "\u00A0"}
          </small>
        </div>

        <div className={styles.field}>
          <label htmlFor="passwordInput">Your password</label>
          <input
            id="passwordInput"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <small className={styles.error_text}>
            {errors?.password?.message ?? "\u00A0"}
          </small>
        </div>

        <div className={styles.field}>
          <button type="submit">Sign In</button>
        </div>
      </form>

      <div className={styles.signUpField}>
        <span>Don't have an account?</span>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
