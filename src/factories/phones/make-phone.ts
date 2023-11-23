import { faker } from '@faker-js/faker'
import { Phones } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const makePhones = (override: Partial<Phones> = {}) => {
  return {
    id: faker.number,
    numero: '123123231',
    ddd: '12',
    userId: randomUUID(),
    ...override,
  }
}

export { makePhones }
