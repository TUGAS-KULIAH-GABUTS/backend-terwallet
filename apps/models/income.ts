/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface IncomeAttributes extends ZygoteAttributes {
  incomeId: string
  incomeName: string
  incomeNominal: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type IncomeCreationAttributes = Optional<
  IncomeAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface IncomeInstance
  extends Model<IncomeAttributes, IncomeCreationAttributes>,
    IncomeAttributes {}

export const IncomeModel = sequelize.define<IncomeInstance>(
  'income',
  {
    ...ZygoteModel,
    incomeId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    incomeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    incomeNominal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'income',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
