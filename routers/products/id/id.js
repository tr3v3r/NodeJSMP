import express from 'express';
import reviews from './reviews';

const id = express.Router();

id.param('id', (req, res, next, paramId) => {
  req.product = req.products.find(product => product.id === paramId)
  || { error: 'No products found by the given id' };
  next();
});

id.get('/:id/', (req, res, next) => {
  res.json(req.product);
});

id.use('/:id/', reviews);


export default id;
