const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const getUser = require('../db/queries').getUser;

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken();
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

const strategy = new JwtStrategy(options, (payload, done) => {
  // const user = getUser(payload.sub).catch(err => done(err, null));
  // if (user) {
  //   return done(null, user);
  // } else {
  //   return done(null, false);
  // }
  getUser(payload.sub)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err, null));
  
})

module.exports = passport => {
  passport.use(strategy);
}