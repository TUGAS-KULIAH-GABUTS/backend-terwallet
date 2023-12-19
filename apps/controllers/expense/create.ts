import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import { ExpenseModel, type IExpenseAttributes } from '../../models/expense'
import { Op } from 'sequelize'
import { StatisticModel } from '../../models/statistic'
import { type ReportAttributes, ReportModel } from '../../models/reports'

export const createExpense = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as IExpenseAttributes

  const emptyField = requestChecker({
    requireList: ['expenseName', 'expenseNominal'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const statistic = await StatisticModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    if (statistic == null) {
      const message = ' statistic not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const currentSaldo = statistic?.statisticSaldo - parseInt(requestBody.expenseNominal)

    if (currentSaldo < 0) {
      const message = 'saldo tidak cukup!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    statistic.statisticSaldo = currentSaldo
    void statistic?.save()

    requestBody.expenseId = uuidv4()
    await ExpenseModel.create(requestBody)

    const payload: ReportAttributes | any = {
      reportId: uuidv4(),
      reportName: requestBody.expenseName,
      reportExpense: parseInt(requestBody.expenseNominal),
      reportIncome: 0
    }

    await ReportModel.create(payload)

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
