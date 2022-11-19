import { Router } from 'express'
import { createUser, findUser, loginUser, refreshTokenUser } from '@/routes'
import { ensureAuthenticated } from '@/shared/middleware'
export const routes = Router()
routes.use('/create', createUser)
routes.use('/login', loginUser)
routes.use('/refresh-token', refreshTokenUser)
routes.use('/find', ensureAuthenticated, findUser)
