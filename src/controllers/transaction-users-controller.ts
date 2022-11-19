import { Request, Response } from 'express'
import {
  TransactionCashOutUsersService,
  TransactionCashInUsersService
} from '@/services'
export class TransactionUserController {
  async handle(request: Request, response: Response) {
    try {
      const transactionCashOutService = new TransactionCashOutUsersService()
      const transactionCashInService = new TransactionCashInUsersService()
      const transactionCashOut = await transactionCashOutService.execute(
        request.body
      )
      const transactionCashIn = await transactionCashInService.execute(
        request.body
      )
      return response
        .status(200)
        .json({ transactionCashOut, transactionCashIn })
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
