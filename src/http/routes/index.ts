import { FastifyInstance } from 'fastify'
import { sessionsRoutes } from './sessions-routes'
import { usersRoutes } from './users-routes'

const routes = async (app: FastifyInstance) => {
  app.register(usersRoutes)
  app.register(sessionsRoutes)
}

export { routes }
