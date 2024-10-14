import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Import the schema and interface
import styles from "./SignUp.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/shift";

export interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    register,
    setError,
    reset,
  } = useForm<SignUpFormInputs>({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const res = await signUp(data);
      if (res) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className={styles.signUpPage}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="usernameInput">Your username</label>
          <input
            id="usernameInput"
            type="text"
            {...register("username")}
            placeholder="Username"
          />
          <small className={styles.error_text}>
            {errors?.username?.message ?? "\u00A0"}
          </small>
        </div>

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
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm")}
            placeholder="Password"
          />
          <small className={styles.error_text}>
            {errors?.passwordConfirm?.message ?? "\u00A0"}
          </small>
        </div>

        <div className={styles.field}>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <div className={styles.signUpField}>
        <span>Have an account?</span>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
