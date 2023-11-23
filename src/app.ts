import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { fastifyJwtOptions } from './configs/jwt'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

const app = fastify()

app.register(fastifyJwt, fastifyJwtOptions)

app.register(routes)
app.setErrorHandler(errorHandler)

export { app }
