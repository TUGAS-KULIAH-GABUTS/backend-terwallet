/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface ReportAttributes extends ZygoteAttributes {
  reportId: string
  reportName: string
  reportIncome: number
  reportExpense: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type ReportCreationAttributes = Optional<
  ReportAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface ReportInstance
  extends Model<ReportAttributes, ReportCreationAttributes>,
    ReportAttributes {
  statisticTotal: number
}

export const ReportModel = sequelize.define<ReportInstance>(
  'reports',
  {
    ...ZygoteModel,
    reportId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    reportName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reportIncome: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reportExpense: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'reports',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
