import { z } from 'zod'

export const contactSchema = z.object({
  namn: z.string().min(2, 'Ange ditt namn').max(100, 'För långt namn'),
  email: z.string().email('Ange en giltig e-postadress').max(150),
  telefon: z.string().max(40).optional(),
  foretag: z.string().max(150).optional(),
  amne: z.string().max(100).optional(),
  meddelande: z.string().max(3000, 'Meddelandet är för långt').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
