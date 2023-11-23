import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import path from 'path'
import { env } from './configs/env'
import { fastifyJwtOptions } from './configs/jwt'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

const app = fastify()

let pathOpenApi = path.join(__dirname, 'docs', 'openapi.json')
if (env.NODE_ENV === 'production') {
  pathOpenApi = path.join(__dirname, 'openapi.json')
}

app.register(fastifyJwt, fastifyJwtOptions)

app.register(fastifySwagger, {
  mode: 'static',
  specification: { path: pathOpenApi, baseDir: path.join(__dirname, 'docs') },
})
app.register(fastifySwaggerUi, {
  baseDir: path.join(__dirname, 'docs'),
  routePrefix: '/docs',
  staticCSP: true,
})

app.register(routes)
app.setErrorHandler(errorHandler)

export { app }
