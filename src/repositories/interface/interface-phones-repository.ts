import { Phones, Prisma } from '@prisma/client'

interface PhonesRepository {
  create(phone: Prisma.PhonesUncheckedCreateInput): Promise<Phones | null>
}

export { PhonesRepository }
