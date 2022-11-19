import 'dotenv/config'
import { User } from '@/interfaces'
import { prisma } from '@/shared/database'
import { compare } from 'bcrypt'
import { GenerateRefreshToken, GenerateTokenProvider } from '@/provider'
export class LoginUserService {
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
    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute(userExists.id)
    await prisma.refreshToken.deleteMany({
      where: {
        userId: userExists.id
      }
    })
    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userExists.id)
    return { token, refreshToken }
  }
}
