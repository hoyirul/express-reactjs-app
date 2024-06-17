'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'supervisor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'operator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', { role: 'admin' }, {
      
    });
  }
};