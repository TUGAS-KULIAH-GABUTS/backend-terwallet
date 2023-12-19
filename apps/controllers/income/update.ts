import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { IncomeModel, type IncomeAttributes } from '../../models/income'

export const updateIncome = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as IncomeAttributes

  const emptyField = requestChecker({
    requireList: ['incomeId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await IncomeModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        incomeId: { [Op.eq]: requestBody.incomeId }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: IncomeAttributes | any = {
      ...(requestBody.incomeName.length > 0 && {
        incomeName: requestBody.incomeName
      }),
      ...(requestBody.incomeNominal.length > 0 && {
        incomeNominal: requestBody.incomeNominal
      })
    }

    await IncomeModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        incomeId: { [Op.eq]: requestBody.incomeId }
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
