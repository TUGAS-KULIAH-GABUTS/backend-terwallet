import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import { IncomeModel, type IncomeAttributes } from '../../models/income'
import { Op } from 'sequelize'
import { StatisticModel } from '../../models/statistic'
import { type ReportAttributes, ReportModel } from '../../models/reports'

export const createIncome = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as IncomeAttributes

  const emptyField = requestChecker({
    requireList: ['incomeName', 'incomeNominal'],
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

    statistic.statisticSaldo += parseInt(requestBody.incomeNominal)
    void statistic?.save()

    requestBody.incomeId = uuidv4()
    await IncomeModel.create(requestBody)

    const payload: ReportAttributes | any = {
      reportId: uuidv4(),
      reportName: requestBody.incomeName,
      reportIncome: parseInt(requestBody.incomeNominal),
      reportExpense: 0
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
