import { z } from 'zod'

/**
 * Intresseanmälan för nästa mässa. Medvetet bara e-post – varje extra fält
 * kostar konverteringar, och det enda som behövs är en adress att höra av
 * sig till när datum och biljettsläpp är klara.
 */
export const notifySchema = z.object({
  email: z.string().email('Ange en giltig e-postadress').max(150),
})

export type NotifyFormData = z.infer<typeof notifySchema>
