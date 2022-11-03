/** @format */

const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require('../middlewares/utils');

router.put('/add', verifyToken, async (req, res) => {
  //Añadir una nueva tarea
  const { email } = req.query;
  const { title, datatime, creator, description, type, priority, isDeleting } =
    req.body;
  try {
    const foundUser = await UserModel.findOne({ email });
    const taskOnUser = foundUser.task;

    if (isDeleting) {
      const leftoverTask = taskOnUser.filter(
        (element) => element.title !== title
      );
      await UserModel.findOneAndUpdate({ email }, { task: leftoverTask });
      return res.status(200).json(leftoverTask);
    } else {
      datatime = new Date('<YYYY-mm-ddTHH:MM:ss>');
      const newTask = {
        title,
        datatime,
        creator,
        description,
        type,
        priority,
      };

      Object.keys(newTask).forEach(
        (element) =>
          (newTask[element] =
            typeof newTask[element] == 'string'
              ? newTask[element].trim()
              : newTask[element])
      );
      taskOnUser.push(newTask);
      await UserModel.findOneAndUpdate({ email }, { task: taskOnUser });
      return res.status(200).json(taskOnUser);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
