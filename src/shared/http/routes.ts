import { Router } from 'express'
import { createUser, findUser, authenticationUser } from '@/routes'
import { ensureAuthenticated } from '@/shared/middleware'
export const routes = Router()
routes.use('/create', createUser)
routes.use('/find', ensureAuthenticated, findUser)
routes.use('/login', authenticationUser)
