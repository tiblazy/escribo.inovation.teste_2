import { FastifyInstance } from 'fastify'
import { signInController } from '../controllers/sessions/sign-in-controller'

const sessionsRoutes = async (app: FastifyInstance) => {
  app.post('/sessions', signInController)
}

export { sessionsRoutes }
