'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/products.json'))
    data = data.map(e => {
        delete e.id;
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e
    })
    await queryInterface.bulkInsert('Products', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
