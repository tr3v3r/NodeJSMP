import express from 'express';
import { productsController, users } from '../controllers';
import { queryParser, cookieParser } from '../middlewares';

const router = express.Router();

router.use(express.json());
router.use(queryParser);
router.use(cookieParser);

router.post('/products', productsController.productsPost);
router.get('/products', productsController.productsGet);
router.get('/products/:id', productsController.id);
router.get('/products/:id/reviews', productsController.reviews);
router.get('/users', users);

export default router;
