const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('mongo db connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1); // this will exit node process if any failure occurs
  }
};

module.exports = connectDB;
