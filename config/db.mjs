import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dotenv = require("dotenv");
dotenv.config();

const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('Mongo DB Connected...');
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

export default connectDB;