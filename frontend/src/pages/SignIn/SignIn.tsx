import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Assuming the schema is in TypeScript
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../services/shift";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

export interface SignInFormInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  //it is a safeguard, TypeScript knows that after this check, userContext is no longer undefined
  if (!userContext) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const { setUser } = userContext;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const { setIsAuthenticated } = authContext;

  const {
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    register,
    reset,
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema),
  });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      setError(null);
      const res = await logIn(data);
      if (res) {
        setUser({
          userName: res.userName,
          email: res.email,
        });
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("Failed to login");
    }
  };

  return (
    <div className="mt-20 font-cambria">
      <h1 className="text-center text-3xl font-bold">Sign In</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <form
        className="max-w-md mx-auto p-5 text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <button
            type="submit"
            className="w-full p-3 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center mt-5 text-lg">
        <span className="mr-2">Don't have an account?</span>
        <Link to="/sign-up" className="text-pink-500 font-bold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
