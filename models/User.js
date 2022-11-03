/** @format */

const { Schema, model, Types } = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dmk0kmt7d/image/upload/v1665969945/blsyqex8mixxmqwhdmmh.png',
    },
    task: {
      type: Array(
        new Schema(
          {
            title: String,
            datatime: String,
            creator: String,
            description: String,
            type: String,
            priority: String,
          },
          { _id: false }
        )
      ),
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

UserSchema.statics.encyptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, recievedPassword) => {
  return await bcrypt.compare(password, recievedPassword);
};

const UserModel = model('User', UserSchema);

module.exports = UserModel;
