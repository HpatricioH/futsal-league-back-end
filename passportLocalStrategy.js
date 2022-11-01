const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const prisma = new PrismaClient();

module.exports = function (passport) {
  // Initialize passport localStrategy
  passport.use(
    new localStrategy(async (username, password, done) => {
      // match user using email
      await prisma.user
        .findUnique({
          where: { email: username },
          include: { social_profile: true },
        })
        .then((user) => {
          // validate if user not found
          if (!user)
            return done(null, false, {
              message: 'Incorrect username or password',
            });

          // validate password
          bcrypt.compare(password, user.hash, (err, hashedPassword) => {
            // error validation
            if (err) throw err;

            // correct password
            if (hashedPassword) {
              return done(null, { id: user.iduser, user: user.user_name });
            }
            return done(null, false);
          });
        })
        .catch((err) => {
          throw err;
        });
    })
  );

  passport.serializeUser((user, next) => {
    console.log(user);
    next(null, user.id);
  });

  passport.deserializeUser(async (id, next) => {
    await prisma.user
      .findUnique({
        where: { iduser: id },
        include: { social_profile: true },
      })
      .then((user, err) => {
        next(err, user);
      });
  });
};
