import { RegisterPhoneUseCaseRequestDTO } from './register-phone-dto'

interface SignUpUseCaseRequestDTO {
  nome: string
  email: string
  senha: string
  telefones: Array<RegisterPhoneUseCaseRequestDTO>
}

interface SignUpUseCaseResponseDTO {
  id: string
  data_criacao: Date
  data_atualizacao: Date
  ultimo_login: Date
  token: string
}

export { SignUpUseCaseRequestDTO, SignUpUseCaseResponseDTO }
