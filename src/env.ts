import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ITEMS_URL: z.string().url(),
  VITE_CHAMPIONS_URL: z.string().url(),
  VITE_API_URL_PERSISTED: z.string().url(),
  VITE_API_URL_LIVE: z.string().url(),
  VITE_API_KEY: z.string(),
})

export const env = envSchema.parse(import.meta.env)
