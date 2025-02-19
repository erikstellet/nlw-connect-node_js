import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  dialect: 'postgresql',
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema/*',
} satisfies Config
