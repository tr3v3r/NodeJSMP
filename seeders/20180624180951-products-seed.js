

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Products', [
      { id: 1, name: 'MacBook', cost: '1999', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Acer', cost: '999', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: queryInterface => queryInterface.bulkDelete('Products', null, {})
};
