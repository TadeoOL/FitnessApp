import { z } from "zod";

export const bodyMeasurementsSchema = z.object({
  height: z
    .string()
    .min(2, "La altura debe tener al menos 2 dígitos")
    .max(3, "La altura no puede tener más de 3 dígitos")
    .refine((val) => !isNaN(Number(val)), "Debe ser un número válido")
    .refine(
      (val) => Number(val) >= 100 && Number(val) <= 250,
      "La altura debe estar entre 100 y 250 cm"
    ),
  weight: z
    .string()
    .min(2, "El peso debe tener al menos 2 dígitos")
    .max(3, "El peso no puede tener más de 3 dígitos")
    .refine((val) => !isNaN(Number(val)), "Debe ser un número válido")
    .refine(
      (val) => Number(val) >= 30 && Number(val) <= 200,
      "El peso debe estar entre 30 y 200 kg"
    ),
});

export type IBodyMeasurements = z.infer<typeof bodyMeasurementsSchema>; 