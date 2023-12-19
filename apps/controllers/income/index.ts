import { createIncome } from './create'
import { findAllIncome, findDetailIncome } from './find'
import { removeIncome } from './remove'
import { updateIncome } from './update'

export const IncomeController = {
  create: createIncome,
  findAll: findAllIncome,
  findOne: findDetailIncome,
  remove: removeIncome,
  update: updateIncome
}
