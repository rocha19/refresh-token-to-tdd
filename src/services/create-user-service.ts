import { prisma } from '@/shared/database'
import { User } from '@/interfaces'
import { hash } from 'bcrypt'
export class CreateUserService {
  async execute(data: User) {
    let { password } = data
    password = await hash(password, 10)
    const userExists = await prisma.user.findFirst({
      where: {
        username: data.username
      }
    })
    if (userExists) throw new Error(`User already exists`)
    const user = await prisma.user.create({
      data: {
        id: data.id,
        username: data.username,
        password,
        accountId: {
          create: {
            balance: 'R$ 100,00'
          }
        }
      }
    })
    return user
  }
}
