const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// POST endpoint to create a new user.
const signUp = async (req, res) => {
  const { body } = req;

  const passwordHashed = await bcrypt.hash(body.password, 10);

  try {
    if (!body.user_name.trim() || !body.email.trim() || !body.password.trim()) {
      res
        .status(400)
        .json({ errorDetails: 'All fields are mandatory for submission' });
    } else {
      const createRepresentative = await prisma.user.create({
        data: {
          user_name: body.user_name,
          email: body.email,
          hash: passwordHashed,
        },
      });
      res.status(201).json(createRepresentative);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// POST endpoint to login a user
const login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;
    if (!user)
      res
        .status(404)
        .json({ err: 'INVALID_USER', message: 'Invalid user or password' });
    else {
      req.login(user, (error) => {
        if (error) throw error;
        res.status(200).send({ message: 'success', user: user });
      });
    }
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Server error, please try again later', error: err });
    }
    res.redirect('http://localhost:3000');
  });
};

const getSingleUser = async (req, res) => {
  const id = Number(req.body.id);
  try {
    const singleUser = await prisma.user.findUnique({
      where: { iduser: id },
      select: {
        iduser: true,
        user_name: true,
        email: true,
        role: true,
      },
    });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  getSingleUser,
};
