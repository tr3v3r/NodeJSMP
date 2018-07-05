import { sample } from 'lodash';
import { nativeDriver } from '../../mongodb';

const citiesController = {
  getRandomCity(req, res) {
    nativeDriver.find(
      'cities',
      {},
      (cities) => {
        const randomCity = sample(cities);
        res.json(randomCity);
      },
      err => res.status(404).json({ error: 'No cities found' })
    );
  }
};

export default citiesController;

