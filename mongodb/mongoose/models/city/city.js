import mongoose from 'mongoose';
import citySchema from './schema';


const City = mongoose.model('City', citySchema);

export default City;

