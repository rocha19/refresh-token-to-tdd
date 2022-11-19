import { Router } from 'express'
import { TransactionUserController } from '@/controllers'
export const transactionUser = Router()
const transactionUserController = new TransactionUserController()
transactionUser.put('/', transactionUserController.handle)
