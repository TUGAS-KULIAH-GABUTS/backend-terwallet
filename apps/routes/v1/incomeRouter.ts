/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { IncomeController } from '../../controllers/income'

export const incomeRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/incomes', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await IncomeController.findAll(req, res)
  )
  route.get(
    '/detail/:incomeId',
    async (req: Request, res: Response) => await IncomeController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await IncomeController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await IncomeController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await IncomeController.remove(req, res)
  )
}
