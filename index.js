const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  fs = require('fs'),
  path = require('path');

const app = express();
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes static requests to the public folder

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Well crap, something broke.');
});

let topMovies = [
  {
    Title: 'The Breakfast Club',
    Genre: { Name: 'Coming of Age' },
    Year: '1985',
    Director: { Name: 'John Hughes' },
    Stars: 'Molly Ringwald'
  },
  {
    Title: '10 Things I Hate About You',
    Genre: { Name: 'Rom-Com' },
    Year: '1999',
    Director: { Name: 'Gil Junger' },
    Stars: 'Heath Ledger'
  },
  {
    Title: 'Mean Girls',
    Genre: { Name: 'Comedy' },
    Year: '2004',
    Director: { Name: 'Mark Waters' },
    Stars: 'Lindsay Lohan'
  },
  {
    Title: 'Can\'t Hardly Wait',
    Genre: { Name: 'Rom-Com' },
    Year: '1998',
    Director: { Name: 'Harry Elfont' },
    Stars: 'Jennifer Love Hewitt'
  },
  {
    Title: 'Clueless',
    Genre: { Name: 'Comedy' },
    Year: '1995',
    Director: { Name: 'Amy Heckerling' },
    Stars: 'Alicia Silverstone'
  },
  {
    Title: 'Saved',
    Genre: { Name: 'Coming of Age' },
    Year: '2004',
    Director: { Name: 'Brian Dannelly' },
    Stars: 'Mandy Moore'
  },
  {
    Title: 'Bring It On',
    Genre: { Name: 'Comedy' },
    Year: '2000',
    Director: { Name: 'Peyton Reed' },
    Stars: 'Kirsten Dunst'
  },
  {
    Title: 'Drumline',
    Genre: { Name: 'Rom-Com' },
    Year: '2000',
    Director: { Name: 'Charles Stone III' },
    Stars: 'Nick Cannon'
  },
  {
    Title: 'Almost Famous',
    Genre: { Name: 'Coming of Age' },
    Year: '2000',
    Director: { Name: 'Cameron Crowe' },
    Stars: 'Billy Crudup'
  },
  {
    Title: 'Dead Poets Society',
    Genre: { Name: 'Coming of Age' },
    Year: '1989',
    Director: { Name: 'Peter Weir' },
    Stars: 'Robin Williams'
  }
];

let users = [
  {
    id: 1,
    name: 'Eliot',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'Sally',
    favoriteMovies: ['Clueless']
  }
];

app.get('/', (req, res) => {
  res.send('Grab the popcorn, time for a movie!');
});

// app.get('/movies', (req, res) => {
//   res.json('topMovies');
// });

//READ list all movies
app.get('/movies', (req, res) => {
  res.status(200).json('topMovies');
});

//READ get a single movie
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});

//READ genre by genre title
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = topMovies.find((movie) => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});


app.use(morgan('combined', {stream: accessLogStream}));


});

//listens for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
