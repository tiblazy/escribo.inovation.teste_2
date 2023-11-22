import { env } from './env'

const fastifyJwtOptions = {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '30m' },
}

export { fastifyJwtOptions }
