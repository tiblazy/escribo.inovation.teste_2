import { InMemoryPhonesRepository } from '../../repositories/in-memory/in-memory-phones-repository'
import { RegisterPhoneUseCase } from './register-use-case'

let phonesRepository: InMemoryPhonesRepository
let sut: RegisterPhoneUseCase

let fakePhone: any

describe('Sign Up Use Case', () => {
  beforeEach(() => {
    phonesRepository = new InMemoryPhonesRepository()
    sut = new RegisterPhoneUseCase(phonesRepository)

    fakePhone = {
      numero: '123123123',
      ddd: '21',
    }
  })

  it('should be able to add a phone contact to a new user', async () => {
    await sut.execute(fakePhone.userId, {
      numero: fakePhone.numero,
      ddd: fakePhone.ddd,
    })

    expect(phonesRepository.phones[0].id).toEqual(1)
  })
})
