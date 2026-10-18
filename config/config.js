import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

// Locate .env relative to this file, even when starting from client.
dotenv.config({
  path: fileURLToPath(new URL('../.env', import.meta.url)),
})

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
}

if (!config.mongoUri || !config.jwtSecret) {
  throw new Error('Set MONGODB_URI and JWT_SECRET in your root .env file.')
}

export default config