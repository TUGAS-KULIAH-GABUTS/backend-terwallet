/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reports', [
      {
        report_id: '424323423423erwerewr23423rewr',
        report_name: 'beli pulsa',
        report_income: 6000,
        report_expense: 6000
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reports', null, {})
  }
}
