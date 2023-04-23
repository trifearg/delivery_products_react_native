import {customer} from '../index';

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'dev-jwt';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = customer.findByPk(payload.userId);

      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (e) {
      console.log(e);
    }
  }))
}

