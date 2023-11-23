import { Prisma } from '@prisma/client'
import { prisma } from '../../configs/prisma'
import { PhonesRepository } from '../interface/interface-phones-repository'

class PrismaPhonesRepository implements PhonesRepository {
  async create({ numero, ddd, userId }: Prisma.PhonesUncheckedCreateInput) {
    const phone = await prisma.phones.create({
      data: { numero, ddd, userId: userId ?? null },
    })

    return phone
  }
}

export { PrismaPhonesRepository }
