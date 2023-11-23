class UserAlreadyExists extends Error {
  constructor() {
    super('E-mail já existente')
  }
}

export { UserAlreadyExists }
