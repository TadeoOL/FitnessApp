import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  birthDate: z.date().nullable(),
}).refine((data) => data.birthDate !== null, {
  message: "La fecha de nacimiento es requerida",
  path: ["birthDate"],
});

export type IPersonalInfo = z.infer<typeof personalInfoSchema>;
