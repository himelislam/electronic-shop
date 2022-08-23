import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import manageAuctionRouter from './routes/manageAuctionRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';


dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors())

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db('Ecommerce');
    const reviewCollection = database.collection('review');
    // const auctionCollection = database.collection('auction');

    app.get('/manageAuction', async(req, res) => {
      const auctionProducts = await auctionCollection.find();
      res.send(auctionProducts);
    })
    
    app.post('/review', async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.json(result);

    });
    app.post('/all/review', async (req, res) => {
      const cursor = reviewCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete('/review/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.json(result);
    });


//     app.post('/auction', async (req, res) => {
//       const review = req.body;
//       const result = await auctionCollection.insertOne(review);
//       res.json(result);

// <<<<<<< HEAD
//     });
// =======
    // });
// >>>>>>> 1769e7be3940638cdb4fc902ff7c15a9d54156ee
    // app.post('/all/auction', async (req, res) => {
    //   const cursor = auctionCollection.find({});
    //   const result = await cursor.toArray();
    //   res.send(result);

    // });
// <<<<<<< HEAD

    // app.get('/allauction', async(req, res) => {
    //   const auctions = await auctionCollection.find({}).toArray();
    //   console.log(auctions)
    //   res.send(auctions);
    // })

    app.get('/allauction', async (req, res) => {
      const cursor = auctionCollection.find({});
      const result = await cursor.toArray();
      console.log('Hello')
      res.send(result);
    });
    
//     app.delete('/auction/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await auctionCollection.deleteOne(query);
//       res.json(result);
// =======}
//     app.delete('/auction/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await auctionCollection.deleteOne(query);
//       res.json(result);
//     }
// >>>>>>> 1769e7be3940638cdb4fc902ff7c15a9d54156ee

    // });


  }
  finally {
    await client.close();
  }
};
run().catch(console.dir);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || '' });
});

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/manageAuction', manageAuctionRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {

  console.log(`serve at http://localhost:${port}`);

});


