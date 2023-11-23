import { Prisma, User } from '@prisma/client'

interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>

  create(user: Prisma.UserCreateInput): Promise<User>
}

export { UsersRepository }
