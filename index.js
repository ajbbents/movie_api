const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { check, validationResult } = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const
  morgan = require('morgan'),
  uuid = require('uuid'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.Users;

// mongoose.connect('mongodb://localhost:27017/BingeableFilmsDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cors = require('cors');
app.use(cors());
//if only certain origins are wanted:
// let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
//
// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       let message = 'The CORS policy for this app says no' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes static requests to the public folder

//returns generic welcome msg
app.get('/', (req, res) => {
  res.send(`grab the popcorn, it's movie time!`);
});

//Return all movies as JSON object
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Return single movie by Title as JSON object
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return all movies of a certain genre as a JSON object
app.get('/movies/genres/:Genre', (req, res) => {
  Movies.find({ "Genre.Name": req.params.Genre })
  .then((movie) => {
    res.send(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Return data about a certain director as a JSON object
app.get('/movies/directors/:Director', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Director })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//CREATE a user w mongoose
/*JSON expected in this format
{
  ID: Integer,
  UserName: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users',
  //validation logic here
  [
    check('UserName', 'Username is required.').isLength({min: 5}),
    check('UserName', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required.').not().isEmpty(),
    check('Email', 'Email does not appear to be valid.').isEmail()
  ], (req, res) => {

    //check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ UserName: req.body.UserName })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.UserName + ' already exists');
    } else {
      Users
        .create({
          UserName: req.body.UserName,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) =>{res.status(201).json(user)})
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//READ all users w mongoose
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ user by username w mongoose
app.get('/users/:UserName', (req, res) => {
  Users.findOne({ UserName: req.params.UserName })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//UPDATE user info by username w Mongoose
/* Expect JSON in this format
{
  UserName: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.put('/users/:UserName', (req, res) => {
  Users.findOneAndUpdate({ UserName: req.params.UserName }, {
    $set: {
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  {new: true}) //updated doc is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Add a favorite movie w mongoose
app.post('/users/:UserName/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ UserName: req.params.UserName }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, //Makes sure updated doc is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send("error: " + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete a favorite movie w mongoose
app.delete('/users/:UserName/Movies/:MovieID',  (req, res) => {
  Users.findOneAndUpdate({ UserName: req.params.UserName }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, //makes sure updated doc is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete a user by username w Mongoose
app.delete('/users/:UserName', (req, res) => {
  Users.findOneAndRemove({ UserName: req.params.UserName })
    .then((users) => {
      if(!users) {
        res.status(400).send(req.params.UserName + ' was not found.');
      } else {
        res.status(200).send(req.params.UserName + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Well crap, something broke.');
});

//listens for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('listening on port ' + port);
});
