import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const secret = process.env.SECRET
  if (!secret) throw new Error('Need a valid secret')
  const authToken = request.headers.authorization
  if (!authToken) {
    return response.status(401).json({ message: 'Token is missing' })
  }
  try {
    const [, token] = authToken.split(' ')
    verify(token, secret)
    return next()
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' })
  }
}
