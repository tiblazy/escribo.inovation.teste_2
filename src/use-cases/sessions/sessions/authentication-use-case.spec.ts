import { hash } from 'bcryptjs'
import { makeUser } from '../../../factories/users/make-user'
import { InMemoryUsersRepository } from '../../../repositories/in-memory/in-memory-users-repository'
import { InvalidCredentials } from '../../errors/invalid-credentials'
import { SessionAuthenticationUseCase } from './authentication-use-case'

let usersRepository: InMemoryUsersRepository
let sut: SessionAuthenticationUseCase

let fakeUser: any

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SessionAuthenticationUseCase(usersRepository)

    fakeUser = makeUser()
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      ...fakeUser,
      senha: await hash(fakeUser.senha, 6),
    })

    const { user } = await sut.execute({
      email: fakeUser.email,
      senha: '123123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user', async () => {
    await expect(() =>
      sut.execute({ email: fakeUser.email, senha: fakeUser.senha }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
