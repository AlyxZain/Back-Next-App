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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultUN = await UserModel.findOne({ email: email });
    if (!resultUN) return res.status(400).json({ message: 'User not found' });
    const matchPassword = await UserModel.comparePassword(
      password,
      resultUN.password
    );
    if (!matchPassword)
      return res.status(401).json({ message: 'Invalid password' });
    if (matchPassword) {
      const token = jwt.sign({ id: resultUN._id }, SECRET, {
        expiresIn: 86400, // 24h
      });
      return res.status(200).json({ token });
    }
  } catch (error) {
    res.sendStatus(404);
    console.log('GET /login', console.log(error));
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (foundUser)
      return res.json({ message: `Email: ${email} is already in use` });
    const newUser = new UserModel({
      username,
      email: email.toLocaleLowerCase(),
      password: await UserModel.encyptPassword(password),
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, {
      expiresIn: 86400, // 24h
    });
    res.json({ token });
  } catch (error) {
    console.log('GET /', error);
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
