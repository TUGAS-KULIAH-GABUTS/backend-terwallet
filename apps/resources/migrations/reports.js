/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      ...ZygoteModel,
      report_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      report_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      report_income: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      report_expense: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reports')
  }
}
