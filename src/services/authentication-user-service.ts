import 'dotenv/config'
import { User } from '@/interfaces'
import { prisma } from '@/shared/database'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
export class AuthenticationUserService {
  async execute({ username, password }: User) {
    const secret = process.env.SECRET
    if (!secret) throw new Error('Need a valid secret')
    const userExists = await prisma.user.findFirst({
      where: {
        username
      }
    })
    if (!userExists) throw new Error('User incorrect')
    const passwordMatch = await compare(password, userExists.password)
    if (!passwordMatch) throw new Error('Password incorrect')
    const token = sign({}, secret, { subject: userExists.id, expiresIn: '1d' })
    return token
  }
}
