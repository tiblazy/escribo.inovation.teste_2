import { randomUUID } from 'crypto'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from '../errors/user-already-exists'
import { SignUpUseCase } from './sign-up-use-case'

let usersRepository: InMemoryUsersRepository
let sut: SignUpUseCase

let fakeUser: any

describe('Sign Up Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SignUpUseCase(usersRepository)

    fakeUser = {
      id: randomUUID(),
      nome: 'jose',
      email: 'jose@email.com',
      senha: 'jose123',
      telefones: [{ numero: '123123231', ddd: '12' }],
    }
  })

  it('should be able to sign up a new user', async () => {
    await sut.execute(fakeUser)

    expect(usersRepository.users[0].id).toEqual(expect.any(String))
  })

  it('should not be able to sign up a same email twice', async () => {
    await sut.execute(fakeUser)

    await expect(() => sut.execute(fakeUser)).rejects.toBeInstanceOf(
      UserAlreadyExists,
    )
  })
})
