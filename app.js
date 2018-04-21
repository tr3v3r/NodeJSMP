import config from './config/config.json';
import { User, Product } from './modules';

console.log(config.name)
const user = new User();
const product = new Product();