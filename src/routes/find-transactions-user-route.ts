import { Router } from 'express'
import { FindTransactionsUserController } from '@/controllers'
export const findTransactionsUser = Router()
const findTransactionsUserController = new FindTransactionsUserController()
findTransactionsUser.get('/', findTransactionsUserController.handle)
