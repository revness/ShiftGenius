import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schemas";
import { postTimeSheet } from "../../services/shift";
import { useState } from "react";

export interface ShiftFormInputs {
  date: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  description: string;
  userId: string;
}

const Shifts = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm<ShiftFormInputs>({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit: SubmitHandler<ShiftFormInputs> = async (data) => {
    try {
      setError(null);
      const res = await postTimeSheet(data);
      if (res) {
        //do something
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("Failed to post timesheet");
    }
  };

  return (
    <div>
      <h1>Shifts</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Date</label>
          <input type="date" {...register("date")} />
        </div>
        <div>
          <label>Start Time</label>
          <input type="time" {...register("startTime")} />
        </div>
        <div>
          <label>End Time</label>
          <input type="time" {...register("endTime")} />
        </div>
        <div>
          <label>Break Time</label>
          <input type="time" {...register("breakTime")} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" {...register("description")} />
        </div>
        <div>
          <label>User ID</label>
          <input type="text" {...register("userId")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Shifts;
