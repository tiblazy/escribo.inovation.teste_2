import { FastifyInstance } from 'fastify'
import { signUpController } from '../controllers/users/sign-up-controller'

const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', signUpController)
}

export { usersRoutes }
