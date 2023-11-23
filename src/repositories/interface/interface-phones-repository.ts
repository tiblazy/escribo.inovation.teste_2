import { Prisma } from '@prisma/client'

interface PhonesRepository {
  create(phone: Prisma.PhonesCreateInput): Promise<void>
}

export { PhonesRepository }
