'use strict';
const faker = require('faker');
let adverts = [];

for(let i = 1; i <= 15; i++) {
  adverts.push({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Advertisements", adverts, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Advertisements", null, {});
  }
};
