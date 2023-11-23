import { Phones, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PhonesRepository } from '../interface/interface-phones-repository'

class InMemoryPhonesRepository implements PhonesRepository {
  public phones: Phones[] = []

  async create(data: Prisma.PhonesCreateInput): Promise<void> {
    const phone = {
      id: this.phones.length + 1,
      numero: data.numero,
      ddd: data.ddd,
      userId: randomUUID() ?? null,
    }

    this.phones.push(phone)
  }
}

export { InMemoryPhonesRepository }
