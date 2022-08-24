import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ManageAuction from '../models/manageAuctionModel.js';
import { isAuth, isAdmin } from '../utils.js';

const manageAuctionRouter = express.Router();

manageAuctionRouter.get('/', async (req, res) => {
  const manageAuctions = await ManageAuction.find();
  res.send(manageAuctions);
});

manageAuctionRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newManageAuction = new ManageAuction({
      name: ' ',
      slug: ' ',
      image: '/images/p1.jpg',
      price: 0,
      category: ' ',
      brand: ' ',
      description: ' ',
      time: ' ',
    });
    const manageAuction = await newManageAuction.save();
    res.send({ message: 'Auction Product Created', manageAuction });
  })
);

manageAuctionRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const auctionMannageId = req.params.id;
    const manageAuction = await ManageAuction.findById(auctionMannageId);
    if (manageAuction) {
      manageAuction.name = req.body.name;
      manageAuction.slug = req.body.slug;
      manageAuction.price = req.body.price;
      manageAuction.image = req.body.image;
      manageAuction.images = req.body.images;
      manageAuction.category = req.body.category;
      manageAuction.brand = req.body.brand;
      manageAuction.description = req.body.description;
      manageAuction.time = req.body.time;

      await manageAuction.save();
      res.send({ message: 'Auction Product Updated' });
    } else {
      res.status(404).send({ message: 'Auction Product Not Found' });
    }
  })
);

manageAuctionRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const manageAuction = await ManageAuction.findById(req.params.id);
    if (manageAuction) {
      await manageAuction.remove();
      res.send({ message: ' Auction Product Deleted' });
    } else {
      res.status(404).send({ message: 'Auction Product Not Found' });
    }
  })
);

manageAuctionRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const auctionMannageId = req.params.id;
    const product = await ManageAuction.findById(auctionMannageId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }


      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

const PAGE_SIZE = 8;

manageAuctionRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const manageAuctions = await ManageAuction.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await ManageAuction.countDocuments();
    res.send({
        manageAuctions,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

manageAuctionRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
          rating: {
            $gte: Number(rating),
          },
        }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
          // 1-50
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
          ? { price: 1 }
          : order === 'highest'
            ? { price: -1 }
            : order === 'toprated'
              ? { rating: -1 }
              : order === 'newest'
                ? { createdAt: -1 }
                : { _id: -1 };

    const products = await ManageAuction.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await ManageAuction.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

manageAuctionRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await ManageAuction.find().distinct('category');
    res.send(categories);
  })
);

manageAuctionRouter.get('/slug/:slug', async (req, res) => {
  const product = await manageAuction.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
manageAuctionRouter.get('/:id', async (req, res) => {
  const product = await ManageAuction.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});




manageAuctionRouter.post(
  '/auction',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new ManageAuction({
      name: ' ',
      slug: ' ',
      image: '/images/p1.jpg',
      price: 0,
      category: ' ',
      brand: ' ',
      description: ' ',
      time: ' ',
    });
    const product = await newProduct.save();
    res.send({ message: 'Product Created', product });
  })
);



export default manageAuctionRouter;
