import { forEach } from 'lodash';
import { City } from './models';


const prefillData = {
  cities: [
    {
      name: 'Brest',
      country: 'Belarus',
      capital: false,
      location: {
        lat: 52.097621,
        long: 23.734050
      }
    },
    {
      name: 'Moglev',
      country: 'Belarus',
      capital: false,
      location: {
        lat: 52.11,
        long: 23.222
      }
    },
    {
      name: 'Minsk',
      country: 'Belarus',
      capital: true,
      location: {
        lat: 52.097621,
        long: 23.734050
      }
    }
  ]
};

forEach(prefillData, (data) => {
  City.insertMany(data, (err) => {
    if (err) console.log('Insertion error!');
  });
});

