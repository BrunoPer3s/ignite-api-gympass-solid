import { RegisterService } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const prismaUsersRepository = new PrismaUsersRepository()
const registerService = new RegisterService(prismaUsersRepository)

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
