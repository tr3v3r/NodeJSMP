import express from 'express';

const reviews = express.Router();

reviews.get('/reviews/', (req, res) => {
  const result = req.product.reviews
  || { error: 'No reviews where found for provided id' };

  res.json(result);
});

export default reviews;

