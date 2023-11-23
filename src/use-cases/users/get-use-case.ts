import { UsersRepository } from '../../repositories/interface/interface-users-repository'

class GetUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (id: string) => {
    return await this.usersRepository.findById(id)
  }
}

export { GetUseCase }
