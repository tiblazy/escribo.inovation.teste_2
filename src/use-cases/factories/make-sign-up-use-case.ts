import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { SignUpUseCase } from '../users/sign-up-use-case'

const makeSignUpUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new SignUpUseCase(usersRepository)

  return useCase
}

export { makeSignUpUseCase }
