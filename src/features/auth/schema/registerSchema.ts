import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const registerSchema = z.object({
  userName: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email no válido"),
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo",
    }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
