import { prisma } from '@/shared/database'
export class FindTransactionsUserService {
  async execute(username: string) {
    const transactionCashIn = await prisma.transactionsCashIn.findFirst({
      where: {
        accounts: {
          user: {
            username
          }
        }
      },
      select: {
        value: true
      }
    })
    const transactionCashOut = await prisma.transactionsCashOut.findFirst({
      where: {
        accounts: {
          user: {
            username
          }
        }
      },
      select: {
        value: true
      }
    })
    return {
      username,
      cashOut: transactionCashOut,
      cashIn: transactionCashIn
    }
  }
}
