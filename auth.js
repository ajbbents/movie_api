const jwtSecret = 'your_jwt_secret';//must be the same key used in JWTStrategy
const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');//your local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.UserName, //this is the username being encoded in the JWT
    expiresIn: '7d',//specifies expiration
    algorithm: 'HS256'//algorithm used to 'sign' or encode the values of the JWT
  });
};

//POST login
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'something is fishy here.',
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
          console.log(err);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
