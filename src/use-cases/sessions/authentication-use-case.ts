import { compare } from 'bcryptjs'
import {
  SessionAuthenticationUseCaseRequestDTO,
  SessionAuthenticationUseCaseResponseDTO,
} from '../../dtos/authentication-dto'
import { UsersRepository } from '../../repositories/interface/interface-users-repository'
import { InvalidCredentials } from '../errors/invalid-credentials'

class SessionAuthenticationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    senha,
  }: SessionAuthenticationUseCaseRequestDTO): Promise<SessionAuthenticationUseCaseResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatches = await compare(senha, user.senha)

    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    await this.usersRepository.save({ ...user, ultimo_login: new Date() })

    const dataUser = {
      id: user.id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
    }

    return dataUser
  }
}

export { SessionAuthenticationUseCase }
