class ValidateJwtExpired extends Error {
  constructor() {
    super('Sessão inválida')
  }
}

export { ValidateJwtExpired }
