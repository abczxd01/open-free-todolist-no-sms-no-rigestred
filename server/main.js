import express from 'express';
import mongoose from 'mongoose';

import router from './router.js';

const DB_URL =
  'mongodb+srv://user:user@cluster0.hbmaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log('server start'));
  } catch (err) {
    console.log(err);
  }
}

startApp();
