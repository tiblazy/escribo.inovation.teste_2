import { compare } from 'bcryptjs'
import {
  SessionAuthenticationUseCaseRequestDTO,
  SessionAuthenticationUseCaseResponseDTO,
} from '../../../dtos/authentication-dto'
import { UsersRepository } from '../../../repositories/interface/interface-users-repository'
import { InvalidCredentials } from '../../errors/invalid-credentials'

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

    return { user }
  }
}

export { SessionAuthenticationUseCase }
