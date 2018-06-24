

module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    reviews: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {});
  Reviews.associate = function (models) {
    Reviews.belongsTo(models.Product, {
      as: 'product'
    });
  };
  return Reviews;
};
