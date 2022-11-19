import { Transactions } from '@/interfaces/transactions'
import { prisma } from '@/shared/database'
export class TransactionCashInUsersService {
  async execute(transaction: Transactions) {
    const account = await prisma.accounts.findFirst({
      where: {
        user: {
          username: transaction.creditedAccountId
        }
      },
      select: {
        user: {
          select: {
            username: true
          }
        },
        balance: true
      }
    })
    if (!account) {
      throw new Error('User not exists')
    }
    const cashIn = account.balance + transaction.value
    const userCashIn = await prisma.user.update({
      where: {
        username: transaction.creditedAccountId
      },
      data: {
        account: {
          update: {
            balance: cashIn,
            transactionsCashIn: {
              create: {
                value: transaction.value
              }
            }
          }
        }
      }
    })
    return {
      CashInOf: {
        username: userCashIn.username,
        balanceTransaction: transaction.value
      }
    }
  }
}
