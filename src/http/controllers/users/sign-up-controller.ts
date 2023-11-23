import { FastifyReply, FastifyRequest } from 'fastify'
import { schema } from '../../../schemas/sign-up-zod'
import { UserAlreadyExists } from '../../../use-cases/errors/user-already-exists'
import { makeRegisterPhoneUseCase } from '../../../use-cases/factories/make-register-phone-use-case'
import { makeSignUpUseCase } from '../../../use-cases/factories/make-sign-up-use-case'

const signUpController = async (req: FastifyRequest, rep: FastifyReply) => {
  const { nome, email, senha, telefones } = schema.parse(req.body)

  try {
    const signUpUseCase = makeSignUpUseCase()
    const registerPhoneUseCase = makeRegisterPhoneUseCase()

    const user = await signUpUseCase.execute({
      nome,
      email,
      senha,
      telefones,
    })

    const token = await rep.jwtSign({}, { sign: { sub: user.id } })

    const { dataUser } = await signUpUseCase.save(user.id, token)

    telefones.map(
      async ({ numero, ddd }) =>
        await registerPhoneUseCase.execute(user.id, { numero, ddd }),
    )

    return rep.status(201).send(dataUser)
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return rep.status(409).send({ message: err.message })
    }
  }
}

export { signUpController }
