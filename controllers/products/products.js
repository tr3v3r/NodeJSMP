// import db from '../../models/';

import { Product } from '../../mongodb/mongoose/models';

const productsController = {
  productsGet(req, res) {
    // db.Product.findAll({ include: [{ model: db.Reviews }] })
    //   .then((products) => {
    //     res.json(products);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     res.json({ error: 'No products available' });
    //   });

    Product.find({}, (err, products) => {
      if (err) res.status(404).json({ error: 'No products found' });
      else {
        res.json(products);
      }
    });
  },

  productsDelete(req, res) {
    Product.remove(
      { id: Number(req.params.id) },
      (err) => {
        if (err) res.send(err);
        else res.json({ message: 'Deleted' });
      }
    );
  },

  productsPost(req, res) {
    const { cost, name, reviews, id } = req.body;
    // db.Product.create({
    //   name,
    //   cost
    // })
    //   .then(() => {
    //     db.Product.findAll({ include: [{ model: db.Reviews }] })
    //       .then((products) => {
    //         res.status(200).send(products);
    //       });
    //   })
    //   .catch(console.log);
    Product.create(
      {
        id,
        cost,
        name,
        reviews
      },
      (err, product) => {
        if (err) console.log(err);
        else res.json(product);
      }
    );
  },

  id(req, res) {
    // db.Product.findOne({
    //   where: { id: Number(req.params.id) },
    //   include: [{ model: db.Reviews }]
    // })
    //   .then((product) => {
    //     res.json(product);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     res.json({ error: 'No products found by the given id' });
    //   });

    Product.findOne({ id: Number(req.params.id) }, (err, product) => {
      if (err) res.status(404).json({ error: 'No product found by given id' });
      else {
        res.json(product);
      }
    });
  },

  reviews(req, res) {
    // db.Reviews.findOne({
    //   where: { ProductId: Number(req.params.id) }
    // })
    //   .then((reviews) => {
    //     res.json(reviews);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     res.json({ error: 'No reviews found by the given id' });
    //   });


    Product.findOne({ id: Number(req.params.id) }, (err, product) => {
      if (err || !product) res.status(404).json({ error: 'No reviews found for required product' });
      else {
        res.json(product.reviews);
      }
    });
  }
};

export default productsController;

