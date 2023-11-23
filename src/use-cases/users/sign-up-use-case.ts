import { hash } from 'bcryptjs'
import { SignUpUseCaseRequestDTO } from '../../dtos/sign-up-dto'
import { UsersRepository } from '../../repositories/interface/interface-users-repository'
import { UserAlreadyExists } from '../errors/user-already-exists'

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
    })

    const dataUser = {
      id: user.id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
    }

    return { dataUser }
  }
}

export { SignUpUseCase }
