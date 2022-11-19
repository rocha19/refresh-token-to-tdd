import { Request, Response } from 'express'
import { AuthenticationUserService } from '@/services'
export class AuthenticationUserController {
  async handle(request: Request, response: Response) {
    try {
      const authenticationUserService = new AuthenticationUserService()
      const token = await authenticationUserService.execute(request.body)
      return response.status(200).send({ token })
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
