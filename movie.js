const mongoose = require('mongoose');
const db = 'mongodb://vanessa:abc123@ds241133.mlab.com:41133/vanessamovie';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to database');
  })

  .catch(error => {
    console.log('Mongoose connection error:', error);
  });

//Title, Year, Genre, Actors, Plot and Poster
//declare variable
const schema = mongoose.Schema({
  title: { type: String },
  year: { type: String },
  genre: { type: String },
  actors: { type: String },
  plot: { type: String },
  poster: { type: String }
});

//how to create table , table name = dataCollection
const Movie = mongoose.model('Movie', schema, 'movieCollection');

module.exports = Movie;
