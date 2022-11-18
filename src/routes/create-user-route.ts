import { Router } from 'express'
import { CreateUserController } from '@/controllers'
export const createUser = Router()
const createUserController = new CreateUserController()
createUser.post('/', createUserController.handle)
