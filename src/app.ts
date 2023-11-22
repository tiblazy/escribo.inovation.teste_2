import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { fastifyJwtOptions } from './configs/jwt'

const app = fastify()

app.register(fastifyJwt, fastifyJwtOptions)

export { app }
