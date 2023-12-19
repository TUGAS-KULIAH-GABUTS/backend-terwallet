/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { ExpenseController } from '../../controllers/expense'

export const expenseRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/expenses', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await ExpenseController.findAll(req, res)
  )
  route.get(
    '/detail/:expenseId',
    async (req: Request, res: Response) => await ExpenseController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await ExpenseController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await ExpenseController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await ExpenseController.remove(req, res)
  )
}
