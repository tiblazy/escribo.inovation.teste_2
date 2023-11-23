import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(20),
  email: z.string().email(),
  senha: z.string().min(8),
  telefones: z.array(
    z.object({ numero: z.string().min(9), ddd: z.string().min(2) }),
  ),
})

export { schema }
