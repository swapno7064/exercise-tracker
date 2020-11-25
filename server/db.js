const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

(async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/exercise_trackerDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

    // eslint-disable-line no-console
    console.log(`Successfully connected to MongoDB cluster in ${process.env.NODE_ENV} mode.`);
  } catch (err) {
    if (err) {
      console.error('Error while attempting to connect to database:', err); // eslint-disable-line no-console
      console.log('Attempting to re-establish database connection.'); // eslint-disable-line no-console
      await connectDb();
    }
  }
})();

module.exports = mongoose;



