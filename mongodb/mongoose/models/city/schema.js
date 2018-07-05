import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: {
    lat: Number,
    long: Number
  }
});

export default citySchema;
