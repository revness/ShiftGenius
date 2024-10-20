// src/components/ProfileForm/schema.ts

import * as z from "zod";

const schema = z.object({
  username: z.string(),
  // .min(3, "Username must be at least 3 characters long")
  // .max(20, "Username must not exceed 20 characters"),
  email: z.string(),
  // .email("Please enter a valid email address"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  department: z
    .string()
    .min(2, "Department must be at least 2 characters long"),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Phone number should be between 10 to 15 digits"),
});

export default schema;
