// import config from './config/config';
// import { User, Product, DirWatcher, Importer } from './models';

// console.log(config.name);
// const user = new User();
// const product = new Product();

// const myDirWatcher = new DirWatcher();
// myDirWatcher.watch('./data', 3000);

// const myImporter = new Importer(myDirWatcher);
// // myImporter.onChangeImportSync();
// myImporter.onChangeImportAsync();
import express from 'express';
import router from './routers';

const app = express();
app.use('/', router);
export default app;

