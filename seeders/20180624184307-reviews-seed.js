

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await queryInterface.sequelize.query('SELECT id from "Products";');

    const productsRows = products[0];

    return queryInterface.bulkInsert('Reviews', [
      { reviews: 'Review one', id: 1, ProductId: productsRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { reviews: 'Review Two', id: 2, ProductId: productsRows[1].id, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews', null, {})
};
