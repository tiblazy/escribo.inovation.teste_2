import { FastifyInstance } from 'fastify'
import { getProfileController } from '../controllers/users/get-profile-controller'
import { signUpController } from '../controllers/users/sign-up-controller'
import { verifyJwt } from '../middlewares/verify-jwt-middleware'

const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', signUpController)

  app.get('/me', { onRequest: [verifyJwt] }, getProfileController)
}

export { usersRoutes }
