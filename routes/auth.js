/** @format */

const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require('../middlewares/utils');

/************************************************************************************************
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                          GET                                                 *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 ************************************************************************************************/
/************************************************************************************************
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                          POST                                                *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 ************************************************************************************************/

router.get('/login', async (req, res) => {
  const { email, password } = req.query;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    const matchPassword = await UserModel.comparePassword(
      password,
      user.password
    );
    if (matchPassword) {
      const token = jwt.sign({ id: user._id }, SECRET);
      return res.status(200).json({ token });
    } else {
      return res.status(200).json('Wrong Password');
      // res.status(404).send('Wrong Password');
    }
  } else {
    res.status(404).send('Email not found');
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const foundUser = await UserModel.findOne({ email });

  if (foundUser) {
    return res.status(404).send('Email is already in use');
  } else {
    const newUser = new UserModel({
      username,
      email: email.toLocaleLowerCase(),
      password: await UserModel.encyptPassword(password),
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET);
    return res.status(200).json({ token });
  }
});
/************************************************************************************************
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                          PUT                                                 *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 ************************************************************************************************/

module.exports = router;
