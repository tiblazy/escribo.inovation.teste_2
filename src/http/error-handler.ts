import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from '../configs/env'

const errorHandler = (
  err: FastifyError,
  _: FastifyRequest,
  rep: FastifyReply,
) => {
  if (err instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation Error', issues: err.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(err)
  }

  return rep.status(500).send()
}

export { errorHandler }
