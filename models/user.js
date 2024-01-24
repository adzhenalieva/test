const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validation: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'неверно введен путь к аватару',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validation: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'неверно введен email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('user', userSchema);
