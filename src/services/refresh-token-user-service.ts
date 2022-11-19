import { GenerateRefreshToken, GenerateTokenProvider } from '@/provider'
import { prisma } from '@/shared/database'
import dayjs from 'dayjs'
export class RefreshTokenUserService {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })
    if (!refreshToken) throw new Error('Refresh token invalid')
    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.userId)
    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })
      const generateRefreshTokenProvider = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      )
      return { token, refreshToken: newRefreshToken }
    }
    return { token }
  }
}
