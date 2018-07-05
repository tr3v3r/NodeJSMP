import mongoose from 'mongoose';
import productSchema from './schema';


const Product = mongoose.model('Product', productSchema);

export default Product;

