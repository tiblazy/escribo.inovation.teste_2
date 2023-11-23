import { compare } from 'bcryptjs'
import {
  SessionAuthenticationUseCaseRequestDTO,
  SessionAuthenticationUseCaseResponseDTO,
} from '../../dtos/authentication-dto'
import { UsersRepository } from '../../repositories/interface/interface-users-repository'
import { InvalidCredentials } from '../errors/invalid-credentials'
import { UserNotFound } from '../errors/user-not-found'

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

    return user
  }

  save = async (userId: string, token: string) => {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      token,
      ultimo_login: new Date(),
    })

    const dataUser = {
      id: user.id,
      data_criacao: updatedUser.data_criacao,
      data_atualizacao: updatedUser.data_atualizacao,
      ultimo_login: updatedUser.ultimo_login,
      token: updatedUser.token,
    }

    return { dataUser }
  }
}

export { SessionAuthenticationUseCase }
