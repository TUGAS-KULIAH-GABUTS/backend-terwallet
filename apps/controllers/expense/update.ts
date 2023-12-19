import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { ExpenseModel, type IExpenseAttributes } from '../../models/expense'

export const updateExpense = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as IExpenseAttributes

  const emptyField = requestChecker({
    requireList: ['expenseId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await ExpenseModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        expenseId: { [Op.eq]: requestBody.expenseId }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: IExpenseAttributes | any = {
      ...(requestBody.expenseName.length > 0 && {
        expenseName: requestBody.expenseName
      }),
      ...(requestBody.expenseNominal.length > 0 && {
        expenseNominal: requestBody.expenseNominal
      })
    }

    await ExpenseModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        expenseId: { [Op.eq]: requestBody.expenseId }
      }
    })

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
