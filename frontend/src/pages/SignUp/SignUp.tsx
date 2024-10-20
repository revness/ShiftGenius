import { useForm, SubmitHandler, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Import the schema and interface
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/shift";
import { useState } from "react";

export interface SignUpFormInputs {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    register,
    reset,
  } = useForm<SignUpFormInputs>({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      setError(null);
      const res = await signUp(data);
      if (res) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("Failed to register");
    }
  };

  return (
    <div className="mt-20 font-cambria">
      <h1 className="text-center text-3xl font-bold">Sign Up</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <form
        className="max-w-md mx-auto p-5 text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label htmlFor="usernameInput" className="block mb-1 font-bold">
            Your username
          </label>
          <input
            id="usernameInput"
            type="text"
            {...register("userName")}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
          <small className="block mt-1 text-red-500">
            {errors?.userName?.message ?? "\u00A0"}
          </small>
        </div>

        <div className="mb-5">
          <label htmlFor="emailInput" className="block mb-1 font-bold">
            Your email
          </label>
          <input
            id="emailInput"
            type="email"
            {...register("email")}
            placeholder="name@company.com"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
          <small className="block mt-1 text-red-500">
            {errors?.email?.message ?? "\u00A0"}
          </small>
        </div>

        <div className="mb-5">
          <label htmlFor="passwordInput" className="block mb-1 font-bold">
            Your password
          </label>
          <input
            id="passwordInput"
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
          <small className="block mt-1 text-red-500">
            {errors?.password?.message ?? "\u00A0"}
          </small>
        </div>

        <div className="mb-5">
          <label htmlFor="passwordConfirm" className="block mb-1 font-bold">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm")}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
          <small className="block mt-1 text-red-500">
            {errors?.passwordConfirm?.message ?? "\u00A0"}
          </small>
        </div>

        <div className="mb-5">
          <button
            type="submit"
            className="w-full p-3 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="text-center mt-5 text-lg">
        <span className="mr-2">Have an account?</span>
        <Link to="/sign-in" className="text-pink-500 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
