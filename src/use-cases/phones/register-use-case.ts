import { RegisterPhoneUseCaseRequestDTO } from '../../dtos/register-phone-dto'
import { PhonesRepository } from '../../repositories/interface/interface-phones-repository'

class RegisterPhoneUseCase {
  constructor(private phonesRepository: PhonesRepository) {}

  execute = async (
    userId: string,
    { numero, ddd }: RegisterPhoneUseCaseRequestDTO,
  ): Promise<void> => {
    await this.phonesRepository.create({
      numero,
      ddd,
    })
  }
}

export { RegisterPhoneUseCase }
