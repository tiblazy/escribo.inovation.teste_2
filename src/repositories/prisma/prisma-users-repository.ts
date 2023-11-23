import { Prisma, User } from '@prisma/client'
import { prisma } from '../../configs/prisma'
import { UsersRepository } from '../interface/interface-users-repository'

class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async create({ nome, email, senha }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha,
      },
    })

    return user
  }

  async save(data: Prisma.UserCreateInput) {
    const user = await prisma.user.update({
      where: { id: data.id },
      data,
    })

    return user
  }
}

export { PrismaUsersRepository }
