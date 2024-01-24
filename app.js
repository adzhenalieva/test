const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorHandler = require('./errors/error-handler');

const NotFoundError = require('./errors/not-found-error');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.log('Not connected to MongoDB');
  });
const app = express();
const PORT = 3000;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.use(errors());
app.use(errorHandler);
app.all('*', (req, res, next) => {
  next(new NotFoundError('404! Page not found'));
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
