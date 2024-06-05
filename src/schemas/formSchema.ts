// src/schemas/formSchema.ts
import { z } from 'zod';

// Definir el esquema de validación para el formulario
export const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters"),
});

// Exportar el tipo inferido del esquema para su uso en el formulario
export type FormValues = z.infer<typeof formSchema>;
