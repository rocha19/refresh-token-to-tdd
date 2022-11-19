import { Router } from 'express'
import { FindBalanceUserController } from '@/controllers'
export const findBalanceUser = Router()
const findBalanceUserController = new FindBalanceUserController()
findBalanceUser.get('/', findBalanceUserController.handle)
