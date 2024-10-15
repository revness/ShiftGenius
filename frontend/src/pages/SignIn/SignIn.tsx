import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Assuming the schema is in TypeScript
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
    reset,
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema),
  });

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
    <div className="mt-20 font-cambria">
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
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center mt-5 text-lg">
        <span className="mr-2">Don't have an account?</span>
        <Link
          to="/sign-up"
          className="text-green-500 font-bold hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
