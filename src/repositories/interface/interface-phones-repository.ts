import { Prisma } from '@prisma/client'

interface PhonesRepository {
  create(phone: Prisma.PhonesUncheckedCreateInput): Promise<void>
}

export { PhonesRepository }
