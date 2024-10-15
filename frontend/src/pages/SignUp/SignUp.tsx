import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Import the schema and interface
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
    <div className="mt-20 font-cambria">
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
            {...register("username")}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
          <small className="block mt-1 text-red-500">
            {errors?.username?.message ?? "\u00A0"}
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
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="text-center mt-5 text-lg">
        <span className="mr-2">Have an account?</span>
        <Link
          to="/sign-in"
          className="text-green-500 font-bold hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
