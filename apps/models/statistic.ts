/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface StatisticAttributes extends ZygoteAttributes {
  statisticId: string
  statisticSaldo: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type StatisticCreationAttributes = Optional<
  StatisticAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface StatisticInstance
  extends Model<StatisticAttributes, StatisticCreationAttributes>,
    StatisticAttributes {
  statisticTotal: number
}

export const StatisticModel = sequelize.define<StatisticInstance>(
  'statistic',
  {
    ...ZygoteModel,
    statisticId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    statisticSaldo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'statistic',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
