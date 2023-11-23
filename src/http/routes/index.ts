import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users-routes'

const routes = async (app: FastifyInstance) => {
  app.register(usersRoutes)
}

export { routes }
