interface SessionAuthenticationUseCaseRequestDTO {
  email: string
  senha: string
}

interface SessionAuthenticationUseCaseResponseDTO {
  id: string
  data_criacao: Date
  data_atualizacao: Date | null
  ultimo_login: Date | null
}

export {
  SessionAuthenticationUseCaseRequestDTO,
  SessionAuthenticationUseCaseResponseDTO,
}
