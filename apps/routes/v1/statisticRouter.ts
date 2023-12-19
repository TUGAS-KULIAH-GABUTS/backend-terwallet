/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { StatisticController } from '../../controllers/statistic'

export const statisticRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/statistic', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await StatisticController.statistic(req, res)
  )
}
