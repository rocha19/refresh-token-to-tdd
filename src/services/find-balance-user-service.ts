import { prisma } from '@/shared/database'
export class FindBalanceUserService {
  execute(username: string) {
    const balance = prisma.user.findFirst({
      where: {
        username
      },
      select: {
        username: true,
        account: {
          select: {
            balance: true
          }
        }
      }
    })
    if (!balance) {
      throw new Error('User not found!')
    }
    return balance
  }
}
