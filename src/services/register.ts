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
    const userWithSameEmail = await this.usersRepository.checkEmail(email)

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
