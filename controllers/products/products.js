import db from '../../models/';

const productsController = {
  productsGet(req, res) {
    db.Product.findAll({ include: [{ model: db.Reviews }] })
      .then((products) => {
        res.json(products);
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: 'No products available' });
      });
  },

  productsPost(req, res) {
    const { cost, name } = req.body;
    db.Product.create({
      name,
      cost
    })
      .then(() => {
        db.Product.findAll({ include: [{ model: db.Reviews }] })
          .then((products) => {
            res.status(200).send(products);
          });
      })
      .catch(console.log);
  },

  id(req, res) {
    db.Product.findOne({
      where: { id: Number(req.params.id) },
      include: [{ model: db.Reviews }]
    })
      .then((product) => {
        res.json(product);
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: 'No products found by the given id' });
      });
  },

  reviews(req, res) {
    db.Reviews.findOne({
      where: { ProductId: Number(req.params.id) }
    })
      .then((reviews) => {
        res.json(reviews);
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: 'No reviews found by the given id' });
      });
  }
};

export default productsController;

