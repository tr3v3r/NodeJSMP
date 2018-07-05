// import Sequelize from 'sequelize';
// import app from './app';
// import db from './models';

// const port = process.env.PORT || 8080;

// const sequelize = new Sequelize('nodejsdb', 'alexey', 'supernodejspassword', {
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });


// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection to database has been established successfully.');
//     db.sequelize.sync().then(() => {
//       console.log('Database was synchronized!');
//       app.listen(port, () => {
//         console.log(`App listening on port ${port}!`);
//       });
//     });
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });


import app from './app';
import { mongoose } from './mongodb';

const port = process.env.PORT || 8080;

mongoose.connect(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
});

