import * as z from "zod";

const schema = z.object({
  //
  // {
  //     "date":"2024-12-03",
  //     "startTime":"10:15:30",
  //     "endTime": "16:15:30",
  //     "breakTime": "12:15:30",
  //     "description": "test",
  //     "userId": "5"
  //     }
  //

  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  breakTime: z.string(),
  description: z.string(),
  userId: z.string(),
});

export default schema;
export type ShiftInput = z.infer<typeof schema>;
