const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  path = require('path');

const app = express();
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let topMovies = [
  {
    title: 'The Breakfast Club',
    year: '1985',
    director: 'John Hughes',
    stars: 'Molly Ringwald'
  },
  {
    title: '10 Things I Hate About You',
    year: '1999',
    director: 'Gil Junger',
    stars: 'Heath Ledger'
  },
  {
    title: 'Mean Girls',
    year: '2004',
    director: 'Mark Waters',
    stars: 'Lindsay Lohan'
  },
  {
    title: 'Can\'t Hardly Wait',
    year: '1998',
    director: 'Harry Elfont',
    stars: 'Jennifer Love Hewitt'
  },
  {
    title: 'Clueless',
    year: '1995',
    director: 'Amy Heckerling',
    stars: 'Alicia Silverstone'
  },
  {
    title: 'Saved',
    year: '2004',
    director: 'Brian Dannelly',
    stars: 'Mandy Moore'
  },
  {
    title: 'Bring It On',
    year: '2000',
    director: 'Peyton Reed',
    stars: 'Kirsten Dunst'
  },
  {
    title: 'Drumline',
    year: '2000',
    director: 'Charles Stone III',
    stars: 'Nick Cannon'
  },
  {
    title: 'Almost Famous',
    year: '2000',
    director: 'Cameron Crowe',
    stars: 'Billy Crudup'
  },
  {
    title: 'Dead Poets Society',
    year: '1989',
    director: 'Peter Weir',
    stars: 'Robin Williams'
  }
];

app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', (req, res) => {
  res.send('Grab the popcorn, time for a movie!');
});

app.get('/movies', (req, res) => {
  res.json('topMovies');
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Well crap, something broke.');
});

app.use(express.static('public')); //routes static requests to the public folder

//listens for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
