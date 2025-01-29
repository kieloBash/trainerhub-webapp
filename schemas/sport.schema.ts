import { Gender, UserRole } from "@prisma/client";
import { z } from "zod";

export const AdminCreateSportSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});
