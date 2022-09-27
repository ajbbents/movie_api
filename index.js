const
  express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.Users;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect('mongodb://localhost:27017/BingeableFilmsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes static requests to the public folder

//CREATE a user w mongoose
/*JSON expected in this format
{
  ID: Integer,
  UserName: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ UserName: req.body.UserName })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.UserName + ' already exists');
    } else {
      Users
        .create({
          UserName: req.body.UserName,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) =>{res.status(201).json(user) })
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

});

});

});

});

//Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Well crap, something broke.');
});

//listens for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
