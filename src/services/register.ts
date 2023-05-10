import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  private usersRepository: any

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository
  }

  async execute({ email, name, password }: RegisterServiceParams) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists!')
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
