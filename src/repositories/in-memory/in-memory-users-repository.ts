import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../interface/interface-users-repository'

class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(data: string) {
    const user = this.users.find(({ email }) => email === data)

    if (!user) {
      return null
    }

    return user
  }

  async findById(data: string) {
    const user = this.users.find(({ id }) => id === data)

    if (!user) {
      return null
    }

    return user
  }

  async findByToken(data: string) {
    const user = this.users.find(({ token }) => token === data)

    if (!user) {
      return null
    }

    return user
  }

  async create({ nome, email, senha }: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      nome,
      email,
      senha,
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ultimo_login: new Date(),
      token: null,
    }

    this.users.push(user)

    return user
  }

  async save(user: Prisma.UserCreateInput) {
    const userIndex = this.users.findIndex(({ id }) => id === user.id)

    if (userIndex > 0) {
      this.users[userIndex] = user
    }

    return user
  }
}

export { InMemoryUsersRepository }
