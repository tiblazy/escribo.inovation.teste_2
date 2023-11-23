import { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '../../../configs/env'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { schema } from '../../../schemas/sign-in-zod'
import { InvalidCredentials } from '../../../use-cases/errors/invalid-credentials'
import { SessionAuthenticationUseCase } from '../../../use-cases/sessions/authentication-use-case'

const signInController = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, senha } = schema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new SessionAuthenticationUseCase(usersRepository)

    const user = await useCase.execute({
      email,
      senha,
    })

    const token = await rep.jwtSign(
      { secret: env.JWT_SECRET },
      { sign: { sub: user.id } },
    )

    const { dataUser } = await useCase.save(user.id, token)

    return rep.send({ ...dataUser, token })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return rep.status(403).send({ message: err.message })
    }
  }
}

export { signInController }
