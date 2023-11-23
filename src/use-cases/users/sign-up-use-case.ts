import { hash } from 'bcryptjs'
import { SignUpUseCaseRequestDTO } from '../../dtos/sign-up-dto'
import { UsersRepository } from '../../repositories/interface/interface-users-repository'
import { UserAlreadyExists } from '../errors/user-already-exists'
import { UserNotFound } from '../errors/user-not-found'

class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async ({ nome, email, senha }: SignUpUseCaseRequestDTO) => {
    const doesUserAlreadyExists = await this.usersRepository.findByEmail(email)

    if (doesUserAlreadyExists) {
      throw new UserAlreadyExists()
    }

    const user = await this.usersRepository.create({
      nome,
      email,
      senha: await hash(senha, 6),
      ultimo_login: new Date(),
    })

    return user
  }

  save = async (userId: string, token: string) => {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const newUser = await this.usersRepository.save({ ...user, token })

    const dataUser = {
      id: user.id,
      data_criacao: newUser.data_criacao,
      data_atualizacao: newUser.data_atualizacao,
      ultimo_login: newUser.ultimo_login,
      token: newUser.token,
    }

    return { dataUser }
  }
}

export { SignUpUseCase }
