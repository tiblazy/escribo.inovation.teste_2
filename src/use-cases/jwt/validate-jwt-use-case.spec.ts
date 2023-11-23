import { makeUser } from '../../factories/users/make-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { ValidateJwtExpired } from '../errors/validate-jwt-expired'
import { ValidateJwtUseCase } from './validate-jwt-use-case'

let usersRepository: InMemoryUsersRepository

let sut: ValidateJwtUseCase

let fakeUser: any

describe('Valid JWT', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    usersRepository = new InMemoryUsersRepository()

    sut = new ValidateJwtUseCase(usersRepository)

    fakeUser = makeUser()
  })

  it('should be able to validate a JWT', async () => {
    await usersRepository.create(fakeUser)

    const user = usersRepository.users[0]

    expect(user.ultimo_login).toEqual(expect.any(Date))
  })

  it('should not be able to pass a invalid JWT', async () => {
    await usersRepository.create(fakeUser)

    const minutesInMs = 1000 * 60

    const user = usersRepository.users[0]

    vi.advanceTimersByTime(minutesInMs * 32)

    await expect(() => sut.execute(user.id)).rejects.toBeInstanceOf(
      ValidateJwtExpired,
    )
  })
})
