import { prisma } from '@/shared/database'
export class FindUserService {
  execute(username: string) {
    const user = prisma.user.findFirst({
      where: {
        username
      },
      select: {
        username: true,
        accountId: {
          select: {
            balance: true
          }
        }
      }
    })
    if (!user) {
      throw new Error('User not found!')
    }
    return user
  }
}
