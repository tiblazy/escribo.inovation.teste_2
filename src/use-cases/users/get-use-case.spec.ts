import { hash } from 'bcryptjs'
import { makeUser } from '../../factories/users/make-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { GetUseCase } from './get-use-case'

let usersRepository: InMemoryUsersRepository
let sut: GetUseCase

let fakeUser: any

describe('Get Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUseCase(usersRepository)

    fakeUser = makeUser()
  })

  it('should be able to get a user', async () => {
    await usersRepository.create({
      ...fakeUser,
      senha: await hash(fakeUser.senha, 6),
    })

    const user = await sut.execute(usersRepository.users[0].id)

    expect(user?.id).toEqual(expect.any(String))
  })
})
