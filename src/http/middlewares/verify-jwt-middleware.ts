import { FastifyReply, FastifyRequest } from 'fastify'

const verifyJwt = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    await req.jwtVerify()
  } catch (err) {
    return rep.status(401).send({ message: 'Não autorizado' })
  }
}

export { verifyJwt }
