const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  fs = require('fs'),
  path = require('path');

const app = express();
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let topMovies = [
  {
    Title: 'The Breakfast Club',
    Genre: 'Coming of Age',
    Year: '1985',
    Director: 'John Hughes',
    Stars: 'Molly Ringwald'
  },
  {
    Title: '10 Things I Hate About You',
    Genre: 'Rom-Com',
    Year: '1999',
    Director: 'Gil Junger',
    Stars: 'Heath Ledger'
  },
  {
    Title: 'Mean Girls',
    Year: '2004',
    Director: 'Mark Waters',
    Stars: 'Lindsay Lohan'
  },
  {
    Title: 'Can\'t Hardly Wait',
    Year: '1998',
    Director: 'Harry Elfont',
    Stars: 'Jennifer Love Hewitt'
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

app.get('/', (req, res) => {
  res.send('Grab the popcorn, time for a movie!');
});
let users = [
  {
    id: 1,
    name: Eliot,
    favoriteMovies: []
  },
  {
    id: 2,
    name: Sally,
    favoriteMovies: ['Dead Poets Society']
  }
];


app.get('/movies', (req, res) => {
  res.json('topMovies');
});

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes static requests to the public folder

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Well crap, something broke.');
});

//listens for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
