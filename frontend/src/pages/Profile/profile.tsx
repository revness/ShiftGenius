import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema"; // Assuming the schema is in TypeScript
import { useState } from "react";

export interface ProfileFormInputs {
  username: string;
  email: string;
  position: string;
  department: string;
  phone: string;
}

const ProfileForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    register,
    reset,
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(schema),
  });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    try {
      setError(null);
      setSuccess(null);
      // const res = await logIn(data);
      // if (res) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("Failed to login");
    }
  };

  return (
    <div className="relative flex items-center justify-center p-4 font-cambria">
      {/* Update Profile Heading */}
      <h1 className="absolute top-[30px] left-[360px] text-7xl font-semibold mb-6 z-50">
        Profile
      </h1>

      {/* Form Container */}
      <div className="relative p-8 w-full max-w-2xl bg-white mt-16">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className={`w-1/4 px-3 py-1 border-b-2 ${
                errors.username ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none focus:outline-none focus:ring-0 focus:border-b-blue-500 bg-white`}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-2/5 px-3 py-1 border-b-2 ${
                errors.username ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none focus:outline-none focus:ring-0 focus:border-b-blue-500 bg-white`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Position Field */}
          <div className="mb-4">
            <label htmlFor="position" className="block text-gray-700 mb-2">
              Position
            </label>
            <input
              id="position"
              type="text"
              {...register("position")}
              className={`w-1/4 px-3 py-1 border-b-2 ${
                errors.username ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none focus:outline-none focus:ring-0 focus:border-b-blue-500 bg-white`}
              placeholder="Enter your position"
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* Department Field */}
          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 mb-2">
              Department
            </label>
            <input
              id="department"
              type="text"
              {...register("department")}
              className={`w-1/4 px-3 py-1 border-b-2 ${
                errors.username ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none focus:outline-none focus:ring-0 focus:border-b-blue-500 bg-white`}
              placeholder="Enter your department"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone")}
              className={`w-2/5 px-3 py-1 border-b-2 ${
                errors.username ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none focus:outline-none focus:ring-0 focus:border-b-blue-500 bg-white`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="absolute bottom--1 right-0 w-2/4 bg-pink-500 text-white py-5  hover:bg-pink-600 transition duration-200 mr-[-60px]"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
