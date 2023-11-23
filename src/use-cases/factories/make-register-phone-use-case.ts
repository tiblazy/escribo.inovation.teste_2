import { PrismaPhonesRepository } from '../../repositories/prisma/prisma-phones-repository'
import { RegisterPhoneUseCase } from '../phones/register-use-case'

const makeRegisterPhoneUseCase = () => {
  const phonesRepository = new PrismaPhonesRepository()

  const useCase = new RegisterPhoneUseCase(phonesRepository)

  return useCase
}

export { makeRegisterPhoneUseCase }
