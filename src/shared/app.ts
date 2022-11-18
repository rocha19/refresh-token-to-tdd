import 'module-alias/register'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { corsOptions, ensureAuthenticated } from '@/shared/middleware'
import { routes } from '@/shared/http/routes'
class App {
  public server
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }
  middlewares() {
    this.server.use(express.json())
    this.server.use(corsOptions)
    this.server.use(
      express.urlencoded({
        extended: true
      })
    )
    this.server.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        return response.json({
          status: 'Error',
          message: error.message
        })
      }
    )
  }
  routes() {
    this.server.use('/api/v1', routes)
  }
}
export default new App().server
