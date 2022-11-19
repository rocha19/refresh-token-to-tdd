import { Router } from 'express'
import {
  createUser,
  findBalanceUser,
  authenticationUser,
  transactionUser,
  findTransactionsUser
} from '@/routes'
import { ensureAuthenticated } from '@/shared/middleware'
export const routes = Router()
routes.use('/create', createUser)
routes.use('/login', authenticationUser)
routes.use('/find-balance', ensureAuthenticated, findBalanceUser)
routes.use('/find-transactions', ensureAuthenticated, findTransactionsUser)
routes.use('/transaction', ensureAuthenticated, transactionUser)
