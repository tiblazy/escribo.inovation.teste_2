import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { GetUseCase } from '../users/get-use-case'

const makeGetProfileUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetUseCase(usersRepository)

  return useCase
}

export { makeGetProfileUseCase }
