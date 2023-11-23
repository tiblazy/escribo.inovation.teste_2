import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const makeUser = (override: Partial<User> = {}) => {
  return {
    id: randomUUID(),
    nome: faker.lorem.word(),
    email: faker.internet.email(),
    senha: '123123',
    ...override,
  }
}

export { makeUser }
