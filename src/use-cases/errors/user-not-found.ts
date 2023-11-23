class UserNotFound extends Error {
  constructor() {
    super('Usuário não encontrado')
  }
}

export { UserNotFound }
