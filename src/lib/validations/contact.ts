import { z } from 'zod'

export const contactSchema = z.object({
  namn: z.string().min(2, 'Ange ditt namn'),
  email: z.string().email('Ange en giltig e-postadress'),
  telefon: z.string().optional(),
  foretag: z.string().optional(),
  amne: z.string().optional(),
  meddelande: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
