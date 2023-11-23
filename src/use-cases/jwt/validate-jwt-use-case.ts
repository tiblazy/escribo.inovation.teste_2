import dayjs from 'dayjs'
import { UsersRepository } from '../../repositories/interface/interface-users-repository'
import { UserNotFound } from '../errors/user-not-found'
import { ValidateJwtExpired } from '../errors/validate-jwt-expired'

class ValidateJwtUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const asJwtExpired = dayjs(new Date()).diff(user.ultimo_login, 'minutes')

    if (asJwtExpired >= 30) {
      throw new ValidateJwtExpired()
    }

    return user
  }
}

export { ValidateJwtUseCase }
