import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  private usersRepository: UsersRepository

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository
  }

  async execute({ email, name, password }: RegisterServiceParams) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
