/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('income', [
      {
        income_id: '424323423423erwerewr23423rewr',
        income_name: 'nasi padang',
        income_nominal: 12000
      },
      {
        income_id: 'fdsftr23453523erwerewr23423ererre443',
        income_name: 'tahu gejrot',
        income_nominal: 12000
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('income', null, {})
  }
}
