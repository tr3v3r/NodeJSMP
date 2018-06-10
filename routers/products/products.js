import express from 'express';
import fs from 'fs';
import { productsData } from '../../models/';
import id from './id';

const products = express.Router();

products.use((req, res, next) => {
  req.products = productsData
   || [{ error: 'No products available' }];
  next();
});

products.get('/products/', (req, res) => {
  res.json(req.products);
});

products.use(express.json());

products.post('/products/', (req, res) => {
  const newProduct = req.body;
  const newProducts = JSON.stringify([...productsData, newProduct], null, '\t');
  fs.writeFileSync('models/productsData/productsData.json', newProducts);
  res.status(200).send(newProducts);
});

products.use('/products/', id);


export default products;

