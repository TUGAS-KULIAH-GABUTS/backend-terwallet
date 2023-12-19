/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { ReportsController } from '../../controllers/reports'

export const reportsRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/reports', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await ReportsController.reports(req, res)
  )
}
