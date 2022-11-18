import { Request, Response } from 'express'
import { FindUserService } from '@/services'
export class FindUserController {
  async handle(request: Request, response: Response) {
    try {
      const findUserService = new FindUserService()
      const { username } = request.body
      const userExists = await findUserService.execute(username)
      if (!userExists) {
        return response.status(400).json({ Error: 'User not found' })
      }
      return response.status(200).json({
        User: `${userExists.username}`,
        Balance: `${userExists.accountId.balance}`
      })
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
