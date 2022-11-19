import { prisma } from '@/shared/database'
import dayjs from 'dayjs'
export class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'second').unix()
    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
    return generateRefreshToken
  }
}
