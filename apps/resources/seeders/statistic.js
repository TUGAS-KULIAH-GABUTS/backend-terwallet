/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statistic', [
      {
        statistic_id: '424323423423erwerewr23423rewr',
        statistic_saldo: 12000
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statistic', null, {})
  }
}
