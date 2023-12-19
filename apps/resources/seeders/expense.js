/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('expense', [
      {
        expense_id: '424323423423erwerewr23423rewr',
        expense_name: 'nasi padang',
        expense_nominal: 12000
      },
      {
        expense_id: 'fdsftr23453523erwerewr23423ererre443',
        expense_name: 'tahu gejrot',
        expense_nominal: 12000
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expense', null, {})
  }
}
