//express server
const express = require('express');
const app = express();
const axios = require('axios');

const Movie = require('./Movie');
//const bodyParser = require('body-parser');

//x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

//localhost:5000/getmovie?title=YourMovieTitle
app.get('/getmovie', (req, res) => {
  const title = req.query.title;
  const apikey = '385e80';
  const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

  axios
    .get(querystr)
    .then(response => {
      const movie = new Movie({
        //pass javascript object to this constructor
        title: response.data.Title,
        year: response.data.Year,
        genre: response.data.Genre,
        actors: response.data.Actors,
        plot: response.data.Plot,
        poster: response.data.Poster
      });
      //if the movie data is null
      //return is exit function
      //this part is not execution
      if (!movie.title) {
        res.status(200).json('Not found');
        return;
      }
      //if the movie is undefined
      //if else statement
      //save tp database
      movie
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })

    .catch(error => {
      console.log('axios catch', error);
      res.status(400).json(error);
    });
});
//localhost:5000/create?name=YourName&value=YourValue
app.get('/create', (req, res) => {
  //extract value
  //const name = req.query.name;
  //const value = req.query.value;

  //create object
  //const obj = {
  // name: req.query.name,
  // value: req.query.value
  // };

  const data = new Data({
    name: req.query.name,
    value: req.query.value
  });

  data
    .save()
    .then(respond => {
      //push the data up to server // respond anme can be res
      res.status(200).json(respond);
    })
    .catch(error => {
      res.status(400).json(error);
    });

  //res.status(200).send('create ok');
  //res.status(200).json(obj);
});

app.get('/getallmovies', (req, res) => {
  Movie.find({}) //query
    //.sort({ name: 'asc' })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/deletemovie', (req, res) => {
  Movie.deleteMany({ title: req.query.title }) //query
    //.sort({ name: 'asc' })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/delete?name=NAME
app.get('/delete', (req, res) => {
  const query = {
    name: req.query.name
  };
  Data.deleteMany(query)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(errors => {
      res.status(400).json(errors);
    });
});

//localhost/postcreate
//x-www-form-urlencoded
//name=NAME value=VALUE
app.post('/postcreate', (req, res) => {
  const data = new Data({
    name: req.body.name,
    value: req.body.value
  });

  data
    .save()
    .then(respond => {
      //push the data up to server // respond anme can be res
      res.status(200).json(respond);
    })
    .catch(error => {
      res.status(400).json(error);
    });

  //res.status(200).send('create ok');
  //res.status(200).json(obj);
});

//start server
app.listen(5000, () => {
  console.log('server listening on port 5000');
});
