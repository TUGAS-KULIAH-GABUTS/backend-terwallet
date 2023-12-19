import { createExpense } from './create'
import { findAllExpense, findDetailExpense } from './find'
import { removeExpense } from './remove'
import { updateExpense } from './update'

export const ExpenseController = {
  create: createExpense,
  findAll: findAllExpense,
  findOne: findDetailExpense,
  remove: removeExpense,
  update: updateExpense
}
