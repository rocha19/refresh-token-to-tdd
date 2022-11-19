import { Request, Response } from 'express'
import { FindTransactionsUserService } from '@/services'
export class FindTransactionsUserController {
  async handle(request: Request, response: Response) {
    try {
      const findTransactionsUserService = new FindTransactionsUserService()
      const { username } = request.body
      const userExists = await findTransactionsUserService.execute(username)
      if (!userExists) {
        return response.status(400).json({ Error: 'User not found' })
      }
      return response.status(200).send(userExists)
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
