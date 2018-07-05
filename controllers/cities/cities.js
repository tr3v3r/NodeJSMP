import { sample } from 'lodash';
// import { nativeDriver } from '../../mongodb';
import { City } from '../../mongodb/mongoose/models';

const citiesController = {
  getRandomCity(req, res) {
    // nativeDriver.find(
    //   'cities',
    //   {},
    //   (cities) => {
    //     const randomCity = sample(cities);
    //     res.json(randomCity);
    //   },
    //   err => res.status(404).json({ error: 'No cities found' })
    // );

    City.find({}, (err, cities) => {
      if (err) res.status(404).json({ error: 'No cities found' });
      else {
        const randomCity = sample(cities);
        res.json(randomCity);
      }
    });
  }
};

export default citiesController;

