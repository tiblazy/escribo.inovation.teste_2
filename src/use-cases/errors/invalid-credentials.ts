class InvalidCredentials extends Error {
  constructor() {
    super('Usuário e/ou senha inválidos')
  }
}

export { InvalidCredentials }
