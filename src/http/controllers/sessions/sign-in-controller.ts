import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { schema } from '../../../schemas/sign-in-zod'
import { InvalidCredentials } from '../../../use-cases/errors/invalid-credentials'
import { SessionAuthenticationUseCase } from '../../../use-cases/sessions/authentication-use-case'

const signInController = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, senha } = schema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new SessionAuthenticationUseCase(usersRepository)

    const dataUser = await useCase.execute({
      email,
      senha,
    })

    const token = await rep.jwtSign(
      {},
      { sign: { sub: dataUser.id, expiresIn: '30min' } },
    )

    return rep.send({ ...dataUser, token })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return rep.status(403).send({ message: err.message })
    }
  }
}

export { signInController }
