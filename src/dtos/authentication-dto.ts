import { User } from '@prisma/client'

interface SessionAuthenticationUseCaseRequestDTO {
  email: string
  senha: string
}

interface SessionAuthenticationUseCaseResponseDTO {
  user: User
}

export {
  SessionAuthenticationUseCaseRequestDTO,
  SessionAuthenticationUseCaseResponseDTO
}

