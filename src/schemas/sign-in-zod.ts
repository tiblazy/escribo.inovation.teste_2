import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  senha: z.string(),
})

export { schema }
