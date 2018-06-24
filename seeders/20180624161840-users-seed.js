

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      id: 1,
      name: 'Alex',
      password: '12345678',
      isModerator: true,
      email: 'alex22@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Ivan',
      password: '2233445566',
      isModerator: false,
      email: 'Ivan2@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Jhon',
      password: '555222333',
      isModerator: false,
      email: 'Jhon@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Aliaksei Astafyeu',
      password: '555222333',
      isModerator: false,
      email: 'Jhon@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
