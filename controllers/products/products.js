import fs from 'fs';
import { find, get } from 'lodash';
import { productsData } from '../../models/';

const productsController = {
  productsGet(req, res) {
    res.json(productsData);
  },

  productsPost(req, res) {
    const newProduct = req.body;
    const newProducts = JSON.stringify([...productsData, newProduct], null, '\t');
    fs.writeFileSync('models/productsData/productsData.json', newProducts);
    res.status(200).send(newProducts);
  },

  id(req, res) {
    const product = find(productsData, { id: req.params.id })
    || { error: 'No products found by the given id' };
    res.json(product);
  },

  reviews(req, res) {
    const product = find(productsData, { id: req.params.id });
    const review = get(product, 'reviews', { error: 'No reviews where found for provided id' });
    res.json(review);
  }
};

export default productsController;

