import { Transactions } from '@/interfaces/transactions'
import { prisma } from '@/shared/database'
export class TransactionCashOutUsersService {
  async execute(transaction: Transactions) {
    if (transaction.value < 1) throw new Error('Value cannot be less than 1')
    const account = await prisma.accounts.findFirst({
      where: {
        user: {
          username: transaction.debitedAccountId
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
    if (!account || account.balance < transaction.value) {
      throw new Error('insufficient funds')
    }
    const { balance } = account
    const cashOut = balance - transaction.value
    const userCashOut = await prisma.user.update({
      where: {
        username: transaction.debitedAccountId
      },
      data: {
        account: {
          update: {
            balance: cashOut,
            transactionsCashOut: {
              create: {
                value: transaction.value
              }
            }
          }
        }
      }
    })
    return {
      CashOutOf: {
        username: userCashOut.username,
        OldBalance: balance,
        newBalance: cashOut,
        cashOutValue: transaction.value
      }
    }
  }
}
