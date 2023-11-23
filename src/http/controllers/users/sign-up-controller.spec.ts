import request from 'supertest'
import { app } from '../../../app'

describe('Sign Up', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign up a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        nome: 'John Doe Biggest Fan',
        email: 'johndoe@gmail.com',
        senha: 'johndoe123',
        telefones: [
          {
            numero: '123123123',
            ddd: '11',
          },
        ],
      })

    expect(response.statusCode).toBe(201)
  })
})
