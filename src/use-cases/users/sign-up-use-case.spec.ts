import { makeUser } from '../../factories/users/make-user'
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

    fakeUser = makeUser()
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
