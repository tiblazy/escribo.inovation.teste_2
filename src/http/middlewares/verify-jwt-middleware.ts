import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { ValidateJwtExpired } from '../../use-cases/errors/validate-jwt-expired'
import { ValidateJwtUseCase } from '../../use-cases/jwt/validate-jwt-use-case'

const verifyJwt = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    let token = ''

    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }

    const usersRepository = new PrismaUsersRepository()
    const useCase = new ValidateJwtUseCase(usersRepository)

    const user = await usersRepository.findByToken(token)

    await useCase.execute(user.id)

    await req.jwtVerify()
  } catch (err) {
    if (err instanceof ValidateJwtExpired) {
      return rep.status(400).send({ message: err.message })
    }

    return rep.status(401).send({ message: 'Não autorizado' })
  }
}

export { verifyJwt }
