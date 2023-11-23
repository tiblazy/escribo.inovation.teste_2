interface SignUpUseCaseRequestDTO {
  nome: string
  email: string
  senha: string
  telefones: Array<any>
}

interface SignUpUseCaseResponseDTO {
  id: string
  data_criacao: Date
  data_atualizacao: Date
  ultimo_login: Date
  token: string
}

export { SignUpUseCaseRequestDTO, SignUpUseCaseResponseDTO }
