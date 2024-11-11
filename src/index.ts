import { MongoClient } from 'mongodb';
import express from 'express';
import body from 'body-parser';
import cors from 'cors';

import * as functions from 'firebase-functions';

const app = express();

app.use(cors({
  origin: '*'
}));

// body parser
app.use(body.json());

// Routes
app.use('/', require('./home-test/home-test.route'));
app.use('/stage-girls', require('./stage-girls/stage-girls.route'));
app.use('/todo', require('./todo/todo.route'));

async function start() {
  try {

    // const mongo  = await MongoClient.connect('mongodb://localhost:27017/eli-database');
    const uri = 'mongodb+srv://reian:sjMp5VeVLb2qit@cluster0.pn1vx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const mongo  = await MongoClient.connect(uri);

    await mongo.connect();

    // @ts-expect-error
    app.db = mongo.db('eli-database');

    // start server
    if (process.env.NODE_ENV !== 'production') {
      const port = 5000;
      app.listen(port, () => {
          console.log(`Eli's Server is running on port ${port}`);
      });
    }

  } catch (error) {
    console.log(error)
  }
}

start();
exports.api = functions.https.onRequest(app);