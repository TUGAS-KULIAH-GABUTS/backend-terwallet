/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface IExpenseAttributes extends ZygoteAttributes {
  expenseId: string
  expenseName: string
  expenseNominal: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type ExpenseCreationAttributes = Optional<
  IExpenseAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface ExpenseInstance
  extends Model<IExpenseAttributes, ExpenseCreationAttributes>,
    IExpenseAttributes {}

export const ExpenseModel = sequelize.define<ExpenseInstance>(
  'expense',
  {
    ...ZygoteModel,
    expenseId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    expenseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expenseNominal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'expense',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
