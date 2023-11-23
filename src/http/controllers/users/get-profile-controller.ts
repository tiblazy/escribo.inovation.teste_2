import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetProfileUseCase } from '../../../use-cases/factories/mke-get-profile-use-case'

const getProfileController = async (req: FastifyRequest, rep: FastifyReply) => {
  const useCase = makeGetProfileUseCase()
  const user = await useCase.execute(req.user.sub)

  Reflect.deleteProperty(user, 'senha')

  return rep.send(user)
}

export { getProfileController }
